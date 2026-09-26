// Permite correr `node --test web/pruebas/` en Node 22, que no acepta carpetas:
// Node carga esta carpeta como módulo y aquí se cargan todas las pruebas.
// (También sirve: node --test web/pruebas/*.test.js)
'use strict';
const fs = require('node:fs');
for (const f of fs.readdirSync(__dirname).filter((n) => n.endsWith('.test.js')).sort()) {
  require(`./${f}`);
}
