'use strict';
// Semáforo de cumplimiento (spec frontend §4, decisión #44; fórmula de la spec v2 §8).
// Función pura: sin E/S. El número p NUNCA sale de esta función (ni en la API ni en la interfaz).

// --- Constantes: PROPUESTA, no calibradas con datos reales. Cambiar solo aquí. ---
const UMBRAL_VERDE = 0.80;     // p ≥ 0.80 → Verde
const UMBRAL_AMARILLO = 0.50;  // 0.50 ≤ p < 0.80 → Amarillo; p < 0.50 → Rojo
const MIN_CERRADAS = 3;        // notas cerradas mínimas (a tiempo + tarde + incumplidas)
const MIN_BODEGAS = 2;         // emisores distintos mínimos
const MIN_DIAS = 60;           // días de historial mínimos
const BODEGAS_PLENAS = 3;      // factor min(1, n/3)

// Nota de diseño: por el factor min(1, issuers_count/3), con 2 bodegas p ≤ 2/3 < 0.80,
// así que con 2 bodegas NUNCA sale Verde. Es intencional: un historial de pocas
// bodegas no debe verse tan sólido como uno respaldado por varias.
//
// Hoja de ruta: la spec v2 prevé un olvido 2^(−días/180) por nota. No se aplica en
// el MVP porque el agregado SubjectStats no trae fechas por nota.

const COLORES = Object.freeze({
  verde: { palabra: 'Verde', forma: '●' },
  amarillo: { palabra: 'Amarillo', forma: '▲' },
  rojo: { palabra: 'Rojo', forma: '■' },
  insuficiente: { palabra: 'Historial insuficiente', forma: '○' },
});

function num(v) {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

function semaforo(stats, ahoraSeg) {
  const s = stats || {};
  const paidOnTime = num(s.paid_on_time);
  const paidLate = num(s.paid_late);
  const defaulted = num(s.defaulted);
  const overdueOpen = num(s.overdue_open);
  const issuers = num(s.issuers_count);
  const firstTs = num(s.first_ts);

  const cerradas = paidOnTime + paidLate + defaulted;
  const dias = firstTs === 0 ? 0 : Math.max(0, Math.floor((ahoraSeg - firstTs) / 86400));

  const condiciones = [
    { clave: 'cerradas', texto: `${MIN_CERRADAS} notas cerradas (tiene ${cerradas})`, cumple: cerradas >= MIN_CERRADAS, tiene: cerradas, requerido: MIN_CERRADAS },
    { clave: 'bodegas', texto: `${MIN_BODEGAS} bodegas distintas (tiene ${issuers})`, cumple: issuers >= MIN_BODEGAS, tiene: issuers, requerido: MIN_BODEGAS },
    { clave: 'dias', texto: `${MIN_DIAS} días de historial (tiene ${dias})`, cumple: dias >= MIN_DIAS, tiene: dias, requerido: MIN_DIAS },
  ];

  let color;
  if (!condiciones.every((c) => c.cumple)) {
    color = 'insuficiente';
  } else {
    const r = paidOnTime + 0.5 * paidLate;
    const sMal = defaulted + 0.5 * overdueOpen; // las disputas abiertas NO suman
    const p = ((r + 1) / (r + sMal + 2)) * Math.min(1, issuers / BODEGAS_PLENAS);
    color = p >= UMBRAL_VERDE ? 'verde' : p >= UMBRAL_AMARILLO ? 'amarillo' : 'rojo';
  }

  return {
    color,
    palabra: COLORES[color].palabra,
    forma: COLORES[color].forma,
    condiciones,
    aclaraciones_abiertas: num(s.disputes_open),
  };
}

// Datos ficticios del ejemplo (spec frontend §4.8). Debe dar Verde.
function statsEjemplo(ahoraSeg) {
  return {
    accepted: 6, paid_on_time: 5, paid_late: 1, overdue_open: 0, defaulted: 0,
    disputes_open: 0, disputes_resolved: 0, issuers_count: 3,
    first_ts: ahoraSeg - 120 * 86400, last_ts: ahoraSeg - 5 * 86400, max_bucket: 'B5k_20k',
  };
}

module.exports = {
  semaforo, statsEjemplo,
  UMBRAL_VERDE, UMBRAL_AMARILLO, MIN_CERRADAS, MIN_BODEGAS, MIN_DIAS,
};
