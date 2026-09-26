// Cuentas Claras — shell de la app: utilidades comunes y navegación por hash.
// Sin framework y sin compilación. El DOM se arma con createElement/textContent.

import * as bodegaA from './vistas/bodega-a.js';
import * as cliente from './vistas/cliente.js';
import * as bodegaB from './vistas/bodega-b.js';
import * as jurado from './vistas/jurado.js';
import * as pasillo from './vistas/pasillo.js';
import { sincronizar } from './bitacora.js';

// ---------- Utilidades de DOM ----------

// el('p', {class: 'x'}, 'texto', otroNodo)
export function el(tag, attrs, ...hijos) {
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
}

export function enlaceExterno(texto, url, clase) {
  const a = el('a', { href: url, target: '_blank', rel: 'noopener noreferrer', class: clase || null }, texto);
  return a;
}

// Enlace «Ver comprobante» (solo si hay url http/https).
export function comprobante(url, texto = 'Ver comprobante') {
  if (!urlSegura(url)) return null;
  return enlaceExterno(texto, url, 'comprobante');
}

function urlSegura(url) {
  return typeof url === 'string' && /^https?:\/\//i.test(url);
}

export function rotuloDemo() {
  return el('p', { class: 'rotulo-demo' }, 'Demo · datos ficticios');
}

export function cargando(texto = 'Leyendo lo firmado…') {
  return el('p', { class: 'cargando', role: 'status' }, texto);
}

export function aviso(texto, tipo = 'error') {
  return el('p', { class: `aviso aviso-${tipo}`, role: tipo === 'error' ? 'alert' : 'status' }, texto);
}

// Sello rojo «CUMPLIDA» con fecha. Usar una sola vez por pantalla.
export function sello(ts) {
  return el('div', { class: 'sello', 'aria-label': 'Sello: cumplida' },
    el('span', { class: 'sello-palabra' }, 'CUMPLIDA'),
    ts ? el('span', { class: 'sello-fecha' }, fechaCorta(ts)) : null,
  );
}

// ---------- API ----------

export class ErrorApi extends Error {}

export async function api(ruta, { metodo = 'GET', cuerpo } = {}) {
  const opciones = { method: metodo, headers: { Accept: 'application/json' } };
  if (cuerpo !== undefined) {
    opciones.headers['Content-Type'] = 'application/json';
    opciones.body = JSON.stringify(cuerpo);
  }
  let resp;
  try {
    resp = await fetch(ruta, opciones);
  } catch {
    throw new ErrorApi('No hay conexión con el servidor de la demo.');
  }
  let datos = null;
  try { datos = await resp.json(); } catch { /* sin cuerpo JSON */ }
  if (!resp.ok) {
    const mensaje = datos && typeof datos.mensaje === 'string' && datos.mensaje
      ? datos.mensaje
      : `Algo salió mal (código ${resp.status}). Intenta de nuevo.`;
    throw new ErrorApi(mensaje);
  }
  return datos || {};
}

// Ejecuta una acción con el botón en «Registrando…» y deshabilitado.
export async function conBoton(boton, accion, textoTrabajando = 'Registrando…') {
  const original = boton.textContent;
  boton.disabled = true;
  boton.textContent = textoTrabajando;
  boton.setAttribute('aria-busy', 'true');
  try {
    return await accion();
  } finally {
    boton.disabled = false;
    boton.textContent = original;
    boton.removeAttribute('aria-busy');
  }
}

// ---------- Formatos (español de México) ----------

const fmtMonto = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

export function monto(n) {
  const v = Number(n);
  return Number.isFinite(v) ? fmtMonto.format(v) : '—';
}

export function fecha(ts) {
  const v = Number(ts);
  if (!Number.isFinite(v) || v <= 0) return '—';
  return new Date(v * 1000).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function fechaCorta(ts) {
  const v = Number(ts);
  if (!Number.isFinite(v) || v <= 0) return '';
  return new Date(v * 1000).toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function fechaHora(ts) {
  const v = Number(ts);
  if (!Number.isFinite(v) || v <= 0) return '—';
  return new Date(v * 1000).toLocaleString('es-MX', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

export function hashCorto(h) {
  const s = String(h || '');
  return s.length > 16 ? `${s.slice(0, 8)}…${s.slice(-6)}` : s;
}

const ETIQUETAS = {
  Created: 'Esperando firma del cliente',
  Accepted: 'Firmada por los dos',
  PaidClaimed: 'El cliente avisó que pagó',
  Paid: 'Cumplida',
  Overdue: 'Vencida',
  Disputed: 'En aclaración',
  Defaulted: 'Incumplida',
  Cancelled: 'Cancelada',
};

export function etiquetaEstado(nota) {
  if (nota && ETIQUETAS[nota.estado]) return ETIQUETAS[nota.estado];
  if (nota && typeof nota.etiqueta === 'string' && nota.etiqueta) return nota.etiqueta;
  return 'Sin estado';
}

const RANGOS = {
  B0_1k: 'Menos de $1,000',
  B1k_5k: '$1,000–$5,000',
  B5k_20k: '$5,000–$20,000',
  B20k_50k: '$20,000–$50,000',
  B50kPlus: '$50,000 o más',
};

// max_bucket puede llegar como "B5k_20k", ["B5k_20k"] o {B5k_20k: ...}.
export function textoRango(bucket) {
  let clave = bucket;
  if (Array.isArray(clave)) clave = clave[0];
  else if (clave && typeof clave === 'object') clave = Object.keys(clave)[0];
  return RANGOS[clave] || '—';
}

// ---------- Navegación ----------

const VISTAS = {
  pasillo,
  'bodega-a': bodegaA,
  cliente,
  'bodega-b': bodegaB,
  jurado,
};

function rutaActual() {
  const h = location.hash.replace(/^#/, '');
  return Object.hasOwn(VISTAS, h) ? h : 'pasillo';
}

function navegar() {
  const ruta = rutaActual();
  for (const a of document.querySelectorAll('.pestanas a')) {
    if (a.dataset.vista === ruta) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  }
  const cont = document.getElementById('vista');
  cont.replaceChildren();
  // Contenedor nuevo en cada visita: si el usuario cambia de pestaña a medio
  // cargar, lo que llegue tarde se pinta en un nodo que ya no está en pantalla.
  const seccion = el('section', { class: `pantalla pantalla-${ruta}` });
  cont.append(seccion);
  try {
    VISTAS[ruta].render(seccion);
  } catch (e) {
    seccion.append(aviso('No se pudo mostrar esta vista.'));
    console.error(e);
  }
}

window.addEventListener('hashchange', navegar);
// Lo que ya estaba registrado al abrir la app es historia: el mapa no lo anima.
sincronizar().catch(() => {}).finally(navegar);
