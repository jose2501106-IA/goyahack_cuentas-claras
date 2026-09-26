'use strict';
// Validación de entradas y tablas de texto. Listas cerradas (spec frontend §1.3).

const ALIAS = Object.freeze(['bodega_a', 'bodega_b', 'dona_mary']);
const PLAZOS = Object.freeze([7, 15, 30]);
const MONTO_MIN = 1;
const MONTO_MAX = 10000000;

const RANGOS = Object.freeze([
  // [código, límite superior exclusivo, texto]
  ['B0_1k', 1000, 'Menos de $1,000'],
  ['B1k_5k', 5000, '$1,000–$5,000'],
  ['B5k_20k', 20000, '$5,000–$20,000'],
  ['B20k_50k', 50000, '$20,000–$50,000'],
  ['B50kPlus', Infinity, '$50,000 o más'],
]);

const ETIQUETAS = Object.freeze({
  Created: 'Esperando firma del cliente',
  Accepted: 'Firmada por los dos',
  PaidClaimed: 'El cliente avisó que pagó',
  Paid: 'Cumplida',
  Overdue: 'Vencida',
  Disputed: 'En aclaración',
  Defaulted: 'Incumplida',
  Cancelled: 'Cancelada',
});

function esAlias(a) {
  return typeof a === 'string' && ALIAS.includes(a);
}

function esNoteId(id) {
  return typeof id === 'string' && /^[0-9a-f]{64}$/.test(id);
}

function esMonto(m) {
  return typeof m === 'number' && Number.isInteger(m) && m >= MONTO_MIN && m <= MONTO_MAX;
}

function esPlazo(p) {
  return typeof p === 'number' && PLAZOS.includes(p);
}

function rangoDeMonto(monto) {
  if (!esMonto(monto)) throw new RangeError('monto inválido');
  for (const [codigo, tope] of RANGOS) if (monto < tope) return codigo;
  /* istanbul ignore next */
  return 'B50kPlus';
}

function textoDeRango(codigo) {
  const r = RANGOS.find(([c]) => c === codigo);
  return r ? r[2] : null;
}

function etiquetaDeEstado(estado) {
  return (estado && ETIQUETAS[estado]) || null;
}

module.exports = {
  ALIAS, PLAZOS, MONTO_MIN, MONTO_MAX, RANGOS, ETIQUETAS,
  esAlias, esNoteId, esMonto, esPlazo, rangoDeMonto, textoDeRango, etiquetaDeEstado,
};
