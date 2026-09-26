'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { crearStellar, ultimoJson, hashDeTx, codigoContrato, resumenSeguro } = require('../stellar');

const CID = 'CBNBVFY2BXFC7GGMCK7SWXSWHMWWNXS5U4XRNBSX6FRFIVZBZDYBCCD3';
const H = 'ab'.repeat(32);
const silencio = { log() {}, warn() {}, error() {} };

test('ultimoJson toma la última línea JSON', () => {
  assert.deepEqual(ultimoJson('📅 evento algo\n{"accepted":2}\n').valor, { accepted: 2 });
  assert.equal(ultimoJson('null\n').valor, null);
  assert.equal(ultimoJson('').ok, false);
});

test('hashDeTx: URL primero, luego Signing transaction', () => {
  assert.equal(hashDeTx(`x\nhttps://stellar.expert/explorer/testnet/tx/${H}\n`), H);
  assert.equal(hashDeTx(`Signing transaction: ${H}\n`), H);
  assert.equal(hashDeTx('nada'), null);
});

test('codigoContrato y resumen sin secretos', () => {
  assert.equal(codigoContrato('error: HostError: Error(Contract, #10)'), 10);
  assert.equal(codigoContrato('otra cosa'), null);
  const s = 'S' + 'A'.repeat(55);
  assert.ok(!resumenSeguro(`error: ${s}`).includes(s));
});

test('execFile con arreglo, alias y funciones en lista cerrada, errores traducidos', async () => {
  const llamadas = [];
  const fake = (bin, args, opts, cb) => {
    llamadas.push({ bin, args, opts });
    if (args.includes('read_stats')) return setImmediate(() => cb(Object.assign(new Error('x'), { code: 1 }), '', 'error: Error(Contract, #10)'));
    setImmediate(() => cb(null, '{"ok":1}\n', `https://stellar.expert/explorer/testnet/tx/${H}`));
  };
  const st = crearStellar({ contractId: CID, explorador: 'https://stellar.expert/explorer/testnet', execFileImpl: fake, log: silencio });
  const r = await st.enviar('bodega_a', 'get_note', ['--note_id', H]);
  assert.equal(r.txHash, H);
  assert.equal(r.url, `https://stellar.expert/explorer/testnet/tx/${H}`);
  assert.deepEqual(r.valor, { ok: 1 });
  assert.equal(llamadas[0].bin, 'stellar');
  assert.ok(Array.isArray(llamadas[0].args));
  assert.ok(llamadas[0].args.includes('--send=yes'));
  assert.equal(llamadas[0].opts.timeout, 90000);
  await assert.rejects(st.simular('bodega_b', 'read_stats', []), (e) => e.codigoContrato === 10 && e.error === 'sin_permiso' && !/Contract/.test(e.mensaje));
  await assert.rejects(st.simular('plataforma', 'get_note', []), /alias/);
  await assert.rejects(st.simular('bodega_a', 'add_issuer', []), /función/);
});

test('cola: una transacción a la vez', async () => {
  let activas = 0; let maximo = 0;
  const fake = (bin, args, opts, cb) => {
    activas++; maximo = Math.max(maximo, activas);
    setTimeout(() => { activas--; cb(null, '', `Signing transaction: ${H}`); }, 10);
  };
  const st = crearStellar({ contractId: CID, explorador: 'e', execFileImpl: fake, log: silencio });
  await Promise.all([1, 2, 3, 4].map(() => st.enviar('bodega_a', 'confirm_paid', [])));
  assert.equal(maximo, 1);
});
