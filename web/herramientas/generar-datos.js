// Genera web/datos/*.js a partir de web/datos/*.json, con el JSON copiado tal cual.
// Motivo: el sitio debe abrir también con solo abrir index.html (file://), donde el
// navegador no deja hacer fetch de archivos locales. Un <script> sí se carga.
// La prueba web/pruebas/datos.test.js verifica que el texto envuelto es idéntico al JSON.
//
// Uso: node web/herramientas/generar-datos.js
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const DIR = path.join(__dirname, '..', 'datos');
const INICIO = '/* generado por web/herramientas/generar-datos.js; no editar a mano */\n'
  + '(window.CC_DATOS = window.CC_DATOS || {})[';
const MEDIO = '] = ';
const FIN = ';\n';

function envolver(nombre, texto) {
  return `${INICIO}${JSON.stringify(nombre)}${MEDIO}${texto.replace(/\n$/, '')}${FIN}`;
}

// Devuelve el texto JSON que lleva dentro un archivo generado (para la prueba).
function desenvolver(js) {
  if (!js.startsWith(INICIO) || !js.endsWith(FIN)) return null;
  const resto = js.slice(INICIO.length, -FIN.length);
  const i = resto.indexOf(MEDIO);
  if (i < 0) return null;
  return { nombre: JSON.parse(resto.slice(0, i)), texto: resto.slice(i + MEDIO.length) };
}

function generar() {
  const hechos = [];
  for (const archivo of fs.readdirSync(DIR).filter((f) => f.endsWith('.json')).sort()) {
    const nombre = archivo.replace(/\.json$/, '');
    const texto = fs.readFileSync(path.join(DIR, archivo), 'utf8');
    JSON.parse(texto); // falla si el JSON no es válido
    fs.writeFileSync(path.join(DIR, `${nombre}.js`), envolver(nombre, texto));
    hechos.push(`${nombre}.js`);
  }
  return hechos;
}

if (require.main === module) {
  console.log(`Generados: ${generar().join(', ')}`);
}

module.exports = { envolver, desenvolver, generar };
