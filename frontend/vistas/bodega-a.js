// Vista: Bodega A-17 — crear notas de fiado y confirmar pagos.

import {
  el, api, conBoton, comprobante, rotuloDemo, cargando, aviso, sello,
  monto, fecha, etiquetaEstado,
} from '../app.js';

// Último resultado de una acción, para que siga visible al volver a la pestaña.
let ultimo = null;

export function render(raiz) {
  const zonaResultado = el('div', { class: 'resultado', 'aria-live': 'polite' });
  const zonaLista = el('div', { class: 'lista-notas' });

  const campoMonto = el('input', {
    id: 'monto', name: 'monto', type: 'number', inputmode: 'numeric',
    min: '1', max: '10000000', step: '1', required: true, value: '8500',
  });
  const campoPlazo = el('select', { id: 'plazo', name: 'plazo' },
    el('option', { value: '7' }, '7 días'),
    el('option', { value: '15', selected: true }, '15 días'),
    el('option', { value: '30' }, '30 días'),
  );
  const botonCrear = el('button', { type: 'submit', class: 'boton boton-primario' }, 'Crear nota');

  const formulario = el('form', { class: 'tarjeta formulario', novalidate: true },
    el('div', { class: 'campo' },
      el('span', { class: 'campo-etiqueta' }, 'Cliente'),
      el('p', { class: 'campo-fijo' }, 'Doña Mary'),
    ),
    el('div', { class: 'campo' },
      el('label', { for: 'monto', class: 'campo-etiqueta' }, 'Monto en MXN'),
      campoMonto,
    ),
    el('div', { class: 'campo' },
      el('label', { for: 'plazo', class: 'campo-etiqueta' }, 'Plazo'),
      campoPlazo,
    ),
    botonCrear,
    el('p', { class: 'apoyo' }, 'El monto exacto se queda en tu registro; en la nota firmada solo va el rango.'),
  );

  formulario.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const valor = Number(campoMonto.value);
    const plazo = Number(campoPlazo.value);
    if (!Number.isInteger(valor) || valor < 1 || valor > 10000000) {
      mostrar(zonaResultado, { error: 'Escribe un monto entero entre $1 y $10,000,000.' });
      return;
    }
    if (![7, 15, 30].includes(plazo)) {
      mostrar(zonaResultado, { error: 'El plazo debe ser de 7, 15 o 30 días.' });
      return;
    }
    try {
      const r = await conBoton(botonCrear, () => api('/api/notas', {
        metodo: 'POST', cuerpo: { monto_mxn: valor, plazo_dias: plazo },
      }));
      const n = r.nota || {};
      ultimo = {
        texto: `Nota registrada: ${monto(n.monto_mxn)} (${n.rango_texto || 'rango'}), vence el ${fecha(n.due_ts)}. Esperando firma del cliente.`,
        url: r.url,
      };
      mostrar(zonaResultado, ultimo);
      cargarNotas(zonaLista, zonaResultado);
    } catch (e) {
      mostrar(zonaResultado, { error: e.message });
    }
  });

  raiz.append(
    rotuloDemo(),
    el('h1', null, 'Nueva nota de fiado'),
    formulario,
    zonaResultado,
    el('h2', null, 'Notas de Doña Mary'),
    zonaLista,
  );

  if (ultimo) mostrar(zonaResultado, ultimo);
  cargarNotas(zonaLista, zonaResultado);
}

function mostrar(zona, { texto, url, error }) {
  zona.replaceChildren();
  if (error) { zona.append(aviso(error)); return; }
  zona.append(el('p', { class: 'aviso aviso-ok' }, texto, ' ', comprobante(url)));
}

async function cargarNotas(zona, zonaResultado) {
  zona.replaceChildren(cargando('Leyendo las notas firmadas…'));
  let notas;
  try {
    const r = await api('/api/notas');
    notas = Array.isArray(r.notas) ? r.notas : [];
  } catch (e) {
    zona.replaceChildren(aviso(e.message));
    return;
  }
  if (notas.length === 0) {
    zona.replaceChildren(el('p', { class: 'vacio' }, 'Todavía no hay notas.'));
    return;
  }
  // Un solo sello por pantalla: en la nota pagada más reciente (la lista llega
  // de la más reciente a la más antigua).
  const idSello = (notas.find((n) => n.estado === 'Paid') || {}).note_id;

  const lista = el('ul', { class: 'notas' });
  for (const n of notas) {
    lista.append(filaNota(n, n.note_id === idSello, zona, zonaResultado));
  }
  zona.replaceChildren(lista);
}

function filaNota(n, conSello, zonaLista, zonaResultado) {
  const acciones = el('div', { class: 'nota-acciones' });
  if (n.estado === 'Accepted') {
    const boton = el('button', { type: 'button', class: 'boton boton-primario' }, 'Confirmar pago');
    boton.addEventListener('click', async () => {
      try {
        const r = await conBoton(boton, () => api(`/api/notas/${encodeURIComponent(n.note_id)}/pago`, { metodo: 'POST' }));
        ultimo = { texto: `Pago confirmado: la nota de ${monto(n.monto_mxn)} quedó cumplida.`, url: r.url };
        mostrar(zonaResultado, ultimo);
        cargarNotas(zonaLista, zonaResultado);
      } catch (e) {
        mostrar(zonaResultado, { error: e.message });
      }
    });
    acciones.append(boton);
  }

  return el('li', { class: `nota tarjeta estado-${String(n.estado || 'ninguno').toLowerCase()}` },
    el('div', { class: 'nota-cuerpo' },
      el('p', { class: 'nota-monto' }, monto(n.monto_mxn)),
      el('p', { class: 'nota-rango' }, 'En la nota firmada: ', el('strong', null, n.rango_texto || '—')),
      el('p', { class: 'nota-fechas' },
        `Plazo ${n.plazo_dias ?? '—'} días · vence el `, el('span', { class: 'mono' }, fecha(n.due_ts)),
      ),
      el('p', { class: 'nota-estado' }, el('span', { class: 'etiqueta-estado' }, etiquetaEstado(n))),
      acciones,
    ),
    conSello ? sello(n.paid_ts) : null,
  );
}
