// Agentes del Pasillo vivo: reproducibles, ficticios y con los tres colores a los 90 días.
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const A = require('../simulacion/agentes.js');
const M = require('../simulacion/motor.js');
const forma = require('../datos/pasillo-a-b.json');

function correr(dias, opciones = {}) {
  const p = A.crearPasillo({ forma, ...opciones });
  for (let i = 0; i < dias; i++) A.pasoDia(p);
  return p;
}
const colores = (p) => new Set(p.clientes.map((c) => A.semaforoDe(p, c.id).color));

test('20 bodegas en lugares distintos del pasillo y 40 clientes con los cuatro perfiles', () => {
  const p = A.crearPasillo({ forma });
  assert.equal(p.bodegas.length, 20);
  assert.equal(new Set(p.bodegas.map((b) => b.lugar)).size, 20);
  const ids = new Set(forma.bodegas.map((b) => b.id));
  assert.ok(p.bodegas.every((b) => ids.has(b.lugar)));
  assert.equal(p.clientes.length, 40);
  assert.deepEqual(new Set(p.clientes.map((c) => c.perfil)), new Set(['cumplido', 'tarde', 'olvidadizo', 'moroso']));
});

test('antes del día 60 todos dicen «historial insuficiente»', () => {
  const p = correr(59);
  assert.deepEqual([...colores(p)], ['insuficiente']);
});

test('a los 90 días simulados hay semáforos verde, amarillo y rojo', () => {
  const c = colores(correr(90));
  for (const k of ['verde', 'amarillo', 'rojo']) assert.ok(c.has(k), k);
});

test('misma semilla, misma historia', () => {
  const a = correr(40);
  const b = correr(40);
  assert.deepEqual(a.eventos, b.eventos);
});

test('las bodegas siguen la regla: rojo no fía; con permiso y verde fía lo pedido; sin permiso, $1k–$5k', () => {
  const p = correr(120);
  for (const e of p.eventos.filter((x) => x.tipo === 'fio')) {
    const n = p.mundo.notas.find((x) => x.id === e.nota);
    if (e.decision === 'sin_permiso' || e.decision === 'insuficiente') assert.ok(n.monto >= 500 && n.monto <= 5000, `${n.monto}`);
    assert.notEqual(e.decision, 'rojo');
  }
  assert.ok(p.eventos.some((e) => e.tipo === 'no_fio' && e.decision === 'rojo'));
});

test('ninguna bodega lee un resumen sin permiso vigente (constancia de lecturas)', () => {
  const p = correr(90);
  assert.ok(p.mundo.lecturas.length > 0);
  // Reconstruye los permisos a partir de los eventos: cada lectura tuvo permiso dado en los 30 días previos.
  const dados = p.eventos.filter((e) => e.tipo === 'permiso');
  for (const l of p.mundo.lecturas) {
    assert.ok(dados.some((d) => d.cliente === l.cliente && d.bodega === l.lector && d.dia <= l.dia && l.dia < d.dia + M.PERMISO_DIAS));
  }
});

test('las frases son de plantilla y usan el vocabulario permitido', () => {
  const p = correr(90);
  const frases = [...p.bodegas, ...p.clientes].map((x) => x.ultima && x.ultima.frase).filter(Boolean);
  assert.ok(frases.length > 20);
  for (const f of frases) assert.ok(!/score|calificaci|buró|anónim/i.test(f), f);
  assert.equal(A.frase('sin_permiso', 3000), 'Sin su permiso no veo su resumen; le fío poco, $3,000, para empezar.');
});
