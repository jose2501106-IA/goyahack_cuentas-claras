// Tema dual (docs/diseno-web-movil.md §1, cola tarea 8): contraste de cada par de tokens
// que se usa como texto sobre fondo, en los dos temas, con la fórmula de WCAG 2.x (≥ 4.5:1).
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const WEB = path.join(__dirname, '..');
const css = fs.readFileSync(path.join(WEB, 'estilos.css'), 'utf8');

// Lee el primer bloque de variables que sigue a un marcador /* tema:… */.
function tokens(marcador) {
  const i = css.indexOf(`/* ${marcador} */`);
  assert.ok(i >= 0, `falta el marcador ${marcador}`);
  const inicio = css.indexOf('{', i);
  let fin = css.indexOf('}', inicio);
  // En la media query hay un bloque anidado: se toma el interno.
  const dentro = css.slice(inicio + 1, fin);
  const t = {};
  for (const m of dentro.matchAll(/--([\w-]+):\s*(#[0-9A-Fa-f]{6})\s*;/g)) t[m[1]] = m[2].toUpperCase();
  return t;
}

function luminancia(hex) {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function contraste(a, b) {
  const x = luminancia(a);
  const y = luminancia(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

const claro = tokens('tema:claro');
const oscuro = tokens('tema:oscuro');
const oscuroSistema = tokens('tema:oscuro-sistema');

// Pares [texto, fondo] que el sitio usa de verdad.
const FONDOS = ['fondo', 'superficie', 'fondo-alterno'];
const TEXTOS = ['texto', 'texto-2', 'firma', 'hash', 'sello', 'sem-verde', 'sem-ambar', 'sem-rojo'];
const PARES = [
  ...FONDOS.flatMap((f) => TEXTOS.map((t) => [t, f])),
  ['texto', 'resalte'], ['texto-2', 'resalte'], ['firma', 'resalte'], ['hash', 'resalte'],
  ['sobre-firma', 'firma'], ['sobre-firma', 'firma-hover'],
  ['texto', 'bodega'], ['texto', 'bodega-marcada'], ['firma', 'bodega-marcada'], ['texto', 'sin-permiso'],
];

test('los dos temas definen los mismos tokens de color', () => {
  assert.deepEqual(Object.keys(oscuro).sort(), Object.keys(claro).sort());
  assert.ok(Object.keys(claro).length >= 20);
});

test('el oscuro por sistema (prefers-color-scheme) es idéntico al oscuro elegido', () => {
  assert.deepEqual(oscuroSistema, oscuro);
});

test('valores de docs/diseno-web-movil.md §1', () => {
  assert.deepEqual(
    ['fondo', 'superficie', 'borde', 'texto', 'texto-2', 'firma', 'hash', 'sello', 'bodega', 'bodega-borde', 'sem-verde', 'sem-ambar', 'sem-rojo'].map((k) => claro[k]),
    ['#F5F0E6', '#FFFFFF', '#D9D2C3', '#1B2233', '#555E6E', '#1E3A8A', '#0F6E61', '#B3261E', '#E6DAC3', '#D9D2C3', '#236B2A', '#8A5A00', '#B71C1C']);
  assert.deepEqual(
    ['fondo', 'superficie', 'borde', 'texto', 'texto-2', 'firma', 'hash', 'sello', 'bodega', 'bodega-borde', 'sem-verde', 'sem-ambar', 'sem-rojo'].map((k) => oscuro[k]),
    ['#15101F', '#1F1830', '#3A2F52', '#F7F1E8', '#B8AFC6', '#FF9A3C', '#45D6D2', '#F0508F', '#2A2140', '#3A2F52', '#3FD08A', '#F2C14E', '#FF6B6B']);
});

for (const [nombre, tema] of [['claro', claro], ['oscuro', oscuro]]) {
  test(`tema ${nombre}: cada par de texto sobre fondo llega a 4.5:1`, () => {
    const fallas = [];
    for (const [t, f] of PARES) {
      assert.ok(tema[t] && tema[f], `falta ${t} o ${f}`);
      const r = contraste(tema[t], tema[f]);
      if (r < 4.5) fallas.push(`${t} sobre ${f}: ${r.toFixed(2)}:1`);
    }
    assert.deepEqual(fallas, []);
  });
}

test('el interruptor es un botón con aria-pressed, en la barra superior', () => {
  const html = fs.readFileSync(path.join(WEB, 'index.html'), 'utf8');
  const enc = html.slice(html.indexOf('<header'), html.indexOf('</header>'));
  assert.match(enc, /<button[^>]*class="interruptor-tema"[^>]*aria-pressed="(true|false)"[^>]*aria-label="Tema oscuro"/);
  assert.match(css, /\.interruptor-tema \{[^}]*width: (4[4-9]|[5-9]\d)px; height: (4[4-9]|[5-9]\d)px;/);
  // La elección se guarda con try/catch: si no hay almacenamiento, el sitio sigue.
  assert.match(html, /try \{[^}]*localStorage\.getItem\('cc-tema'\)/);
});
