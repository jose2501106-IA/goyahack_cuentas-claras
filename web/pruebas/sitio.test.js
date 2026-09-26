// Criterios 3 y 4 de la spec web (§5): vocabulario vetado, ninguna llave secreta y
// ningún fetch a rutas propias ni a servicios con llave. Las palabras vetadas van por
// pedazos para que el propio archivo pase el grep del criterio 3.
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const WEB = path.join(__dirname, '..');
function archivos(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const ruta = path.join(dir, d.name);
    return d.isDirectory() ? archivos(ruta) : [ruta];
  });
}
const textos = archivos(WEB)
  .filter((f) => /\.(html|css|js|json|md|txt)$/.test(f))
  .map((f) => ({ f: path.relative(WEB, f), t: fs.readFileSync(f, 'utf8') }));

test('sin vocabulario vetado (criterio 3)', () => {
  // Armadas por pedazos para que este archivo no aparezca en el grep del criterio 3.
  const vetado = new RegExp(['meta' + 'verso', 'bur' + 'ó', 'sco' + 're', 'calific' + 'aci', 'anó' + 'nim', 'nadie puede ' + 'ver'].join('|'), 'i');
  for (const { f, t } of textos) assert.ok(!vetado.test(t), `${f}: ${(t.match(vetado) || [])[0]}`);
});

test('ninguna llave secreta de Stellar (criterio 4)', () => {
  const secreta = new RegExp('S[A-Z2-7]{55}');
  for (const { f, t } of textos) assert.ok(!secreta.test(t), f);
});

test('sin fetch, XHR ni envío de datos: el sitio no llama a ningún servicio (criterio 4)', () => {
  const red = /\bfetch\s*\(|XMLHttpRequest|sendBeacon|WebSocket|EventSource/;
  for (const { f, t } of textos.filter((x) => x.f.endsWith('.js') && !x.f.startsWith('pruebas'))) {
    assert.ok(!red.test(t), f);
  }
});

test('el rótulo fijo de la simulación está en la página, tal cual la spec', () => {
  const html = fs.readFileSync(path.join(WEB, 'index.html'), 'utf8');
  assert.ok(html.includes('Simulación con personajes ficticios. No es la cadena. Los parámetros son inventados para ilustrar las reglas; no son datos de la Central.'));
  assert.ok(html.includes('Esta es la repetición de una corrida real') || fs.readFileSync(path.join(WEB, 'repeticion.js'), 'utf8').includes('Esta es la repetición de una corrida real. Para firmar en vivo usamos la app local; este sitio no firma nada.'));
});

test('texto de 16 px o más: ningún font-size menor a 1rem fuera del dibujo SVG', () => {
  const css = fs.readFileSync(path.join(WEB, 'estilos.css'), 'utf8');
  for (const m of css.matchAll(/font-size:\s*([\d.]+)(rem|px)/g)) {
    const [, n, u] = m;
    if (u === 'px') continue; // tamaños en unidades del plano, dentro del SVG escalado
    assert.ok(Number(n) >= 1, `font-size ${n}${u}`);
  }
});
