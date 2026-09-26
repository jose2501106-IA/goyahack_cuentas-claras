'use strict';
// Defensas de la app local (decisión #56; auditoría B1, B2, B3 y C3) con un Stellar falso.
const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { crearApp, hostPermitido } = require('../server');
const { crearAlmacen } = require('../datos');
const { semaforo, statsEjemplo } = require('../semaforo');

const H = 'ab'.repeat(32);
const G = (c) => 'G' + c.repeat(55);
const config = { contractId: 'C' + 'A'.repeat(55), cuentas: { bodega_a: G('A'), bodega_b: G('B'), dona_mary: G('C') }, subjectId: 'fe'.repeat(32) };
const silencio = { log() {}, warn() {}, error() {} };

function fakeStellar({ sinHash = false } = {}) {
  const llamadas = [];
  return {
    llamadas,
    async simular(alias, fn) {
      llamadas.push({ send: false, fn });
      if (fn === 'read_stats') return { valor: {} };
      if (fn === 'get_note') return { valor: { status: 'Accepted', paid_ts: null } };
      return { valor: undefined };
    },
    async enviar(alias, fn) {
      llamadas.push({ send: true, fn });
      const valor = fn === 'read_stats' ? { accepted: 1, paid_on_time: 1, issuers_count: 1, first_ts: 1 } : undefined;
      return sinHash ? { valor, txHash: null, url: null } : { valor, txHash: H, url: `u/${H}` };
    },
  };
}

async function levantar(t, opts = {}) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cc-def-'));
  const almacen = crearAlmacen(path.join(dir, 'datos', 'notas.json'));
  const stellar = fakeStellar(opts);
  const front = path.join(dir, 'front');
  fs.mkdirSync(front);
  fs.writeFileSync(path.join(front, 'index.html'), '<h1>hola</h1>');
  const srv = http.createServer(crearApp({ config, stellar, almacen, frontendDir: front, planoDir: dir, log: silencio, puerto: opts.puerto ?? null }));
  await new Promise((r) => srv.listen(0, '127.0.0.1', r));
  t.after(() => { srv.close(); fs.rmSync(dir, { recursive: true, force: true }); });
  const port = srv.address().port;
  // headers: se mandan tal cual (incluido Host); sin content-type salvo que se pida.
  const pedir = (metodo, ruta, { headers = {}, cuerpo } = {}) => new Promise((resolve, reject) => {
    const req = http.request({ host: '127.0.0.1', port, method: metodo, path: ruta, headers: { host: `127.0.0.1:${port}`, ...headers } }, (res) => {
      const partes = [];
      res.on('data', (c) => partes.push(c));
      res.on('end', () => {
        const txt = Buffer.concat(partes).toString('utf8');
        let json = null; try { json = JSON.parse(txt); } catch (_) {}
        resolve({ status: res.statusCode, txt, json, headers: res.headers });
      });
    });
    req.on('error', reject);
    if (cuerpo !== undefined) req.write(cuerpo);
    req.end();
  });
  return { pedir, stellar, almacen, port };
}

const JSON_CT = { 'content-type': 'application/json' };

test('B1 · POST con Origin ajeno: 403 y no llama a la cadena', async (t) => {
  const { pedir, stellar } = await levantar(t);
  const r = await pedir('POST', '/api/permisos', { headers: { ...JSON_CT, origin: 'https://malicioso.example' }, cuerpo: '{"dias":30}' });
  assert.equal(r.status, 403);
  assert.equal(r.json.error, 'Origen no permitido');
  assert.equal(stellar.llamadas.length, 0);
  assert.equal(r.headers['access-control-allow-origin'], undefined); // sin CORS
});

test('B1 · Origin "null" también se rechaza; Origin local se permite', async (t) => {
  const { pedir, port } = await levantar(t);
  assert.equal((await pedir('POST', '/api/permisos', { headers: { ...JSON_CT, origin: 'null' }, cuerpo: '{"dias":30}' })).status, 403);
  const ok = await pedir('POST', '/api/permisos', { headers: { ...JSON_CT, origin: `http://127.0.0.1:${port}` }, cuerpo: '{"dias":30}' });
  assert.equal(ok.status, 200);
});

test('B1 · POST sin JSON: 415, también el de formulario', async (t) => {
  const { pedir, stellar } = await levantar(t);
  assert.equal((await pedir('POST', '/api/consultas')).status, 415);
  const form = await pedir('POST', '/api/permisos', { headers: { 'content-type': 'application/x-www-form-urlencoded' }, cuerpo: 'dias=30' });
  assert.equal(form.status, 415);
  assert.equal((await pedir('DELETE', '/api/permisos', { headers: { 'content-type': 'text/plain' } })).status, 415);
  assert.equal(stellar.llamadas.length, 0);
});

test('B1 · sin Origin (curl, pruebas) y con JSON, se atiende', async (t) => {
  const { pedir } = await levantar(t);
  const r = await pedir('POST', '/api/consultas', { headers: { 'content-type': 'application/json; charset=utf-8' }, cuerpo: '{}' });
  assert.equal(r.status, 200);
  assert.equal(r.json.permitido, true);
});

test('B2 · Host ajeno: 421 en la API y en los estáticos', async (t) => {
  const { pedir } = await levantar(t);
  for (const ruta of ['/', '/api/config', '/index.html']) {
    const r = await pedir('GET', ruta, { headers: { host: 'atacante.example:8080' } });
    assert.equal(r.status, 421, ruta);
    assert.equal(r.txt, 'Host no permitido');
  }
});

test('B2 · Host de Codespaces pasa; localhost en otro puerto no, si se fijó el puerto', async (t) => {
  const { pedir, port } = await levantar(t, { puerto: null });
  assert.equal((await pedir('GET', '/', { headers: { host: 'mi-codespace-8080.app.github.dev' } })).status, 200);
  assert.equal((await pedir('GET', '/api/permisos', { headers: { host: `localhost:${port}` } })).status, 200);
  assert.ok(!hostPermitido('localhost:9999', 8080));
  assert.ok(hostPermitido('localhost:8080', 8080));
  assert.ok(hostPermitido('127.0.0.1:8080', 8080));
  assert.ok(hostPermitido('abc-8080.app.github.dev', 8080));
  assert.ok(!hostPermitido('app.github.dev.atacante.example', 8080));
  assert.ok(!hostPermitido('evil-app.github.dev.example', 8080));
  assert.ok(!hostPermitido('', 8080));
  assert.ok(!hostPermitido(undefined, 8080));
});

test('B3 · acción sin hash: 502, nada registrado y nada guardado fuera de la cadena', async (t) => {
  const { pedir, almacen } = await levantar(t, { sinHash: true });
  const esperado = 'No pudimos confirmar el comprobante. Revisa el explorador antes de repetir.';
  const nota = await pedir('POST', '/api/notas', { headers: JSON_CT, cuerpo: '{"monto_mxn":8500,"plazo_dias":15}' });
  assert.equal(nota.status, 502);
  assert.equal(nota.json.error, esperado);
  assert.equal(almacen.listarNotas().length, 0);
  const permiso = await pedir('POST', '/api/permisos', { headers: JSON_CT, cuerpo: '{"dias":30}' });
  assert.equal(permiso.status, 502);
  assert.equal(almacen.leerPermiso(), null);
  const consulta = await pedir('POST', '/api/consultas', { headers: JSON_CT, cuerpo: '{}' });
  assert.equal(consulta.status, 502);
  assert.equal(almacen.leerPermiso(), null);
  const tx = await pedir('GET', '/api/transacciones');
  assert.deepEqual(tx.json.transacciones, []);
});

test('C3 · abrir una aclaración no mejora el color (pesa como una vencida)', () => {
  const ahora = 2_000_000_000;
  const base = { ...statsEjemplo(ahora) };
  for (const extra of [
    { paid_on_time: 3, paid_late: 0, issuers_count: 3 },
    { paid_on_time: 4, defaulted: 1, issuers_count: 3 },
    { paid_on_time: 2, paid_late: 2, issuers_count: 2 },
    { paid_on_time: 6, defaulted: 2, issuers_count: 4 },
  ]) {
    const vencida = semaforo({ ...base, ...extra, overdue_open: 1, disputes_open: 0 }, ahora);
    const enAclaracion = semaforo({ ...base, ...extra, overdue_open: 0, disputes_open: 1 }, ahora);
    assert.equal(enAclaracion.color, vencida.color, JSON.stringify(extra));
    assert.equal(enAclaracion.aclaraciones_abiertas, 1);
  }
  // Y abrir aclaraciones puede empeorar, nunca mejorar.
  const orden = { verde: 0, amarillo: 1, rojo: 2, insuficiente: -1 };
  const sin = semaforo({ ...base, paid_on_time: 4, defaulted: 1, issuers_count: 3 }, ahora);
  const con = semaforo({ ...base, paid_on_time: 4, defaulted: 1, issuers_count: 3, disputes_open: 3 }, ahora);
  assert.ok(orden[con.color] >= orden[sin.color]);
});
