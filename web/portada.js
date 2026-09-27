// Portada «Historia en seis pasos» (docs/diseno-web-movil.md §3). El texto de cada paso
// está en el HTML; aquí solo se monta un mini mapa fijo arriba (un recorte del gemelo
// entre Bodega A-17 y Doña Mary) que dibuja el paso del bloque que se está leyendo.
'use strict';

(function (raiz) {
  const CC = raiz.CC;

  // Primera pantalla (cola, tarea 12): bajo el titular, el mini mapa con la nota ya
  // firmada por los dos (paso 2 de la corrida real) para que se vea el producto.
  CC.secciones['portada-mapa'] = function montarPortada(destino) {
    const forma = CC.Gemelo.formaDelSitio();
    if (!forma || typeof CC.crearEscena !== 'function') return;
    const { pintar } = CC.crearEscena(destino, forma, {
      recorte: { x1: 44, x2: 216, y1: -14, y2: 48 },
      descripcion: 'Mini mapa del Pasillo A-B: la nota entre Bodega A-17 y Doña Mary, firmada por los dos.',
    });
    pintar(2, !CC.movimientoReducido());
  };

  CC.secciones['historia-mapa'] = function montarHistoria(destino) {
    const forma = CC.Gemelo.formaDelSitio();
    const pasos = Array.from(document.querySelectorAll('.historia-paso'));
    if (!forma || !pasos.length || typeof CC.crearEscena !== 'function') return;

    const { pintar } = CC.crearEscena(destino, forma, {
      recorte: { x1: 44, x2: 216, y1: -14, y2: 48 }, // unidades del plano
      descripcion: 'Mini mapa del Pasillo A-B entre Bodega A-17, Bodega B-40 y Doña Mary.',
    });

    let actual = 0;
    function activar(n) {
      if (n === actual) return;
      pintar(n, n > actual);
      actual = n;
      for (const li of pasos) li.classList.toggle('activo', Number(li.dataset.paso) === n);
    }

    if (typeof IntersectionObserver !== 'function') { activar(6); return; }
    // El bloque activo es el que cruza la franja central de la pantalla.
    const obs = new IntersectionObserver((entradas) => {
      for (const e of entradas) if (e.isIntersecting) activar(Number(e.target.dataset.paso));
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    for (const li of pasos) obs.observe(li);
  };
})(window);
