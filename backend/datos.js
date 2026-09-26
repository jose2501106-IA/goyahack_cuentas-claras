'use strict';
// Datos fuera de cadena (monto exacto, aleatoriedad del documento, permiso local).
// Archivo JSON en backend/datos/notas.json (ignorado por git). Escritura atómica:
// archivo temporal + rename. Las escrituras se serializan dentro del proceso.

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

const VACIO = () => ({ notas: [], permiso: null });

function crearAlmacen(ruta) {
  const dir = path.dirname(ruta);
  let cadena = Promise.resolve();

  function leer() {
    try {
      const d = JSON.parse(fs.readFileSync(ruta, 'utf8'));
      return {
        notas: Array.isArray(d.notas) ? d.notas : [],
        permiso: d.permiso && typeof d.permiso === 'object' ? d.permiso : null,
      };
    } catch (e) {
      if (e.code === 'ENOENT') return VACIO();
      throw e;
    }
  }

  function escribir(datos) {
    fs.mkdirSync(dir, { recursive: true });
    const tmp = path.join(dir, `.notas.${process.pid}.${crypto.randomBytes(6).toString('hex')}.tmp`);
    fs.writeFileSync(tmp, JSON.stringify(datos, null, 2) + '\n', { mode: 0o600 });
    fs.renameSync(tmp, ruta);
  }

  // Aplica fn(datos) → datos modificados, en serie.
  function modificar(fn) {
    const p = cadena.then(() => {
      const d = leer();
      const r = fn(d);
      escribir(d);
      return r;
    });
    cadena = p.catch(() => {});
    return p;
  }

  return {
    ruta,
    leer,
    listarNotas() {
      return leer().notas.slice().sort((a, b) => (b.creado_ts || 0) - (a.creado_ts || 0));
    },
    obtenerNota(noteId) {
      return leer().notas.find((n) => n.note_id === noteId) || null;
    },
    agregarNota(nota) {
      return modificar((d) => { d.notas.push(nota); });
    },
    leerPermiso() {
      return leer().permiso;
    },
    guardarPermiso(permiso) {
      return modificar((d) => { d.permiso = permiso; });
    },
    borrarPermiso() {
      return modificar((d) => { d.permiso = null; });
    },
  };
}

module.exports = { crearAlmacen };
