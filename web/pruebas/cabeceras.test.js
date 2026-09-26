// Cabeceras de seguridad del sitio (decisión #56; auditoría W1 y W2).
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const WEB = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(WEB, 'index.html'), 'utf8');

test('index.html: sin <script> en línea, sin atributos style= ni on…=', () => {
  for (const m of html.matchAll(/<script\b([^>]*)>/g)) assert.match(m[1], /\ssrc="[^"]+"/, `script sin src: ${m[0]}`);
  assert.doesNotMatch(html, /<[a-z][^>]*\sstyle\s*=/i);
  assert.doesNotMatch(html, /<[a-z][^>]*\son[a-z]+\s*=/i);
  assert.ok(!/defer|async/.test((html.match(/<script src="tema-inicial\.js"[^>]*>/) || [''])[0]), 'tema-inicial.js sin defer');
});

test('los scripts no crean atributos style ni código dinámico', () => {
  const js = ['app.js', 'gemelo.js', 'repeticion.js', 'portada.js', 'tema-inicial.js', 'simulacion/motor.js', 'simulacion/agentes.js', 'simulacion/vista.js']
    .map((f) => fs.readFileSync(path.join(WEB, f), 'utf8')).join('\n');
  assert.doesNotMatch(js, /\{\s*style:|setAttribute\(\s*['"]style['"]/);
  assert.doesNotMatch(js, /\beval\(|new Function\(|innerHTML|insertAdjacentHTML|document\.write/);
});

test('vercel.json: JSON válido con las cinco cabeceras para "/(.*)"', () => {
  const v = JSON.parse(fs.readFileSync(path.join(WEB, 'vercel.json'), 'utf8'));
  const regla = v.headers.find((h) => h.source === '/(.*)');
  assert.ok(regla);
  const h = Object.fromEntries(regla.headers.map((x) => [x.key, x.value]));
  assert.equal(h['Content-Security-Policy'], "default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'; upgrade-insecure-requests");
  assert.doesNotMatch(h['Content-Security-Policy'], /unsafe-inline|unsafe-eval/);
  assert.equal(h['X-Content-Type-Options'], 'nosniff');
  assert.equal(h['Referrer-Policy'], 'strict-origin-when-cross-origin');
  assert.equal(h['Permissions-Policy'], 'camera=(), microphone=(), geolocation=()');
  assert.equal(h['X-Frame-Options'], 'DENY');
});

test('.vercelignore deja fuera pruebas/ y herramientas/', () => {
  const lineas = fs.readFileSync(path.join(WEB, '.vercelignore'), 'utf8').split('\n').map((l) => l.trim());
  assert.ok(lineas.includes('pruebas/'));
  assert.ok(lineas.includes('herramientas/'));
});
