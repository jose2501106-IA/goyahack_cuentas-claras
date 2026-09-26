// repeticion.json coincide con los hashes de demo/salida-demo.txt (spec web §4 y §5.2).
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { construir } = require('../herramientas/generar-repeticion.js');

const RAIZ = path.join(__dirname, '..', '..');
const salida = fs.readFileSync(path.join(RAIZ, 'demo', 'salida-demo.txt'), 'utf8');
const deploy = JSON.parse(fs.readFileSync(path.join(RAIZ, 'demo', 'deploy.json'), 'utf8'));
const rep = JSON.parse(fs.readFileSync(path.join(RAIZ, 'web', 'datos', 'repeticion.json'), 'utf8'));

const hashesSalida = [...salida.matchAll(/\/tx\/([0-9a-f]{64})/g)].map((m) => m[1]);

test('repeticion.json está al día con lo que genera la herramienta', () => {
  assert.deepEqual(rep, construir());
});

test('los hashes de repeticion.json son exactamente los de la salida real, en orden', () => {
  const hashesRep = rep.pasos.filter((p) => p.hash).map((p) => p.hash);
  assert.equal(hashesSalida.length, 5);
  assert.deepEqual(hashesRep, hashesSalida);
});

test('ningún hash es inventado: todos aparecen en la salida y cada url es su enlace de stellar.expert', () => {
  for (const p of rep.pasos) {
    if (!p.hash) continue;
    assert.ok(salida.includes(p.hash), `hash del paso ${p.numero} no está en la salida`);
    assert.equal(p.url, `https://stellar.expert/explorer/testnet/tx/${p.hash}`);
    assert.ok(salida.includes(p.url));
  }
});

test('seis pasos; el 4 (sin permiso) va sin hash y con la razón', () => {
  assert.deepEqual(rep.pasos.map((p) => p.numero), [1, 2, 3, 4, 5, 6]);
  const p4 = rep.pasos[3];
  assert.equal(p4.hash, null);
  assert.equal(p4.url, null);
  assert.equal(p4.sin_transaccion, 'No se envió transacción: el contrato lo rechazó.');
  for (const p of rep.pasos.filter((x) => x.numero !== 4)) assert.ok(p.hash, `paso ${p.numero}`);
});

test('el contrato y las cuentas son los de demo/deploy.json, y solo hay claves públicas', () => {
  assert.equal(rep.contrato.id, deploy.contract_id);
  assert.ok(salida.includes(deploy.contract_id));
  const publicas = new Set(Object.values(deploy.cuentas_publicas));
  for (const p of rep.pasos) if (p.cuenta_publica) assert.ok(publicas.has(p.cuenta_publica));
  assert.ok(!/S[A-Z2-7]{55}/.test(JSON.stringify(rep)));
});
