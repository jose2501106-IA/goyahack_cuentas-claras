// Construye web/datos/repeticion.json SOLO a partir de demo/salida-demo.txt y
// demo/deploy.json (spec web §4). No inventa hashes: cada hash sale de un enlace
// «↳ https://stellar.expert/…/tx/<hash>» de la salida real de demo/demo.sh.
// Un paso sin enlace queda sin hash y con la razón que dice la propia salida.
//
// Uso: node web/herramientas/generar-repeticion.js   (después: generar-datos.js)
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const RAIZ = path.join(__dirname, '..', '..');
const SALIDA = path.join(RAIZ, 'demo', 'salida-demo.txt');
const DEPLOY = path.join(RAIZ, 'demo', 'deploy.json');
const DESTINO = path.join(RAIZ, 'web', 'datos', 'repeticion.json');

// Quién firma cada paso de demo.sh: se lee del sujeto de la frase de la salida.
// Clave = cuenta de demo/deploy.json (cuentas_publicas); null = no hubo transacción.
const QUIEN_FIRMA = {
  1: { cuenta: 'bodega_a', nombre: 'Bodega A', funcion: 'create_note' },
  2: { cuenta: 'dona_mary', nombre: 'Doña Mary', funcion: 'accept_note' },
  3: { cuenta: 'bodega_a', nombre: 'Bodega A', funcion: 'confirm_paid' },
  4: null,
  5: { cuenta: 'dona_mary', nombre: 'Doña Mary', funcion: 'grant_consent' },
  6: { cuenta: 'bodega_b', nombre: 'Bodega B', funcion: 'read_stats' },
};

const RE_TX = /^https:\/\/stellar\.expert\/explorer\/testnet\/tx\/([0-9a-f]{64})$/;

function leerSalida(texto) {
  const lineas = texto.split('\n');
  const pasos = [];
  let actual = null;
  let enResumen = false;
  const resumen = {};
  let contrato = null;
  for (const cruda of lineas) {
    const l = cruda.trim();
    const mc = l.match(/^Contrato:\s+(C[A-Z2-7]{55})$/);
    if (mc) contrato = mc[1];
    const mp = l.match(/^(\d+)\)\s+(.+)$/);
    if (mp) {
      actual = { numero: Number(mp[1]), accion: mp[2], hash: null, url: null, sin_transaccion: null, notas: [] };
      pasos.push(actual);
      enResumen = false;
      continue;
    }
    if (!actual) continue;
    if (l.startsWith('↳ ')) {
      const url = l.slice(2).trim();
      const m = url.match(RE_TX);
      if (!m) throw new Error(`Enlace inesperado en el paso ${actual.numero}: ${url}`);
      actual.url = url;
      actual.hash = m[1];
    } else if (l.startsWith('✅ esperado:')) {
      actual.sin_transaccion = l.replace(/^✅ esperado:\s*/, '');
    } else if (l.startsWith('── Resumen')) {
      enResumen = true;
    } else if (enResumen && /^[^:]+:\s+\S+/.test(l) && !l.startsWith('✅')) {
      const [k, ...v] = l.split(':');
      resumen[k.trim()] = v.join(':').trim();
    } else if (l.startsWith('✅')) {
      actual = null;
      enResumen = false;
    } else if (l && !enResumen) {
      actual.notas.push(l);
    }
  }
  return { contrato, pasos, resumen };
}

function construir() {
  const salida = fs.readFileSync(SALIDA, 'utf8');
  const deploy = JSON.parse(fs.readFileSync(DEPLOY, 'utf8'));
  const { contrato, pasos, resumen } = leerSalida(salida);
  if (contrato !== deploy.contract_id) {
    throw new Error(`El contrato de la salida (${contrato}) no es el de deploy.json (${deploy.contract_id}).`);
  }
  return {
    fuente: 'Generado por web/herramientas/generar-repeticion.js solo con demo/salida-demo.txt y demo/deploy.json. No editar a mano.',
    red: 'Stellar testnet',
    contrato: {
      id: deploy.contract_id,
      url: deploy.exploradores.contrato,
      desplegado_utc: deploy.desplegado_utc,
    },
    pasos: pasos.map((p) => {
      const firma = QUIEN_FIRMA[p.numero];
      return {
        numero: p.numero,
        accion: p.accion,
        firma: firma ? firma.nombre : null,
        cuenta_publica: firma ? deploy.cuentas_publicas[firma.cuenta] : null,
        funcion: firma ? firma.funcion : 'read_stats (simulación, sin enviar)',
        hash: p.hash,
        url: p.url,
        sin_transaccion: p.hash ? null : 'No se envió transacción: el contrato lo rechazó.',
        detalle_salida: p.sin_transaccion || (p.notas.length ? p.notas.join(' ') : null),
      };
    }),
    resumen_paso_6: resumen,
  };
}

if (require.main === module) {
  const datos = construir();
  fs.writeFileSync(DESTINO, `${JSON.stringify(datos, null, 2)}\n`);
  console.log(`Escrito ${path.relative(RAIZ, DESTINO)} con ${datos.pasos.length} pasos.`);
}

module.exports = { leerSalida, construir, QUIEN_FIRMA, RE_TX };
