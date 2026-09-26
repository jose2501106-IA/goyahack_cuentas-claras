'use strict';
// Pruebas de la API con un Stellar falso: no se toca la cadena.
const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { crearApp, calcularNoteId, canonico, subjectIdDe } = require('../server');
const { crearAlmacen } = require('../datos');
const { ErrorStellar, ERRORES_CONTRATO } = require('../stellar');

const H = 'cd'.repeat(32);
const G = (c) => 'G' + c.repeat(55);
const config = { contractId: 'C' + 'A'.repeat(55), cuentas: { bodega_a: G('A'), bodega_b: G('B'), dona_mary: G('C') }, subjectId: 'fe'.repeat(32) };
const silencio = { log() {}, warn() {}, error() {} };

function fakeStellar({ permiso = false } = {}) {
  const llamadas = [];
  const errC = (n) => new ErrorStellar({ ...ERRORES_CONTRATO[n], codigoContrato: n });
  return {
    llamadas,
    async simular(alias, fn, args) {
      llamadas.push({ send: false, alias, fn, args });
      if (fn === 'read_stats' && !permiso) throw errC(10);
      if (fn === 'get_note') return { valor: { status: 'Accepted', paid_ts: null } };
      return { valor: undefined };
    },
    async enviar(alias, fn, args) {
      llamadas.push({ send: true, alias, fn, args });
      if (fn === 'revoke_consent' && !permiso) throw errC(10);
      if (fn === 'read_stats') return { valor: { accepted: 2, paid_on_time: 2, paid_late: 0, defaulted: 0, overdue_open: 0, disputes_open: 0, issuers_count: 1, first_ts: 1 }, txHash: H, url: `u/${H}` };
      return { valor: undefined, txHash: H, url: `u/${H}` };
    },
  };
}

async function levantar(t, opts) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cc-'));
  const almacen = crearAlmacen(path.join(dir, 'datos', 'notas.json'));
  const stellar = fakeStellar(opts);
  const front = path.join(dir, 'front');
  fs.mkdirSync(front);
  fs.writeFileSync(path.join(front, 'index.html'), '<h1>hola</h1>');
  fs.writeFileSync(path.join(dir, 'secreto.txt'), 'no');
  const plano = path.join(dir, 'plano');
  fs.mkdirSync(plano);
  fs.writeFileSync(path.join(plano, 'pasillo-a-b.json'), '{"pasillo":"A-B"}');
  fs.writeFileSync(path.join(plano, 'README.md'), 'no');
  const srv = http.createServer(crearApp({ config, stellar, almacen, frontendDir: front, planoDir: plano, log: silencio }));
  await new Promise((r) => srv.listen(0, '127.0.0.1', r));
  t.after(() => { srv.close(); fs.rmSync(dir, { recursive: true, force: true }); });
  const base = `http://127.0.0.1:${srv.address().port}`;
  const pedir = async (metodo, ruta, cuerpo, crudo) => {
    const r = await fetch(base + ruta, { method: metodo, headers: { 'content-type': 'application/json' }, body: crudo !== undefined ? crudo : cuerpo === undefined ? undefined : JSON.stringify(cuerpo) });
    const txt = await r.text();
    let json = null; try { json = JSON.parse(txt); } catch (_) {}
    return { status: r.status, json, txt, headers: r.headers };
  };
  return { pedir, stellar, almacen, base };
}

test('note_id = sha256(JSON canónico || aleatoriedad)', () => {
  assert.equal(canonico({ b: 1, a: { d: 2, c: 'x' } }), '{"a":{"c":"x","d":2},"b":1}');
  const al = Buffer.alloc(32, 7);
  const id = calcularNoteId({ z: 1, a: 2 }, al);
  const esperado = require('node:crypto').createHash('sha256').update(Buffer.concat([Buffer.from('{"a":2,"z":1}'), al])).digest('hex');
  assert.equal(id, esperado);
});

test('subject_id por HMAC con la llave como cadena', () => {
  const esperado = require('node:crypto').createHmac('sha256', 'k').update('+525599990001').digest('hex');
  assert.equal(subjectIdDe('k', '+525599990001'), esperado);
});

test('validaciones sin tocar la cadena', async (t) => {
  const { pedir, stellar } = await levantar(t);
  for (const cuerpo of [{ monto_mxn: 0, plazo_dias: 15 }, { monto_mxn: 1.5, plazo_dias: 15 }, { monto_mxn: '100', plazo_dias: 15 }, { monto_mxn: 100, plazo_dias: 14 }, { monto_mxn: 10000001, plazo_dias: 7 }]) {
    const r = await pedir('POST', '/api/notas', cuerpo);
    assert.equal(r.status, 400, JSON.stringify(cuerpo));
    assert.ok(r.json.error && r.json.mensaje);
  }
  assert.equal((await pedir('POST', '/api/notas', undefined, '{malo')).status, 400);
  assert.equal((await pedir('POST', '/api/notas', undefined, '[1]')).status, 400);
  assert.equal((await pedir('POST', '/api/notas', undefined, JSON.stringify({ x: 'a'.repeat(11000) }))).status, 413);
  assert.equal((await pedir('POST', '/api/permisos', { dias: 15 })).status, 400);
  assert.equal((await pedir('POST', '/api/notas/zzz/aceptar')).status, 400);
  assert.equal((await pedir('POST', `/api/notas/${H}/aceptar`)).status, 404);
  assert.equal((await pedir('GET', '/api/nada')).status, 404);
  assert.equal(stellar.llamadas.length, 0);
});

test('flujo completo con Stellar falso', async (t) => {
  const { pedir, stellar, almacen } = await levantar(t);
  const c = await pedir('POST', '/api/notas', { monto_mxn: 12000, plazo_dias: 15 });
  assert.equal(c.status, 200);
  assert.equal(c.json.tx_hash, H);
  assert.equal(c.json.nota.rango, 'B5k_20k');
  assert.equal(c.json.nota.rango_texto, '$5,000–$20,000');
  assert.ok(!('aleatoriedad_hex' in c.json.nota));
  const id = c.json.nota.note_id;
  const guardada = almacen.obtenerNota(id);
  assert.equal(calcularNoteId(guardada.documento, Buffer.from(guardada.aleatoriedad_hex, 'hex')), id);
  const crear = stellar.llamadas[0];
  assert.equal(crear.alias, 'bodega_a');
  assert.deepEqual(crear.args.slice(0, 6), ['--issuer', config.cuentas.bodega_a, '--note_id', id, '--subject_id', config.subjectId]);

  const l = await pedir('GET', '/api/notas');
  assert.equal(l.json.notas.length, 1);
  assert.equal(l.json.notas[0].estado, 'Accepted');
  assert.equal(l.json.notas[0].etiqueta, 'Firmada por los dos');

  assert.equal((await pedir('POST', `/api/notas/${id}/aceptar`)).json.estado, 'Accepted');
  const p = await pedir('POST', `/api/notas/${id}/pago`);
  assert.equal(p.json.estado, 'Paid');
  assert.equal(stellar.llamadas.at(-1).fn, 'confirm_paid');

  // Consulta sin permiso: ninguna transacción enviada.
  const antes = stellar.llamadas.filter((x) => x.send).length;
  const q = await pedir('POST', '/api/consultas');
  assert.equal(q.status, 200);
  assert.equal(q.json.permitido, false);
  assert.equal(q.json.motivo, 'sin_permiso');
  assert.equal(stellar.llamadas.filter((x) => x.send).length, antes);

  const tx = await pedir('GET', '/api/transacciones');
  assert.deepEqual(tx.json.transacciones.map((x) => x.accion), ['Bodega A confirmó el pago', 'Doña Mary firmó la nota', 'Bodega A creó una nota']);

  // Revocar sin permiso: error claro y registro local limpio.
  await almacen.guardarPermiso({ exp_ts: 1 });
  const d = await pedir('DELETE', '/api/permisos');
  assert.equal(d.status, 409);
  assert.equal(almacen.leerPermiso(), null);
});

test('consulta con permiso: stats, semáforo sin p, transacción enviada', async (t) => {
  const { pedir, stellar, almacen } = await levantar(t, { permiso: true });
  const g = await pedir('POST', '/api/permisos', { dias: 30 });
  assert.equal(g.status, 200);
  assert.ok(g.json.exp_ts > Date.now() / 1000 + 29 * 86400);
  assert.equal((await pedir('GET', '/api/permisos')).json.vigente, true);
  const q = await pedir('POST', '/api/consultas');
  assert.equal(q.json.permitido, true);
  assert.equal(q.json.semaforo.color, 'insuficiente');
  assert.equal(q.json.tx_hash, H);
  assert.ok(!/"p"/.test(q.txt));
  assert.deepEqual(stellar.llamadas.slice(-2).map((x) => [x.fn, x.send, x.alias]), [['read_stats', false, 'bodega_b'], ['read_stats', true, 'bodega_b']]);
  const r = await pedir('DELETE', '/api/permisos');
  assert.equal(r.status, 200);
  assert.equal(almacen.leerPermiso(), null);
});

test('config, ejemplo y estáticos seguros', async (t) => {
  const { pedir, base } = await levantar(t);
  const c = await pedir('GET', '/api/config');
  assert.equal(c.json.red, 'testnet');
  assert.ok(!/S[A-Z2-7]{55}/.test(c.txt));
  const e = await pedir('GET', '/api/semaforo/ejemplo');
  assert.equal(e.json.semaforo.color, 'verde');
  const i = await pedir('GET', '/');
  assert.equal(i.status, 200);
  assert.match(i.headers.get('content-type'), /text\/html/);
  assert.equal(i.headers.get('x-content-type-options'), 'nosniff');
  assert.match(i.headers.get('content-security-policy'), /fonts\.gstatic\.com/);
  // Traversal: el cliente HTTP normaliza "..", así que se prueba con codificación.
  for (const ruta of ['/..%2fsecreto.txt', '/%2e%2e/secreto.txt', '/..%5csecreto.txt']) {
    const r = await fetch(base + ruta);
    assert.equal(r.status, 404, ruta);
  }
});

test('del plano solo se sirve pasillo-a-b.json', async (t) => {
  const { pedir } = await levantar(t);
  const ok = await pedir('GET', '/plano/pasillo-a-b.json');
  assert.equal(ok.status, 200);
  assert.deepEqual(ok.json, { pasillo: 'A-B' });
  for (const ruta of ['/plano/README.md', '/plano/', '/plano/../secreto.txt', '/plano/pasillo-a-b.json/x']) {
    assert.equal((await pedir('GET', ruta)).status, 404, ruta);
  }
});
