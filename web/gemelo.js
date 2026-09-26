// Gemelo digital del Pasillo A-B para el sitio público (decisiones #47, #48 y #50).
// Dibuja en SVG la forma de web/datos/pasillo-a-b.json (copia idéntica de
// plano/pasillo-a-b.json): trazos del plano, corredor y las 96 bodegas en su x y w.
// Es el mismo dibujo que la portada de la app local (frontend/vistas/pasillo.js),
// con la vista isométrica por CSS y el botón «Vista plana».
// Lo usan la repetición de la demo real (repeticion.js) y el Pasillo vivo (simulacion/vista.js).
'use strict';

(function (raiz) {
  const SVG = 'http://www.w3.org/2000/svg';

  // Medidas del dibujo, en unidades del plano (una bodega mide ~6).
  const MARGEN = 4;
  const CARA = 1.3;   // cara lateral de cada bodega (volumen)
  const ELEVA = 1.6;  // cuánto se elevan las bodegas marcadas

  function s(tag, attrs, ...hijos) {
    const n = document.createElementNS(SVG, tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v !== null && v !== undefined) n.setAttribute(k, String(v));
    }
    for (const h of hijos.flat()) {
      if (h === null || h === undefined) continue;
      n.append(typeof h === 'object' ? h : document.createTextNode(String(h)));
    }
    return n;
  }

  // Función pura: el plano usa y hacia arriba (origen en la base de la fila B); el SVG, y hacia abajo.
  function geometria(forma) {
    const xs = [];
    const ys = [];
    for (const t of forma.trazos) { xs.push(t[0], t[2]); ys.push(t[1], t[3]); }
    for (const b of forma.bodegas) xs.push(b.x, b.x + b.w);
    for (const f of Object.values(forma.filas)) ys.push(f.y, f.y + f.alto);
    const minX = Math.min(...xs) - MARGEN;
    const maxX = Math.max(...xs) + MARGEN;
    const minY = Math.min(...ys) - MARGEN - 8; // lugar para las etiquetas de la fila inferior
    const maxY = Math.max(...ys) + MARGEN;
    return {
      X: (x) => +(x - minX).toFixed(2),
      Y: (y) => +(maxY - y).toFixed(2),
      ancho: +(maxX - minX).toFixed(2),
      alto: +(maxY - minY).toFixed(2),
    };
  }

  // Lado de arriba del corredor (el de mayor y en el plano).
  function ladoSuperior(forma) {
    const lados = Object.keys(forma.filas);
    return lados.reduce((a, b) => (forma.filas[a].y >= forma.filas[b].y ? a : b));
  }

  function camino(x1, y1, x2, y2, curva) {
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2 + (curva || 0);
    return `M ${+x1.toFixed(2)} ${+y1.toFixed(2)} Q ${+mx.toFixed(2)} ${+my.toFixed(2)} ${+x2.toFixed(2)} ${+y2.toFixed(2)}`;
  }

  // Dibuja el pasillo. marcadas: { 'A-17': 'Bodega A', … } se elevan y llevan etiqueta.
  function dibujar(forma, { marcadas = {}, descripcion } = {}) {
    const g = geometria(forma);
    const nombre = forma.pasillo || 'A-B';
    const svg = s('svg', {
      viewBox: `0 0 ${g.ancho} ${g.alto}`, class: 'pasillo-svg', role: 'img',
      'aria-label': descripcion || `Forma del Pasillo ${nombre}: ${forma.bodegas.length} bodegas numeradas a los dos lados del corredor.`,
    });

    // 1) Capa base: todos los trazos del plano en un solo path.
    if (forma.trazos.length) {
      let d = '';
      for (const [x1, y1, x2, y2] of forma.trazos) d += `M${g.X(x1)} ${g.Y(y1)}L${g.X(x2)} ${g.Y(y2)}`;
      svg.append(s('path', { d, class: 'plano-trazos' }));
    }

    // Corredor, a lo largo de las bodegas.
    const xIni = Math.min(...forma.bodegas.map((b) => b.x));
    const xFin = Math.max(...forma.bodegas.map((b) => b.x + b.w));
    const c = forma.corredor;
    svg.append(
      s('rect', { x: g.X(xIni), y: g.Y(c.y + c.alto), width: +(xFin - xIni).toFixed(2), height: c.alto, class: 'corredor' }),
      s('text', { x: g.X(xFin) - 1.5, y: g.Y(c.y) - 1.8, class: 'corredor-rotulo', 'text-anchor': 'end' }, c.rotulo || `Pasillo ${nombre}`),
    );

    // 2) Bodegas en su x y w reales; las marcadas se elevan.
    const sup = ladoSuperior(forma);
    const bodegas = {};
    const capaBodegas = s('g', { class: 'capa-bodegas' });
    const capaMarcadas = s('g', { class: 'capa-marcadas' });
    for (const b of forma.bodegas) {
      const etiqueta = marcadas[b.id];
      const fila = forma.filas[b.lado];
      const eleva = etiqueta ? ELEVA : 0;
      const caja = {
        id: b.id, numero: b.numero,
        x: g.X(b.x), y: g.Y(fila.y + fila.alto) - eleva, w: b.w, h: fila.alto,
        superior: b.lado === sup, eleva,
      };
      const nodo = bodega(b, caja, etiqueta);
      (etiqueta ? capaMarcadas : capaBodegas).append(nodo);
      bodegas[b.id] = { ...caja, g: nodo, tapa: nodo.querySelector('.bodega-tapa') };
    }
    svg.append(capaBodegas);

    const capas = {};
    for (const nombreCapa of ['puente', 'trazos', 'pulso']) {
      capas[nombreCapa] = s('g', { class: `capa-${nombreCapa}` });
      svg.append(capas[nombreCapa]);
    }
    svg.append(capaMarcadas);
    for (const nombreCapa of ['fichas', 'notas', 'sello']) {
      capas[nombreCapa] = s('g', { class: `capa-${nombreCapa}` });
      svg.append(capas[nombreCapa]);
    }

    const corredor = {
      xIni: g.X(xIni), xFin: g.X(xFin),
      arriba: g.Y(c.y + c.alto), abajo: g.Y(c.y), centro: g.Y(c.y + c.alto / 2),
    };

    // Punto de la bodega que mira al corredor.
    function ancla(id) {
      const b = bodegas[id];
      return { x: b.x + b.w / 2, y: b.superior ? b.y + b.h + CARA + b.eleva : b.y };
    }
    function centro(id) {
      const b = bodegas[id];
      return { x: b.x + b.w / 2, y: b.y + b.h / 2 };
    }
    function xDePlano(x) { return g.X(x); }

    return { svg, forma, geo: g, bodegas, capas, corredor, ancla, centro, xDePlano, s, camino };
  }

  function bodega(b, c, etiqueta) {
    const n = s('g', { class: `bodega${etiqueta ? ' bodega-marcada' : ''}`, 'data-id': b.id });
    const lado = Math.min(0.5, c.w * 0.1);
    // Caras laterales (un tono más oscuro) para dar volumen, luego la tapa.
    n.append(
      s('rect', { x: c.x + lado, y: c.y + c.h, width: c.w, height: CARA + c.eleva, class: 'bodega-cara' }),
      s('rect', { x: c.x + c.w, y: c.y + lado, width: lado, height: c.h + CARA + c.eleva - lado, class: 'bodega-cara' }),
      s('rect', { x: c.x, y: c.y, width: c.w, height: c.h, class: 'bodega-tapa' }),
      s('text', { x: c.x + c.w / 2, y: c.superior ? c.y + c.h - 2.2 : c.y + c.h / 2 + 1, 'text-anchor': 'middle', class: 'bodega-num' }, String(b.numero)),
    );
    if (etiqueta) {
      const ly = c.superior ? c.y - 2 : c.y + c.h + CARA + c.eleva + 4.5;
      n.append(s('text', { x: c.x + c.w / 2, y: ly, 'text-anchor': 'middle', class: 'bodega-etiqueta' }, etiqueta));
    }
    return n;
  }

  // ---------- Piezas que se ponen sobre el mapa ----------

  function trazo(mapa, capa, p1, p2, { animar = false, curva = 2.5, clase = '' } = {}) {
    const d = camino(p1.x, p1.y, p2.x, p2.y, curva);
    const nodo = s('path', { d, pathLength: 1, class: `trazo ${clase}${animar ? ' dibujar' : ''}`.trim() });
    mapa.capas[capa].append(nodo);
    return nodo;
  }

  function sello(mapa, punto, { fecha = null, animar = false, capa = 'sello', clase = '' } = {}) {
    const nodo = s('g', { transform: `translate(${punto.x} ${punto.y})`, class: clase || null },
      s('g', { class: `sello-mapa${animar ? ' caer' : ''}` },
        s('rect', { x: -11, y: -4, width: 22, height: fecha ? 8 : 6, rx: 0.8 }),
        s('text', { x: 0, y: 0.8, 'text-anchor': 'middle', class: 'sello-mapa-palabra' }, 'CUMPLIDA'),
        fecha ? s('text', { x: 0, y: 3.3, 'text-anchor': 'middle', class: 'sello-mapa-fecha' }, fecha) : null));
    mapa.capas[capa].append(nodo);
    return nodo;
  }

  function papelito(mapa, punto, texto, { animar = false, ancho = 30 } = {}) {
    const nodo = s('g', { class: `papelito${animar ? ' aparecer' : ''}` },
      s('rect', { x: punto.x, y: punto.y, width: ancho, height: 5.2 }),
      s('text', { x: punto.x + 1.6, y: punto.y + 3.7 }, texto));
    mapa.capas.notas.append(nodo);
    return nodo;
  }

  function ficha(mapa, punto, { iniciales, nombre, r = 3, clase = '' } = {}) {
    const nodo = s('g', { class: `ficha ${clase}`.trim(), transform: `translate(${punto.x} ${punto.y})` },
      s('circle', { cx: 0, cy: 0, r }),
      iniciales ? s('text', { x: 0, y: 1, 'text-anchor': 'middle', class: 'ficha-iniciales' }, iniciales) : null,
      nombre ? s('text', { x: -r - 1.2, y: 1, 'text-anchor': 'end', class: 'ficha-nombre' }, nombre) : null);
    mapa.capas.fichas.append(nodo);
    return nodo;
  }

  // ---------- Montaje con barra, marco y rótulos ----------

  let vistaPlana = false;

  function montar(contenedor, forma, opciones = {}) {
    const el = raiz.CC.el;
    const mapa = dibujar(forma, opciones);
    const maqueta = el('div', { class: `maqueta${vistaPlana ? ' plana' : ''}` });
    maqueta.append(mapa.svg);
    const boton = el('button', { type: 'button', class: 'boton boton-secundario boton-chico boton-plana', 'aria-pressed': String(vistaPlana) }, 'Vista plana');
    boton.addEventListener('click', () => {
      vistaPlana = !vistaPlana;
      for (const m of document.querySelectorAll('.maqueta')) m.classList.toggle('plana', vistaPlana);
      for (const b of document.querySelectorAll('.boton-plana')) b.setAttribute('aria-pressed', String(vistaPlana));
    });
    const barra = el('div', { class: 'gemelo-barra' }, opciones.barra || null, boton);
    contenedor.append(el('div', { class: 'gemelo' },
      barra,
      el('div', { class: 'maqueta-marco' }, maqueta),
      el('p', { class: 'rotulos-mapa' },
        el('span', null, 'Forma del Pasillo A-B; no a escala.'),
        el('span', null, opciones.rotulo || 'Posiciones ilustrativas. Ninguna bodega real participa.'))));
    mapa.maqueta = maqueta;
    mapa.barra = barra;
    return mapa;
  }

  function formaDelSitio() {
    const d = raiz.CC_DATOS && raiz.CC_DATOS['pasillo-a-b'];
    return d && Array.isArray(d.bodegas) ? d : null;
  }

  const Gemelo = { geometria, ladoSuperior, camino, dibujar, montar, trazo, sello, papelito, ficha, formaDelSitio, CARA, ELEVA };
  if (typeof module !== 'undefined' && module.exports) module.exports = Gemelo;
  else (raiz.CC = raiz.CC || {}).Gemelo = Gemelo;
})(typeof window !== 'undefined' ? window : globalThis);
