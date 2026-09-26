// Experiencia móvil (docs/diseno-web-movil.md §3, cola tarea 10): historia en seis pasos,
// «Ver como registro» y tamaño táctil. El alto del Pasillo vivo y el desplazamiento
// horizontal se miden en el navegador (ver la cola); aquí va lo que se comprueba sin él.
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
const hashes = (t) => [...t.matchAll(/[0-9a-f]{64}/g)].map((m) => m[0]);

function bloques(re) {
  return [...html.matchAll(re)].map((m) => ({ paso: Number(m[1]), html: m[2] }));
}

test('portada: seis bloques en orden, cada uno con el hash de su paso (el 4 sin hash)', () => {
  const b = bloques(/<li class="historia-paso" data-paso="(\d)">([\s\S]*?)<\/li>/g);
  assert.deepEqual(b.map((x) => x.paso), [1, 2, 3, 4, 5, 6]);
  for (const x of b) assert.deepEqual(hashes(x.html), x.paso === 4 ? [] : [hashDe[x.paso]], `paso ${x.paso}`);
  const historia = html.slice(html.indexOf('<section class="historia"'), html.indexOf('</section>', html.indexOf('<section class="historia"')));
  assert.match(historia, /Ver la demo real/);
  assert.match(historia, /Entrar al Pasillo vivo/);
});

test('registro: seis renglones con seudónimo, rango, hash y sello, iguales a repeticion.json', () => {
  const b = bloques(/<tr data-paso="(\d)">([\s\S]*?)<\/tr>/g);
  assert.deepEqual(b.map((x) => x.paso), [1, 2, 3, 4, 5, 6]);
  for (const x of b) {
    assert.deepEqual(hashes(x.html), x.paso === 4 ? [] : [hashDe[x.paso]], `paso ${x.paso}`);
    assert.ok(x.html.includes(rep.seudonimo_cliente), `seudónimo en el paso ${x.paso}`);
  }
  assert.match(b[2].html, /CUMPLIDA/);
  assert.ok(rep.seudonimo_cliente && rep.seudonimo_cliente.endsWith('…'), 'el seudónimo sale recortado de la salida real');
});

test('todo hash de la página es de la corrida real y cada enlace apunta a su transacción', () => {
  const reales = new Set(Object.values(hashDe).filter(Boolean));
  for (const h of hashes(html)) assert.ok(reales.has(h), h);
  for (const m of html.matchAll(/href="https:\/\/stellar\.expert\/explorer\/testnet\/tx\/([^"]+)"/g)) {
    assert.ok(reales.has(m[1]), m[1]);
  }
});

test('tamaño táctil: botones, pestañas, enlaces de navegación y campos de 48 px o más', () => {
  const reglas = {
    '.boton, .boton-chico': /min-height: 48px/,
    '.navegacion a': /min-height: 48px/,
    '.personaje': /min-height: 48px/,
    '.detalles-sim summary': /min-height: 48px/,
    '.hoja-pestanas [role="tab"]': /min-height: 48px/,
    '.buscar': /min-height: 48px/,
  };
  for (const [sel, re] of Object.entries(reglas)) {
    const escapado = sel.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const m = css.match(new RegExp(`(^|\\n)\\s*${escapado} \\{([^}]*)\\}`));
    assert.ok(m, `falta la regla ${sel}`);
    assert.match(m[2], re, sel);
  }
});

test('en el celular la hoja y los controles van fijos abajo; mapa plano bajo 900 px', () => {
  assert.match(css, /@media \(max-width: 899px\) \{[\s\S]*#pasillo-vivo \.barra-sim \{[^}]*position: fixed/);
  assert.match(css, /#pasillo-vivo \.hoja \{[^}]*position: fixed/);
  const gemelo = fs.readFileSync(path.join(WEB, 'gemelo.js'), 'utf8');
  assert.match(gemelo, /matchMedia\('\(max-width: 899px\)'\)/);
});
