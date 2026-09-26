// Vista: Para el jurado — qué hay en la cadena, qué no, y los comprobantes.
// Es la única vista donde puede aparecer la palabra «blockchain».

import {
  el, api, enlaceExterno, comprobante, rotuloDemo, cargando, aviso, fechaHora, hashCorto,
} from '../app.js';
import { montarMapa } from './pasillo.js';

export function render(raiz) {
  const zonaContrato = el('div', { class: 'jurado-contrato' });
  const zonaTx = el('div', { class: 'jurado-tx' });
  const zonaMapa = el('div', { class: 'jurado-mapa' });

  raiz.append(
    rotuloDemo(),
    el('h1', null, 'Fiado de palabra, firmado por los dos.'),
    el('p', { class: 'apoyo' },
      'Bitácora de fiado co-firmada de la Central de Abasto, sobre un contrato inteligente en blockchain (Stellar testnet).'),
    zonaContrato,
    el('h2', null, 'Gemelo digital del Pasillo A-B'),
    el('p', { class: 'apoyo' }, 'Cada trazo aparece solo después de que la transacción quedó en blockchain. La ubicación de las bodegas no va a la cadena: vive en el frontend.'),
    zonaMapa,
    el('h2', null, 'Transacciones de esta sesión'),
    zonaTx,
    el('h2', null, 'En la cadena / Fuera de la cadena'),
    tablaCadena(),
    el('p', { class: 'frase-3b' }, 'La cadena es pública: el permiso controla la consulta oficial y deja constancia; no hace secreto el estado.'),
    el('p', { class: 'frase-dinero' }, 'No mueve dinero ni emite token.'),
  );

  montarMapa(zonaMapa, { compacto: true });
  cargarContrato(zonaContrato);
  cargarTransacciones(zonaTx);
}

async function cargarContrato(zona) {
  zona.replaceChildren(cargando('Leyendo la configuración…'));
  let c;
  try {
    c = await api('/api/config');
  } catch (e) {
    zona.replaceChildren(aviso(e.message));
    return;
  }
  const id = String(c.contract_id || '—');
  const url = c.url_contrato;
  const valorId = /^https?:\/\//i.test(url || '')
    ? enlaceExterno(id, url, 'mono id-contrato')
    : el('span', { class: 'mono id-contrato' }, id);

  zona.replaceChildren(el('dl', { class: 'tarjeta ficha' },
    el('div', null, el('dt', null, 'Contract ID'), el('dd', null, valorId)),
    el('div', null, el('dt', null, 'Red'), el('dd', null, c.red_texto || 'Stellar testnet · Soroban')),
  ));
}

async function cargarTransacciones(zona) {
  zona.replaceChildren(cargando('Leyendo las transacciones…'));
  let lista;
  try {
    const r = await api('/api/transacciones');
    lista = Array.isArray(r.transacciones) ? r.transacciones : [];
  } catch (e) {
    zona.replaceChildren(aviso(e.message));
    return;
  }
  if (lista.length === 0) {
    zona.replaceChildren(el('p', { class: 'vacio' }, 'Todavía no hay transacciones en esta sesión.'));
    return;
  }
  const ol = el('ol', { class: 'transacciones' });
  for (const t of lista) {
    const accion = String(t.accion || 'Transacción');
    ol.append(el('li', { class: 'transaccion' },
      el('span', { class: 'tx-accion' }, accion),
      el('span', { class: 'mono tx-fecha' }, fechaHora(t.ts)),
      comprobante(t.url, hashCorto(t.tx_hash) || 'Ver comprobante') || el('span', { class: 'mono' }, hashCorto(t.tx_hash)),
    ));
  }
  zona.replaceChildren(ol);
}

function tablaCadena() {
  const en = ['Seudónimo del cliente (HMAC)', 'Rango del monto', 'Fechas', 'Estados', 'Contadores', 'Permisos', 'Bodegas que emiten'];
  const fuera = ['Nombre', 'Teléfono', 'Monto exacto', 'Documentos'];
  const filas = Math.max(en.length, fuera.length);
  const tbody = el('tbody');
  for (let i = 0; i < filas; i++) {
    tbody.append(el('tr', null, el('td', null, en[i] || ''), el('td', null, fuera[i] || '')));
  }
  return el('div', { class: 'tabla-scroll' },
    el('table', { class: 'tabla-cadena' },
      el('thead', null, el('tr', null, el('th', { scope: 'col' }, 'En la cadena'), el('th', { scope: 'col' }, 'Fuera de la cadena'))),
      tbody,
    ),
  );
}
