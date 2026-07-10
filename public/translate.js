/**
 * Site-wide translation (every HTML page shares the same language choice).
 * Uses path=/ cookies + localStorage; on real domains also sets domain=.site
 * so www and apex share one preference.
 */
(function () {
  var STORAGE_KEY = "mls_site_lang";
  var PAGE_LANG = "en";

  function cookieSiteDomain() {
    var h = window.location.hostname;
    if (!h || h === "localhost" || h === "127.0.0.1") return null;
    if (/^\d+\.\d+\.\d+\.\d+$/.test(h)) return null;
    if (h.indexOf("www.") === 0) return "." + h.slice(4);
    var parts = h.split(".");
    if (parts.length === 2) return "." + h;
    return null;
  }

  function setGoogtransCookie(langCode) {
    var base =
      "googtrans=/en/" +
      langCode +
      "; path=/; max-age=31536000; SameSite=Lax";
    /* Always set BOTH non-domain and domain cookies —
       Google Translate reads whichever it finds first. */
    document.cookie = base;
    var d = cookieSiteDomain();
    if (d) document.cookie = base + "; domain=" + d;
  }

  var LANGS = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी · Hindi" },
    { code: "es", label: "Español" },
    { code: "fr", label: "Français" },
    { code: "de", label: "Deutsch" },
    { code: "ar", label: "العربية · Arabic" },
    { code: "zh-CN", label: "中文 · Chinese" },
    { code: "ja", label: "日本語 · Japanese" },
    { code: "pt", label: "Português" },
    { code: "ru", label: "Русский" },
    { code: "it", label: "Italiano" },
    { code: "nl", label: "Nederlands" },
    { code: "tr", label: "Türkçe" },
    { code: "vi", label: "Tiếng Việt" },
    { code: "th", label: "ไทย · Thai" },
    { code: "id", label: "Bahasa Indonesia" },
    { code: "ms", label: "Bahasa Melayu" },
    { code: "fa", label: "فارسی · Persian" },
    { code: "bn", label: "বাংলা · Bengali" },
    { code: "te", label: "తెలుగు · Telugu" },
    { code: "ta", label: "தமிழ் · Tamil" },
    { code: "mr", label: "मराठी · Marathi" },
    { code: "gu", label: "ગુજરાતી · Gujarati" },
    { code: "kn", label: "ಕನ್ನಡ · Kannada" },
    { code: "ml", label: "മലയാളം · Malayalam" },
    { code: "uk", label: "Українська" },
    { code: "pl", label: "Polski" },
    { code: "el", label: "Ελληνικά" },
    { code: "he", label: "עברית · Hebrew" },
  ];

  function parseGoogtransCookie() {
    var m = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
    if (!m) return "";
    try {
      var val = decodeURIComponent(m[1]);
      if (!val || val.indexOf("/") === -1) return "";
      var parts = val.split("/");
      return parts[parts.length - 1] || "";
    } catch (e) {
      return "";
    }
  }

  function clearGoogtransCookies() {
    var expires = "expires=Thu, 01 Jan 1970 00:00:01 GMT";
    var suff = "; path=/; SameSite=Lax";
    var host = window.location.hostname;
    var domains = [null, host];
    var site = cookieSiteDomain();
    if (site) domains.push(site);
    if (host.indexOf("www.") === 0) domains.push("." + host.slice(4));
    var seen = {};
    domains.forEach(function (dom) {
      var k = dom || "";
      if (seen[k]) return;
      seen[k] = true;
      var d = dom ? "; domain=" + dom : "";
      document.cookie = "googtrans=; " + expires + suff + d;
    });
  }

  /* ── Restore language on every page navigation ──
     Compare the *value* in the cookie against localStorage,
     not just whether the cookie exists.  Google Translate
     sometimes clears or resets its own cookie during translation,
     so a mere existence check is not enough. */
  var stored = localStorage.getItem(STORAGE_KEY);
  var cookieLang = parseGoogtransCookie();
  if (stored && stored !== "en" && cookieLang !== stored) {
    setGoogtransCookie(stored);
    window.location.reload();
    return;
  }

  function setLanguage(langCode) {
    langCode = (langCode || "en").trim();
    if (langCode === "en") {
      localStorage.removeItem(STORAGE_KEY);
      clearGoogtransCookies();
    } else {
      localStorage.setItem(STORAGE_KEY, langCode);
      setGoogtransCookie(langCode);
    }
    window.location.reload();
  }

  function ensureLangOptions(sel) {
    if (!sel) return;
    var hasEnglish = Array.prototype.some.call(sel.options, function (o) {
      return o.value === "en";
    });
    if (!hasEnglish) {
      var en = document.createElement("option");
      en.value = "en";
      en.textContent = "Language";
      sel.insertBefore(en, sel.firstChild);
    }
    var existing = {};
    Array.prototype.forEach.call(sel.options, function (o) {
      existing[o.value] = true;
    });
    LANGS.forEach(function (L) {
      if (existing[L.code]) return;
      var o = document.createElement("option");
      o.value = L.code;
      o.textContent = L.label;
      sel.appendChild(o);
    });
  }

  function getLanguageSelects() {
    var selectors = document.querySelectorAll(".nav-lang-select");
    if (selectors.length) return Array.prototype.slice.call(selectors);
    var legacy = document.getElementById("mlsLangSelect");
    return legacy ? [legacy] : [];
  }

  function setupLanguageSelects(fromCookie, fromStorage) {
    var langSelects = getLanguageSelects();
    langSelects.forEach(ensureLangOptions);
    if (!langSelects.length) return [];

    var current = fromCookie || fromStorage || "en";
    var match = LANGS.some(function (L) {
      return L.code === current;
    });
    current = match ? current : "en";

    langSelects.forEach(function (sel) {
      sel.setAttribute("translate", "no");
      sel.classList.add("notranslate");
      var langLi = sel.closest(".nav-item-lang");
      if (langLi) langLi.classList.add("notranslate");
      sel.value = current;
      if (sel.__mlsTranslateBound) return;
      sel.__mlsTranslateBound = true;
      sel.addEventListener("change", function () {
        setLanguage(sel.value);
      });
    });

    return langSelects;
  }

  function findGoogTeCombo() {
    var host = document.getElementById("mls-google-translate");
    if (host) {
      var inner = host.querySelector("select.goog-te-combo");
      if (inner) return inner;
    }
    return document.querySelector("select.goog-te-combo");
  }

  function fireSelectChange(el) {
    try {
      if (document.createEvent) {
        var ev = document.createEvent("HTMLEvents");
        ev.initEvent("change", true, true);
        el.dispatchEvent(ev);
      }
    } catch (e) {}
    try {
      el.dispatchEvent(new Event("change", { bubbles: true }));
    } catch (e2) {}
    try {
      if (typeof InputEvent === "function") {
        el.dispatchEvent(new InputEvent("input", { bubbles: true }));
      }
    } catch (e3) {}
  }

  function applyTargetLangToGoogleCombo(targetLang, maxAttempts) {
    if (!targetLang || targetLang === PAGE_LANG) return;

    var attempts = 0;
    maxAttempts = maxAttempts || 280;
    var candidateLangs = [targetLang];
    if (targetLang === "he") candidateLangs.push("iw");

    function tryOnce() {
      var combo = findGoogTeCombo();
      if (!combo || combo.options.length < 1) return false;
      var i;
      var code;
      var hasTarget;
      for (i = 0; i < candidateLangs.length; i++) {
        code = candidateLangs[i];
        hasTarget = Array.prototype.some.call(combo.options, function (o) {
          return o.value === code;
        });
        if (!hasTarget) continue;
        if (combo.value !== code) {
          combo.value = code;
          fireSelectChange(combo);
        } else {
          fireSelectChange(combo);
        }
        return true;
      }
      return false;
    }

    if (tryOnce()) return;

    var id = setInterval(function () {
      if (tryOnce() || ++attempts >= maxAttempts) {
        clearInterval(id);
      }
    }, 35);
  }

  function watchComboAndApply(targetLang, maxMs) {
    if (!targetLang || targetLang === PAGE_LANG) return;
    maxMs = maxMs || 12000;
    var start = Date.now();
    function tryApplyCombo() {
      var combo = findGoogTeCombo();
      if (!combo || combo.options.length < 1) return false;
      applyTargetLangToGoogleCombo(targetLang, 60);
      return true;
    }
    var obs = new MutationObserver(function () {
      if (tryApplyCombo()) obs.disconnect();
    });
    obs.observe(document.documentElement, { childList: true, subtree: true });
    var poll = setInterval(function () {
      if (Date.now() - start > maxMs) {
        clearInterval(poll);
        obs.disconnect();
        return;
      }
      if (tryApplyCombo()) {
        clearInterval(poll);
        obs.disconnect();
      }
    }, 200);
    setTimeout(function () {
      clearInterval(poll);
      obs.disconnect();
    }, maxMs);
  }

  var mlsTranslateRetries = 0;

  window.mlsInitGoogleTranslate = function () {
    if (
      !window.google ||
      !google.translate ||
      !google.translate.TranslateElement
    ) {
      if (mlsTranslateRetries++ < 120) {
        setTimeout(window.mlsInitGoogleTranslate, 40);
      }
      return;
    }

    if (window.__mlsGtMounted) return;
    window.__mlsGtMounted = true;

    var host = document.getElementById("mls-google-translate");
    if (host) {
      host.removeAttribute("style");
      host.classList.add("mls-google-translate-host");
    }

    var fromCookie = parseGoogtransCookie();
    var fromStorage = localStorage.getItem(STORAGE_KEY);
    var langSelects = setupLanguageSelects(fromCookie, fromStorage);
    var targetLang =
      fromCookie && fromCookie !== PAGE_LANG
        ? fromCookie
        : fromStorage && fromStorage !== "en"
          ? fromStorage
          : "";

    try {
      new google.translate.TranslateElement(
        {
          pageLanguage: PAGE_LANG,
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
          /* false: avoids floating “Select Language” UI; we drive via nav + combo */
          autoDisplay: false,
        },
        "mls-google-translate"
      );
    } catch (e) {
      console.warn("MLS: Google TranslateElement failed", e);
    }

    if (targetLang) {
      applyTargetLangToGoogleCombo(targetLang, 300);
      watchComboAndApply(targetLang, 12000);
      [120, 400, 900, 2000].forEach(function (ms) {
        setTimeout(function () {
          applyTargetLangToGoogleCombo(targetLang, 120);
        }, ms);
      });
    }
  };

  function loadGoogleTranslateScript() {
    if (document.querySelector("script[data-mls-gtranslate='1']")) return;
    var s = document.createElement("script");
    s.src =
      "https://translate.google.com/translate_a/element.js?cb=mlsInitGoogleTranslate";
    s.async = true;
    s.setAttribute("data-mls-gtranslate", "1");
    s.onerror = function () {
      console.warn(
        "MLS: Google Translate script could not load (network, ad blocker, or blocked third-party scripts)."
      );
    };
    (document.head || document.documentElement).appendChild(s);
  }

  setupLanguageSelects(parseGoogtransCookie(), localStorage.getItem(STORAGE_KEY));
  loadGoogleTranslateScript();
})();
