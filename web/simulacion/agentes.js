// Agentes del «Pasillo vivo» (spec web §3; decisión #49): 20 bodegas y 40 clientes
// FICTICIOS que actúan con las reglas de motor.js. Todo es simulación fuera de la cadena:
// un agente nunca firma por una persona real. Las frases son de plantilla; no se usa
// ningún modelo de lenguaje. Mismo resultado con la misma semilla.
'use strict';

(function (raiz) {
  const M = (typeof module !== 'undefined' && module.exports) ? require('./motor.js') : raiz.CC.Motor;

  // Parámetros de simulación: inventados para ilustrar las reglas; no son datos de la Central.
  // aTiempo + tarde + noPaga = 1. permiso = probabilidad de dar permiso cuando una bodega lo pide.
  const PERFILES_BASE = Object.freeze({
    cumplido: { nombre: 'Cumplido', aTiempo: 0.95, tarde: 0.05, noPaga: 0, permiso: 0.9 },
    tarde: { nombre: 'A veces tarde', aTiempo: 0.70, tarde: 0.28, noPaga: 0.02, permiso: 0.8 },
    olvidadizo: { nombre: 'Olvidadizo', aTiempo: 0.50, tarde: 0.40, noPaga: 0.10, permiso: 0.7 },
    moroso: { nombre: 'Moroso', aTiempo: 0.30, tarde: 0.20, noPaga: 0.50, permiso: 0.6 },
  });
  // Cuántos clientes de cada perfil (40 en total).
  const REPARTO = Object.freeze({ cumplido: 14, tarde: 12, olvidadizo: 8, moroso: 6 });

  const N_BODEGAS = 20;
  const SEMILLA = 2026;
  const VISITA_DIARIA = 0.15;   // probabilidad de que un cliente pida fiado en un día
  const BODEGA_CONOCIDA = 0.6;  // probabilidad de volver a una bodega que ya le fió
  const POCO = [1000, 5000];    // «fía poco» para conocerlo: rango $1k–$5k

  function copiarPerfiles(p) {
    const r = {};
    for (const [k, v] of Object.entries(p || PERFILES_BASE)) r[k] = { ...v };
    return r;
  }

  // Normaliza las tres probabilidades de pago de un perfil para que sumen 1.
  function normalizar(perfil) {
    const a = Math.max(0, Number(perfil.aTiempo) || 0);
    const t = Math.max(0, Number(perfil.tarde) || 0);
    const n = Math.max(0, Number(perfil.noPaga) || 0);
    const s = a + t + n || 1;
    const permiso = Math.min(1, Math.max(0, Number(perfil.permiso) || 0));
    return { ...perfil, aTiempo: a / s, tarde: t / s, noPaga: n / s, permiso };
  }

  const pesos = (n) => `$${Math.round(n).toLocaleString('en-US')}`;

  function mezclar(lista, azar) {
    const a = lista.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(azar() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // Elige 20 bodegas repartidas a lo largo de las dos filas del pasillo.
  function elegirPosiciones(forma, azar) {
    const porLado = {};
    for (const b of forma.bodegas) (porLado[b.lado] = porLado[b.lado] || []).push(b);
    const lados = Object.keys(porLado).sort();
    const elegidas = [];
    lados.forEach((lado, i) => {
      const lista = porLado[lado].slice().sort((x, y) => x.x - y.x);
      const cuantas = Math.floor(N_BODEGAS / lados.length) + (i < N_BODEGAS % lados.length ? 1 : 0);
      const paso = lista.length / cuantas;
      for (let k = 0; k < cuantas; k++) {
        const base = Math.floor(k * paso);
        const salto = Math.min(lista.length - 1, base + Math.floor(azar() * Math.max(1, Math.floor(paso))));
        elegidas.push(lista[salto]);
      }
    });
    return elegidas.sort((a, b) => a.x - b.x || a.lado.localeCompare(b.lado));
  }

  function crearPasillo({ forma, semilla = SEMILLA, perfiles } = {}) {
    const azar = M.crearAzar(semilla);
    const tabla = {};
    for (const [k, v] of Object.entries(copiarPerfiles(perfiles))) tabla[k] = normalizar(v);
    const mundo = M.crearMundo();

    const posiciones = forma ? elegirPosiciones(forma, azar) : Array.from({ length: N_BODEGAS }, (_, i) => ({ id: `X-${i}` }));
    const bodegas = posiciones.map((p, i) => ({
      id: `b${i + 1}`, nombre: `Bodega ${i + 1}`, lugar: p.id,
      fiado: 0, notas: 0, ultima: null,
    }));

    const tipos = [];
    for (const [perfil, n] of Object.entries(REPARTO)) for (let i = 0; i < n; i++) tipos.push(perfil);
    const clientes = mezclar(tipos, azar).map((perfil, i) => ({
      id: `c${i + 1}`, nombre: `Cliente ${i + 1}`, perfil,
      conocidas: [], pedidoTipico: azar.entero(2, 16) * 1000, ultima: null,
    }));

    return { mundo, azar, perfiles: tabla, bodegas, clientes, eventos: [], agenda: [], semilla };
  }

  const porId = (lista, id) => lista.find((x) => x.id === id);

  function semaforoDe(p, clienteId) {
    return M.semaforo(M.resumen(p.mundo, clienteId), M.ahoraSeg(p.mundo));
  }

  // Frase de plantilla que explica la decisión de la bodega.
  function frase(decision, monto, stats, sem) {
    const cumplidas = stats ? stats.paid_on_time + stats.paid_late : 0;
    const k = stats ? stats.issuers_count : 0;
    const notas = (n) => `${n} nota${n === 1 ? '' : 's'}`;
    const bodegas = (n) => `${n} bodega${n === 1 ? '' : 's'}`;
    switch (decision) {
      case 'verde':
        return `Le fío ${pesos(monto)}: tiene ${notas(cumplidas)} cumplida${cumplidas === 1 ? '' : 's'} en ${bodegas(k)} (verde).`;
      case 'amarillo':
        return `Le fío la mitad, ${pesos(monto)}: tiene ${cumplidas} cumplida${cumplidas === 1 ? '' : 's'}, pero también ${stats.paid_late} tarde, ${stats.overdue_open} vencida${stats.overdue_open === 1 ? '' : 's'} o ${stats.defaulted} incumplida${stats.defaulted === 1 ? '' : 's'} (amarillo).`;
      case 'rojo':
        return `No le fío: tiene ${notas(stats.defaulted)} incumplida${stats.defaulted === 1 ? '' : 's'} y ${stats.overdue_open} vencida${stats.overdue_open === 1 ? '' : 's'} (rojo). La decisión es mía.`;
      case 'insuficiente': {
        const falta = sem.condiciones.filter((c) => !c.cumple).map((c) => c.texto).join('; ');
        return `Historial insuficiente (pide ${falta}); le fío poco, ${pesos(monto)}, para empezar a conocerlo.`;
      }
      case 'sin_permiso':
      default:
        return `Sin su permiso no veo su resumen; le fío poco, ${pesos(monto)}, para empezar.`;
    }
  }

  function evento(p, datos) {
    const e = { dia: p.mundo.dia, ...datos };
    p.eventos.push(e);
    return e;
  }

  // Un cliente pide fiado en una bodega: permiso, consulta, decisión y firmas.
  function pedirFiado(p, cliente, bodega) {
    const m = p.mundo;
    const perfil = p.perfiles[cliente.perfil];
    const pedido = Math.max(1000, Math.round(cliente.pedidoTipico * (0.6 + 0.8 * p.azar()) / 500) * 500);
    const salida = [];

    let stats = null;
    let sem = null;
    let decision = 'sin_permiso';
    if (!M.permisoVigente(m, cliente.id, bodega.id)) {
      if (p.azar() < perfil.permiso) {
        M.darPermiso(m, cliente.id, bodega.id, cliente.id);
        salida.push(evento(p, { tipo: 'permiso', bodega: bodega.id, cliente: cliente.id, texto: `${cliente.nombre} dio permiso a ${bodega.nombre} por 30 días` }));
      } else {
        salida.push(evento(p, { tipo: 'sin_permiso', bodega: bodega.id, cliente: cliente.id, texto: `${cliente.nombre} no dio permiso a ${bodega.nombre}: no se entrega el resumen` }));
      }
    }
    if (M.permisoVigente(m, cliente.id, bodega.id)) {
      stats = M.leerResumen(m, bodega.id, cliente.id);
      sem = M.semaforo(stats, M.ahoraSeg(m));
      decision = sem.color;
    }

    let monto;
    if (decision === 'verde') monto = pedido;
    else if (decision === 'amarillo') monto = Math.max(500, Math.round(pedido / 2 / 500) * 500);
    else if (decision === 'rojo') monto = 0;
    else monto = Math.min(pedido, p.azar.entero(POCO[0] / 500, POCO[1] / 500) * 500);

    const texto = frase(decision, monto, stats, sem);
    bodega.ultima = { dia: m.dia, cliente: cliente.id, decision, frase: texto };
    cliente.ultima = { dia: m.dia, bodega: bodega.id, decision, frase: texto };

    if (monto === 0) {
      salida.push(evento(p, { tipo: 'no_fio', bodega: bodega.id, cliente: cliente.id, decision, texto: `${bodega.nombre} no le fió a ${cliente.nombre} (rojo)` }));
      return salida;
    }

    const plazo = p.azar.elegir(M.PLAZOS);
    const nota = M.crearNota(m, { bodega: bodega.id, cliente: cliente.id, monto, plazo });
    M.aceptarNota(m, nota.id, cliente.id); // el cliente la acepta en el mostrador
    bodega.fiado += monto;
    bodega.notas += 1;
    if (!cliente.conocidas.includes(bodega.id)) cliente.conocidas.push(bodega.id);
    salida.push(evento(p, {
      tipo: 'fio', bodega: bodega.id, cliente: cliente.id, nota: nota.id, decision,
      texto: `${bodega.nombre} fió a ${cliente.nombre} · ${M.textoRango(nota.rango)} · ${plazo} días`,
    }));

    // Qué hará el cliente con esta nota, según su perfil (se agenda desde hoy).
    const r = p.azar();
    if (r < perfil.aTiempo) {
      p.agenda.push({ dia: m.dia + p.azar.entero(1, plazo), tipo: 'pagar', nota: nota.id });
    } else if (r < perfil.aTiempo + perfil.tarde) {
      p.agenda.push({ dia: nota.vence + p.azar.entero(1, 20), tipo: 'pagar', nota: nota.id });
    } else {
      p.agenda.push({ dia: nota.vence + M.GRACIA_DIAS + 1, tipo: 'incumplir', nota: nota.id });
    }
    return salida;
  }

  // Avanza un día simulado y devuelve los eventos de ese día, en orden.
  function pasoDia(p) {
    const m = p.mundo;
    M.avanzarDia(m);
    const inicio = p.eventos.length;

    // 1) Lo agendado para hoy: pagos y notas que llegan a incumplidas.
    const hoy = p.agenda.filter((a) => a.dia <= m.dia);
    p.agenda = p.agenda.filter((a) => a.dia > m.dia);
    for (const a of hoy) {
      const nota = m.notas.find((n) => n.id === a.nota);
      const bodega = porId(p.bodegas, nota.bodega);
      const cliente = porId(p.clientes, nota.cliente);
      if (a.tipo === 'pagar') {
        M.confirmarPago(m, nota.id, bodega.id);
        const tarde = nota.estado === 'pagada_tarde';
        evento(p, { tipo: 'pago', bodega: bodega.id, cliente: cliente.id, nota: nota.id, tarde, texto: `${cliente.nombre} pagó a ${bodega.nombre}${tarde ? ' (tarde)' : ' a tiempo'}` });
      } else {
        M.marcarIncumplida(m, nota.id, bodega.id);
        evento(p, { tipo: 'incumplida', bodega: bodega.id, cliente: cliente.id, nota: nota.id, texto: `${bodega.nombre} marcó incumplida una nota de ${cliente.nombre} (pasó la gracia de 30 días)` });
      }
    }

    // 2) Visitas: cada cliente, con cierta probabilidad, pide fiado en una bodega sin nota abierta con él.
    for (const cliente of p.clientes) {
      if (p.azar() >= VISITA_DIARIA) continue;
      const abiertas = new Set(m.notas.filter((n) => n.cliente === cliente.id && (n.estado === 'aceptada' || n.estado === 'creada')).map((n) => n.bodega));
      const conocidas = cliente.conocidas.filter((b) => !abiertas.has(b));
      let bodegaId;
      if (conocidas.length && p.azar() < BODEGA_CONOCIDA) bodegaId = p.azar.elegir(conocidas);
      else {
        const libres = p.bodegas.filter((b) => !abiertas.has(b.id));
        if (!libres.length) continue;
        bodegaId = p.azar.elegir(libres).id;
      }
      pedirFiado(p, cliente, porId(p.bodegas, bodegaId));
    }
    return p.eventos.slice(inicio);
  }

  const Agentes = {
    PERFILES_BASE, REPARTO, N_BODEGAS, SEMILLA, VISITA_DIARIA, POCO,
    copiarPerfiles, normalizar, crearPasillo, pasoDia, semaforoDe, frase, pesos,
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = Agentes;
  else (raiz.CC = raiz.CC || {}).Agentes = Agentes;
})(typeof window !== 'undefined' ? window : globalThis);
