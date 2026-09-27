// Vista: Teléfono de Doña Mary — aceptar notas y ver «Mi código» (contrato v5, decisión #57:
// la lectura es pública; ya no hay permisos que administrar).

import {
  el, api, conBoton, comprobante, rotuloDemo, cargando, aviso, sello,
  fecha, etiquetaEstado,
} from '../app.js';

let ultimo = null;

export function render(raiz) {
  const zonaResultado = el('div', { class: 'resultado', 'aria-live': 'polite' });
  const zonaNota = el('div', { class: 'tel-nota' });
  const zonaCodigo = el('div', { class: 'tel-codigo' });

  const telefono = el('div', { class: 'telefono' },
    el('div', { class: 'telefono-barra', 'aria-hidden': 'true' }),
    el('div', { class: 'telefono-pantalla' },
      el('p', { class: 'tel-encabezado' }, 'Tu palabra vale.'),
      zonaNota,
      zonaResultado,
      el('h2', { class: 'tel-subtitulo' }, 'Mi código'),
      zonaCodigo,
      el('p', { class: 'tel-privacidad' },
        'En la cadena no va tu nombre, tu teléfono ni el monto exacto. Cada consulta formal queda registrada, con la bodega que preguntó.'),
    ),
  );

  raiz.append(rotuloDemo(), telefono);

  const ctx = { zonaResultado, zonaNota, zonaCodigo };
  if (ultimo) mostrar(zonaResultado, ultimo);
  cargarNota(ctx);
  cargarCodigo(ctx);
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

async function cargarCodigo(ctx) {
  const zona = ctx.zonaCodigo;
  zona.replaceChildren(cargando('Buscando tu código…'));
  let r;
  try {
    r = await api('/api/cliente/codigo');
  } catch (e) {
    zona.replaceChildren(aviso(e.message));
    return;
  }
  const codigo = String(r.codigo || '');
  // En grupos de 8 para leerlo en voz alta en el mostrador.
  const grupos = codigo.match(/.{1,8}/g) || [];
  zona.replaceChildren(el('div', { class: 'tarjeta tel-tarjeta' },
    el('p', { class: 'mono codigo-grande', 'aria-label': `Tu código: ${codigo}` }, grupos.join(' ')),
    el('p', null, 'Enséñalo en la bodega que tú quieras. Con él ven tu historial, sin tu nombre ni tus montos exactos.'),
  ));
}
