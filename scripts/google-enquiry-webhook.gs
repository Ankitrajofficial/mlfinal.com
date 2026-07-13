/**
 * MLS + KHADANE enquiry notifier — Google Apps Script (v3.0)
 * ===========================================================
 *
 * ROLE (changed in v3):
 *   The database of record is now Neon Postgres (with a MongoDB backup),
 *   written by the Next.js app BEFORE this webhook is called. This script
 *   is the NOTIFICATION layer only:
 *
 *     1. Website POST /api/enquiry → app stores enquiry in Neon → this web app
 *     2. Validate shared secret
 *     3. Append a row to the Google Sheet (human-readable mirror, NOT the
 *        source of truth — the admin panel at /admin reads from Neon)
 *     4. Email the owner desk(s) + send the customer a confirmation
 *
 *   If this script fails, the enquiry is already safe in the database and
 *   the app falls back to Resend for email. Nothing here should be treated
 *   as the primary record.
 *
 * SETUP
 * -----
 * 1. Create a Google Sheet (or reuse the existing enquiries sheet).
 * 2. Extensions → Apps Script → replace everything with THIS file.
 * 3. Configure below (CONFIG) or via Project Settings → Script Properties
 *    (properties win over placeholders; real CONFIG values win over properties).
 * 4. Deploy → New deployment → Web app
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 5. Copy the /exec URL into GOOGLE_ENQUIRY_WEBHOOK_URL (Vercel + .env.local).
 * 6. Put the same WEBHOOK_SECRET into GOOGLE_ENQUIRY_WEBHOOK_SECRET.
 * 7. Run testNotificationEmail() once to grant MailApp permissions.
 *
 * IMPORTANT: After every code change: Deploy → Manage deployments →
 * Edit (pencil) → Version: New version → Deploy. The /exec URL only serves
 * the deployed version, not the editor draft.
 */

var CONFIG = {
  // From the Sheet URL: https://docs.google.com/spreadsheets/d/THIS_PART/edit
  SHEET_ID: 'PASTE_GOOGLE_SHEET_ID_HERE',
  SHEET_NAME: 'Enquiries',

  // Comma-separated lists are allowed in every email field.
  OWNER_EMAIL: 'office@mohanlalsonsgroup.com',
  NOTIFY_EMAIL: '',
  MLS_OWNER_EMAIL: 'office@mohanlalsonsgroup.com',
  KHADANE_OWNER_EMAIL: 'office@khadane.com',

  // Must match GOOGLE_ENQUIRY_WEBHOOK_SECRET on the website.
  WEBHOOK_SECRET: 'PASTE_LONG_RANDOM_WEBHOOK_SECRET_HERE',

  BUSINESS_NAME: 'Mohan Lal & Sons'
};

var HEADERS = [
  'Submitted At',
  'Reference',
  'Site',
  'Category',
  'Name',
  'Email',
  'Phone',
  'Company',
  'Country',
  'Variety',
  'Format',
  'Finish',
  'Volume',
  'Target Arrival',
  'Message',
  'Notify To',
  'IP',
  'User Agent',
  'Source URL',
  'Email Status',
  'Raw JSON'
];

// Payload fields that never belong in the sheet's Raw JSON column.
var PRIVATE_FIELDS = ['secret', 'honeypot', 'submittedAtClient', 'turnstileToken'];

// ─── HTTP entry points ───────────────────────────────────────

function doGet() {
  return json_({
    ok: true,
    service: 'MLS + KHADANE enquiry notifier',
    role: 'notifications only — database of record is Neon Postgres',
    message: 'Webhook is live. Use POST with a JSON body.',
    version: '3.0'
  });
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(30000)) {
    return json_({ ok: false, error: 'Server busy — please retry in a moment.' });
  }

  try {
    var payload = parsePayload_(e);
    validateSecret_(payload);
    validatePayload_(payload);

    var enquiry = normalizeEnquiry_(payload);

    // Sheet append is best-effort in v3: the database already has the
    // enquiry, so a sheet problem must not block the emails.
    var sheet = null;
    var sheetStatus = 'Saved';
    try {
      sheet = getSheet_();
      ensureHeaders_(sheet);
      appendEnquiryRow_(sheet, enquiry, payload);
    } catch (sheetErr) {
      sheet = null;
      sheetStatus = 'Sheet failed: ' + errMessage_(sheetErr);
      console.error(sheetStatus);
    }

    var emailStatus;
    try {
      emailStatus = sendEmails_(enquiry);
    } catch (mailErr) {
      emailStatus = 'Failed: ' + errMessage_(mailErr);
      console.error('Email send failed: ' + emailStatus);
    }
    if (sheet) updateLastEmailStatus_(sheet, emailStatus);

    // ok:true as long as at least one channel worked; the app's Resend
    // fallback kicks in when we report failure.
    var anySuccess = sheetStatus === 'Saved' || emailStatus.indexOf('Owner: sent') === 0;
    return json_({
      ok: anySuccess,
      reference: enquiry.reference,
      sheetStatus: sheetStatus,
      emailStatus: emailStatus,
      error: anySuccess ? undefined : 'Sheet and email both failed. ' + sheetStatus + ' | ' + emailStatus
    });
  } catch (err) {
    console.error(err && err.stack ? err.stack : err);
    return json_({ ok: false, error: errMessage_(err) });
  } finally {
    lock.releaseLock();
  }
}

// ─── Manual tests (run from the Apps Script editor) ──────────

function testNotificationEmail() {
  var recipients = notifyEmailsForSite_('khadane', 'office@khadane.com');
  if (!recipients.length) {
    throw new Error('No recipient emails configured in CONFIG / Script Properties.');
  }
  MailApp.sendEmail({
    to: recipients.join(','),
    subject: 'MLS/KHADANE enquiry notification test',
    body:
      'This is a test from Google Apps Script (v3).\n\n' +
      'If you received it, owner notification delivery works.\n' +
      'Recipients: ' + recipients.join(', ')
  });
  Logger.log('Test email sent to: ' + recipients.join(', '));
}

function testSheetSetup() {
  var sheet = getSheet_();
  ensureHeaders_(sheet);
  Logger.log('Enquiry sheet ready: ' + sheet.getParent().getUrl());
  Logger.log('Sheet ID: ' + sheet.getParent().getId());
}

function testDoPostLocally() {
  var fakeEvent = {
    postData: {
      contents: JSON.stringify({
        secret: getProp_('WEBHOOK_SECRET') || '',
        reference: 'TEST-' + new Date().getTime(),
        site: 'khadane',
        category: 'trade-enquiry',
        name: 'Script Self-Test',
        email: 'test@example.com',
        phone: '+91 90000 00000',
        company: 'Test Co',
        country: 'India',
        variety: 'KHD-01 · Kota Honey',
        format: 'F2 · Cut-to-size',
        message: 'Self-test from testDoPostLocally() in the Apps Script editor.',
        notifyTo: getProp_('OWNER_EMAIL') || 'office@mohanlalsonsgroup.com',
        ip: '127.0.0.1',
        userAgent: 'AppsScript-self-test',
        sourceUrl: 'https://local-test'
      })
    }
  };
  var result = doPost(fakeEvent);
  Logger.log(result.getContent());
}

// ─── Parse / validate ────────────────────────────────────────

function parsePayload_(e) {
  if (!e) throw new Error('Missing request event');

  // Standard Apps Script web-app body (the site POSTs text/plain JSON).
  if (e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (err) {
      throw new Error('Invalid JSON body');
    }
  }

  // Some proxies move fields onto e.parameter.
  if (e.parameter && e.parameter.payload) {
    try {
      return JSON.parse(e.parameter.payload);
    } catch (err) {
      throw new Error('Invalid payload parameter JSON');
    }
  }

  if (e.parameter && e.parameter.reference) {
    return e.parameter;
  }

  throw new Error('Missing POST body. Redeploy the web app as "Anyone" and POST JSON as text/plain.');
}

function validateSecret_(payload) {
  var expected = getProp_('WEBHOOK_SECRET');
  // No secret configured → allow (dev only). Production must set one.
  if (!expected) return;

  var provided = payload && payload.secret != null ? String(payload.secret) : '';
  if (provided !== expected) {
    throw new Error('Invalid webhook secret');
  }
}

function validatePayload_(payload) {
  if (!payload || typeof payload !== 'object') {
    throw new Error('Payload must be a JSON object');
  }

  var required = ['reference', 'site', 'category', 'name', 'email', 'message'];
  for (var i = 0; i < required.length; i++) {
    var key = required[i];
    if (!payload[key] || !String(payload[key]).trim()) {
      throw new Error('Missing required field: ' + key);
    }
  }

  if (!/@/.test(String(payload.email))) {
    throw new Error('Invalid email');
  }
}

function normalizeEnquiry_(payload) {
  var site = clean_(payload.site).toLowerCase();
  var notifyEmails = notifyEmailsForSite_(site, payload.notifyTo);

  return {
    submittedAt: Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd HH:mm:ss z'),
    reference: clean_(payload.reference),
    site: site,
    category: clean_(payload.category),
    name: clean_(payload.name),
    email: clean_(payload.email),
    phone: clean_(payload.phone),
    company: clean_(payload.company),
    country: clean_(payload.country),
    variety: clean_(payload.variety),
    format: clean_(payload.format),
    finish: clean_(payload.finish),
    volume: clean_(payload.volume),
    targetArrival: clean_(payload.targetArrival || payload.leadtime),
    message: cleanLong_(payload.message),
    notifyTo: notifyEmails.join(','),
    notifyEmails: notifyEmails,
    ip: clean_(payload.ip),
    userAgent: clean_(payload.userAgent),
    sourceUrl: clean_(payload.sourceUrl)
  };
}

// ─── Sheet helpers ───────────────────────────────────────────

function getSheet_() {
  var sheetId = getProp_('SHEET_ID');
  var sheetName = getProp_('SHEET_NAME') || 'Enquiries';
  var spreadsheet = null;

  if (sheetId) {
    try {
      spreadsheet = SpreadsheetApp.openById(sheetId);
    } catch (err) {
      throw new Error(
        'Cannot open SHEET_ID. Share the sheet with the script owner, or paste the correct ID. ' +
          errMessage_(err)
      );
    }
  } else {
    spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  }

  if (!spreadsheet) {
    spreadsheet = SpreadsheetApp.create('MLS KHADANE Enquiries');
    PropertiesService.getScriptProperties().setProperty('SHEET_ID', spreadsheet.getId());
    Logger.log('Created spreadsheet: ' + spreadsheet.getUrl());
  }

  var sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }
  return sheet;
}

function ensureHeaders_(sheet) {
  var existing = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  var needsWrite = false;

  for (var i = 0; i < HEADERS.length; i++) {
    if (String(existing[i] || '') !== HEADERS[i]) {
      needsWrite = true;
      break;
    }
  }

  if (needsWrite) {
    if (sheet.getLastRow() <= 1) sheet.clear();
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }

  sheet.setFrozenRows(1);
}

function appendEnquiryRow_(sheet, enquiry, payload) {
  sheet.appendRow([
    enquiry.submittedAt,
    enquiry.reference,
    enquiry.site,
    enquiry.category,
    enquiry.name,
    enquiry.email,
    enquiry.phone,
    enquiry.company,
    enquiry.country,
    enquiry.variety,
    enquiry.format,
    enquiry.finish,
    enquiry.volume,
    enquiry.targetArrival,
    enquiry.message,
    enquiry.notifyTo,
    enquiry.ip,
    enquiry.userAgent,
    enquiry.sourceUrl,
    'Pending',
    JSON.stringify(publicPayload_(payload))
  ]);
}

function updateLastEmailStatus_(sheet, status) {
  var lastRow = sheet.getLastRow();
  var statusCol = HEADERS.indexOf('Email Status') + 1;
  if (lastRow > 1 && statusCol > 0) {
    sheet.getRange(lastRow, statusCol).setValue(status);
  }
}

// ─── Email ───────────────────────────────────────────────────

function sendEmails_(enquiry) {
  if (!enquiry.notifyEmails || !enquiry.notifyEmails.length) {
    throw new Error(
      'No notification email configured. Set OWNER_EMAIL / MLS_OWNER_EMAIL / KHADANE_OWNER_EMAIL.'
    );
  }

  var ownerSent = false;
  var customerSent = false;
  var errors = [];

  try {
    MailApp.sendEmail({
      to: enquiry.notifyEmails.join(','),
      replyTo: enquiry.email,
      subject:
        'New ' + siteLabel_(enquiry.site) + ' enquiry | ' + enquiry.reference + ' | ' + enquiry.name,
      body: ownerText_(enquiry),
      htmlBody: ownerHtml_(enquiry)
    });
    ownerSent = true;
  } catch (err) {
    errors.push('owner: ' + errMessage_(err));
  }

  try {
    MailApp.sendEmail({
      to: enquiry.email,
      replyTo: primaryNotifyEmail_(enquiry),
      subject: siteLabel_(enquiry.site) + ' enquiry received | ' + enquiry.reference,
      body: customerText_(enquiry),
      htmlBody: customerHtml_(enquiry)
    });
    customerSent = true;
  } catch (err) {
    errors.push('customer: ' + errMessage_(err));
  }

  var status =
    'Owner: ' + (ownerSent ? 'sent' : 'failed') +
    ' | Customer: ' + (customerSent ? 'sent' : 'failed');

  if (errors.length) {
    status += ' | ' + errors.join('; ');
  }

  // Owner mail failing is a hard failure (customer failure is partial success).
  if (!ownerSent) {
    throw new Error(status);
  }

  return status;
}

function notifyEmailsForSite_(site, notifyTo) {
  var recipients = [];

  // Prefer the explicit route computed by the website.
  addEmail_(recipients, notifyTo);

  addEmail_(recipients, getProp_('OWNER_EMAIL'));
  addEmail_(recipients, getProp_('NOTIFY_EMAIL'));

  if (String(site || '').toLowerCase() === 'khadane') {
    addEmail_(recipients, getProp_('KHADANE_OWNER_EMAIL'));
  } else {
    addEmail_(recipients, getProp_('MLS_OWNER_EMAIL'));
  }

  return recipients;
}

function primaryNotifyEmail_(enquiry) {
  if (enquiry.notifyEmails && enquiry.notifyEmails.length) {
    return enquiry.notifyEmails[0];
  }
  return getProp_('OWNER_EMAIL') || getBusinessName_();
}

function addEmail_(recipients, value) {
  String(value || '')
    .split(',')
    .map(function (email) {
      return clean_(email).toLowerCase();
    })
    .filter(function (email) {
      return email && /@/.test(email) && !isPlaceholder_(email);
    })
    .forEach(function (email) {
      if (recipients.indexOf(email) === -1) recipients.push(email);
    });
}

// ─── Plain-text templates ────────────────────────────────────

function ownerText_(enquiry) {
  return [
    'New ' + siteLabel_(enquiry.site) + ' enquiry',
    'Reference: ' + enquiry.reference,
    'Category: ' + enquiry.category,
    'Received at: ' + enquiry.submittedAt,
    '',
    'Buyer / sender:',
    'Name: ' + enquiry.name,
    'Email: ' + enquiry.email,
    optionalLine_('Phone', enquiry.phone),
    optionalLine_('Company', enquiry.company),
    optionalLine_('Country', enquiry.country),
    '',
    'Material / project:',
    optionalLine_('Variety', enquiry.variety),
    optionalLine_('Format', enquiry.format),
    optionalLine_('Finish', enquiry.finish),
    optionalLine_('Volume', enquiry.volume),
    optionalLine_('Target arrival', enquiry.targetArrival),
    '',
    'Message:',
    enquiry.message,
    '',
    'Source: ' + (enquiry.sourceUrl || '-'),
    'IP: ' + (enquiry.ip || '-'),
    '',
    'Full record: /admin command centre (database of record).',
    'Reply directly to this email to respond to the buyer.'
  ]
    .filter(notNull_)
    .join('\n');
}

function customerText_(enquiry) {
  return [
    'Dear ' + enquiry.name + ',',
    '',
    'Thank you for writing to ' + siteLabel_(enquiry.site) +
      '. Your enquiry has been received and logged with our desk.',
    'Reference: ' + enquiry.reference,
    '',
    'Request details:',
    'Category: ' + enquiry.category,
    optionalLine_('Variety', enquiry.variety),
    optionalLine_('Format', enquiry.format),
    optionalLine_('Finish', enquiry.finish),
    optionalLine_('Volume', enquiry.volume),
    optionalLine_('Target arrival', enquiry.targetArrival),
    '',
    'What happens next:',
    '1. We will review the details you shared.',
    '2. If anything is missing, our desk will ask for clarification.',
    '3. We will respond within one business day.',
    '',
    'Your message:',
    enquiry.message,
    '',
    getBusinessName_()
  ]
    .filter(notNull_)
    .join('\n');
}

function optionalLine_(label, value) {
  if (!value) return null;
  return label + ': ' + value;
}

function notNull_(line) {
  return line !== null;
}

// ─── HTML templates ──────────────────────────────────────────

function ownerHtml_(enquiry) {
  var site = siteLabel_(enquiry.site);
  var buyerRows = [
    detailRow_('Name', enquiry.name),
    detailRow_(
      'Email',
      '<a href="mailto:' + esc_(enquiry.email) +
        '" style="color:#B8962E;text-decoration:none;word-break:break-word">' +
        esc_(enquiry.email) + '</a>',
      true
    ),
    optionalDetailRow_('Phone', enquiry.phone),
    optionalDetailRow_('Company', enquiry.company),
    optionalDetailRow_('Country', enquiry.country)
  ].join('');

  var projectRows = [
    detailRow_('Category', enquiry.category),
    optionalDetailRow_('Variety', enquiry.variety),
    optionalDetailRow_('Format', enquiry.format),
    optionalDetailRow_('Finish', enquiry.finish),
    optionalDetailRow_('Volume', enquiry.volume),
    optionalDetailRow_('Target arrival', enquiry.targetArrival)
  ].join('');

  return emailShell_({
    eyebrow: 'New ' + site + ' enquiry',
    title: enquiry.name,
    intro: 'A new website enquiry has been submitted. Reply to this email to respond to the buyer.',
    reference: enquiry.reference,
    body: [
      emailSection_('Buyer / sender', buyerRows),
      emailSection_('Material / project', projectRows),
      messageBlock_('Message', enquiry.message),
      noticeBlock_(
        'Action',
        'Reply directly to this email — the reply-to address is set to ' + enquiry.email +
          '. The full record lives in the /admin command centre.'
      ),
      '<p style="margin:18px 0 0;font-size:12px;line-height:18px;color:#8A8376;word-break:break-word">Source: ' +
        esc_(enquiry.sourceUrl || '-') +
        '<br>IP: ' + esc_(enquiry.ip || '-') +
        '<br>Received: ' + esc_(String(enquiry.submittedAt)) +
        '</p>'
    ].join(''),
    footer: 'Website enquiry notification · database of record: command centre'
  });
}

function customerHtml_(enquiry) {
  var site = siteLabel_(enquiry.site);
  var requestRows = [
    detailRow_('Category', enquiry.category),
    optionalDetailRow_('Variety', enquiry.variety),
    optionalDetailRow_('Format', enquiry.format),
    optionalDetailRow_('Country', enquiry.country),
    optionalDetailRow_('Finish', enquiry.finish),
    optionalDetailRow_('Volume', enquiry.volume),
    optionalDetailRow_('Target arrival', enquiry.targetArrival)
  ].join('');

  return emailShell_({
    eyebrow: site + ' enquiry received',
    title: 'Thank you for writing to us.',
    intro:
      'Dear ' + enquiry.name + ', we have received your enquiry and logged it with our desk.',
    reference: enquiry.reference,
    body: [
      emailSection_('Request summary', requestRows),
      messageBlock_('Your message', enquiry.message),
      noticeBlock_(
        'What happens next',
        'If anything is missing, our desk will ask for clarification. Otherwise, we will respond within one business day.'
      ),
      '<p style="margin:24px 0 0;font-size:14px;line-height:22px;color:#4B4740">' +
        esc_(getBusinessName_()) + '</p>'
    ].join(''),
    footer: 'This is an automatic confirmation. Reply to this email to continue the conversation.'
  });
}

function emailShell_(opts) {
  return [
    '<!DOCTYPE html><html><body style="margin:0;padding:0;background:#F4F1E8;font-family:Georgia,serif">',
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F4F1E8;padding:24px 12px">',
    '<tr><td align="center">',
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#FFFCFA;border:1px solid #E4DED0;border-radius:12px;overflow:hidden">',
    '<tr><td style="background:#1A1410;padding:22px 24px">',
    '<div style="font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#B8962E;margin-bottom:8px">' +
      esc_(opts.eyebrow) + '</div>',
    '<div style="font-size:26px;line-height:1.2;color:#F5F1E8">' + esc_(opts.title) + '</div>',
    opts.reference
      ? '<div style="margin-top:10px;font-family:ui-monospace,Menlo,monospace;font-size:12px;color:#C8B48A">Ref ' +
        esc_(opts.reference) + '</div>'
      : '',
    '</td></tr>',
    '<tr><td style="padding:24px">',
    '<p style="margin:0 0 18px;font-size:15px;line-height:1.55;color:#4B4740">' +
      esc_(opts.intro) + '</p>',
    opts.body || '',
    '</td></tr>',
    '<tr><td style="padding:14px 24px 20px;border-top:1px solid #E4DED0;font-size:11px;color:#8A8376">' +
      esc_(opts.footer || '') + '</td></tr>',
    '</table></td></tr></table></body></html>'
  ].join('');
}

function emailSection_(title, rowsHtml) {
  return [
    '<div style="margin:0 0 18px">',
    '<div style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#8A8376;margin:0 0 8px">' +
      esc_(title) + '</div>',
    '<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse">' +
      rowsHtml + '</table>',
    '</div>'
  ].join('');
}

function messageBlock_(title, message) {
  return [
    '<div style="margin:0 0 18px">',
    '<div style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#8A8376;margin:0 0 8px">' +
      esc_(title) + '</div>',
    '<div style="padding:14px 16px;background:#F7F4EC;border:1px solid #E4DED0;border-radius:8px;font-size:14px;line-height:1.55;color:#1A1410;white-space:pre-wrap">' +
      esc_(message) + '</div>',
    '</div>'
  ].join('');
}

function noticeBlock_(title, text) {
  return [
    '<div style="margin:0 0 8px;padding:14px 16px;background:#FAF4E0;border:1px solid #E8D9A8;border-radius:8px">',
    '<div style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#8A6A1E;margin:0 0 6px">' +
      esc_(title) + '</div>',
    '<div style="font-size:13px;line-height:1.5;color:#4A3B14">' + esc_(text) + '</div>',
    '</div>'
  ].join('');
}

function detailRow_(label, value, rawValue) {
  return [
    '<tr>',
    '<td style="width:38%;padding:10px 12px;border:1px solid #E4DED0;background:#F7F4EC;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#8A8376;vertical-align:top">' +
      esc_(label) + '</td>',
    '<td style="padding:10px 12px;border:1px solid #E4DED0;background:#FFFFFF;font-size:14px;color:#1A1410;vertical-align:top">' +
      (rawValue ? String(value || '-') : esc_(value || '-')) + '</td>',
    '</tr>'
  ].join('');
}

function optionalDetailRow_(label, value) {
  if (!value) return '';
  return detailRow_(label, value);
}

// ─── Config / utils ──────────────────────────────────────────

function siteLabel_(site) {
  return String(site || '').toLowerCase() === 'khadane' ? 'KHADANE' : 'MLS';
}

function getBusinessName_() {
  return getProp_('BUSINESS_NAME') || 'Mohan Lal & Sons';
}

/** Real CONFIG values win; placeholders defer to Script Properties. */
function getProp_(key) {
  var constantValue = CONFIG[key];
  if (constantValue != null && !isPlaceholder_(constantValue)) {
    return String(constantValue);
  }
  var fromProps = PropertiesService.getScriptProperties().getProperty(key);
  return fromProps || '';
}

function isPlaceholder_(value) {
  var text = String(value || '').trim();
  if (!text) return true;
  if (text.indexOf('PASTE_') === 0) return true;
  if (text.indexOf('xxxxxxxx') !== -1) return true;
  return false;
}

function clean_(value) {
  return String(value == null ? '' : value)
    .trim()
    .slice(0, 500);
}

function cleanLong_(value) {
  return String(value == null ? '' : value)
    .trim()
    .slice(0, 5000);
}

function publicPayload_(payload) {
  var clone = {};
  Object.keys(payload || {}).forEach(function (key) {
    if (PRIVATE_FIELDS.indexOf(key) === -1) clone[key] = payload[key];
  });
  return clone;
}

function esc_(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function errMessage_(err) {
  if (!err) return 'Unknown error';
  if (err.message) return String(err.message);
  return String(err);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
