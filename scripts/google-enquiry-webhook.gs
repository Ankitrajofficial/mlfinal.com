/**
 * MLS + KHADANE enquiry webhook for Google Apps Script.
 *
 * What it does:
 * 1. Receives a POST from /api/enquiry.
 * 2. Saves the enquiry to a Google Sheet.
 * 3. Sends an owner notification email.
 * 4. Sends a confirmation email to the customer.
 *
 * Replace the CONFIG values below with your own credentials.
 * Script Properties with the same keys still work as fallback.
 */

const CONFIG = {
  // Google Sheet where enquiries should be saved.
  // Use the long ID from the Sheet URL:
  // https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
  SHEET_ID: 'PASTE_GOOGLE_SHEET_ID_HERE',
  SHEET_NAME: 'Enquiries',

  // Email notification recipients.
  // Paste your own email in OWNER_EMAIL or KHADANE_OWNER_EMAIL to receive KHADANE form notifications.
  // All non-placeholder matching emails are notified. Multiple emails can be comma-separated.
  OWNER_EMAIL: 'PASTE_OWNER_EMAIL_HERE',
  NOTIFY_EMAIL: 'PASTE_NOTIFY_EMAIL_HERE',
  MLS_OWNER_EMAIL: 'PASTE_MLS_OWNER_EMAIL_HERE',
  KHADANE_OWNER_EMAIL: 'PASTE_KHADANE_OWNER_EMAIL_HERE',

  // Must match GOOGLE_ENQUIRY_WEBHOOK_SECRET in your website/Vercel env vars.
  WEBHOOK_SECRET: 'PASTE_LONG_RANDOM_WEBHOOK_SECRET_HERE',

  // Name shown in the customer confirmation email.
  BUSINESS_NAME: 'Mohan Lal & Sons'
};

const HEADERS = [
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

function doGet() {
  return json_({
    ok: true,
    message: 'MLS + KHADANE enquiry webhook is running. Use POST.'
  });
}

function testNotificationEmail() {
  var recipients = notifyEmailsForSite_('khadane', '');
  MailApp.sendEmail({
    to: recipients.join(','),
    subject: 'KHADANE enquiry notification test',
    body: 'This is a test notification from Google Apps Script. If you received it, owner notification email delivery is working.'
  });
}

function testSheetSetup() {
  var sheet = getSheet_();
  Logger.log('Enquiry sheet ready: ' + sheet.getParent().getUrl());
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    var payload = parsePayload_(e);
    validateSecret_(payload);
    validatePayload_(payload);

    var enquiry = normalizeEnquiry_(payload);
    var sheet = getSheet_();
    ensureHeaders_(sheet);

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
      JSON.stringify(withoutSecret_(payload))
    ]);

    var emailStatus = 'Pending';
    try {
      emailStatus = sendEmails_(enquiry);
      updateLastEmailStatus_(sheet, emailStatus);
    } catch (mailErr) {
      emailStatus = 'Failed: ' + (mailErr && mailErr.message ? mailErr.message : String(mailErr));
      updateLastEmailStatus_(sheet, emailStatus);
      throw mailErr;
    }

    return json_({
      ok: true,
      reference: enquiry.reference,
      emailStatus: emailStatus
    });
  } catch (err) {
    console.error(err && err.stack ? err.stack : err);
    return json_({
      ok: false,
      error: err && err.message ? err.message : String(err)
    });
  } finally {
    lock.releaseLock();
  }
}

function parsePayload_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('Missing POST body');
  }

  try {
    return JSON.parse(e.postData.contents);
  } catch (err) {
    throw new Error('Invalid JSON body');
  }
}

function validateSecret_(payload) {
  var expected = getProp_('WEBHOOK_SECRET');
  if (!expected) return;

  if (!payload.secret || payload.secret !== expected) {
    throw new Error('Invalid webhook secret');
  }
}

function validatePayload_(payload) {
  var required = ['reference', 'site', 'category', 'name', 'email', 'message'];
  required.forEach(function (key) {
    if (!payload[key]) throw new Error('Missing required field: ' + key);
  });

  if (!/@/.test(String(payload.email))) {
    throw new Error('Invalid email');
  }
}

function normalizeEnquiry_(payload) {
  var site = clean_(payload.site).toLowerCase();
  var notifyEmails = notifyEmailsForSite_(site, payload.notifyTo);

  return {
    submittedAt: new Date(),
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

function getSheet_() {
  var sheetId = getProp_('SHEET_ID');
  var sheetName = getProp_('SHEET_NAME') || 'Enquiries';
  var spreadsheet = sheetId
    ? SpreadsheetApp.openById(sheetId)
    : SpreadsheetApp.getActiveSpreadsheet();

  if (!spreadsheet) {
    spreadsheet = SpreadsheetApp.create('MLS KHADANE Enquiries');
    PropertiesService
      .getScriptProperties()
      .setProperty('SHEET_ID', spreadsheet.getId());
  }

  return spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);
}

function ensureHeaders_(sheet) {
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.setFrozenRows(1);
}

function updateLastEmailStatus_(sheet, status) {
  var lastRow = sheet.getLastRow();
  var statusCol = HEADERS.indexOf('Email Status') + 1;
  if (lastRow > 1 && statusCol > 0) {
    sheet.getRange(lastRow, statusCol).setValue(status);
  }
}

function sendEmails_(enquiry) {
  var ownerSent = false;
  var customerSent = false;

  MailApp.sendEmail({
    to: enquiry.notifyEmails.join(','),
    replyTo: enquiry.email,
    subject: 'New ' + siteLabel_(enquiry.site) + ' enquiry | ' + enquiry.reference + ' | ' + enquiry.name,
    body: ownerText_(enquiry),
    htmlBody: ownerHtml_(enquiry)
  });
  ownerSent = true;

  MailApp.sendEmail({
    to: enquiry.email,
    replyTo: primaryNotifyEmail_(enquiry),
    subject: siteLabel_(enquiry.site) + ' enquiry received | ' + enquiry.reference,
    body: customerText_(enquiry),
    htmlBody: customerHtml_(enquiry)
  });
  customerSent = true;

  return 'Owner: ' + (ownerSent ? 'sent' : 'failed') +
    ' | Customer: ' + (customerSent ? 'sent' : 'failed');
}

function notifyEmailsForSite_(site, notifyTo) {
  var recipients = [];

  addEmail_(recipients, getProp_('OWNER_EMAIL'));
  addEmail_(recipients, getProp_('NOTIFY_EMAIL'));

  if (site === 'khadane') {
    addEmail_(recipients, getProp_('KHADANE_OWNER_EMAIL'));
  }

  if (site === 'mls') {
    addEmail_(recipients, getProp_('MLS_OWNER_EMAIL'));
  }

  if (recipients.length === 0) {
    throw new Error('No notification email configured. Set OWNER_EMAIL, NOTIFY_EMAIL, or a site-specific owner email in CONFIG.');
  }

  return recipients;
}

function addEmail_(recipients, value) {
  String(value || '')
    .split(',')
    .map(function (email) { return clean_(email).toLowerCase(); })
    .filter(function (email) { return email && /@/.test(email); })
    .forEach(function (email) {
      if (recipients.indexOf(email) === -1) recipients.push(email);
    });
}

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
    'Reply directly to this email to respond to the buyer.'
  ].join('\n');
}

function customerText_(enquiry) {
  return [
    'Dear ' + enquiry.name + ',',
    '',
    'Thank you for writing to ' + siteLabel_(enquiry.site) + '. Your enquiry has been received and logged with our desk.',
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
    '1. We will review the material, format, finish, volume, and timing you shared.',
    '2. If anything is missing, our desk will ask for clarification.',
    '3. We will respond within one business day.',
    '',
    'Your message:',
    enquiry.message,
    '',
    getBusinessName_()
  ].join('\n');
}

function ownerHtml_(enquiry) {
  var site = siteLabel_(enquiry.site);
  var buyerRows = [
    detailRow_('Name', enquiry.name),
    detailRow_('Email', '<a href="mailto:' + esc_(enquiry.email) + '" style="color:#B8962E;text-decoration:none;word-break:break-word">' + esc_(enquiry.email) + '</a>', true),
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
      noticeBlock_('Action', 'Reply directly to this email. The reply-to address is set to ' + enquiry.email + '.'),
      '<p style="margin:18px 0 0;font-size:12px;line-height:18px;color:#8A8376;word-break:break-word">Source: ' + esc_(enquiry.sourceUrl || '-') + '<br>IP: ' + esc_(enquiry.ip || '-') + '<br>Received: ' + esc_(String(enquiry.submittedAt)) + '</p>'
    ].join(''),
    footer: 'Website enquiry notification'
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
    intro: 'Dear ' + enquiry.name + ', we have received your enquiry and logged it with our desk.',
    reference: enquiry.reference,
    body: [
      emailSection_('Request summary', requestRows),
      messageBlock_('Your message', enquiry.message),
      noticeBlock_('What happens next', 'If anything is missing, our desk will ask for clarification. Otherwise, we will respond within one business day.'),
      '<p style="margin:24px 0 0;font-size:14px;line-height:22px;color:#4B4740">' + esc_(getBusinessName_()) + '</p>'
    ].join(''),
    footer: 'This is an automatic confirmation. Reply to this email to continue the conversation.'
  });
}

function detailRow_(label, value, rawValue) {
  return [
    '<tr>',
    '<td style="width:38%;padding:10px 12px;border:1px solid #E4DED0;background:#F7F4EC;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#8A8376;vertical-align:top">' + esc_(label) + '</td>',
    '<td style="padding:10px 12px;border:1px solid #E4DED0;background:#FFFFFF;font-size:14px;color:#1A1410;vertical-align:top">' + (rawValue ? String(value || '-') : esc_(value || '-')) + '</td>',
    '</tr>'
  ].join('');
}

function siteLabel_(site) {
  return String(site || '').toLowerCase() === 'khadane' ? 'KHADANE' : 'MLS';
}

function getBusinessName_() {
  return getProp_('BUSINESS_NAME') || 'Mohan Lal & Sons';
}

function getProp_(key) {
  var constantValue = CONFIG[key];
  if (constantValue && !isPlaceholder_(constantValue)) {
    return String(constantValue);
  }

  return PropertiesService.getScriptProperties().getProperty(key) || '';
}

function isPlaceholder_(value) {
  var text = String(value || '').trim();
  return text === '' || text.indexOf('PASTE_') === 0;
}

function clean_(value) {
  return String(value || '').trim().slice(0, 500);
}

function cleanLong_(value) {
  return String(value || '').trim().slice(0, 5000);
}

function withoutSecret_(payload) {
  var clone = {};
  Object.keys(payload).forEach(function (key) {
    if (key !== 'secret') clone[key] = payload[key];
  });
  return clone;
}

function esc_(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
