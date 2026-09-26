// Vista: Teléfono de Doña Mary — aceptar notas y administrar permisos.

import {
  el, api, conBoton, comprobante, rotuloDemo, cargando, aviso, sello,
  fecha, etiquetaEstado,
} from '../app.js';

let ultimo = null;

export function render(raiz) {
  const zonaResultado = el('div', { class: 'resultado', 'aria-live': 'polite' });
  const zonaNota = el('div', { class: 'tel-nota' });
  const zonaPermiso = el('div', { class: 'tel-permiso' });

  const telefono = el('div', { class: 'telefono' },
    el('div', { class: 'telefono-barra', 'aria-hidden': 'true' }),
    el('div', { class: 'telefono-pantalla' },
      el('p', { class: 'tel-encabezado' }, 'Tu palabra vale.'),
      zonaNota,
      zonaResultado,
      el('h2', { class: 'tel-subtitulo' }, 'Permisos'),
      zonaPermiso,
      el('p', { class: 'tel-privacidad' },
        'En la cadena no va tu nombre, tu teléfono ni el monto exacto. Tú decides a qué bodega le das permiso de pedir tu resumen; cada consulta queda registrada.'),
    ),
  );

  raiz.append(rotuloDemo(), telefono);

  const ctx = { zonaResultado, zonaNota, zonaPermiso };
  if (ultimo) mostrar(zonaResultado, ultimo);
  cargarNota(ctx);
  cargarPermiso(ctx);
}

function mostrar(zona, { texto, url, error }) {
  zona.replaceChildren();
  if (error) { zona.append(aviso(error)); return; }
  zona.append(el('p', { class: 'aviso aviso-ok' }, texto, ' ', comprobante(url)));
}

async function cargarNota(ctx) {
  const zona = ctx.zonaNota;
  zona.replaceChildren(cargando('Buscando tus notas…'));
  let notas;
  try {
    const r = await api('/api/notas');
    notas = Array.isArray(r.notas) ? r.notas : [];
  } catch (e) {
    zona.replaceChildren(aviso(e.message));
    return;
  }

  const pendiente = notas.find((n) => n.estado === 'Created');
  const reciente = notas[0];

  if (pendiente) {
    const boton = el('button', { type: 'button', class: 'boton boton-primario boton-ancho' }, 'Acepto');
    boton.addEventListener('click', async () => {
      try {
        const r = await conBoton(boton, () => api(`/api/notas/${encodeURIComponent(pendiente.note_id)}/aceptar`, { metodo: 'POST' }));
        ultimo = { texto: 'Firmaste la nota. Queda firmada por los dos.', url: r.url };
        mostrar(ctx.zonaResultado, ultimo);
        cargarNota(ctx);
      } catch (e) {
        mostrar(ctx.zonaResultado, { error: e.message });
      }
    });
    zona.replaceChildren(el('div', { class: 'tarjeta tel-tarjeta' },
      el('p', null,
        `Bodega A-17 te registró una nota: ${pendiente.rango_texto || '—'}, vence el ${fecha(pendiente.due_ts)}. ¿Estás de acuerdo?`),
      boton,
    ));
    return;
  }

  if (reciente && reciente.estado === 'Paid') {
    zona.replaceChildren(el('div', { class: 'tarjeta tel-tarjeta tel-cumplida' },
      sello(reciente.paid_ts),
      el('p', { class: 'tel-cumpliste' }, 'Cumpliste tu palabra: queda firmado a tu favor.'),
    ));
    return;
  }

  if (reciente) {
    zona.replaceChildren(el('div', { class: 'tarjeta tel-tarjeta' },
      el('p', null, `Tu nota más reciente con Bodega A-17: ${reciente.rango_texto || '—'}, vence el ${fecha(reciente.due_ts)}.`),
      el('p', { class: 'nota-estado' }, el('span', { class: 'etiqueta-estado' }, etiquetaEstado(reciente))),
    ));
    return;
  }

  zona.replaceChildren(el('p', { class: 'vacio' }, 'No tienes notas pendientes.'));
}

async function cargarPermiso(ctx) {
  const zona = ctx.zonaPermiso;
  zona.replaceChildren(cargando('Revisando tus permisos…'));
  let p;
  try {
    p = await api('/api/permisos');
  } catch (e) {
    zona.replaceChildren(aviso(e.message));
    return;
  }

  if (p.vigente) {
    const boton = el('button', { type: 'button', class: 'boton boton-secundario boton-ancho' }, 'Quitar permiso');
    boton.addEventListener('click', async () => {
      try {
        const r = await conBoton(boton, () => api('/api/permisos', { metodo: 'DELETE' }));
        ultimo = { texto: 'Quitaste el permiso a Bodega B-40.', url: r.url };
        mostrar(ctx.zonaResultado, ultimo);
        cargarPermiso(ctx);
      } catch (e) {
        mostrar(ctx.zonaResultado, { error: e.message });
      }
    });
    zona.replaceChildren(
      el('p', null, p.exp_ts
        ? `Bodega B-40 puede pedir tu resumen hasta el ${fecha(p.exp_ts)}`
        : 'Bodega B-40 puede pedir tu resumen.'),
      boton,
    );
    return;
  }

  const boton = el('button', { type: 'button', class: 'boton boton-primario boton-ancho' }, 'Dar permiso a Bodega B-40 por 30 días');
  boton.addEventListener('click', async () => {
    try {
      const r = await conBoton(boton, () => api('/api/permisos', { metodo: 'POST', cuerpo: { dias: 30 } }));
      ultimo = { texto: `Diste permiso a Bodega B-40 hasta el ${fecha(r.exp_ts)}.`, url: r.url };
      mostrar(ctx.zonaResultado, ultimo);
      cargarPermiso(ctx);
    } catch (e) {
      mostrar(ctx.zonaResultado, { error: e.message });
    }
  });
  zona.replaceChildren(
    el('p', null, 'Bodega B-40 no tiene permiso de pedir tu resumen.'),
    boton,
  );
}
