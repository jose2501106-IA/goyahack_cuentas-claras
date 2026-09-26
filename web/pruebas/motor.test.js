// Reglas del motor del Pasillo vivo (spec web §3 y §5.2) y equivalencia del semáforo
// con backend/semaforo.js.
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const M = require('../simulacion/motor.js');
const backend = require('../../backend/semaforo.js');

function mundoCon(dia = 0) {
  const m = M.crearMundo();
  m.dia = dia;
  return m;
}
const falla = (fn, codigo) => assert.throws(fn, (e) => e instanceof M.ErrorMotor && e.codigo === codigo);

test('dos firmas: la nota no cuenta hasta que el cliente la acepta', () => {
  const m = mundoCon();
  const n = M.crearNota(m, { bodega: 'b1', cliente: 'c1', monto: 8500, plazo: 15 });
  assert.equal(n.rango, 'B5k_20k');
  assert.equal(M.resumen(m, 'c1').accepted, 0);
  falla(() => M.aceptarNota(m, n.id, 'b1'), 'NoEsParte');   // la bodega no firma por el cliente
  falla(() => M.aceptarNota(m, n.id, 'c2'), 'NoEsParte');   // ni otro cliente
  M.aceptarNota(m, n.id, 'c1');
  assert.equal(M.resumen(m, 'c1').accepted, 1);
  assert.equal(M.resumen(m, 'c1').issuers_count, 1);
  falla(() => M.aceptarNota(m, n.id, 'c1'), 'TransicionInvalida');
});

test('sin aceptar en 72 horas la nota se cancela', () => {
  const m = mundoCon();
  const n = M.crearNota(m, { bodega: 'b1', cliente: 'c1', monto: 2000, plazo: 7 });
  for (let i = 0; i < 3; i++) M.avanzarDia(m);
  assert.equal(n.estado, 'creada'); // día 3: todavía a tiempo
  M.avanzarDia(m);
  assert.equal(n.estado, 'cancelada');
  falla(() => M.aceptarNota(m, n.id, 'c1'), 'TransicionInvalida');
  const n2 = M.crearNota(m, { bodega: 'b1', cliente: 'c1', monto: 2000, plazo: 7 });
  m.dia += 4; // sin pasar por avanzarDia
  falla(() => M.aceptarNota(m, n2.id, 'c1'), 'VentanaCerrada');
});

test('plazos válidos: 7, 15 o 30 días', () => {
  const m = mundoCon();
  falla(() => M.crearNota(m, { bodega: 'b1', cliente: 'c1', monto: 1000, plazo: 10 }), 'PlazoInvalido');
});

test('pago a tiempo o tarde; solo lo confirma la bodega que fió', () => {
  const m = mundoCon();
  const a = M.crearNota(m, { bodega: 'b1', cliente: 'c1', monto: 3000, plazo: 7 });
  const b = M.crearNota(m, { bodega: 'b1', cliente: 'c1', monto: 3000, plazo: 7 });
  M.aceptarNota(m, a.id, 'c1');
  M.aceptarNota(m, b.id, 'c1');
  m.dia = 7;
  falla(() => M.confirmarPago(m, a.id, 'b2'), 'NoEsParte');
  falla(() => M.confirmarPago(m, a.id, 'c1'), 'NoEsParte');
  M.confirmarPago(m, a.id, 'b1');
  assert.equal(a.estado, 'pagada_a_tiempo');
  m.dia = 9;
  assert.equal(M.estadoVisible(m, b), 'vencida');
  assert.equal(M.resumen(m, 'c1').overdue_open, 1);
  M.confirmarPago(m, b.id, 'b1');
  assert.equal(b.estado, 'pagada_tarde');
  const r = M.resumen(m, 'c1');
  assert.deepEqual([r.paid_on_time, r.paid_late, r.overdue_open], [1, 1, 0]);
});

test('gracia de 30 días: incumplida solo después de vencer + 30, y solo por la emisora', () => {
  const m = mundoCon();
  const n = M.crearNota(m, { bodega: 'b1', cliente: 'c1', monto: 12000, plazo: 15 });
  M.aceptarNota(m, n.id, 'c1');
  m.dia = 15;
  falla(() => M.marcarIncumplida(m, n.id, 'b1'), 'TransicionInvalida'); // aún no vence
  m.dia = 16;
  falla(() => M.marcarIncumplida(m, n.id, 'b1'), 'DemasiadoPronto');
  m.dia = 45; // = vence + 30: todavía en gracia (el contrato exige estrictamente más)
  falla(() => M.marcarIncumplida(m, n.id, 'b1'), 'DemasiadoPronto');
  m.dia = 46;
  falla(() => M.marcarIncumplida(m, n.id, 'b2'), 'NoEsParte');
  M.marcarIncumplida(m, n.id, 'b1');
  assert.equal(n.estado, 'incumplida');
  const r = M.resumen(m, 'c1');
  assert.deepEqual([r.defaulted, r.overdue_open], [1, 0]);
});

test('permiso obligatorio para cualquier bodega, incluida la que ya le fió (#46)', () => {
  const m = mundoCon();
  const n = M.crearNota(m, { bodega: 'b1', cliente: 'c1', monto: 3000, plazo: 7 });
  M.aceptarNota(m, n.id, 'c1');
  falla(() => M.leerResumen(m, 'b1', 'c1'), 'SinPermiso'); // la emisora tampoco
  falla(() => M.leerResumen(m, 'b2', 'c1'), 'SinPermiso');
  assert.equal(M.leerResumen(m, 'c1', 'c1').accepted, 1); // el propio cliente sí
  falla(() => M.darPermiso(m, 'c1', 'b2', 'b2'), 'NoEsParte'); // la bodega no se lo da sola
  M.darPermiso(m, 'c1', 'b2', 'c1');
  assert.equal(M.leerResumen(m, 'b2', 'c1').accepted, 1);
  falla(() => M.leerResumen(m, 'b1', 'c1'), 'SinPermiso'); // el permiso es por bodega
  assert.equal(m.lecturas.length, 2); // cada lectura deja constancia
});

test('el permiso dura 30 días y se puede quitar', () => {
  const m = mundoCon(10);
  M.darPermiso(m, 'c1', 'b2', 'c1');
  m.dia = 39;
  assert.ok(M.permisoVigente(m, 'c1', 'b2'));
  m.dia = 40;
  assert.ok(!M.permisoVigente(m, 'c1', 'b2'));
  falla(() => M.leerResumen(m, 'b2', 'c1'), 'PermisoVencido');
  M.darPermiso(m, 'c1', 'b2', 'c1');
  M.quitarPermiso(m, 'c1', 'b2', 'c1');
  falla(() => M.leerResumen(m, 'b2', 'c1'), 'SinPermiso');
});

test('azar con semilla: misma semilla, misma secuencia', () => {
  const a = M.crearAzar(2026);
  const b = M.crearAzar(2026);
  const sa = Array.from({ length: 20 }, () => a());
  const sb = Array.from({ length: 20 }, () => b());
  assert.deepEqual(sa, sb);
  assert.ok(sa.every((x) => x >= 0 && x < 1));
  assert.notDeepEqual(sa, Array.from({ length: 20 }, M.crearAzar(7)));
});

test('rangos de monto como AmountBucket del contrato', () => {
  assert.equal(M.rangoDeMonto(999), 'B0_1k');
  assert.equal(M.rangoDeMonto(1000), 'B1k_5k');
  assert.equal(M.rangoDeMonto(4999), 'B1k_5k');
  assert.equal(M.rangoDeMonto(5000), 'B5k_20k');
  assert.equal(M.rangoDeMonto(20000), 'B20k_50k');
  assert.equal(M.rangoDeMonto(50000), 'B50kPlus');
});

test('semáforo: mismas constantes que backend/semaforo.js', () => {
  for (const k of ['UMBRAL_VERDE', 'UMBRAL_AMARILLO', 'MIN_CERRADAS', 'MIN_BODEGAS', 'MIN_DIAS']) {
    assert.equal(M[k], backend[k], k);
  }
});

test('semáforo: mismos resultados que backend/semaforo.js en casos fijos y al azar', () => {
  const ahora = 1_900_000_000;
  const casos = [
    {}, null,
    backend.statsEjemplo(ahora),
    { paid_on_time: 3, issuers_count: 2, first_ts: ahora - 60 * 86400 },
    { paid_on_time: 3, issuers_count: 2, first_ts: ahora - 59 * 86400 },
    { paid_on_time: 2, paid_late: 1, issuers_count: 3, first_ts: ahora - 90 * 86400 },
    { paid_on_time: 1, defaulted: 3, issuers_count: 3, first_ts: ahora - 100 * 86400 },
    { paid_on_time: 5, overdue_open: 4, issuers_count: 4, first_ts: ahora - 200 * 86400, disputes_open: 2 },
    { paid_on_time: 10, issuers_count: 2, first_ts: ahora - 300 * 86400 },
    { paid_on_time: 'x', paid_late: -2, issuers_count: 3, first_ts: ahora - 70 * 86400 },
  ];
  const azar = M.crearAzar(49);
  for (let i = 0; i < 2000; i++) {
    casos.push({
      paid_on_time: azar.entero(0, 12), paid_late: azar.entero(0, 6), defaulted: azar.entero(0, 5),
      overdue_open: azar.entero(0, 5), disputes_open: azar.entero(0, 2), issuers_count: azar.entero(0, 5),
      first_ts: azar() < 0.1 ? 0 : ahora - azar.entero(0, 150) * 86400,
    });
  }
  const colores = new Set();
  for (const c of casos) {
    const a = M.semaforo(c, ahora);
    const b = backend.semaforo(c, ahora);
    assert.deepEqual(a, b, JSON.stringify(c));
    colores.add(a.color);
  }
  assert.deepEqual([...colores].sort(), ['amarillo', 'insuficiente', 'rojo', 'verde']);
});

test('semáforo sobre el resumen del motor: insuficiente antes del día 60, juzga después', () => {
  const m = mundoCon();
  for (const [bodega, dia] of [['b1', 0], ['b2', 5], ['b3', 10]]) {
    m.dia = dia;
    const n = M.crearNota(m, { bodega, cliente: 'c1', monto: 4000, plazo: 7 });
    M.aceptarNota(m, n.id, 'c1');
    m.dia = dia + 5;
    M.confirmarPago(m, n.id, bodega);
  }
  m.dia = 59;
  assert.equal(M.semaforo(M.resumen(m, 'c1'), M.ahoraSeg(m)).color, 'insuficiente');
  m.dia = 60;
  assert.equal(M.semaforo(M.resumen(m, 'c1'), M.ahoraSeg(m)).color, 'verde');
});
