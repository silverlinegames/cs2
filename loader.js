/* ============================================================
 * CS WEB — loader.js (versión GitHub Pages)
 * Carga Three.js desde CDN (con respaldo) y el juego desde el
 * paquete comprimido game.bundle.*.b64 (gzip + base64).
 * ============================================================ */
(function () {
  'use strict';

  var THREE_CDNS = [
    'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
    'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js'
  ];
  var BUNDLE_PARTS = [
    'game.bundle.1.b64',
    'game.bundle.2.b64',
    'game.bundle.3.b64',
    'game.bundle.4.b64'
  ];

  function showError(msg) {
    var d = document.createElement('div');
    d.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#e8e2d5;font:14px monospace;background:#111;z-index:99;text-align:center;padding:20px';
    d.textContent = 'Error al cargar el juego: ' + msg;
    var root = document.getElementById('csg-root');
    if (root) root.appendChild(d);
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement('script');
      s.src = src;
      s.onload = function () { resolve(); };
      s.onerror = function () { reject(new Error('no se pudo cargar ' + src)); };
      document.head.appendChild(s);
    });
  }

  function loadThree() {
    var i = 0;
    function next() {
      if (i >= THREE_CDNS.length) return Promise.reject(new Error('Three.js no disponible (sin conexión al CDN)'));
      var url = THREE_CDNS[i++];
      return loadScript(url).catch(function () { return next(); });
    }
    return next();
  }

  function fetchText(url) {
    return fetch(url).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status + ' en ' + url);
      return r.text();
    });
  }

  function b64ToBytes(b64) {
    var bin = atob(b64);
    var bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
  }

  function gunzip(bytes) {
    if (typeof DecompressionStream === 'undefined') {
      return Promise.reject(new Error('tu navegador no soporta descompresión (actualízalo)'));
    }
    return new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))).blob();
  }

  function boot() {
    loadThree()
      .then(function () {
        return Promise.all(BUNDLE_PARTS.map(fetchText));
      })
      .then(function (parts) {
        var b64 = parts.join('').replace(/\s+/g, '');
        return gunzip(b64ToBytes(b64));
      })
      .then(function (blob) {
        var url = URL.createObjectURL(blob);
        return loadScript(url);
      })
      .catch(function (err) {
        showError(err && err.message ? err.message : String(err));
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
