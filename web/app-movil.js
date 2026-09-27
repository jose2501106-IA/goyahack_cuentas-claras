// Prototipo de la app de Cuentas Claras para celular (web/app.html; decisión #53).
// Recorre los 5 pasos de la corrida real (contrato v5, decisión #57) (web/datos/repeticion.json) como los vería Doña Mary
// en su teléfono o Bodega B-40 en el mostrador. No firma ni envía nada: cada paso con
// transacción enlaza a su comprobante real. Todo el texto de estado sale de aquí; los hashes,
// del JSON (nunca escritos a mano). Microcopy: docs/campana-marketing.md §8.6.
'use strict';

(function (raiz) {
  const CC = raiz.CC;
  const el = CC.el;

  const RANGO = '$5,000–$20,000';
  const PLAZO = '15 días';

  const AVISOS = {
    cliente: {
      1: 'Tienes una nota de Bodega A-17 por aceptar: $5,000–$20,000, vence en 15 días.',
      2: 'Listo: la nota quedó firmada por los dos.',
      3: 'Cumpliste tu palabra. Bodega A-17 confirmó tu pago.',
      4: 'Le enseñaste tu código a Bodega B-40 en el mostrador.',
      5: 'Bodega B-40 consultó tu historial hoy. Quedó registrado.',
    },
    bodega: {
      1: 'Doña Mary todavía no llega a tu mostrador.',
      2: 'Doña Mary todavía no llega a tu mostrador.',
      3: 'Doña Mary llega a pedir fiado. No la conoces.',
      4: 'Doña Mary te enseñó su código.',
      5: 'Tu consulta quedó registrada, con tu bodega.',
    },
  };
  const PESTANA_DEL_PASO = { 1: 'notas', 2: 'notas', 3: 'notas', 4: 'codigo', 5: 'historial' };

  CC.secciones['app-montaje'] = function montarApp(destino) {
    const datos = raiz.CC_DATOS && raiz.CC_DATOS.repeticion;
    if (!datos) {
      destino.replaceChildren(el('p', { class: 'apoyo', role: 'alert' }, 'No se encontraron los datos de la corrida.'));
      return;
    }
    const paso = (n) => datos.pasos[n - 1];
    const TOTAL = datos.pasos.length;

    const estado = { n: 1, rol: 'cliente', pestana: 'notas' };

    // ---------- Piezas ----------
    function comprobante(n, texto = 'Ver comprobante') {
      const p = paso(n);
      if (!p || !p.url) return el('p', { class: 'app-sin-tx' }, 'Sin comprobante: no es una transacción; sucede en el mostrador.');
      return el('p', { class: 'app-comprobante' },
        CC.enlaceExterno(`${texto} · ${p.hash.slice(0, 8)}…${p.hash.slice(-6)}`, p.url, 'hash'));
    }
    const chip = (texto, tipo = '') => el('span', { class: `app-chip ${tipo}`.trim() }, texto);
    const tarjeta = (...hijos) => el('section', { class: 'app-tarjeta' }, ...hijos);
    const accion = (texto, a, secundaria = false) => el('button', {
      type: 'button', class: `boton ${secundaria ? 'boton-secundario' : 'boton-primario'} app-accion`,
      onclick: () => ir(a, true),
    }, texto);

    // Conteos del historial en el paso n. La consulta del paso 5 trae el total; esta
    // corrida aporta una sola nota de Bodega A-17 (firmada en el paso 2 y pagada en el 3),
    // así que lo anterior es el total menos esa nota (la de Bodega A-73, de sembrar.sh).
    const R = datos.resumen_paso_5 || {};
    const num = (k) => Number(R[k]) || 0;
    function conteos(n) {
      return {
        firmadas: num('Notas aceptadas') - 1 + (n >= 2 ? 1 : 0),
        cumplidas: num('Pagadas a tiempo') - 1 + (n >= 3 ? 1 : 0),
        cerradas: num('Pagadas a tiempo') + num('Pagadas tarde') + num('Incumplidas') - 1 + (n >= 3 ? 1 : 0),
        bodegas: num('Emisores distintos') - 1 + (n >= 2 ? 1 : 0),
      };
    }

    // ---------- Doña Mary ----------
    function pantallaNotas(n) {
      const nota = tarjeta(
        el('div', { class: 'app-tarjeta-cabeza' },
          el('p', { class: 'app-de' }, 'Bodega A-17'),
          n === 1 ? chip('Esperando tu firma', 'pendiente') : n === 2 ? chip('Firmada por los dos', 'firmada') : chip('Pagada a tiempo', 'cumplida')),
        el('p', { class: 'app-monto' }, RANGO),
        el('p', { class: 'apoyo' }, `Fiado a ${PLAZO}. El monto exacto se queda entre tú y la bodega; en la cadena solo va el rango.`),
        n >= 3 ? el('p', { class: 'app-sello', 'aria-label': 'Sello: cumplida' }, 'CUMPLIDA') : null,
        n === 1 ? el('p', null, '¿Estás de acuerdo? Sin tu firma, la nota no es deuda.') : null,
        n === 1 ? accion('Acepto', 2) : null,
        n === 2 ? el('p', { class: 'apoyo' }, 'Cuando pagues, Bodega A-17 lo confirma y te llega tu comprobante.') : null,
        n >= 3 ? el('p', { class: 'app-palabra' }, 'Cumpliste tu palabra: queda firmado a tu favor.') : null,
      );
      const lista = el('ol', { class: 'app-linea' },
        el('li', null, el('p', null, 'Bodega A-17 registró la nota'), comprobante(1)),
        n >= 2 ? el('li', null, el('p', null, 'Tú la firmaste: firmada por los dos'), comprobante(2)) : null,
        n >= 3 ? el('li', null, el('p', null, 'Bodega A-17 confirmó tu pago'), comprobante(3)) : null);
      return [el('h2', { class: 'app-h' }, 'Mis notas'), nota, el('h3', { class: 'app-h3' }, 'Lo que quedó firmado'), lista];
    }

    function pantallaCodigo(n) {
      const partes = [el('h2', { class: 'app-h' }, 'Mi código'),
        tarjeta(
          el('p', { class: 'app-codigo mono', 'aria-label': `Tu código empieza con ${datos.seudonimo_cliente}` }, datos.seudonimo_cliente),
          el('p', null, 'Enséñalo en la bodega que tú quieras. Con él ven tu historial, sin tu nombre ni tus montos exactos.'),
          n === 3 ? accion('Enseñar mi código a Bodega B-40', 4) : null)];
      if (n >= 4) {
        partes.push(tarjeta(
          el('div', { class: 'app-tarjeta-cabeza' }, el('p', { class: 'app-de' }, 'Bodega B-40'), chip('Le enseñaste tu código', 'firmada')),
          el('p', null, 'Se lo enseñaste en el mostrador. No es una transacción.')));
      }
      if (n >= 5) {
        partes.push(tarjeta(el('p', { class: 'app-titulo' }, 'Bodega B-40 consultó tu historial. Quedó registrado.'), comprobante(5, 'Ver comprobante de la consulta')));
      }
      return partes;
    }

    function pantallaHistorial(n) {
      const { firmadas, cumplidas, cerradas, bodegas } = conteos(n);
      const dato = (dt, dd) => el('div', null, el('dt', null, dt), el('dd', { class: 'mono' }, String(dd)));
      const partes = [
        el('h2', { class: 'app-h' }, 'Mi historial'),
        tarjeta(
          el('dl', { class: 'app-datos' }, dato('Notas firmadas', firmadas), dato('Cumplidas a tiempo', cumplidas), dato('Bodegas', bodegas)),
          el('p', { class: 'sem sem-insuficiente app-semaforo' }, '○ Historial insuficiente'),
          el('p', null, 'Todavía no hay suficiente historial. Cada nota que cumples lo construye.'),
          el('ul', { class: 'app-condiciones' },
            el('li', null, `3 notas cerradas (tienes ${cerradas})`),
            el('li', null, `2 bodegas distintas (tienes ${bodegas})`),
            el('li', null, '60 días de historial'))),
      ];
      if (n >= 5) {
        partes.push(el('h3', { class: 'app-h3' }, 'Consultas a tu historial'),
          tarjeta(el('p', { class: 'app-titulo' }, 'Bodega B-40 consultó tu historial. Quedó registrado, con la bodega que preguntó.'), comprobante(5)));
      }
      partes.push(el('p', { class: 'app-privacidad' },
        'En la cadena no va tu nombre, tu teléfono ni el monto exacto: un seudónimo (',
        el('span', { class: 'hash' }, datos.seudonimo_cliente), ') y un rango. La cadena es pública: cualquiera con tu código ve tu historial, sin tu nombre ni el monto exacto. Cada consulta formal queda registrada.'));
      return partes;
    }

    // ---------- Bodega B-40 ----------
    function pantallaBodega(n) {
      const cliente = tarjeta(
        el('div', { class: 'app-tarjeta-cabeza' },
          el('p', { class: 'app-de' }, 'Doña Mary'),
          n >= 4 ? chip('Te enseñó su código', 'firmada') : chip('Cliente nueva', 'pendiente')),
        el('p', { class: 'apoyo' }, 'Su nombre lo sabes tú, en el mostrador. En la cadena solo está su seudónimo, su código.'));
      const partes = [el('h2', { class: 'app-h' }, 'Mostrador · Bodega B-40'), cliente];
      if (n <= 2) partes.push(tarjeta(el('p', null, 'Todavía no llega. La nota de Doña Mary es con Bodega A-17 y tú no la ves.')));
      if (n === 3) partes.push(tarjeta(el('p', { class: 'app-titulo' }, 'Doña Mary te pide fiado.'), el('p', null, 'No la conoces. Si te enseña su código, puedes consultar su historial.'), accion('Doña Mary me enseñó su código', 4)));
      if (n === 4) {
        partes.push(tarjeta(
          el('p', { class: 'app-titulo' }, 'Código del cliente'),
          el('p', { class: 'app-codigo mono' }, datos.seudonimo_cliente),
          el('p', { class: 'apoyo' }, 'Te lo enseñó en el mostrador; no es una transacción.'),
          accion('Consultar historial', 5)));
      }
      if (n === 5) {
        const c = conteos(5);
        const marca = (ok) => (ok ? '✓' : '✗');
        partes.push(tarjeta(
          el('p', { class: 'app-titulo' }, 'Historial de Doña Mary'),
          el('p', { class: 'sem sem-insuficiente app-semaforo' }, '○ Historial insuficiente'),
          el('ul', { class: 'app-condiciones' },
            el('li', null, `${marca(c.cerradas >= 3)} 3 notas cerradas (tiene ${c.cerradas})`),
            el('li', null, `${marca(c.bodegas >= 2)} 2 bodegas distintas (tiene ${c.bodegas})`),
            el('li', null, '✗ 60 días de historial (sus notas son de esta semana)')),
          el('p', null, 'Historial insuficiente: todavía no hay suficientes notas cerradas para mostrar un semáforo. La decisión es tuya.'),
          el('p', { class: 'apoyo' }, 'Esta consulta queda registrada en la cadena, con la bodega que preguntó.'),
          comprobante(5, 'Ver comprobante de la consulta')));
      }
      return partes;
    }

    // ---------- Armazón ----------
    const bRolC = el('button', { type: 'button', class: 'app-rol', 'aria-pressed': 'true', onclick: () => ponerRol('cliente') }, 'Doña Mary');
    const bRolB = el('button', { type: 'button', class: 'app-rol', 'aria-pressed': 'false', onclick: () => ponerRol('bodega') }, 'Bodega B-40');
    const contador = el('p', { class: 'app-contador mono' });
    const titulo = el('p', { class: 'app-paso-titulo' });
    const bAnt = el('button', { type: 'button', class: 'app-flecha', 'aria-label': 'Paso anterior', onclick: () => ir(estado.n - 1, false) }, '‹');
    const bSig = el('button', { type: 'button', class: 'app-flecha', 'aria-label': 'Paso siguiente', onclick: () => ir(estado.n + 1, true) }, '›');
    const aviso = el('p', { class: 'app-aviso', role: 'status', 'aria-live': 'polite' });
    const pantalla = el('div', { class: 'app-pantalla', tabindex: '-1' });
    const pestanas = {};
    const nav = el('nav', { class: 'app-nav', 'aria-label': 'Secciones de la app' },
      ...[['notas', 'Notas', '▤'], ['codigo', 'Mi código', '⌗'], ['historial', 'Mi historial', '◔']].map(([clave, texto, icono]) => {
        pestanas[clave] = el('button', { type: 'button', class: 'app-pestana', onclick: () => { estado.pestana = clave; pintar(false); } },
          el('span', { class: 'app-icono', 'aria-hidden': 'true' }, icono), el('span', null, texto), el('span', { class: 'app-punto', 'aria-hidden': 'true' }));
        return pestanas[clave];
      }));

    destino.replaceChildren(
      el('div', { class: 'app-roles', role: 'group', 'aria-label': 'Ver como' }, el('span', { class: 'lector' }, 'Ver como: '), bRolC, bRolB),
      el('div', { class: 'app-corrida' },
        bAnt,
        el('div', { class: 'app-corrida-texto' }, contador, titulo),
        bSig),
      aviso,
      pantalla,
      nav,
    );

    function ponerRol(rol) {
      estado.rol = rol;
      bRolC.setAttribute('aria-pressed', String(rol === 'cliente'));
      bRolB.setAttribute('aria-pressed', String(rol === 'bodega'));
      pintar(false);
    }

    function ir(n, avanzando) {
      estado.n = Math.min(TOTAL, Math.max(1, n));
      estado.pestana = PESTANA_DEL_PASO[estado.n];
      pintar(avanzando);
    }

    function pintar(avanzando) {
      const n = estado.n;
      const p = paso(n);
      contador.textContent = `Paso ${n} de ${TOTAL}`;
      titulo.textContent = p.accion.replace(/rango (\d+)k–(\d+)k/, (_, a, b) => `$${a},000–$${b},000`);
      bAnt.disabled = n === 1;
      bSig.disabled = n === TOTAL;
      aviso.textContent = AVISOS[estado.rol][n];
      aviso.classList.remove('entra');
      if (avanzando && !CC.movimientoReducido()) { void aviso.offsetWidth; aviso.classList.add('entra'); }
      nav.hidden = estado.rol !== 'cliente';
      for (const [clave, b] of Object.entries(pestanas)) {
        const activa = clave === estado.pestana;
        b.setAttribute('aria-current', activa ? 'page' : 'false');
        b.classList.toggle('con-novedad', !activa && clave === PESTANA_DEL_PASO[n]);
      }
      const contenido = estado.rol === 'bodega' ? pantallaBodega(n)
        : estado.pestana === 'codigo' ? pantallaCodigo(n)
          : estado.pestana === 'historial' ? pantallaHistorial(n) : pantallaNotas(n);
      pantalla.replaceChildren(...contenido.filter(Boolean));
      pantalla.dataset.rol = estado.rol;
    }

    ir(1, false);
    CC.appMovil = { ir, ponerRol, estado };
  };
})(window);
