// Esquema genérico de un pasillo de la Central (spec gemelo digital, §4).
// No viene del plano: bodegas numeradas del mismo ancho, sin huecos ni bloques,
// con el corredor en medio. Esquema ilustrativo, no a escala.

// Qué cuenta de testnet se dibuja en qué posición. Solo vive aquí, nunca en la
// cadena (regla 1). Posiciones ilustrativas aprobadas por José (26-sep, 08:05).
export const POSICIONES_DEMO = { bodega_a: 'A-17', bodega_b: 'B-40', bodega_c: 'A-73' };

export const NOMBRES_DEMO = { bodega_a: 'Bodega A', bodega_b: 'Bodega B', bodega_c: 'Bodega C' };

// Pasillos del padrón. Solo A-B está en el MVP; los demás, «próximamente».
export const PASILLOS = ['A-B', 'C-D', 'E-F', 'G-H', 'I-J', 'K-L', 'M-N', 'O-P', 'Q-R', 'S-T', 'U-V', 'W-X'];
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
