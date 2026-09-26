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

  // Interruptor de tema (docs/diseno-web-movil.md §1). Solo cambia html[data-tema];
  // la elección se recuerda si el navegador lo permite.
  function interruptorTema() {
    const boton = document.querySelector('.interruptor-tema');
    if (!boton) return;
    const html = document.documentElement;
    const sistema = typeof matchMedia === 'function' ? matchMedia('(prefers-color-scheme: dark)') : null;
    const oscuro = () => html.getAttribute('data-tema') === 'oscuro'
      || (!html.hasAttribute('data-tema') && !!(sistema && sistema.matches));
    const pintar = () => {
      const o = oscuro();
      boton.setAttribute('aria-pressed', String(o));
      boton.querySelector('.icono-tema').textContent = o ? '☀' : '☾';
    };
    boton.addEventListener('click', () => {
      const nuevo = oscuro() ? 'claro' : 'oscuro';
      html.setAttribute('data-tema', nuevo);
      try { localStorage.setItem('cc-tema', nuevo); } catch (e) { /* sin almacenamiento: igual cambia */ }
      pintar();
    });
    if (sistema && sistema.addEventListener) sistema.addEventListener('change', pintar);
    pintar();
  }
  CC.oscuro = () => document.documentElement.getAttribute('data-tema') === 'oscuro'
    || (!document.documentElement.hasAttribute('data-tema') && typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches);

  function montar() {
    interruptorTema();
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
