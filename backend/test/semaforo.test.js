'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { semaforo, statsEjemplo } = require('../semaforo');

const AHORA = 1790500000;
const DIA = 86400;
const base = (o) => ({ accepted: 0, paid_on_time: 0, paid_late: 0, overdue_open: 0, defaulted: 0, disputes_open: 0, disputes_resolved: 0, issuers_count: 3, first_ts: AHORA - 120 * DIA, last_ts: AHORA, max_bucket: 'B5k_20k', ...o });

function sinNumeroP(r) {
  // Ningún número fraccionario en el resultado (p nunca se expone).
  const walk = (v) => {
    if (typeof v === 'number') assert.ok(Number.isInteger(v), `número no entero en resultado: ${v}`);
    else if (v && typeof v === 'object') Object.values(v).forEach(walk);
  };
  walk(r);
  assert.ok(!('p' in r));
  assert.deepEqual(Object.keys(r).sort(), ['aclaraciones_abiertas', 'color', 'condiciones', 'forma', 'palabra']);
}

test('el ejemplo ficticio da Verde', () => {
  const r = semaforo(statsEjemplo(AHORA), AHORA);
  assert.equal(r.color, 'verde');
  assert.equal(r.palabra, 'Verde');
  assert.equal(r.forma, '●');
  assert.ok(r.condiciones.every((c) => c.cumple));
  sinNumeroP(r);
});

test('datos reales de hoy dan Historial insuficiente con las tres condiciones marcadas', () => {
  const stats = { accepted: 2, defaulted: 0, disputes_open: 0, disputes_resolved: 0, first_ts: AHORA, issuers_count: 1, last_ts: AHORA, max_bucket: 'B5k_20k', overdue_open: 0, paid_late: 0, paid_on_time: 2 };
  const r = semaforo(stats, AHORA);
  assert.equal(r.color, 'insuficiente');
  assert.equal(r.palabra, 'Historial insuficiente');
  assert.equal(r.forma, '○');
  assert.deepEqual(r.condiciones.map((c) => c.cumple), [false, false, false]);
  assert.deepEqual(r.condiciones.map((c) => c.texto), [
    '3 notas cerradas (tiene 2)', '2 bodegas distintas (tiene 1)', '60 días de historial (tiene 0)',
  ]);
  sinNumeroP(r);
});

test('first_ts 0 cuenta como 0 días', () => {
  const r = semaforo(base({ first_ts: 0, paid_on_time: 5 }), AHORA);
  assert.equal(r.condiciones[2].tiene, 0);
  assert.equal(r.color, 'insuficiente');
});

test('caso Amarillo', () => {
  // r=4, s=1 → 5/7 ≈ 0.714
  const r = semaforo(base({ paid_on_time: 4, defaulted: 1 }), AHORA);
  assert.equal(r.color, 'amarillo');
  assert.equal(r.forma, '▲');
  sinNumeroP(r);
});

test('caso Rojo', () => {
  // r=1, s=3 → 2/6 ≈ 0.33
  const r = semaforo(base({ paid_on_time: 1, defaulted: 3 }), AHORA);
  assert.equal(r.color, 'rojo');
  assert.equal(r.palabra, 'Rojo');
  assert.equal(r.forma, '■');
  sinNumeroP(r);
});

test('una disputa abierta no cambia el color y se reporta aparte', () => {
  const sin = semaforo(statsEjemplo(AHORA), AHORA);
  const con = semaforo({ ...statsEjemplo(AHORA), disputes_open: 1 }, AHORA);
  assert.equal(con.color, sin.color);
  assert.equal(con.aclaraciones_abiertas, 1);
  const am = semaforo(base({ paid_on_time: 4, defaulted: 1, disputes_open: 3 }), AHORA);
  assert.equal(am.color, 'amarillo');
});

test('con 2 bodegas nunca sale Verde (factor min(1, n/3), intencional)', () => {
  for (const n of [3, 10, 100, 10000]) {
    const r = semaforo(base({ issuers_count: 2, paid_on_time: n }), AHORA);
    assert.notEqual(r.color, 'verde');
    assert.equal(r.color, 'amarillo');
  }
});

test('umbral exacto: 60 días cumple, 59 no', () => {
  assert.equal(semaforo(base({ paid_on_time: 10, first_ts: AHORA - 60 * DIA }), AHORA).condiciones[2].cumple, true);
  assert.equal(semaforo(base({ paid_on_time: 10, first_ts: AHORA - 60 * DIA + 1 }), AHORA).condiciones[2].cumple, false);
});
