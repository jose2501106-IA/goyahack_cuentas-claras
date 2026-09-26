// Servidor local de prueba: sirve web/ con las MISMAS cabeceras de web/vercel.json, para
// revisar la CSP antes de publicar (decisión #56, W1). Solo módulos nativos; no se publica.
// Uso: node web/herramientas/servidor-prueba.js [puerto]   (por omisión, 8765)
'use strict';

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const WEB = path.join(__dirname, '..');
const cabeceras = Object.fromEntries(
  JSON.parse(fs.readFileSync(path.join(WEB, 'vercel.json'), 'utf8')).headers[0].headers.map((h) => [h.key, h.value]),
);
const TIPOS = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml' };

function crear() {
  return http.createServer((req, res) => {
    const ruta = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    const archivo = path.join(WEB, ruta === '/' ? 'index.html' : ruta);
    const oculto = /^\/(pruebas|herramientas)\//.test(ruta); // igual que .vercelignore
    if (oculto || !archivo.startsWith(WEB + path.sep) || !fs.existsSync(archivo) || !fs.statSync(archivo).isFile()) {
      res.writeHead(404, { ...cabeceras, 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('No encontrado');
    }
    res.writeHead(200, { ...cabeceras, 'Content-Type': TIPOS[path.extname(archivo)] || 'application/octet-stream' });
    fs.createReadStream(archivo).pipe(res);
  });
}

if (require.main === module) {
  const puerto = Number(process.argv[2]) || 8765;
  crear().listen(puerto, '127.0.0.1', () => console.log(`web/ con cabeceras de vercel.json en http://127.0.0.1:${puerto}`));
}

module.exports = { crear, cabeceras };
