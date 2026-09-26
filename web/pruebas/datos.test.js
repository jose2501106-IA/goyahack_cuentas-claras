// Copia idéntica de plano/pasillo-a-b.json (spec web §1.4 y §5.2) y datos envueltos para file://.
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { desenvolver } = require('../herramientas/generar-datos.js');

const RAIZ = path.join(__dirname, '..', '..');
const leer = (...p) => fs.readFileSync(path.join(RAIZ, ...p));

test('web/datos/pasillo-a-b.json es copia byte por byte de plano/pasillo-a-b.json', () => {
  assert.ok(leer('web', 'datos', 'pasillo-a-b.json').equals(leer('plano', 'pasillo-a-b.json')));
});

test('del plano solo se copia pasillo-a-b.json a web/', () => {
  const planos = fs.readdirSync(path.join(RAIZ, 'plano')).filter((f) => f !== 'README.md');
  for (const f of planos) {
    if (f === 'pasillo-a-b.json') continue;
    assert.ok(!fs.existsSync(path.join(RAIZ, 'web', 'datos', f)), `${f} no debe estar en web/`);
  }
});

test('cada datos/*.js lleva dentro, sin cambios, el texto de su .json', () => {
  const dir = path.join(RAIZ, 'web', 'datos');
  const jsons = fs.readdirSync(dir).filter((f) => f.endsWith('.json'));
  assert.ok(jsons.length >= 1);
  for (const j of jsons) {
    const nombre = j.replace(/\.json$/, '');
    const js = fs.readFileSync(path.join(dir, `${nombre}.js`), 'utf8');
    const dentro = desenvolver(js);
    assert.ok(dentro, `${nombre}.js no tiene el formato del generador`);
    assert.equal(dentro.nombre, nombre);
    assert.equal(dentro.texto, fs.readFileSync(path.join(dir, j), 'utf8').replace(/\n$/, ''));
  }
});
