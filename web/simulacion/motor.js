// Motor del «Pasillo vivo» (spec web §3; decisión #49): las reglas del contrato
// cuentas_claras y del semáforo, reimplementadas FUERA DE LA CADENA para una
// simulación con personajes ficticios. Tiempo en días simulados y azar con semilla,
// para que la demo sea reproducible. Nada de aquí firma ni toca Stellar.
//
// Reglas (contracts/cuentas_claras/src/lib.rs y spec v2):
// - Nota: la crea la bodega (estado «creada») y solo cuenta cuando el cliente la acepta,
//   dentro de 72 h (3 días); si no, se cancela. Plazo de 7, 15 o 30 días.
// - Pago: lo confirma la bodega emisora; a tiempo si el día ≤ vencimiento, si no, tarde.
// - Vencida: aceptada y sin pagar después del vencimiento.
// - Incumplida: solo la bodega emisora, y solo si el día > vencimiento + 30 días de gracia.
// - Permiso: lo da el cliente a una bodega y dura 30 días. Sin permiso vigente nadie lee
//   el resumen, TAMPOCO la bodega que ya le fió (decisión #46). El cliente lee el suyo.
//   Cada lectura queda registrada (constancia).
// - Semáforo: el mismo de backend/semaforo.js (spec frontend §4); una prueba los compara.
//
// Simplificación declarada: en el contrato, una nota marcada «vencida» con `touch` ya no
// se confirma con `confirm_paid` sino por aclaración; aquí una nota vencida que se paga
// antes de la gracia cuenta como pagada tarde, que es el resultado que busca la aclaración.
'use strict';

(function (raiz) {
  const DIA = 86400;
  const TS_BASE = 1_800_000_000;  // origen arbitrario del reloj simulado, en segundos
  const VENTANA_ACEPTAR_DIAS = 3; // accept_window: 72 h
  const GRACIA_DIAS = 30;         // grace_period
  const PERMISO_DIAS = 30;        // consent_ttl
  const PLAZOS = Object.freeze([7, 15, 30]);

  // --- Semáforo: copia de la fórmula de backend/semaforo.js. Cambiar en los dos. ---
  const UMBRAL_VERDE = 0.80;
  const UMBRAL_AMARILLO = 0.50;
  const MIN_CERRADAS = 3;
  const MIN_BODEGAS = 2;
  const MIN_DIAS = 60;
  const BODEGAS_PLENAS = 3;
  const COLORES = Object.freeze({
    verde: { palabra: 'Verde', forma: '●' },
    amarillo: { palabra: 'Amarillo', forma: '▲' },
    rojo: { palabra: 'Rojo', forma: '■' },
    insuficiente: { palabra: 'Historial insuficiente', forma: '○' },
  });

  // Rangos de monto del contrato (AmountBucket) y su orden.
  const RANGOS = Object.freeze([
    { clave: 'B0_1k', texto: '$0–$1k', hasta: 1000 },
    { clave: 'B1k_5k', texto: '$1k–$5k', hasta: 5000 },
    { clave: 'B5k_20k', texto: '$5k–$20k', hasta: 20000 },
    { clave: 'B20k_50k', texto: '$20k–$50k', hasta: 50000 },
    { clave: 'B50kPlus', texto: 'más de $50k', hasta: Infinity },
  ]);

  class ErrorMotor extends Error {
    constructor(codigo, mensaje) {
      super(mensaje || codigo);
      this.codigo = codigo;
    }
  }

  // Azar con semilla (mulberry32): mismo resultado en cualquier navegador.
  function crearAzar(semilla) {
    let a = semilla >>> 0;
    const azar = function azar() {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    azar.entero = (min, max) => min + Math.floor(azar() * (max - min + 1));
    azar.elegir = (lista) => lista[Math.floor(azar() * lista.length)];
    return azar;
  }

  function rangoDeMonto(monto) {
    const i = RANGOS.findIndex((r) => monto < r.hasta);
    return RANGOS[i < 0 ? RANGOS.length - 1 : i].clave;
  }
  function textoRango(clave) {
    const r = RANGOS.find((x) => x.clave === clave);
    return r ? r.texto : clave;
  }
  function ordenRango(clave) { return RANGOS.findIndex((r) => r.clave === clave); }

  function num(v) {
    const n = Number(v);
    return Number.isFinite(n) && n > 0 ? n : 0;
  }

  function semaforo(stats, ahoraSeg) {
    const s = stats || {};
    const paidOnTime = num(s.paid_on_time);
    const paidLate = num(s.paid_late);
    const defaulted = num(s.defaulted);
    const overdueOpen = num(s.overdue_open);
    const issuers = num(s.issuers_count);
    const firstTs = num(s.first_ts);

    const cerradas = paidOnTime + paidLate + defaulted;
    const dias = firstTs === 0 ? 0 : Math.max(0, Math.floor((ahoraSeg - firstTs) / DIA));

    const condiciones = [
      { clave: 'cerradas', texto: `${MIN_CERRADAS} notas cerradas (tiene ${cerradas})`, cumple: cerradas >= MIN_CERRADAS, tiene: cerradas, requerido: MIN_CERRADAS },
      { clave: 'bodegas', texto: `${MIN_BODEGAS} bodegas distintas (tiene ${issuers})`, cumple: issuers >= MIN_BODEGAS, tiene: issuers, requerido: MIN_BODEGAS },
      { clave: 'dias', texto: `${MIN_DIAS} días de historial (tiene ${dias})`, cumple: dias >= MIN_DIAS, tiene: dias, requerido: MIN_DIAS },
    ];

    let color;
    if (!condiciones.every((c) => c.cumple)) {
      color = 'insuficiente';
    } else {
      const r = paidOnTime + 0.5 * paidLate;
      const sMal = defaulted + 0.5 * overdueOpen; // las aclaraciones abiertas NO suman
      const p = ((r + 1) / (r + sMal + 2)) * Math.min(1, issuers / BODEGAS_PLENAS);
      color = p >= UMBRAL_VERDE ? 'verde' : p >= UMBRAL_AMARILLO ? 'amarillo' : 'rojo';
    }

    return {
      color,
      palabra: COLORES[color].palabra,
      forma: COLORES[color].forma,
      condiciones,
      aclaraciones_abiertas: num(s.disputes_open),
    };
  }

  // ---------- Mundo simulado ----------

  function crearMundo() {
    return { dia: 0, notas: [], permisos: new Map(), lecturas: [], siguienteId: 1 };
  }

  const ts = (dia) => TS_BASE + dia * DIA;
  function ahoraSeg(m) { return ts(m.dia); }
  const clavePermiso = (cliente, bodega) => `${cliente}|${bodega}`;

  function buscar(m, id) {
    const n = m.notas.find((x) => x.id === id);
    if (!n) throw new ErrorMotor('NotaNoExiste');
    return n;
  }

  function crearNota(m, { bodega, cliente, monto, plazo }) {
    if (!PLAZOS.includes(plazo)) throw new ErrorMotor('PlazoInvalido', 'El plazo debe ser de 7, 15 o 30 días.');
    if (!(monto > 0)) throw new ErrorMotor('MontoInvalido');
    const nota = {
      id: m.siguienteId++, bodega, cliente,
      monto, // el monto exacto vive fuera de la cadena; al «contrato» solo le importa el rango
      rango: rangoDeMonto(monto),
      creada: m.dia, vence: m.dia + plazo, plazo,
      estado: 'creada', aceptada: null, pagada: null, incumplida: null,
    };
    m.notas.push(nota);
    return nota;
  }

  // Segunda firma: solo el cliente de la nota, dentro de 72 h.
  function aceptarNota(m, id, quien) {
    const n = buscar(m, id);
    if (quien !== n.cliente) throw new ErrorMotor('NoEsParte', 'Solo el cliente de la nota puede aceptarla.');
    if (n.estado !== 'creada') throw new ErrorMotor('TransicionInvalida');
    if (m.dia > n.creada + VENTANA_ACEPTAR_DIAS) throw new ErrorMotor('VentanaCerrada', 'Pasaron las 72 horas para aceptar.');
    n.estado = 'aceptada';
    n.aceptada = m.dia;
    return n;
  }

  function confirmarPago(m, id, quien) {
    const n = buscar(m, id);
    if (quien !== n.bodega) throw new ErrorMotor('NoEsParte', 'Solo la bodega que fió confirma el pago.');
    if (n.estado !== 'aceptada') throw new ErrorMotor('TransicionInvalida');
    n.estado = m.dia <= n.vence ? 'pagada_a_tiempo' : 'pagada_tarde';
    n.pagada = m.dia;
    return n;
  }

  function marcarIncumplida(m, id, quien) {
    const n = buscar(m, id);
    if (quien !== n.bodega) throw new ErrorMotor('NoEsParte');
    if (n.estado !== 'aceptada' || m.dia <= n.vence) throw new ErrorMotor('TransicionInvalida', 'Solo una nota vencida puede marcarse incumplida.');
    if (m.dia <= n.vence + GRACIA_DIAS) throw new ErrorMotor('DemasiadoPronto', 'Todavía corren los 30 días de gracia.');
    n.estado = 'incumplida';
    n.incumplida = m.dia;
    return n;
  }

  // Estado para mostrar: «vencida» es una nota aceptada, sin pagar, pasado su plazo.
  function estadoVisible(m, n) {
    return n.estado === 'aceptada' && m.dia > n.vence ? 'vencida' : n.estado;
  }

  // Avanza un día y cancela las notas sin aceptar después de 72 h.
  function avanzarDia(m) {
    m.dia += 1;
    const canceladas = [];
    for (const n of m.notas) {
      if (n.estado === 'creada' && m.dia > n.creada + VENTANA_ACEPTAR_DIAS) {
        n.estado = 'cancelada';
        canceladas.push(n);
      }
    }
    return canceladas;
  }

  function darPermiso(m, cliente, bodega, quien) {
    if (quien !== cliente) throw new ErrorMotor('NoEsParte', 'Solo el cliente da permiso sobre su resumen.');
    const exp = m.dia + PERMISO_DIAS;
    m.permisos.set(clavePermiso(cliente, bodega), exp);
    return exp;
  }
  function quitarPermiso(m, cliente, bodega, quien) {
    if (quien !== cliente) throw new ErrorMotor('NoEsParte');
    m.permisos.delete(clavePermiso(cliente, bodega));
  }
  function permisoVigente(m, cliente, bodega) {
    const exp = m.permisos.get(clavePermiso(cliente, bodega));
    return exp !== undefined && exp > m.dia;
  }

  // Agregado del cliente con la forma de SubjectStats (solo notas aceptadas).
  function resumen(m, cliente) {
    const s = {
      accepted: 0, paid_on_time: 0, paid_late: 0, overdue_open: 0, defaulted: 0,
      disputes_open: 0, disputes_resolved: 0, issuers_count: 0,
      first_ts: 0, last_ts: 0, max_bucket: 'B0_1k',
    };
    const bodegas = new Set();
    for (const n of m.notas) {
      if (n.cliente !== cliente || n.aceptada === null) continue;
      s.accepted += 1;
      bodegas.add(n.bodega);
      if (s.first_ts === 0 || ts(n.aceptada) < s.first_ts) s.first_ts = ts(n.aceptada);
      s.last_ts = Math.max(s.last_ts, ts(n.pagada ?? n.incumplida ?? n.aceptada));
      if (ordenRango(n.rango) > ordenRango(s.max_bucket)) s.max_bucket = n.rango;
      const e = estadoVisible(m, n);
      if (e === 'pagada_a_tiempo') s.paid_on_time += 1;
      else if (e === 'pagada_tarde') s.paid_late += 1;
      else if (e === 'incumplida') s.defaulted += 1;
      else if (e === 'vencida') s.overdue_open += 1;
    }
    s.issuers_count = bodegas.size;
    return s;
  }

  // Consulta oficial (read_stats): el propio cliente, o una bodega con permiso vigente.
  // Ninguna excepción para la bodega que ya le fió (#46). Cada lectura deja constancia.
  function leerResumen(m, lector, cliente) {
    if (lector !== cliente) {
      const exp = m.permisos.get(clavePermiso(cliente, lector));
      if (exp === undefined) throw new ErrorMotor('SinPermiso', 'Sin permiso no se entrega el resumen.');
      if (exp <= m.dia) throw new ErrorMotor('PermisoVencido', 'El permiso ya venció.');
    }
    m.lecturas.push({ dia: m.dia, lector, cliente });
    return resumen(m, cliente);
  }

  const Motor = {
    DIA, TS_BASE, VENTANA_ACEPTAR_DIAS, GRACIA_DIAS, PERMISO_DIAS, PLAZOS, RANGOS, COLORES,
    UMBRAL_VERDE, UMBRAL_AMARILLO, MIN_CERRADAS, MIN_BODEGAS, MIN_DIAS,
    ErrorMotor, crearAzar, rangoDeMonto, textoRango, semaforo,
    crearMundo, ahoraSeg, crearNota, aceptarNota, confirmarPago, marcarIncumplida,
    estadoVisible, avanzarDia, darPermiso, quitarPermiso, permisoVigente, resumen, leerResumen,
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = Motor;
  else (raiz.CC = raiz.CC || {}).Motor = Motor;
})(typeof window !== 'undefined' ? window : globalThis);
