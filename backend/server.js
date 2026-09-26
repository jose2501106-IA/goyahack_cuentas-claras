'use strict';
// Cuentas Claras — servidor local de la demo (spec frontend §1–§3).
// Solo módulos nativos de Node. Escucha en 127.0.0.1:8080 (PORT solo para pruebas).
// Sirve frontend/ y la API /api. La cadena se toca solo vía Stellar CLI (stellar.js).

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const V = require('./validar');
const { semaforo, statsEjemplo } = require('./semaforo');
const { crearStellar, ErrorStellar } = require('./stellar');
const { crearAlmacen } = require('./datos');

const RAIZ = path.resolve(__dirname, '..');
const RED = 'testnet';
const EXPLORADOR = 'https://stellar.expert/explorer/testnet';
const TELEFONO_DONA_MARY = '+525599990001'; // ficticio, el mismo de demo.sh
const LIMITE_CUERPO = 10 * 1024;
const MAX_TRANSACCIONES = 200;

// --- Configuración ------------------------------------------------------------

function leerHmacKey(rutaEnv) {
  let texto;
  try { texto = fs.readFileSync(rutaEnv, 'utf8'); } catch (_) { return null; }
  for (const linea of texto.split(/\r?\n/)) {
    const m = linea.match(/^\s*(?:export\s+)?DEMO_HMAC_KEY\s*=\s*(.*)$/);
    if (!m) continue;
    let v = m[1].trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
    return v || null;
  }
  return null;
}

function subjectIdDe(hmacKey, telefono) {
  return crypto.createHmac('sha256', hmacKey).update(telefono).digest('hex');
}

function cargarConfig(raiz = RAIZ) {
  const deploy = JSON.parse(fs.readFileSync(path.join(raiz, 'demo', 'deploy.json'), 'utf8'));
  const c = deploy.cuentas_publicas || {};
  const cuentas = { bodega_a: c.bodega_a, bodega_b: c.bodega_b, dona_mary: c.dona_mary };
  for (const [k, v] of Object.entries(cuentas)) {
    if (!/^G[A-Z2-7]{55}$/.test(v || '')) throw new Error(`deploy.json: falta la clave pública de ${k}`);
  }
  const hmacKey = leerHmacKey(path.join(raiz, '.env'));
  if (!hmacKey) throw new Error('Falta DEMO_HMAC_KEY en .env (copia .env.example a .env y ponla).');
  return {
    contractId: deploy.contract_id,
    cuentas,
    subjectId: subjectIdDe(hmacKey, TELEFONO_DONA_MARY),
  };
}

// --- Utilidades ---------------------------------------------------------------

function canonico(v) {
  if (Array.isArray(v)) return '[' + v.map(canonico).join(',') + ']';
  if (v && typeof v === 'object') {
    return '{' + Object.keys(v).sort().map((k) => JSON.stringify(k) + ':' + canonico(v[k])).join(',') + '}';
  }
  return JSON.stringify(v);
}

function calcularNoteId(documento, aleatoriedad) {
  return crypto.createHash('sha256')
    .update(Buffer.concat([Buffer.from(canonico(documento), 'utf8'), aleatoriedad]))
    .digest('hex');
}

// El CLI puede devolver un enum unitario como "Accepted" o ["Accepted"] u {"Accepted":…}.
function normalizarEstado(s) {
  if (typeof s === 'string') return s;
  if (Array.isArray(s) && typeof s[0] === 'string') return s[0];
  if (s && typeof s === 'object') { const k = Object.keys(s); if (k.length === 1) return k[0]; }
  return null;
}

class ErrorHttp extends Error {
  constructor(status, error, mensaje) { super(mensaje); this.status = status; this.error = error; this.mensaje = mensaje; }
}

const CABECERAS_SEGURIDAD = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  'X-Frame-Options': 'DENY',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data:",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join('; '),
};

function responderJson(res, status, cuerpo) {
  const txt = JSON.stringify(cuerpo);
  res.writeHead(status, { ...CABECERAS_SEGURIDAD, 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'Content-Length': Buffer.byteLength(txt) });
  res.end(txt);
}

function leerCuerpo(req) {
  return new Promise((resolve, reject) => {
    let tam = 0; const partes = []; let listo = false;
    req.on('data', (c) => {
      if (listo) return;
      tam += c.length;
      if (tam > LIMITE_CUERPO) { listo = true; reject(new ErrorHttp(413, 'cuerpo_grande', 'La solicitud es demasiado grande.')); req.resume(); return; }
      partes.push(c);
    });
    req.on('end', () => {
      if (listo) return; listo = true;
      const txt = Buffer.concat(partes).toString('utf8').trim();
      if (!txt) return resolve({});
      let v;
      try { v = JSON.parse(txt); } catch (_) { return reject(new ErrorHttp(400, 'json_invalido', 'El cuerpo de la solicitud no es JSON válido.')); }
      if (!v || typeof v !== 'object' || Array.isArray(v)) return reject(new ErrorHttp(400, 'json_invalido', 'El cuerpo de la solicitud debe ser un objeto JSON.'));
      resolve(v);
    });
    req.on('error', reject);
  });
}

const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8',
};

function servirEstatico(req, res, pathname, frontendDir) {
  const base = path.resolve(frontendDir);
  const texto404 = () => { res.writeHead(404, { ...CABECERAS_SEGURIDAD, 'Content-Type': 'text/plain; charset=utf-8' }); res.end('No encontrado'); };
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { ...CABECERAS_SEGURIDAD, Allow: 'GET, HEAD', 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Método no permitido');
  }
  let rel;
  try { rel = decodeURIComponent(pathname); } catch (_) { return texto404(); }
  if (rel.includes('\0')) return texto404();
  if (rel === '/' || rel === '') rel = '/index.html';
  const destino = path.resolve(base, '.' + rel);
  if (destino !== base && !destino.startsWith(base + path.sep)) return texto404();
  // Sin archivos ocultos (.algo) en ninguna parte de la ruta.
  if (path.relative(base, destino).split(path.sep).some((p) => p.startsWith('.'))) return texto404();
  const tipo = TIPOS[path.extname(destino).toLowerCase()];
  if (!tipo) return texto404();
  fs.stat(destino, (err, st) => {
    if (err || !st.isFile()) return texto404();
    res.writeHead(200, { ...CABECERAS_SEGURIDAD, 'Content-Type': tipo, 'Content-Length': st.size, 'Cache-Control': 'no-cache' });
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(destino).on('error', () => res.destroy()).pipe(res);
  });
}

// --- Aplicación -----------------------------------------------------------------

function crearApp({ config, stellar, almacen, frontendDir = path.join(RAIZ, 'frontend'), planoDir = path.join(RAIZ, 'plano'), ahora = () => Math.floor(Date.now() / 1000), log = console }) {
  const { contractId, cuentas, subjectId } = config;
  const transacciones = [];
  const urlTx = (h) => `${EXPLORADOR}/tx/${h}`;

  function registrarTx(accion, r) {
    if (!r.txHash) return;
    transacciones.unshift({ accion, tx_hash: r.txHash, url: urlTx(r.txHash), ts: ahora() });
    if (transacciones.length > MAX_TRANSACCIONES) transacciones.length = MAX_TRANSACCIONES;
  }

  function notaLocalOError(id) {
    if (!V.esNoteId(id)) throw new ErrorHttp(400, 'note_id_invalido', 'El identificador de la nota no es válido.');
    const n = almacen.obtenerNota(id);
    if (!n) throw new ErrorHttp(404, 'nota_no_encontrada', 'No encontramos esa nota.');
    return n;
  }

  const rutas = {
    'GET /api/config': async () => ({
      red: RED,
      red_texto: 'Stellar testnet · Soroban',
      contract_id: contractId,
      explorador: EXPLORADOR,
      url_contrato: `${EXPLORADOR}/contract/${contractId}`,
      cuentas: { ...cuentas },
      subject_id: subjectId,
    }),

    'POST /api/notas': async (req) => {
      const b = await leerCuerpo(req);
      if (!V.esMonto(b.monto_mxn)) throw new ErrorHttp(400, 'monto_invalido', 'El monto debe ser un número entero de pesos entre 1 y 10,000,000.');
      if (!V.esPlazo(b.plazo_dias)) throw new ErrorHttp(400, 'plazo_invalido', 'El plazo debe ser de 7, 15 o 30 días.');
      const creado_ts = ahora();
      const due_ts = creado_ts + b.plazo_dias * 86400;
      const rango = V.rangoDeMonto(b.monto_mxn);
      const documento = { emisor: 'bodega_a', subject_id: subjectId, monto_mxn: b.monto_mxn, plazo_dias: b.plazo_dias, due_ts, creado_ts };
      const aleatoriedad = crypto.randomBytes(32);
      const note_id = calcularNoteId(documento, aleatoriedad);
      // Primero la cadena; se guarda fuera de cadena solo si la transacción tuvo éxito (sin notas fantasma).
      const r = await stellar.enviar('bodega_a', 'create_note', [
        '--issuer', cuentas.bodega_a, '--note_id', note_id, '--subject_id', subjectId,
        '--amount_bucket', rango, '--due_ts', due_ts,
      ]);
      const nota = {
        note_id, documento, aleatoriedad_hex: aleatoriedad.toString('hex'),
        monto_mxn: b.monto_mxn, rango, plazo_dias: b.plazo_dias, due_ts, creado_ts, emisor: 'bodega_a',
        tx_creacion: r.txHash,
      };
      await almacen.agregarNota(nota);
      registrarTx('Bodega A creó una nota', r);
      const { aleatoriedad_hex, documento: _d, ...publica } = nota;
      return { nota: { ...publica, rango_texto: V.textoDeRango(rango), estado: 'Created', etiqueta: V.etiquetaDeEstado('Created') }, tx_hash: r.txHash, url: r.url };
    },

    'GET /api/notas': async () => {
      const locales = almacen.listarNotas().slice(0, 10);
      const notas = await Promise.all(locales.map(async (n) => {
        let estado = null; let paid_ts = null;
        try {
          const r = await stellar.simular('bodega_a', 'get_note', ['--note_id', n.note_id]);
          if (r.valor && typeof r.valor === 'object') {
            estado = normalizarEstado(r.valor.status);
            paid_ts = typeof r.valor.paid_ts === 'number' ? r.valor.paid_ts : null;
          }
        } catch (_) { /* estado queda en null */ }
        return {
          note_id: n.note_id, monto_mxn: n.monto_mxn, rango: n.rango, rango_texto: V.textoDeRango(n.rango),
          plazo_dias: n.plazo_dias, due_ts: n.due_ts, creado_ts: n.creado_ts, paid_ts,
          estado, etiqueta: V.etiquetaDeEstado(estado),
        };
      }));
      return { notas };
    },

    'GET /api/permisos': async () => {
      const p = almacen.leerPermiso();
      const vigente = !!p && (p.exp_ts === null || p.exp_ts === undefined || p.exp_ts > ahora());
      return { vigente, exp_ts: p && typeof p.exp_ts === 'number' ? p.exp_ts : null };
    },

    'POST /api/permisos': async (req) => {
      const b = await leerCuerpo(req);
      if (b.dias !== 30) throw new ErrorHttp(400, 'dias_invalido', 'El permiso solo se puede dar por 30 días.');
      const t = ahora();
      const exp_ts = t + b.dias * 86400 - 3600; // igual que demo.sh: bajo el tope consent_ttl
      const r = await stellar.enviar('dona_mary', 'grant_consent', [
        '--subject', cuentas.dona_mary, '--reader', cuentas.bodega_b, '--exp_ts', exp_ts, '--nonce', t,
      ]);
      await almacen.guardarPermiso({ exp_ts });
      registrarTx('Doña Mary dio permiso a Bodega B por 30 días', r);
      return { tx_hash: r.txHash, url: r.url, exp_ts };
    },

    'DELETE /api/permisos': async () => {
      try {
        const r = await stellar.enviar('dona_mary', 'revoke_consent', ['--subject', cuentas.dona_mary, '--reader', cuentas.bodega_b]);
        await almacen.borrarPermiso();
        registrarTx('Doña Mary retiró el permiso a Bodega B', r);
        return { tx_hash: r.txHash, url: r.url };
      } catch (e) {
        if (e instanceof ErrorStellar && e.codigoContrato !== null) {
          await almacen.borrarPermiso();
          throw new ErrorHttp(409, 'sin_permiso', 'Bodega B no tenía un permiso vigente; no había nada que retirar.');
        }
        throw e;
      }
    },

    'POST /api/consultas': async () => {
      const args = ['--reader', cuentas.bodega_b, '--subject_id', subjectId];
      try {
        await stellar.simular('bodega_b', 'read_stats', args);
      } catch (e) {
        if (e instanceof ErrorStellar && (e.codigoContrato === 10 || e.codigoContrato === 11)) {
          if (almacen.leerPermiso()) await almacen.borrarPermiso();
          const motivo = e.codigoContrato === 10 ? 'sin_permiso' : 'permiso_vencido';
          const mensaje = motivo === 'sin_permiso'
            ? 'Doña Mary no ha dado permiso a Bodega B. No se hizo la consulta y no se envió ninguna transacción.'
            : 'El permiso de Doña Mary ya venció. No se hizo la consulta y no se envió ninguna transacción.';
          return { permitido: false, motivo, mensaje };
        }
        throw e;
      }
      const r = await stellar.enviar('bodega_b', 'read_stats', args);
      if (!r.valor || typeof r.valor !== 'object') {
        throw new ErrorHttp(502, 'respuesta_invalida', 'La red respondió, pero no pudimos leer el resumen.');
      }
      if (!almacen.leerPermiso()) await almacen.guardarPermiso({ exp_ts: null });
      registrarTx('Bodega B consultó el historial de Doña Mary', r);
      return { permitido: true, stats: r.valor, semaforo: semaforo(r.valor, ahora()), tx_hash: r.txHash, url: r.url };
    },

    'GET /api/semaforo/ejemplo': async () => {
      const t = ahora();
      const stats = statsEjemplo(t);
      return { stats, semaforo: semaforo(stats, t) };
    },

    'GET /api/transacciones': async () => ({ transacciones: transacciones.slice() }),
  };

  // Rutas con parámetro.
  const rutaNota = /^\/api\/notas\/([^/]+)\/(aceptar|pago)$/;
  async function accionNota(id, accion) {
    notaLocalOError(id);
    if (accion === 'aceptar') {
      const r = await stellar.enviar('dona_mary', 'accept_note', ['--subject', cuentas.dona_mary, '--note_id', id]);
      registrarTx('Doña Mary firmó la nota', r);
      return { tx_hash: r.txHash, url: r.url, estado: 'Accepted', etiqueta: V.etiquetaDeEstado('Accepted') };
    }
    // Pago: la misma secuencia que el paso 3 de demo.sh (solo confirm_paid de Bodega A).
    const r = await stellar.enviar('bodega_a', 'confirm_paid', ['--issuer', cuentas.bodega_a, '--note_id', id]);
    registrarTx('Bodega A confirmó el pago', r);
    return { tx_hash: r.txHash, url: r.url, estado: 'Paid', etiqueta: V.etiquetaDeEstado('Paid') };
  }

  return async function manejar(req, res) {
    let url;
    try { url = new URL(req.url, 'http://localhost'); } catch (_) { return responderJson(res, 400, { error: 'url_invalida', mensaje: 'Dirección no válida.' }); }
    const pathname = url.pathname;
    // Del plano solo se sirve la forma autorizada del Pasillo A-B (decisión #48); nada más de plano/.
    if (pathname === '/plano/pasillo-a-b.json') return servirEstatico(req, res, '/pasillo-a-b.json', planoDir);
    if (pathname !== '/api' && !pathname.startsWith('/api/')) return servirEstatico(req, res, pathname, frontendDir);
    try {
      let resultado;
      const m = pathname.match(rutaNota);
      if (m) {
        if (req.method !== 'POST') throw new ErrorHttp(405, 'metodo_no_permitido', 'Método no permitido.');
        await leerCuerpo(req);
        resultado = await accionNota(m[1], m[2]);
      } else {
        const h = rutas[`${req.method} ${pathname}`];
        if (!h) throw new ErrorHttp(404, 'no_encontrado', 'Esa ruta de la API no existe.');
        resultado = await h(req);
      }
      responderJson(res, 200, resultado);
    } catch (e) {
      if (e instanceof ErrorHttp || e instanceof ErrorStellar) return responderJson(res, e.status, { error: e.error, mensaje: e.mensaje });
      log.error(`[api] ${req.method} ${pathname}: error interno (${e && e.name})`);
      responderJson(res, 500, { error: 'error_interno', mensaje: 'Algo salió mal en el servidor. Intenta de nuevo.' });
    }
  };
}

// --- Arranque -------------------------------------------------------------------

function main() {
  let config;
  try { config = cargarConfig(); } catch (e) {
    console.error(`❌ No se pudo arrancar: ${e.message}`);
    process.exit(1);
  }
  const stellar = crearStellar({ contractId: config.contractId, network: RED, explorador: EXPLORADOR });
  const almacen = crearAlmacen(path.join(__dirname, 'datos', 'notas.json'));
  const servidor = http.createServer(crearApp({ config, stellar, almacen }));
  const puerto = Number(process.env.PORT) || 8080;
  servidor.listen(puerto, '127.0.0.1', () => {
    console.log(`Cuentas Claras escuchando en http://127.0.0.1:${puerto} (red: ${RED}; contrato ${config.contractId.slice(0, 6)}…)`);
  });
}

if (require.main === module) main();

module.exports = { crearApp, cargarConfig, leerHmacKey, subjectIdDe, canonico, calcularNoteId, normalizarEstado };
