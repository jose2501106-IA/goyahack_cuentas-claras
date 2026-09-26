// Forma de los pasillos para el gemelo digital (spec gemelo digital, §4; decisiones #47 y #48).
// El Pasillo A-B viene de plano/pasillo-a-b.json (autorizado por José, #48), que el servidor
// sirve tal cual en /plano/pasillo-a-b.json. Si un pasillo no tiene JSON, generarPasillo
// dibuja un esquema genérico de respaldo con la misma forma de datos.

// Qué cuenta de testnet se dibuja en qué posición. Solo vive aquí, nunca en la
// cadena (regla 1). Posiciones ilustrativas aprobadas por José (26-sep, 08:05).
export const POSICIONES_DEMO = { bodega_a: 'A-17', bodega_b: 'B-40', bodega_c: 'A-73' };

export const NOMBRES_DEMO = { bodega_a: 'Bodega A', bodega_b: 'Bodega B', bodega_c: 'Bodega C' };

// Pasillos del padrón. Solo A-B está en el MVP; los demás, «próximamente».
export const PASILLOS = ['A-B', 'C-D', 'E-F', 'G-H', 'I-J', 'K-L', 'M-N', 'O-P', 'Q-R', 'S-T', 'U-V', 'W-X']; // mismos que otros_pasillos del JSON
export const PASILLOS_ACTIVOS = new Set(['A-B']);

// generarPasillo({ nombre: 'A-B', porFila: 48 }) →
//   { nombre, porFila, superior: [{id:'A-1', lado:'A', numero:1, indice:0}, …],
//     inferior: [{id:'B-2', lado:'B', numero:2, indice:0}, …] }
// Lado superior: nones 1, 3, …; lado inferior: pares 2, 4, … (porFila en cada uno).
export function generarPasillo({ nombre = 'A-B', porFila = 48 } = {}) {
  const [ladoSup, ladoInf] = String(nombre).split('-');
  const superior = [];
  const inferior = [];
  for (let i = 0; i < porFila; i++) {
    superior.push({ id: `${ladoSup}-${2 * i + 1}`, lado: ladoSup, numero: 2 * i + 1, indice: i, fila: 'superior' });
    inferior.push({ id: `${ladoInf}-${2 * i + 2}`, lado: ladoInf, numero: 2 * i + 2, indice: i, fila: 'inferior' });
  }
  return { nombre, porFila, superior, inferior };
}

// Esquema genérico con la misma forma que plano/pasillo-a-b.json (unidades arbitrarias;
// y hacia arriba, origen en la base de la fila inferior).
export function formaGenerica(nombre = 'A-B', porFila = 48) {
  const p = generarPasillo({ nombre, porFila });
  const ancho = 6;
  const paso = 6.4;
  const bodegas = [...p.superior, ...p.inferior].map((b) => ({
    id: b.id, lado: b.lado, numero: b.numero, x: 0.5 + b.indice * paso, w: ancho,
  }));
  const [a, b] = String(nombre).split('-');
  return {
    pasillo: nombre,
    generico: true,
    filas: { [a]: { y: 19, alto: 24 }, [b]: { y: 0, alto: 12 } },
    corredor: { y: 12, alto: 7, rotulo: `Pasillo ${nombre}` },
    bodegas,
    trazos: [],
  };
}

function formaValida(d) {
  return d && Array.isArray(d.bodegas) && d.bodegas.length > 0 && d.filas && d.corredor
    && Array.isArray(d.trazos)
    && d.bodegas.every((b) => typeof b.id === 'string' && Number.isFinite(b.x) && Number.isFinite(b.w) && d.filas[b.lado]);
}

const cache = new Map();

// Forma real del pasillo si existe su JSON; si no, el esquema genérico.
export function cargarPasillo(nombre = 'A-B') {
  if (!cache.has(nombre)) {
    const archivo = `/plano/pasillo-${nombre.toLowerCase()}.json`;
    cache.set(nombre, fetch(archivo, { headers: { Accept: 'application/json' } })
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null)
      .then((d) => (formaValida(d) ? d : formaGenerica(nombre))));
  }
  return cache.get(nombre);
}
