// Bitácora de eventos del pasillo: lo que la API ya confirmó, en orden de llegada.
// Fuente principal: GET /api/transacciones (cada entrada trae tx_hash). Las vistas
// agregan lo que no deja transacción (la consulta sin permiso) y el semáforo de la
// consulta con permiso. Nada entra aquí antes de que la API responda.

import { api } from './app.js';

// Texto de acción del servidor → tipo de evento del mapa (spec gemelo, §3).
const TIPOS = {
  'Bodega A-17 creó una nota': { tipo: 'nota_creada', emisor: 'bodega_a' },
  'Doña Mary firmó la nota': { tipo: 'nota_aceptada', emisor: 'bodega_a' },
  'Bodega A-17 confirmó el pago': { tipo: 'pago_confirmado', emisor: 'bodega_a' },
  'Doña Mary dio permiso a Bodega B-40 por 30 días': { tipo: 'permiso_dado' },
  'Doña Mary retiró el permiso a Bodega B-40': { tipo: 'permiso_quitado' },
  'Bodega B-40 consultó el historial de Doña Mary': { tipo: 'consulta' },
};

const eventos = [];            // en orden cronológico de llegada
const porHash = new Map();
const oyentes = new Set();
let secuencia = 0;
let primeraSincronizacion = null;

function avisar() {
  for (const fn of oyentes) {
    try { fn(); } catch (e) { console.error(e); }
  }
}

function agregar(ev) {
  ev.id = ++secuencia;
  eventos.push(ev);
  if (ev.tx_hash) porHash.set(ev.tx_hash, ev);
}

// Registra un evento confirmado por la API desde una vista.
// { tipo, texto, tx_hash?, url?, ts?, ...extra }
export function registrar(ev) {
  if (ev.tx_hash && porHash.has(ev.tx_hash)) {
    Object.assign(porHash.get(ev.tx_hash), ev);
  } else {
    agregar({ ts: Math.floor(Date.now() / 1000), visto: false, ...ev });
  }
  avisar();
}

// Trae las transacciones del servidor y agrega las nuevas. En la primera
// sincronización de la página, lo anterior se toma como historia (visto).
export async function sincronizar() {
  const r = await api('/api/transacciones');
  const lista = Array.isArray(r.transacciones) ? r.transacciones.slice().reverse() : [];
  const esHistoria = primeraSincronizacion === null;
  let nuevos = 0;
  for (const t of lista) {
    if (!t || typeof t.tx_hash !== 'string' || porHash.has(t.tx_hash)) continue;
    const accion = String(t.accion || '');
    const conocido = TIPOS[accion] || { tipo: 'otra' };
    agregar({
      ...conocido, texto: accion, tx_hash: t.tx_hash, url: t.url,
      ts: Number(t.ts) || null, visto: esHistoria,
    });
    nuevos++;
  }
  if (esHistoria) primeraSincronizacion = Date.now();
  if (nuevos) avisar();
  return nuevos;
}

export function listar() {
  return eventos.slice();
}

export function suscribir(fn) {
  oyentes.add(fn);
  return () => oyentes.delete(fn);
}
