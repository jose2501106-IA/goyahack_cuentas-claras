'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const V = require('../validar');

test('rangos con sus bordes', () => {
  const casos = [[1, 'B0_1k'], [999, 'B0_1k'], [1000, 'B1k_5k'], [4999, 'B1k_5k'], [5000, 'B5k_20k'],
    [19999, 'B5k_20k'], [20000, 'B20k_50k'], [49999, 'B20k_50k'], [50000, 'B50kPlus'], [10000000, 'B50kPlus']];
  for (const [m, r] of casos) assert.equal(V.rangoDeMonto(m), r, `monto ${m}`);
  assert.throws(() => V.rangoDeMonto(0));
});

test('textos de rango', () => {
  assert.equal(V.textoDeRango('B5k_20k'), '$5,000–$20,000');
  assert.equal(V.textoDeRango('B0_1k'), 'Menos de $1,000');
  assert.equal(V.textoDeRango('B50kPlus'), '$50,000 o más');
  assert.equal(V.textoDeRango('otro'), null);
});

test('monto: entero de 1 a 10,000,000', () => {
  for (const ok of [1, 999, 10000000]) assert.ok(V.esMonto(ok));
  for (const mal of [0, -1, 10000001, 1.5, '100', null, undefined, NaN, Infinity, [5]]) assert.ok(!V.esMonto(mal), String(mal));
});

test('plazo: 7, 15 o 30', () => {
  for (const ok of [7, 15, 30]) assert.ok(V.esPlazo(ok));
  for (const mal of [0, 1, 14, 31, '15', null]) assert.ok(!V.esPlazo(mal));
});

test('note_id: 64 hex en minúsculas', () => {
  assert.ok(V.esNoteId('a'.repeat(64)));
  assert.ok(V.esNoteId('0123456789abcdef'.repeat(4)));
  for (const mal of ['a'.repeat(63), 'a'.repeat(65), 'g'.repeat(64), 'A'.repeat(64), '../' + 'a'.repeat(61), null, 5]) assert.ok(!V.esNoteId(mal));
});

test('alias: lista cerrada', () => {
  for (const ok of ['bodega_a', 'bodega_b', 'dona_mary']) assert.ok(V.esAlias(ok));
  for (const mal of ['plataforma', 'bodega_c', '', '--source', 'bodega_a ', null]) assert.ok(!V.esAlias(mal));
});

test('etiquetas de estado', () => {
  assert.equal(V.etiquetaDeEstado('Created'), 'Esperando firma del cliente');
  assert.equal(V.etiquetaDeEstado('Paid'), 'Cumplida');
  assert.equal(V.etiquetaDeEstado(null), null);
});
