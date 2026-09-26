// «La demo real, verificable» (spec web §4): repetición paso a paso de la corrida de
// demo/demo.sh en Stellar testnet, sobre el gemelo del Pasillo A-B. Los pasos, hashes y
// enlaces salen de web/datos/repeticion.json (generado solo con demo/salida-demo.txt y
// demo/deploy.json). Este sitio no firma ni envía nada: solo enlaza a stellar.expert.
'use strict';

(function (raiz) {
  const CC = raiz.CC;
  const el = CC.el;

  // Posiciones ilustrativas de la demo, las mismas que la app local
  // (frontend/datos/pasillo.js, POSICIONES_DEMO). Solo viven aquí, nunca en la cadena.
  const POSICIONES = { 'Bodega A-17': 'A-17', 'Bodega B-40': 'B-40' };
  const X_FICHA = 178; // dónde se para Doña Mary en el corredor (ilustrativo, igual que la app local)
  const TRAZO_MS = 900;

  const TEXTO_MAPA = {
    1: 'Bodega A-17 registró una nota para Doña Mary. Esperando su firma.',
    2: 'Doña Mary firmó la nota: firmada por los dos.',
    3: 'Bodega A-17 confirmó el pago: nota cumplida.',
    4: 'Bodega B-40 pidió el resumen sin permiso: el contrato no lo entregó. No hubo transacción.',
    5: 'Doña Mary dio permiso a Bodega B-40 por 30 días.',
    6: 'Bodega B-40 consultó el resumen con permiso. La consulta quedó registrada.',
  };

  function rango(accion) {
    return accion.replace(/rango (\d+)k–(\d+)k/, (_, a, b) => `rango $${a},000–$${b},000`);
  }

  // La salida de demo.sh (registro) dice «Bodega A» y «Bodega B»; en pantalla las bodegas
  // van siempre con su número (decisión #54).
  function conNumero(t) {
    return String(t).replace(/Bodega A(?![-\w])/g, 'Bodega A-17').replace(/Bodega B(?![-\w])/g, 'Bodega B-40');
  }

  function hashCorto(h) { return h ? `${h.slice(0, 8)}…${h.slice(-6)}` : ''; }

  CC.secciones['montaje-demo'] = function montarDemo(destino) {
    const datos = raiz.CC_DATOS && raiz.CC_DATOS.repeticion;
    const forma = CC.Gemelo.formaDelSitio();
    destino.replaceChildren();
    if (!datos || !forma) {
      destino.append(el('p', { class: 'apoyo', role: 'alert' }, 'No se encontraron los datos de la corrida.'));
      return;
    }
    const pasos = datos.pasos;

    destino.append(
      el('div', { class: 'encabezado-demo' },
        el('p', null, el('span', { class: 'etiqueta-red' }, datos.red), ' Contrato ',
          CC.enlaceExterno(datos.contrato.id, datos.contrato.url, 'id-contrato mono hash')),
        el('p', { class: 'aclaracion' },
          'Esta es la repetición de una corrida real. Para firmar en vivo usamos la app local; este sitio no firma nada.')),
    );

    const marcadas = {};
    for (const [nombre, id] of Object.entries(POSICIONES)) marcadas[id] = nombre;
    const contador = el('p', { class: 'paso-contador mono' });
    const mapa = CC.Gemelo.montar(destino, forma, {
      marcadas,
      barra: contador,
      descripcion: 'Forma del Pasillo A-B con Bodega A-17, Bodega B-40 y Doña Mary en el corredor. Cada paso de la corrida real se dibuja aquí; el texto de cada paso está debajo.',
      rotulo: 'Posiciones ilustrativas. Bodegas y Doña Mary son ficticias.',
      centroX: 115, // entre Bodega A-17 y Doña Mary, para pantallas angostas
    });
    const fx = mapa.xDePlano(X_FICHA);
    const fy = mapa.corredor.centro;
    const ficha = { x: fx, y: fy, r: 3 };
    CC.Gemelo.ficha(mapa, ficha, { iniciales: 'DM', nombre: 'Doña Mary', clase: 'ficha-mary' });

    const tarjeta = el('div', { class: 'paso-tarjeta', 'aria-live': 'polite' });
    const anterior = el('button', { type: 'button', class: 'boton boton-secundario' }, 'Anterior');
    const siguiente = el('button', { type: 'button', class: 'boton boton-primario' }, 'Siguiente');
    const reiniciar = el('button', { type: 'button', class: 'boton boton-secundario' }, 'Reiniciar');
    const lista = el('ol', { class: 'pasos-lista' });
    destino.append(
      el('div', { class: 'controles-demo' }, anterior, siguiente, reiniciar),
      tarjeta,
      el('h3', null, 'Los seis pasos de la corrida'),
      lista,
    );

    const idA = POSICIONES['Bodega A-17'];
    const idB = POSICIONES['Bodega B-40'];
    // Punto de la ficha que mira a cada bodega.
    const bordeFicha = (id) => ({ x: ficha.x, y: mapa.bodegas[id].superior ? ficha.y - ficha.r : ficha.y + ficha.r });

    function limpiar() {
      for (const c of ['puente', 'trazos', 'pulso', 'notas', 'sello']) mapa.capas[c].replaceChildren();
      mapa.bodegas[idB].g.classList.remove('sin-permiso', 'parpadeo');
    }

    function papelito(texto, animar) {
      mapa.capas.notas.querySelectorAll('.papelito').forEach((n) => n.remove());
      CC.Gemelo.papelito(mapa, { x: ficha.x + ficha.r + 1.5, y: ficha.y - 2.6 }, texto, { animar });
    }

    // Aplica el estado del paso n sobre el mapa; animar solo el último.
    function aplicar(n, animar) {
      const S = mapa.s;
      if (n === 1) {
        CC.Gemelo.trazo(mapa, 'trazos', mapa.ancla(idA), bordeFicha(idA), { animar, clase: 'trazo-ida' });
        papelito('Esperando firma', animar);
      } else if (n === 2) {
        CC.Gemelo.trazo(mapa, 'trazos', bordeFicha(idA), mapa.ancla(idA), { animar, clase: 'trazo-vuelta' });
        papelito('Firmada por los dos', animar);
      } else if (n === 3) {
        mapa.capas.sello.replaceChildren();
        CC.Gemelo.sello(mapa, mapa.centro(idA), { animar });
      } else if (n === 4) {
        const b = mapa.bodegas[idB];
        b.g.classList.add('sin-permiso');
        if (animar) b.g.classList.add('parpadeo');
        mapa.capas.notas.append(S('text', {
          x: b.x + b.w / 2, y: b.y - 1.6, 'text-anchor': 'middle', class: 'texto-sin-permiso paso4',
        }, 'Sin permiso: no se entrega el resumen'));
      } else if (n === 5) {
        const b = mapa.bodegas[idB];
        b.g.classList.remove('sin-permiso', 'parpadeo');
        mapa.capas.notas.querySelectorAll('.paso4').forEach((t) => t.remove());
        const a = mapa.ancla(idB);
        const f = bordeFicha(idB);
        mapa.capas.puente.append(S('g', { class: `puente${animar ? ' aparecer' : ''}` },
          S('path', { d: mapa.camino(f.x, f.y, a.x, a.y, 1.5), class: 'puente-linea' }),
          S('text', { x: b.x + b.w / 2, y: b.y + b.h + CC.Gemelo.CARA + b.eleva + 8.5, 'text-anchor': 'middle', class: 'puente-texto' }, 'Permiso por 30 días')));
      } else if (n === 6) {
        mapa.capas.pulso.replaceChildren();
        const a = mapa.ancla(idB);
        const f = bordeFicha(idB);
        mapa.capas.pulso.append(
          S('path', { d: mapa.camino(a.x, a.y, f.x, f.y, 2), pathLength: 1, class: `pulso${animar ? ' dibujar' : ''}` }),
          S('path', { d: mapa.camino(f.x, f.y, a.x, a.y, 2), pathLength: 1, class: `pulso${animar ? ' dibujar dibujar-despues' : ''}` }),
        );
      }
    }

    function resumenPaso6() {
      const r = datos.resumen_paso_6 || {};
      const n = (k) => Number(r[k]) || 0;
      const cerradas = n('Pagadas a tiempo') + n('Pagadas tarde') + n('Incumplidas');
      const bodegas = n('Emisores distintos');
      const filas = Object.entries(r).map(([k, v]) => el('div', null, el('dt', null, k), el('dd', { class: 'mono' }, v)));
      return el('div', { class: 'resumen-real' },
        el('p', { class: 'resumen-titulo' }, 'Lo que devolvió el contrato (tal cual la salida de la corrida):'),
        el('dl', { class: 'resumen-lista' }, filas),
        el('p', { class: 'sem sem-insuficiente semaforo-grande' }, '○ Historial insuficiente'),
        el('p', null, `Tiene ${cerradas} nota cerrada de 3 y ${bodegas} bodega de 2, y le faltan días de historial: el semáforo no juzga todavía, a propósito.`));
    }

    let actual = 0;
    const movido = () => CC.movimientoReducido();

    function mostrar(n, animar) {
      actual = n;
      limpiar();
      for (let i = 1; i <= n; i++) aplicar(i, animar && i === n && !movido());
      contador.textContent = n === 0 ? 'Listo para empezar' : `Paso ${n} de ${pasos.length}`;
      anterior.disabled = n === 0;
      siguiente.disabled = n === pasos.length;
      siguiente.textContent = n === 0 ? 'Empezar' : 'Siguiente';

      if (n === 0) {
        tarjeta.replaceChildren(el('p', null, 'Toca «Empezar» para ver la corrida paso a paso. Cada paso con transacción trae su enlace a stellar.expert para que lo verifiques tú.'));
      } else {
        const p = pasos[n - 1];
        tarjeta.replaceChildren(
          el('p', { class: 'paso-num mono' }, `Paso ${p.numero}`),
          el('p', { class: 'paso-accion' }, conNumero(rango(p.accion))),
          el('p', { class: 'apoyo' }, TEXTO_MAPA[p.numero] || ''),
          p.firma
            ? el('p', null, 'Firma: ', el('strong', null, p.firma), ' · función ', el('code', null, p.funcion))
            : el('p', null, 'Nadie firma: la consulta se simuló y el contrato la rechazó.'),
          p.url
            ? el('p', { class: 'paso-enlace' },
              CC.enlaceExterno('Verlo en la cadena', p.url, 'boton boton-primario boton-chico'),
              el('span', { class: 'mono hash' }, hashCorto(p.hash)))
            : el('p', { class: 'sin-enlace' }, p.sin_transaccion,
              p.detalle_salida ? el('span', { class: 'mono detalle' }, ` (${p.detalle_salida})`) : null),
          p.numero === 6 ? resumenPaso6() : null,
        );
      }
      sincronizarTelefono(n);
      lista.querySelectorAll('li').forEach((li, i) => {
        if (i === n - 1) li.setAttribute('aria-current', 'step');
        else li.removeAttribute('aria-current');
      });
    }

    for (const p of pasos) {
      lista.append(el('li', null,
        el('span', null, conNumero(rango(p.accion))), ' ',
        p.url
          ? CC.enlaceExterno(`Verlo en la cadena · ${hashCorto(p.hash)}`, p.url, 'mono hash')
          : el('span', { class: 'apoyo' }, p.sin_transaccion)));
    }

    // «La app en tu mano» (docs/diseno-web-movil.md §2): las pantallas están en el HTML;
    // aquí solo se muestra la del paso actual y se elige la vista (cliente o Bodega B-40).
    const app = document.querySelector('.app-en-mano');
    function sincronizarTelefono(n) {
      if (!app) return;
      app.dataset.paso = String(n);
      app.querySelectorAll('.tel-pantalla').forEach((li) => {
        const es = Number(li.dataset.paso) === n;
        li.classList.toggle('actual', es);
        if (es) li.setAttribute('aria-current', 'step'); else li.removeAttribute('aria-current');
      });
    }
    if (app) {
      app.classList.add('con-js');
      app.dataset.ver = 'cliente';
      app.querySelectorAll('[data-ver]').forEach((b) => b.addEventListener('click', () => {
        app.dataset.ver = b.dataset.ver;
        app.querySelectorAll('[data-ver]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      }));
      app.querySelectorAll('.tel-avanza').forEach((b) => b.addEventListener('click', () => mostrar(Number(b.dataset.a), true)));
    }

    anterior.addEventListener('click', () => mostrar(Math.max(0, actual - 1), false));
    siguiente.addEventListener('click', () => mostrar(Math.min(pasos.length, actual + 1), true));
    reiniciar.addEventListener('click', () => mostrar(0, false));
    mostrar(0, false);
    CC.repeticion = { mostrar, TRAZO_MS };
  };
})(window);
