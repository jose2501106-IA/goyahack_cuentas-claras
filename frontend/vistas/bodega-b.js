// Vista: Bodega B-40 — consultar el historial de un cliente con su código (contrato v5,
// decisión #57: la lectura es pública; ya no hay paso de permiso).
// El semáforo siempre lleva forma y palabra; nunca se muestra un número calculado.

import {
  el, api, conBoton, comprobante, rotuloDemo, cargando, aviso, textoRango,
} from '../app.js';
import { registrar } from '../bitacora.js';

const RE_CODIGO = /^[0-9a-fA-F]{64}$/;

let ultimaConsulta = null;
let codigoEscrito = '';
let codigoDeMary = null;  // el que llenó el botón «Doña Mary me enseñó su código»

export function render(raiz) {
  const zonaConsulta = el('div', { class: 'resultado-consulta', 'aria-live': 'polite' });
  const zonaEjemplo = el('div', { class: 'zona-ejemplo' });

  const campoCodigo = el('input', {
    id: 'codigo', name: 'codigo', type: 'text', class: 'campo-codigo', autocomplete: 'off',
    spellcheck: 'false', autocapitalize: 'off', maxlength: '64', value: codigoEscrito,
    placeholder: '64 caracteres, 0–9 y a–f',
  });
  campoCodigo.addEventListener('input', () => { codigoEscrito = campoCodigo.value; });

  // Paso 4 del guion: sucede en el mostrador; no es una transacción.
  const botonEnseno = el('button', { type: 'button', class: 'boton boton-secundario' }, 'Doña Mary me enseñó su código');
  botonEnseno.addEventListener('click', async () => {
    try {
      const r = await conBoton(botonEnseno, () => api('/api/cliente/codigo'), 'Leyendo el código…');
      codigoDeMary = String(r.codigo || '').toLowerCase();
      campoCodigo.value = codigoEscrito = codigoDeMary;
      registrar({ tipo: 'codigo_mostrado' });
      campoCodigo.focus();
    } catch (e) {
      zonaConsulta.replaceChildren(aviso(e.message));
    }
  });

  const botonConsultar = el('button', { type: 'submit', class: 'boton boton-primario' }, 'Consultar historial');

  const formulario = el('form', { class: 'tarjeta formulario', novalidate: true },
    el('div', { class: 'campo' },
      el('label', { for: 'codigo', class: 'campo-etiqueta' }, 'Código del cliente'),
      campoCodigo,
    ),
    botonEnseno,
    botonConsultar,
    el('p', { class: 'apoyo' }, 'Con el código ves su historial, sin su nombre ni el monto exacto.'),
  );

  formulario.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const codigo = campoCodigo.value.trim();
    if (!RE_CODIGO.test(codigo)) {
      zonaConsulta.replaceChildren(aviso('El código debe tener 64 caracteres (0–9 y a–f). Pídeselo al cliente.'));
      return;
    }
    try {
      const r = await conBoton(botonConsultar, () => api('/api/consultas', { metodo: 'POST', cuerpo: { codigo } }), 'Consultando…');
      ultimaConsulta = r;
      pintarConsulta(zonaConsulta, r);
      // Para el mapa del pasillo: solo lo que la API ya respondió.
      registrar({ tipo: codigo.toLowerCase() === codigoDeMary ? 'consulta' : 'consulta_otro', tx_hash: r.tx_hash, url: r.url, semaforo: r.semaforo });
    } catch (e) {
      zonaConsulta.replaceChildren(aviso(e.message));
    }
  });

  raiz.append(
    rotuloDemo(),
    el('h1', null, 'Consultar el historial de un cliente'),
    formulario,
    zonaConsulta,
    zonaEjemplo,
  );

  if (ultimaConsulta) pintarConsulta(zonaConsulta, ultimaConsulta);
  cargarEjemplo(zonaEjemplo);
}

function pintarConsulta(zona, r) {
  zona.replaceChildren(el('div', { class: 'tarjeta consulta' },
    semaforo(r.semaforo),
    contadores(r.stats || {}),
    el('p', { class: 'registrada' }, 'Esta consulta queda registrada en la cadena, con la bodega que preguntó.'),
    el('p', null, comprobante(r.url)),
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
