// Vista: Pasillo A-B — gemelo digital del pasillo (spec 2026-09-26_especificacion-gemelo-digital).
// Maqueta de papel y tinta en SVG + CSS. Cada trazo aparece solo después de que la API
// confirmó la transacción (tx_hash); el mapa no promete nada que la cadena no registró.
// La lista de eventos repite en texto todo lo que pasa en el mapa.

import {
  el, api, comprobante, rotuloDemo, aviso, fechaCorta, fechaHora, hashCorto,
} from '../app.js';
import * as bitacora from '../bitacora.js';
import {
  generarPasillo, POSICIONES_DEMO, NOMBRES_DEMO, PASILLOS, PASILLOS_ACTIVOS,
} from '../datos/pasillo.js';

const SVG = 'http://www.w3.org/2000/svg';

// Medidas del esquema (unidades del viewBox; no son medidas del plano).
const CELDA = 24;
const ANCHO = 22;
const ALTO = 30;
const CARA = 5;
const MARGEN = 20;
const Y_SUP = 44;
const Y_CORR = 92;
const ALTO_CORR = 60;
const Y_INF = Y_CORR + ALTO_CORR + 12;
const ELEVA = 6;
const ALTO_TOTAL = Y_INF + ALTO + CARA + 34;
const INDICE_FICHA = 26;          // dónde se para la ficha de Doña Mary en el corredor

const TRAZO_MS = 900;
const PAUSA_MS = 450;

const TEXTOS = {
  nota_creada: 'Bodega A registró una nota para Doña Mary. Esperando firma.',
  nota_aceptada: 'Doña Mary firmó la nota: firmada por los dos.',
  pago_confirmado: 'Bodega A confirmó el pago: nota cumplida.',
  permiso_dado: 'Doña Mary dio permiso a Bodega B por 30 días.',
  permiso_quitado: 'Doña Mary quitó el permiso a Bodega B.',
  consulta_sin_permiso: 'Bodega B pidió el resumen sin permiso: no se entregó. No hubo transacción.',
  consulta: 'Bodega B consultó el historial de Doña Mary con permiso. La consulta quedó registrada.',
};

let vistaPlana = false;

function s(tag, attrs, ...hijos) {
  const n = document.createElementNS(SVG, tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v !== null && v !== undefined) n.setAttribute(k, String(v));
  }
  for (const h of hijos.flat()) {
    if (h === null || h === undefined) continue;
    n.append(h instanceof Node ? h : document.createTextNode(String(h)));
  }
  return n;
}

const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

function movimientoReducido() {
  return typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ---------- Portada ----------

export function render(raiz) {
  raiz.append(
    rotuloDemo(),
    el('h1', null, 'Pasillo A-B'),
    el('p', { class: 'apoyo' },
      'Gemelo digital del pasillo: cada nota firmada, cada permiso y cada consulta se ven moverse entre bodegas en cuanto quedan registrados.'),
    pestanasPasillos(),
  );
  montarMapa(raiz);
}

function pestanasPasillos() {
  const lista = el('ul', { class: 'pasillos' });
  for (const nombre of PASILLOS) {
    const activo = PASILLOS_ACTIVOS.has(nombre);
    lista.append(el('li', null, activo
      ? el('span', { class: 'pasillo-tab pasillo-activo', 'aria-current': 'true' }, `Pasillo ${nombre}`)
      : el('span', { class: 'pasillo-tab pasillo-pronto', 'aria-disabled': 'true' },
        `Pasillo ${nombre}`, el('small', null, 'próximamente'))));
  }
  return el('nav', { class: 'pasillos-nav', 'aria-label': 'Pasillos' }, lista);
}

// ---------- Mapa (también lo usa la vista del jurado) ----------

export function montarMapa(raiz, { compacto = false } = {}) {
  const pasillo = generarPasillo({ nombre: 'A-B', porFila: 48 });
  const mapa = dibujarPasillo(pasillo);

  const botonPlana = el('button', { type: 'button', class: 'boton boton-secundario boton-plana', 'aria-pressed': String(vistaPlana) },
    'Vista plana');
  const maqueta = el('div', { class: `maqueta${vistaPlana ? ' plana' : ''}` }, mapa.svg);
  botonPlana.addEventListener('click', () => {
    vistaPlana = !vistaPlana;
    maqueta.classList.toggle('plana', vistaPlana);
    botonPlana.setAttribute('aria-pressed', String(vistaPlana));
  });

  const contador = el('p', { class: 'contador-notas' }, 'Notas firmadas en este pasillo: …');
  const anuncio = el('p', { class: 'lector', role: 'status', 'aria-live': 'polite' });
  const panel = el('div', { class: 'panel-consulta' });
  const listaEventos = el('ol', { class: 'eventos-pasillo', reversed: true });
  const zonaError = el('div');

  raiz.append(el('div', { class: `gemelo${compacto ? ' gemelo-compacto' : ''}` },
    el('div', { class: 'gemelo-barra' }, contador, botonPlana),
    el('div', { class: 'maqueta-marco' }, maqueta),
    el('p', { class: 'rotulos-mapa' },
      el('span', null, 'Esquema ilustrativo, no a escala.'),
      el('span', null, 'Posiciones ilustrativas. Ninguna bodega real participa en esta demo.')),
    anuncio,
    zonaError,
    panel,
    el('h2', { class: compacto ? 'h-compacto' : null }, 'Lo que pasó en el pasillo'),
    listaEventos,
  ));

  const estado = { mapa, contador, anuncio, panel, listaEventos, trabajando: false, vivo: true };

  function pintarLista() {
    const vistos = bitacora.listar().filter((e) => e.visto).reverse();
    if (vistos.length === 0) {
      listaEventos.replaceChildren(el('li', { class: 'vacio' }, 'Todavía no hay movimientos en esta sesión.'));
      return;
    }
    listaEventos.replaceChildren(...vistos.map((e) => el('li', { class: 'evento-pasillo' },
      el('span', { class: 'mono tx-fecha' }, fechaHora(e.ts)),
      el('span', null, TEXTOS[e.tipo] || e.texto || 'Movimiento registrado'),
      e.tx_hash
        ? comprobante(e.url, hashCorto(e.tx_hash)) || el('span', { class: 'mono' }, hashCorto(e.tx_hash))
        : el('span', { class: 'apoyo' }, 'sin transacción'),
    )));
  }
  estado.pintarLista = pintarLista;

  // Procesa, uno por uno y en orden, los eventos que este navegador no ha visto.
  async function procesar() {
    if (estado.trabajando || !estado.vivo) return;
    estado.trabajando = true;
    try {
      let pendiente;
      while (estado.vivo && (pendiente = bitacora.listar().find((e) => !e.visto))) {
        pendiente.visto = true;
        pintarLista();
        anuncio.textContent = TEXTOS[pendiente.tipo] || pendiente.texto || '';
        await aplicar(estado, pendiente, true);
      }
      pintarPanel(estado);
    } finally {
      estado.trabajando = false;
    }
  }

  const quitar = bitacora.suscribir(() => {
    if (!raiz.isConnected) { detener(); return; }
    pintarPanel(estado);
    procesar();
  });
  const reloj = setInterval(() => {
    if (!raiz.isConnected) { detener(); return; }
    bitacora.sincronizar().catch(() => {});
  }, 4000);
  function detener() {
    estado.vivo = false;
    clearInterval(reloj);
    quitar();
  }

  // Estado inicial desde la API; luego se animan los eventos pendientes.
  (async () => {
    try {
      await bitacora.sincronizar();
    } catch (e) {
      zonaError.replaceChildren(aviso(e.message));
    }
    await estadoInicial(estado);
    pintarLista();
    pintarPanel(estado);
    procesar();
  })();
}

async function estadoInicial(estado) {
  const [permisos, notas] = await Promise.all([
    api('/api/permisos').catch(() => null),
    api('/api/notas').catch(() => null),
  ]);
  if (permisos && permisos.vigente) ponerPuente(estado.mapa, permisos.exp_ts, false);
  if (notas && Array.isArray(notas.notas)) {
    contar(estado, notas.notas);
    const ultima = notas.notas[0];
    if (ultima) {
      if (ultima.estado === 'Created') {
        trazo(estado.mapa, 'bodega_a', 'ida', false);
        ponerPapelito(estado.mapa, 'Esperando firma', false);
      } else if (ultima.estado) {
        trazo(estado.mapa, 'bodega_a', 'ida', false);
        trazo(estado.mapa, 'bodega_a', 'vuelta', false);
        ponerPapelito(estado.mapa, 'Firmada por los dos', false);
      }
      if (ultima.estado === 'Paid') ponerSello(estado.mapa, 'bodega_a', ultima.paid_ts, false);
    }
  } else {
    estado.contador.textContent = 'Notas firmadas en este pasillo: —';
  }
}

const FIRMADAS = new Set(['Accepted', 'PaidClaimed', 'Paid', 'Overdue', 'Disputed', 'Defaulted']);

function contar(estado, notas) {
  const n = notas.filter((x) => FIRMADAS.has(x.estado)).length;
  estado.contador.textContent = `Notas firmadas en este pasillo: ${n}`;
}

async function recontar(estado) {
  try {
    const r = await api('/api/notas');
    if (Array.isArray(r.notas)) contar(estado, r.notas);
  } catch { /* el contador se queda como estaba */ }
}

// ---------- Eventos → mapa (spec gemelo, §3) ----------

async function aplicar(estado, ev, animar) {
  const m = estado.mapa;
  const anim = animar && !movimientoReducido();
  const dur = anim ? TRAZO_MS : 0;
  const emisor = ev.emisor || 'bodega_a';

  quitarSinPermiso(m);
  switch (ev.tipo) {
    case 'nota_creada':
      quitarSello(m);
      m.capaTrazos.replaceChildren();
      trazo(m, emisor, 'ida', anim);
      await esperar(dur);
      ponerPapelito(m, 'Esperando firma', anim);
      break;
    case 'nota_aceptada':
      if (!m.capaTrazos.querySelector('.trazo-ida')) trazo(m, emisor, 'ida', false);
      trazo(m, emisor, 'vuelta', anim);
      await esperar(dur);
      ponerPapelito(m, 'Firmada por los dos', anim);
      recontar(estado);
      break;
    case 'pago_confirmado':
      ponerSello(m, emisor, ev.ts, anim);
      await esperar(dur);
      break;
    case 'permiso_dado': {
      let exp = ev.exp_ts;
      if (!exp) {
        try { exp = (await api('/api/permisos')).exp_ts; } catch { exp = null; }
      }
      ponerPuente(m, exp, anim);
      await esperar(dur);
      break;
    }
    case 'permiso_quitado':
      quitarPuente(m);
      break;
    case 'consulta_sin_permiso':
      // El contrato acaba de decir que no hay permiso vigente: si había puente, se borra.
      quitarPuente(m);
      ponerSinPermiso(m, anim);
      await esperar(anim ? 1200 : 0);
      break;
    case 'consulta':
      pulso(m, anim);
      await esperar(anim ? 2 * TRAZO_MS : 0);
      break;
    default:
      break;
  }
  if (anim) await esperar(PAUSA_MS);
}

// Semáforo real de la última consulta con permiso, con su hash.
function pintarPanel(estado) {
  const ultima = bitacora.listar().filter((e) => e.visto && (e.tipo === 'consulta' || e.tipo === 'consulta_sin_permiso')).pop();
  if (!ultima) { estado.panel.replaceChildren(); return; }
  if (ultima.tipo === 'consulta_sin_permiso') {
    estado.panel.replaceChildren(el('div', { class: 'tarjeta sin-permiso' },
      el('p', { class: 'sin-permiso-texto' }, 'Sin permiso: no se entrega el resumen.'),
      el('p', { class: 'apoyo' }, 'No se envió ninguna consulta.')));
    return;
  }
  const sem = ultima.semaforo || null;
  const hijos = [el('p', { class: 'panel-titulo' }, 'Consulta de Bodega B, con permiso de Doña Mary')];
  if (sem) {
    const color = ['verde', 'amarillo', 'rojo', 'insuficiente'].includes(sem.color) ? sem.color : 'insuficiente';
    hijos.push(el('p', { class: `semaforo-senal semaforo-${color}` },
      el('span', { class: 'semaforo-forma', 'aria-hidden': 'true' }, sem.forma || '○'),
      el('span', { class: 'semaforo-palabra' }, sem.palabra || 'Historial insuficiente')));
    const conds = Array.isArray(sem.condiciones) ? sem.condiciones : [];
    if (conds.length) {
      hijos.push(el('ul', { class: 'condiciones' }, conds.map((c) => el('li', { class: c.cumple ? 'cumple' : 'falta' },
        el('span', { class: 'marca-condicion', 'aria-hidden': 'true' }, c.cumple ? '✓' : '✗'),
        el('span', { class: 'lector' }, c.cumple ? 'Se cumple: ' : 'No se cumple: '),
        String(c.texto || '')))));
    }
  } else {
    hijos.push(el('p', { class: 'apoyo' }, 'El semáforo se ve en la vista de Bodega B.'));
  }
  hijos.push(el('p', { class: 'registrada' }, 'Esta consulta quedó registrada · ',
    comprobante(ultima.url, hashCorto(ultima.tx_hash)) || hashCorto(ultima.tx_hash)));
  estado.panel.replaceChildren(el('div', { class: 'tarjeta consulta' }, ...hijos));
}

// ---------- Dibujo ----------

function xDe(indice) { return MARGEN + indice * CELDA; }

function dibujarPasillo(pasillo) {
  const anchoTotal = MARGEN * 2 + pasillo.porFila * CELDA;
  const svg = s('svg', {
    viewBox: `0 0 ${anchoTotal} ${ALTO_TOTAL}`, class: 'pasillo-svg', role: 'img',
    'aria-label': `Esquema del Pasillo ${pasillo.nombre}: ${pasillo.porFila * 2} bodegas numeradas a los dos lados del corredor. Bodega A, Bodega B y Bodega C marcadas; Doña Mary en el corredor.`,
  });

  const demoPorId = {};
  for (const [cuenta, id] of Object.entries(POSICIONES_DEMO)) demoPorId[id] = cuenta;

  // Corredor.
  svg.append(
    s('rect', { x: MARGEN - 8, y: Y_CORR, width: anchoTotal - 2 * MARGEN + 16, height: ALTO_CORR, class: 'corredor' }),
    s('text', { x: anchoTotal - MARGEN, y: Y_CORR + ALTO_CORR - 8, class: 'corredor-rotulo', 'text-anchor': 'end' }, `Pasillo ${pasillo.nombre}`),
  );

  const bodegas = {};
  const capaBodegas = s('g', { class: 'capa-bodegas' });
  const capaDemo = s('g', { class: 'capa-demo' });
  for (const b of [...pasillo.superior, ...pasillo.inferior]) {
    const cuenta = demoPorId[b.id];
    const x = xDe(b.indice);
    const y = b.fila === 'superior' ? Y_SUP : Y_INF;
    const g = bodega(b, x, y, cuenta);
    (cuenta ? capaDemo : capaBodegas).append(g);
    if (cuenta) bodegas[cuenta] = { x, y: y - ELEVA, fila: b.fila, g };
  }
  svg.append(capaBodegas);

  // Doña Mary: ficha redonda con iniciales, en el corredor.
  const fx = xDe(INDICE_FICHA) + ANCHO / 2;
  const fy = Y_CORR + ALTO_CORR / 2 - 4;
  const ficha = s('g', { class: 'ficha-mary' },
    s('circle', { cx: fx, cy: fy, r: 13 }),
    s('text', { x: fx, y: fy + 4, 'text-anchor': 'middle' }, 'DM'),
    s('text', { x: fx - 19, y: fy + 4, 'text-anchor': 'end', class: 'ficha-nombre' }, 'Doña Mary'));

  const capaPuente = s('g', { class: 'capa-puente' });
  const capaTrazos = s('g', { class: 'capa-trazos' });
  const capaPulso = s('g', { class: 'capa-pulso' });
  const capaNotas = s('g', { class: 'capa-notas' });
  const capaSello = s('g', { class: 'capa-sello' });
  svg.append(capaPuente, capaTrazos, capaPulso, capaDemo, ficha, capaNotas, capaSello);

  return { svg, bodegas, ficha: { x: fx, y: fy, r: 13 }, capaPuente, capaTrazos, capaPulso, capaNotas, capaSello };
}

function bodega(b, x, y, cuenta) {
  const yy = cuenta ? y - ELEVA : y;
  const g = s('g', { class: `bodega${cuenta ? ' bodega-demo' : ''}`, 'data-id': b.id });
  // Cara lateral (un tono más oscuro) para dar volumen, luego la tapa.
  g.append(
    s('rect', { x: x + 2, y: yy + ALTO, width: ANCHO, height: CARA + (cuenta ? ELEVA : 0), class: 'bodega-cara' }),
    s('rect', { x: x + ANCHO, y: yy + 2, width: 2, height: ALTO + CARA - 2 + (cuenta ? ELEVA : 0), class: 'bodega-cara' }),
    s('rect', { x, y: yy, width: ANCHO, height: ALTO, class: 'bodega-tapa' }),
    s('text', { x: x + ANCHO / 2, y: yy + ALTO / 2 + 3, 'text-anchor': 'middle', class: 'bodega-num' }, String(b.numero)),
  );
  if (cuenta) {
    const ly = b.fila === 'superior' ? yy - 8 : yy + ALTO + CARA + ELEVA + 16;
    g.append(s('text', { x: x + ANCHO / 2, y: ly, 'text-anchor': 'middle', class: 'bodega-etiqueta' }, NOMBRES_DEMO[cuenta] || cuenta));
  }
  return g;
}

// Puntos de anclaje: borde de la bodega que mira al corredor y borde de la ficha.
function anclas(m, cuenta) {
  const b = m.bodegas[cuenta];
  const bx = b.x + ANCHO / 2;
  const by = b.fila === 'superior' ? b.y + ALTO + CARA + ELEVA : b.y;
  const f = m.ficha;
  const fy = b.fila === 'superior' ? f.y - f.r : f.y + f.r;
  return { bx, by, fx: f.x, fy };
}

function camino(x1, y1, x2, y2, curva) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 + curva;
  return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
}

function trazo(m, cuenta, sentido, animar) {
  const a = anclas(m, cuenta);
  const d = sentido === 'ida'
    ? camino(a.bx, a.by, a.fx, a.fy, 14)
    : camino(a.fx, a.fy, a.bx, a.by, 14);
  m.capaTrazos.append(s('path', { d, pathLength: 1, class: `trazo trazo-${sentido}${animar ? ' dibujar' : ''}` }));
}

function ponerPapelito(m, texto, animar) {
  const f = m.ficha;
  const x = f.x + 20;
  const y = f.y - 12;
  m.capaNotas.replaceChildren(s('g', { class: `papelito${animar ? ' aparecer' : ''}` },
    s('rect', { x, y, width: 132, height: 22 }),
    s('text', { x: x + 8, y: y + 15 }, texto)));
}

function ponerSello(m, cuenta, ts, animar) {
  const b = m.bodegas[cuenta];
  const cx = b.x + ANCHO / 2;
  const cy = b.y + ALTO / 2;
  // Una sola vez por pantalla: el sello nuevo reemplaza al anterior.
  m.capaSello.replaceChildren(s('g', { transform: `translate(${cx} ${cy})` },
    s('g', { class: `sello-mapa${animar ? ' caer' : ''}` },
      s('rect', { x: -44, y: -14, width: 88, height: ts ? 30 : 22, rx: 3 }),
      s('text', { x: 0, y: 3, 'text-anchor': 'middle', class: 'sello-mapa-palabra' }, 'CUMPLIDA'),
      ts ? s('text', { x: 0, y: 13, 'text-anchor': 'middle', class: 'sello-mapa-fecha' }, fechaCorta(ts)) : null)));
}

function quitarSello(m) { m.capaSello.replaceChildren(); }

function ponerPuente(m, exp, animar) {
  const a = anclas(m, 'bodega_b');
  const d = camino(a.fx, a.fy, a.bx, a.by, -10);
  const mx = (a.fx + a.bx) / 2;
  const my = (a.fy + a.by) / 2;
  m.capaPuente.replaceChildren(s('g', { class: `puente${animar ? ' aparecer' : ''}` },
    s('path', { d, class: 'puente-linea' }),
    s('text', { x: mx - 20, y: my + 14, class: 'puente-texto' }, exp ? `Permiso hasta ${fechaCorta(exp)}` : 'Permiso vigente')));
}

function quitarPuente(m) { m.capaPuente.replaceChildren(); }

function ponerSinPermiso(m, animar) {
  const b = m.bodegas.bodega_b;
  b.g.classList.remove('parpadeo');
  // Reinicia la animación si se repite.
  void b.g.getBBox();
  b.g.classList.add('sin-permiso');
  if (animar) b.g.classList.add('parpadeo');
  m.capaNotas.append(s('text', {
    x: b.x + ANCHO / 2, y: b.y - 8, 'text-anchor': 'middle', class: 'texto-sin-permiso',
  }, 'Sin permiso: no se entrega el resumen'));
}

function quitarSinPermiso(m) {
  const b = m.bodegas.bodega_b;
  b.g.classList.remove('sin-permiso', 'parpadeo');
  for (const t of m.capaNotas.querySelectorAll('.texto-sin-permiso')) t.remove();
}

function pulso(m, animar) {
  const a = anclas(m, 'bodega_b');
  m.capaPulso.replaceChildren(
    s('path', { d: camino(a.bx, a.by, a.fx, a.fy, 10), pathLength: 1, class: `pulso${animar ? ' dibujar' : ''}` }),
    s('path', { d: camino(a.fx, a.fy, a.bx, a.by, 10), pathLength: 1, class: `pulso pulso-vuelta${animar ? ' dibujar dibujar-despues' : ''}` }),
  );
  if (animar) setTimeout(() => m.capaPulso.replaceChildren(), 2 * TRAZO_MS + 1500);
}
