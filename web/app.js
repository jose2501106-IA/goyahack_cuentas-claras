// Cuentas Claras · sitio público: navegación y montaje de las secciones.
// Sin framework, sin módulos ES y sin compilación: los scripts se cargan en orden
// con <script> para que el sitio abra también con solo abrir index.html (file://).
// Cada sección se registra en CC.secciones y app.js la monta al cargar la página.
'use strict';

(function (raiz) {
  const CC = raiz.CC || (raiz.CC = {});
  CC.secciones = CC.secciones || {};

  // el('p', {class: 'x'}, 'texto', otroNodo)
  CC.el = function el(tag, attrs, ...hijos) {
    const nodo = document.createElement(tag);
    if (attrs) {
      for (const [k, v] of Object.entries(attrs)) {
        if (v === null || v === undefined || v === false) continue;
        if (k === 'class') nodo.className = v;
        else if (k.startsWith('on') && typeof v === 'function') nodo.addEventListener(k.slice(2), v);
        else nodo.setAttribute(k, v === true ? '' : String(v));
      }
    }
    for (const h of hijos.flat()) {
      if (h === null || h === undefined || h === false) continue;
      nodo.append(h instanceof Node ? h : document.createTextNode(String(h)));
    }
    return nodo;
  };

  CC.enlaceExterno = function enlaceExterno(texto, url, clase) {
    if (typeof url !== 'string' || !/^https:\/\//i.test(url)) return null;
    return CC.el('a', { href: url, target: '_blank', rel: 'noopener noreferrer', class: clase || null }, texto);
  };

  CC.movimientoReducido = function movimientoReducido() {
    return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  // Resalta en la navegación la sección que se está leyendo.
  function navegacion() {
    const enlaces = Array.from(document.querySelectorAll('.navegacion a[data-seccion]'));
    const marcar = (id) => {
      for (const a of enlaces) {
        if (a.dataset.seccion === id) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      }
    };
    marcar((location.hash || '#inicio').slice(1));
    if (typeof IntersectionObserver !== 'function') return;
    const visibles = new Map();
    const obs = new IntersectionObserver((entradas) => {
      for (const e of entradas) visibles.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
      let mejor = null;
      let max = 0;
      for (const [id, r] of visibles) if (r > max) { max = r; mejor = id; }
      if (mejor) marcar(mejor);
    }, { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.01, 0.25, 0.5, 1] });
    for (const a of enlaces) {
      const s = document.getElementById(a.dataset.seccion);
      if (s) obs.observe(s);
    }
  }

  function montar() {
    navegacion();
    for (const [id, montador] of Object.entries(CC.secciones)) {
      const destino = document.getElementById(id);
      if (!destino || typeof montador !== 'function') continue;
      try {
        montador(destino);
      } catch (e) {
        destino.replaceChildren(CC.el('p', { class: 'apoyo', role: 'alert' },
          'Esta sección no se pudo cargar en este navegador.'));
        if (raiz.console) console.error(e);
      }
    }
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', montar);
    else montar();
  }
})(typeof window !== 'undefined' ? window : globalThis);
