// Prototipo de la app para celular (web/app.html): CSP estricta, datos de la corrida real,
// avisos y vocabulario de las vistas del cliente y la bodega.
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const WEB = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(WEB, 'app.html'), 'utf8');
const js = fs.readFileSync(path.join(WEB, 'app-movil.js'), 'utf8');

test('app.html: sin scripts en línea, sin style= ni on…=, tema inicial en el <head>', () => {
  for (const m of html.matchAll(/<script\b([^>]*)>/g)) assert.match(m[1], /\ssrc="[^"]+"/);
  assert.doesNotMatch(html, /<[a-z][^>]*\s(style|on[a-z]+)\s*=/i);
  assert.match(html, /<head>[\s\S]*<script src="tema-inicial\.js"><\/script>[\s\S]*<\/head>/);
  assert.match(html, /<script src="datos\/repeticion\.js"><\/script>/);
  assert.doesNotMatch(js, /\{\s*style:|setAttribute\(\s*['"]style['"]|innerHTML|eval\(/);
});

test('rotulado como prototipo, con aviso de posiciones ilustrativas', () => {
  assert.ok(html.includes('Prototipo de la app. Datos ficticios. En este sitio no se firma nada: cada paso enlaza a su transacción real en Stellar testnet.'));
  assert.match(html, /ninguna bodega real participa/);
  assert.doesNotMatch(html + js, /<input|<form|contraseña|semilla|iniciar sesión/i);
});

test('los comprobantes salen de repeticion.json: ningún hash escrito a mano', () => {
  assert.doesNotMatch(js, /[0-9a-f]{64}/);
  assert.match(js, /CC_DATOS\.repeticion/);
});

test('vistas del cliente y la bodega: sin «blockchain», bodegas con número', () => {
  assert.doesNotMatch(js, /blockchain/i);
  assert.doesNotMatch(html + js, /Bodegas? [ABC](?![-\w])/);
});

test('el sitio enlaza a la app', () => {
  const index = fs.readFileSync(path.join(WEB, 'index.html'), 'utf8');
  assert.ok((index.match(/href="app\.html"/g) || []).length >= 2);
});

test('v5 (#57): la pestaña «Permisos» es «Mi código» y Bodega B-40 consulta con el código', () => {
  assert.match(js, /\['codigo', 'Mi código', /);
  assert.match(js, /'Doña Mary me enseñó su código'/);
  assert.match(js, /'Consultar historial'/);
  assert.doesNotMatch(html + js, /permiso|Pedir su resumen/i);
  assert.doesNotMatch(js, /resumen_paso_6/);
});
