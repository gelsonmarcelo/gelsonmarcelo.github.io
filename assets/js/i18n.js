(function () {
  'use strict';

  var STORAGE_KEY = 'lang';
  var SUPPORTED = ['pt', 'en'];
  var currentLang = 'pt';
  var messages = {};

  function detectLang() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (SUPPORTED.indexOf(stored) !== -1) return stored;
    var list = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || 'pt'];
    for (var i = 0; i < list.length; i++) {
      var code = String(list[i]).toLowerCase();
      if (code.indexOf('pt') === 0) return 'pt';
      if (code.indexOf('en') === 0) return 'en';
    }
    return 'pt';
  }

  function getI18nUrl(lang) {
    var script = document.querySelector('script[src*="i18n.js"]');
    if (script && script.src) {
      return new URL('../i18n/' + lang + '.json', script.src).href;
    }
    return new URL('assets/i18n/' + lang + '.json', window.location.href).href;
  }

  function resolve(obj, path) {
    if (!obj || !path) return undefined;
    var keys = path.split('.');
    var cur = obj;
    for (var i = 0; i < keys.length; i++) {
      if (cur == null) return undefined;
      cur = cur[keys[i]];
    }
    return cur;
  }

  function format(val) {
    if (typeof val !== 'string') return val;
    return val.replace(/\{year\}/g, String(new Date().getFullYear()));
  }

  function applyLists() {
    document.querySelectorAll('[data-i18n-list]').forEach(function (list) {
      var items = resolve(messages, list.getAttribute('data-i18n-list'));
      if (!Array.isArray(items)) return;
      var lis = list.querySelectorAll(':scope > li');
      items.forEach(function (html, i) {
        if (lis[i]) lis[i].innerHTML = format(html);
      });
    });
  }

  function applyTables() {
    document.querySelectorAll('[data-i18n-table-rows]').forEach(function (tbody) {
      var rows = resolve(messages, tbody.getAttribute('data-i18n-table-rows'));
      if (!Array.isArray(rows) || !rows.length) return;
      var template = tbody.querySelector('tr');
      if (!template) return;
      tbody.innerHTML = '';
      rows.forEach(function (row) {
        var tr = template.cloneNode(true);
        tr.querySelectorAll('[data-i18n-cell]').forEach(function (cell) {
          var key = cell.getAttribute('data-i18n-cell');
          if (row[key] != null) cell.innerHTML = format(row[key]);
        });
        tbody.appendChild(tr);
      });
    });
  }

  function applyMeta() {
    var page = document.documentElement.getAttribute('data-i18n-page');
    if (!page) return;
    var meta = resolve(messages, page + '.meta');
    if (!meta) return;
    if (meta.title) document.title = meta.title;
    var descEl = document.querySelector('meta[name="description"]');
    if (descEl && meta.description) descEl.setAttribute('content', meta.description);
  }

  function applyTranslations() {
    document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : 'en';

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var val = resolve(messages, key);
      if (val != null) el.textContent = format(val);
    });

    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      var val = resolve(messages, key);
      if (val != null) el.innerHTML = format(val);
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var parts = pair.split(':');
        var attr = parts[0].trim();
        var key = parts.slice(1).join(':').trim();
        var val = resolve(messages, key);
        if (val != null) el.setAttribute(attr, format(val));
      });
    });

    applyLists();
    applyTables();
    applyMeta();
    updateSwitcher();
  }

  function updateSwitcher() {
    document.querySelectorAll('.lang-switcher__btn').forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.dataset.lang === currentLang ? 'true' : 'false');
    });
    var group = document.querySelector('.lang-switcher');
    if (group) {
      group.setAttribute('aria-label', resolve(messages, 'common.langLabel') || 'Language');
    }
  }

  function createSwitcher() {
    var header = document.querySelector('.header-inner');
    if (!header || document.querySelector('.lang-switcher')) return;

    var group = document.createElement('div');
    group.className = 'lang-switcher';
    group.setAttribute('role', 'group');
    group.setAttribute('aria-label', resolve(messages, 'common.langLabel') || 'Language');

    SUPPORTED.forEach(function (lang) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'lang-switcher__btn';
      btn.dataset.lang = lang;
      btn.textContent = lang.toUpperCase();
      btn.setAttribute('aria-pressed', lang === currentLang ? 'true' : 'false');
      btn.addEventListener('click', function () {
        setLang(lang);
      });
      group.appendChild(btn);
    });

    header.appendChild(group);
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1 || lang === currentLang) return;
    loadMessages(lang).then(function (data) {
      currentLang = lang;
      messages = data;
      localStorage.setItem(STORAGE_KEY, lang);
      applyTranslations();
    }).catch(function (err) {
      console.warn('i18n:', err);
    });
  }

  function loadMessages(lang) {
    return fetch(getI18nUrl(lang)).then(function (res) {
      if (!res.ok) throw new Error('Failed to load ' + lang);
      return res.json();
    });
  }

  function init() {
    currentLang = detectLang();
    loadMessages(currentLang).then(function (data) {
      messages = data;
      createSwitcher();
      applyTranslations();
    }).catch(function (err) {
      console.warn('i18n:', err);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
