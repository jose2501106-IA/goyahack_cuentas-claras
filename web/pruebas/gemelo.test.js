// Geometría del gemelo: las 96 bodegas y todos los trazos caben en el dibujo.
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const Gemelo = require('../gemelo.js');
const forma = require('../datos/pasillo-a-b.json');

test('la forma trae las 96 bodegas, dos filas y el corredor', () => {
  assert.equal(forma.bodegas.length, 96);
  assert.deepEqual(Object.keys(forma.filas).sort(), ['A', 'B']);
  assert.equal(Gemelo.ladoSuperior(forma), 'A');
  assert.ok(forma.trazos.length > 0);
});

test('la geometría deja todo dentro del viewBox', () => {
  const g = Gemelo.geometria(forma);
  assert.ok(g.ancho > 0 && g.alto > 0);
  const dentro = (x, y) => x >= 0 && x <= g.ancho && y >= 0 && y <= g.alto;
  for (const [x1, y1, x2, y2] of forma.trazos) {
    assert.ok(dentro(g.X(x1), g.Y(y1)) && dentro(g.X(x2), g.Y(y2)));
  }
  for (const b of forma.bodegas) {
    const f = forma.filas[b.lado];
    assert.ok(dentro(g.X(b.x), g.Y(f.y + f.alto)) && dentro(g.X(b.x + b.w), g.Y(f.y)), b.id);
  }
});

test('el SVG va con y hacia abajo: la fila A queda arriba del corredor', () => {
  const g = Gemelo.geometria(forma);
  assert.ok(g.Y(forma.filas.A.y) < g.Y(forma.corredor.y + forma.corredor.alto) + 0.01);
  assert.ok(g.Y(forma.filas.B.y + forma.filas.B.alto) > g.Y(forma.corredor.y) - 0.01);
});
