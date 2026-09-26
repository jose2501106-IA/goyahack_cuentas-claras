// «La app en tu mano» (docs/diseno-web-movil.md §2, cola tarea 9): las 6 pantallas están
// en el HTML y en orden, cada hash coincide con repeticion.json, el paso 4 va sin hash y
// nada pide llaves, sesión ni datos reales.
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const WEB = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(WEB, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(WEB, 'estilos.css'), 'utf8');
const rep = JSON.parse(fs.readFileSync(path.join(WEB, 'datos', 'repeticion.json'), 'utf8'));
const hashDe = Object.fromEntries(rep.pasos.map((p) => [p.numero, p.hash]));

const app = html.slice(html.indexOf('<aside class="app-en-mano"'), html.indexOf('</aside>'));

function pantallas(vista) {
  const i = app.indexOf(`<div class="tel-vista" data-vista="${vista}">`);
  assert.ok(i >= 0, `falta la vista ${vista}`);
  const bloque = app.slice(i, app.indexOf('</ol>', i));
  return [...bloque.matchAll(/<li class="tel-pantalla" data-paso="(\d)">([\s\S]*?)<\/li>/g)]
    .map((m) => ({ paso: Number(m[1]), html: m[2] }));
}
const hashes = (t) => [...t.matchAll(/[0-9a-f]{64}/g)].map((m) => m[0]);

for (const vista of ['cliente', 'bodega']) {
  test(`vista ${vista}: seis pantallas en el HTML, en orden`, () => {
    assert.deepEqual(pantallas(vista).map((p) => p.paso), [1, 2, 3, 4, 5, 6]);
  });

  test(`vista ${vista}: cada hash es el de su paso en repeticion.json; el paso 4 sin hash`, () => {
    for (const p of pantallas(vista)) {
      const hs = hashes(p.html);
      if (p.paso === 4) {
        assert.deepEqual(hs, []);
        assert.match(p.html, /Sin hash: no se envió transacción/);
        continue;
      }
      for (const h of hs) assert.equal(h, hashDe[p.paso], `paso ${p.paso}`);
      for (const m of p.html.matchAll(/href="([^"]+)"/g)) {
        assert.equal(m[1], `https://stellar.expert/explorer/testnet/tx/${hashDe[p.paso]}`);
      }
    }
  });
}

test('en la vista del cliente, los pasos con transacción enlazan a su hash', () => {
  for (const p of pantallas('cliente').filter((x) => x.paso !== 4)) {
    assert.ok(hashes(p.html).includes(hashDe[p.paso]), `paso ${p.paso}`);
  }
});

test('rotulado como prototipo y sin campos de llaves, sesión ni datos reales', () => {
  assert.ok(app.includes('Prototipo de la app. Datos ficticios. En este sitio no se firma nada: cada paso enlaza a su transacción real en Stellar testnet.'));
  assert.doesNotMatch(app, /<input|<form|<textarea|type="password"/i);
  assert.doesNotMatch(app, /contraseña|semilla|seed|llave secreta|iniciar sesión|login|\+52|\b\d{10}\b/i);
  assert.match(app, /testnet/);
});

test('sin JavaScript todo se lee: solo .con-js oculta pantallas o vistas', () => {
  for (const m of css.matchAll(/([^{}]+)\{([^}]*)\}/g)) {
    const [, selector, cuerpo] = m;
    if (!/display:\s*none/.test(cuerpo)) continue;
    if (/tel-pantalla|tel-vista/.test(selector)) assert.match(selector, /\.con-js/, selector.trim());
  }
});
