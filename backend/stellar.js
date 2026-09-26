'use strict';
// Envoltura del Stellar CLI. Solo execFile con argumentos en arreglo (nunca exec ni shell).
// Las llaves secretas se quedan en el CLI; este módulo nunca las lee ni las registra.
// Cola: una transacción --send=yes a la vez (evita choques de número de secuencia).
// Las simulaciones (--send=no) pueden ir en paralelo.

const { execFile } = require('node:child_process');
const { esAlias } = require('./validar');

const TIMEOUT_MS = 90000;
const FN_PERMITIDAS = new Set([
  'create_note', 'accept_note', 'confirm_paid', 'grant_consent', 'revoke_consent', 'read_stats', 'get_note',
]);

// Errores del contrato (spec v2 §7) → mensaje en español para la persona usuaria.
const ERRORES_CONTRATO = Object.freeze({
  3: { error: 'no_emisor', mensaje: 'Esta bodega no está registrada para emitir notas.', status: 403 },
  4: { error: 'nota_existe', mensaje: 'Esa nota ya está registrada.', status: 409 },
  5: { error: 'nota_no_encontrada', mensaje: 'No encontramos esa nota en el registro.', status: 404 },
  6: { error: 'paso_no_permitido', mensaje: 'La nota no está en un estado que permita este paso.', status: 409 },
  7: { error: 'no_es_parte', mensaje: 'Esta cuenta no es parte de la nota.', status: 403 },
  8: { error: 'muy_pronto', mensaje: 'Todavía no se puede hacer este paso.', status: 409 },
  9: { error: 'plazo_cerrado', mensaje: 'Ya pasó el plazo para hacer este paso.', status: 409 },
  10: { error: 'sin_permiso', mensaje: 'Doña Mary no ha dado permiso a Bodega B para consultar su historial.', status: 403 },
  11: { error: 'permiso_vencido', mensaje: 'El permiso de Doña Mary para Bodega B ya venció.', status: 403 },
  12: { error: 'datos_invalidos', mensaje: 'Los datos de la nota no son válidos.', status: 400 },
});

class ErrorStellar extends Error {
  constructor({ error, mensaje, status, codigoContrato = null }) {
    super(mensaje);
    this.error = error;
    this.mensaje = mensaje;
    this.status = status;
    this.codigoContrato = codigoContrato;
  }
}

const RE_SECRETO = /S[A-Z2-7]{55}/g;

function resumenSeguro(texto) {
  // Una sola línea corta, sin nada con forma de llave secreta.
  const lineas = String(texto || '').split('\n').map((l) => l.trim()).filter(Boolean);
  const l = lineas.find((x) => /error/i.test(x)) || lineas[lineas.length - 1] || '';
  return l.replace(RE_SECRETO, '[redactado]').slice(0, 160);
}

function ultimoJson(stdout) {
  const lineas = String(stdout || '').split('\n').map((l) => l.trim()).filter(Boolean);
  for (let i = lineas.length - 1; i >= 0; i--) {
    try { return { ok: true, valor: JSON.parse(lineas[i]) }; } catch (_) { /* sigue */ }
  }
  return { ok: false, valor: undefined };
}

function hashDeTx(stderr, explorador) {
  const s = String(stderr || '');
  const u = s.match(/https:\/\/stellar\.expert\/explorer\/testnet\/tx\/([0-9a-f]{64})/i);
  if (u) return u[1].toLowerCase();
  const f = s.match(/Signing transaction:\s*([0-9a-f]{64})/i);
  return f ? f[1].toLowerCase() : null;
}

function codigoContrato(stderr) {
  const m = String(stderr || '').match(/Error\(Contract, #(\d+)\)/);
  return m ? Number(m[1]) : null;
}

function crearStellar({ contractId, network = 'testnet', explorador, bin = 'stellar', timeoutMs = TIMEOUT_MS, execFileImpl = execFile, log = console }) {
  if (!/^C[A-Z2-7]{55}$/.test(contractId || '')) throw new Error('contract_id inválido');
  let cola = Promise.resolve();

  function correr(args) {
    return new Promise((resolve) => {
      execFileImpl(bin, args, { timeout: timeoutMs, maxBuffer: 1024 * 1024, windowsHide: true },
        (err, stdout, stderr) => resolve({ err, stdout: String(stdout || ''), stderr: String(stderr || '') }));
    });
  }

  async function ejecutar({ alias, fn, args, send }) {
    if (!esAlias(alias)) throw new Error('alias no permitido');
    if (!FN_PERMITIDAS.has(fn)) throw new Error('función no permitida');
    const argv = ['contract', 'invoke', '--id', contractId, '--source', alias, '--network', network,
      `--send=${send ? 'yes' : 'no'}`, '--', fn, ...args.map(String)];
    const { err, stdout, stderr } = await correr(argv);
    if (err) {
      const codigo = codigoContrato(stderr);
      if (codigo !== null && ERRORES_CONTRATO[codigo]) {
        log.warn(`[stellar] ${fn} (${alias}) rechazado por el contrato: #${codigo}`);
        throw new ErrorStellar({ ...ERRORES_CONTRATO[codigo], codigoContrato: codigo });
      }
      if (err.killed || err.signal) {
        log.warn(`[stellar] ${fn} (${alias}) sin respuesta en ${timeoutMs / 1000} s`);
        throw new ErrorStellar({ error: 'tiempo_agotado', mensaje: 'La red de prueba tardó demasiado en responder. Intenta de nuevo.', status: 504 });
      }
      log.warn(`[stellar] ${fn} (${alias}) falló: ${resumenSeguro(stderr) || err.code}`);
      throw new ErrorStellar({ error: 'fallo_red', mensaje: 'No se pudo completar la operación en la red de prueba. Intenta de nuevo.', status: 502 });
    }
    const j = ultimoJson(stdout);
    const txHash = send ? hashDeTx(stderr) : null;
    const url = txHash ? `${explorador}/tx/${txHash}` : null;
    if (send) log.log(`[stellar] ${fn} (${alias}) enviada: ${txHash ? txHash.slice(0, 12) + '…' : 'sin hash'}`);
    return { valor: j.ok ? j.valor : undefined, txHash, url };
  }

  return {
    // Simulación: no envía transacción; puede ir en paralelo.
    simular(alias, fn, args = []) {
      return ejecutar({ alias, fn, args, send: false });
    },
    // Envío: en cola, una a la vez.
    enviar(alias, fn, args = []) {
      const p = cola.then(() => ejecutar({ alias, fn, args, send: true }));
      cola = p.catch(() => {});
      return p;
    },
  };
}

module.exports = { crearStellar, ErrorStellar, ERRORES_CONTRATO, ultimoJson, hashDeTx, codigoContrato, resumenSeguro };
