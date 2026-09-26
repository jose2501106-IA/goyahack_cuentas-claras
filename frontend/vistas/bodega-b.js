// Vista: Bodega B — consultar el historial de Doña Mary (con su permiso).
// El semáforo siempre lleva forma y palabra; nunca se muestra un número calculado.

import {
  el, api, conBoton, comprobante, rotuloDemo, cargando, aviso, textoRango,
} from '../app.js';

let ultimaConsulta = null;

export function render(raiz) {
  const zonaConsulta = el('div', { class: 'resultado-consulta', 'aria-live': 'polite' });
  const zonaEjemplo = el('div', { class: 'zona-ejemplo' });

  const boton = el('button', { type: 'button', class: 'boton boton-primario' }, 'Consultar a Doña Mary');
  boton.addEventListener('click', async () => {
    try {
      const r = await conBoton(boton, () => api('/api/consultas', { metodo: 'POST' }));
      ultimaConsulta = r;
      pintarConsulta(zonaConsulta, r);
    } catch (e) {
      zonaConsulta.replaceChildren(aviso(e.message));
    }
  });

  raiz.append(
    rotuloDemo(),
    el('h1', null, 'Consultar el historial de un cliente'),
    boton,
    zonaConsulta,
    zonaEjemplo,
  );

  if (ultimaConsulta) pintarConsulta(zonaConsulta, ultimaConsulta);
  cargarEjemplo(zonaEjemplo);
}

function pintarConsulta(zona, r) {
  if (!r.permitido) {
    const principal = r.motivo === 'sin_permiso' || !r.mensaje
      ? 'Doña Mary no te ha dado permiso. Sin permiso no se entrega su resumen. Pídeselo en el mostrador.'
      : r.mensaje;
    zona.replaceChildren(el('div', { class: 'tarjeta sin-permiso' },
      el('p', { class: 'sin-permiso-texto' }, principal),
      el('p', { class: 'apoyo' }, 'No se envió ninguna consulta.'),
    ));
    return;
  }

  zona.replaceChildren(el('div', { class: 'tarjeta consulta' },
    semaforo(r.semaforo),
    contadores(r.stats || {}),
    el('p', { class: 'registrada' }, 'Esta consulta quedó registrada · ', comprobante(r.url)),
    el('p', { class: 'apoyo' }, 'La decisión de fiar es tuya; el semáforo solo resume lo firmado.'),
  ));
}

const COLORES = new Set(['verde', 'amarillo', 'rojo', 'insuficiente']);
const FORMAS = { verde: '●', amarillo: '▲', rojo: '■', insuficiente: '○' };
const PALABRAS = { verde: 'Verde', amarillo: 'Amarillo', rojo: 'Rojo', insuficiente: 'Historial insuficiente' };

function semaforo(s) {
  s = s || {};
  const color = COLORES.has(s.color) ? s.color : 'insuficiente';
  const forma = s.forma || FORMAS[color];
  const palabra = s.palabra || PALABRAS[color];

  const bloque = el('div', { class: `semaforo semaforo-${color}` },
    el('p', { class: 'semaforo-senal' },
      el('span', { class: 'semaforo-forma', 'aria-hidden': 'true' }, forma),
      el('span', { class: 'semaforo-palabra' }, palabra),
    ),
  );

  const condiciones = Array.isArray(s.condiciones) ? s.condiciones : [];
  if (condiciones.length) {
    const lista = el('ul', { class: 'condiciones' });
    for (const c of condiciones) {
      lista.append(el('li', { class: c.cumple ? 'cumple' : 'falta' },
        el('span', { class: 'marca-condicion', 'aria-hidden': 'true' }, c.cumple ? '✓' : '✗'),
        el('span', { class: 'lector' }, c.cumple ? 'Se cumple: ' : 'No se cumple: '),
        c.texto || '',
      ));
    }
    bloque.append(lista);
  }

  const abiertas = Number(s.aclaraciones_abiertas) || 0;
  if (abiertas > 0) {
    bloque.append(el('p', { class: 'aclaraciones' },
      abiertas === 1 ? '1 aclaración abierta' : `${abiertas} aclaraciones abiertas`));
  }
  return bloque;
}

function contadores(st) {
  const filas = [
    ['Notas firmadas', st.accepted],
    ['Cumplidas a tiempo', st.paid_on_time],
    ['Cumplidas tarde', st.paid_late],
    ['Vencidas', st.overdue_open],
    ['Incumplidas', st.defaulted],
    ['Bodegas distintas', st.issuers_count],
    ['Rango más alto', textoRango(st.max_bucket)],
  ];
  const dl = el('dl', { class: 'contadores' });
  for (const [k, v] of filas) {
    dl.append(el('div', { class: 'contador' },
      el('dt', null, k),
      el('dd', { class: 'mono' }, v === undefined || v === null ? '—' : String(v)),
    ));
  }
  return dl;
}

async function cargarEjemplo(zona) {
  zona.replaceChildren(cargando('Cargando el ejemplo…'));
  let r;
  try {
    r = await api('/api/semaforo/ejemplo');
  } catch (e) {
    zona.replaceChildren(aviso(e.message));
    return;
  }
  zona.replaceChildren(el('aside', { class: 'tarjeta ejemplo' },
    el('p', { class: 'ejemplo-rotulo' }, 'Ejemplo con datos ficticios · no es una consulta'),
    semaforo(r.semaforo),
    el('p', { class: 'apoyo' }, 'Así se vería con 4 meses de historial en 3 bodegas.'),
  ));
}
