// Prototipo de la app de Cuentas Claras para celular (web/app.html; decisión #53).
// Recorre los 6 pasos de la corrida real (web/datos/repeticion.json) como los vería Doña Mary
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
      4: 'Bodega B-40 pidió tu resumen sin permiso y no se le entregó.',
      5: 'Diste permiso a Bodega B-40 por 30 días. Puedes quitarlo cuando quieras.',
      6: 'Bodega B-40 consultó tu resumen hoy. Quedó registrado.',
    },
    bodega: {
      1: 'Doña Mary todavía no llega a tu mostrador.',
      2: 'Doña Mary todavía no llega a tu mostrador.',
      3: 'Doña Mary llega a pedir fiado. No la conoces.',
      4: 'No tienes permiso de este cliente. Pídeselo en el mostrador.',
      5: 'Doña Mary te dio permiso por 30 días.',
      6: 'Tu consulta quedó registrada.',
    },
  };
  const PESTANA_DEL_PASO = { 1: 'notas', 2: 'notas', 3: 'notas', 4: 'permisos', 5: 'permisos', 6: 'historial' };

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
      if (!p || !p.url) return el('p', { class: 'app-sin-tx' }, 'Sin comprobante: no se envió transacción.');
      return el('p', { class: 'app-comprobante' },
        CC.enlaceExterno(`${texto} · ${p.hash.slice(0, 8)}…${p.hash.slice(-6)}`, p.url, 'hash'));
    }
    const chip = (texto, tipo = '') => el('span', { class: `app-chip ${tipo}`.trim() }, texto);
    const tarjeta = (...hijos) => el('section', { class: 'app-tarjeta' }, ...hijos);
    const accion = (texto, a, secundaria = false) => el('button', {
      type: 'button', class: `boton ${secundaria ? 'boton-secundario' : 'boton-primario'} app-accion`,
      onclick: () => ir(a, true),
    }, texto);

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

    function pantallaPermisos(n) {
      const partes = [el('h2', { class: 'app-h' }, 'Permisos')];
      if (n < 4) {
        partes.push(tarjeta(
          el('p', { class: 'app-titulo' }, 'Nadie tiene permiso de pedir tu resumen.'),
          el('p', null, 'Tu historial es tuyo. Tú decides a qué bodega le das permiso de consultarlo, y por cuánto tiempo.')));
      }
      if (n >= 4) {
        partes.push(el('section', { class: 'app-tarjeta app-alerta' },
          el('p', { class: 'app-titulo' }, 'Bodega B-40 pidió tu resumen sin permiso y no se le entregó.'),
          el('p', { class: 'apoyo' }, 'El contrato lo rechazó. No se envió ninguna transacción.'),
          comprobante(4)));
      }
      if (n === 4) {
        partes.push(tarjeta(
          el('p', { class: 'app-titulo' }, '¿Das permiso a Bodega B-40 por 30 días?'),
          el('ul', { class: 'app-ve' },
            el('li', null, 'Verá cuántas notas cumpliste y en cuántas bodegas.'),
            el('li', null, 'No verá montos exactos, productos ni tus datos.'),
            el('li', null, 'Cada consulta te llegará como aviso y quedará registrada.')),
          accion('Dar permiso', 5)));
      }
      if (n >= 5) {
        partes.push(tarjeta(
          el('div', { class: 'app-tarjeta-cabeza' }, el('p', { class: 'app-de' }, 'Bodega B-40'), chip('Vigente', 'firmada')),
          el('p', null, 'Puede pedir tu resumen durante 30 días. Puedes quitar el permiso cuando quieras.'),
          comprobante(5, 'Ver comprobante del permiso')));
      }
      return partes;
    }

    function pantallaHistorial(n) {
      const firmadas = n >= 2 ? 1 : 0;
      const cumplidas = n >= 3 ? 1 : 0;
      const bodegas = n >= 2 ? 1 : 0;
      const dato = (dt, dd) => el('div', null, el('dt', null, dt), el('dd', { class: 'mono' }, String(dd)));
      const partes = [
        el('h2', { class: 'app-h' }, 'Mi historial'),
        tarjeta(
          el('dl', { class: 'app-datos' }, dato('Notas firmadas', firmadas), dato('Cumplidas a tiempo', cumplidas), dato('Bodegas', bodegas)),
          el('p', { class: 'sem sem-insuficiente app-semaforo' }, '○ Historial insuficiente'),
          el('p', null, 'Todavía no hay suficiente historial. Cada nota que cumples lo construye.'),
          el('ul', { class: 'app-condiciones' },
            el('li', null, `3 notas cerradas (tienes ${cumplidas})`),
            el('li', null, `2 bodegas distintas (tienes ${bodegas})`),
            el('li', null, '60 días de historial'))),
      ];
      if (n >= 6) {
        partes.push(el('h3', { class: 'app-h3' }, 'Consultas a tu resumen'),
          tarjeta(el('p', { class: 'app-titulo' }, 'Bodega B-40 consultó tu resumen. Quedó registrado.'), comprobante(6)));
      }
      partes.push(el('p', { class: 'app-privacidad' },
        'En la cadena no va tu nombre, tu teléfono ni el monto exacto: un seudónimo (',
        el('span', { class: 'hash' }, datos.seudonimo_cliente), ') y un rango. La cadena es pública; el permiso decide quién puede pedir tu resumen de forma oficial y deja constancia.'));
      return partes;
    }

    // ---------- Bodega B-40 ----------
    function pantallaBodega(n) {
      const cliente = tarjeta(
        el('div', { class: 'app-tarjeta-cabeza' },
          el('p', { class: 'app-de' }, 'Doña Mary'),
          n <= 4 ? chip('Sin permiso', 'pendiente') : chip('Permiso vigente', 'firmada')),
        el('p', { class: 'apoyo' }, 'Su nombre lo sabes tú, en el mostrador. En la cadena solo está su seudónimo: ',
          el('span', { class: 'hash' }, datos.seudonimo_cliente)));
      const partes = [el('h2', { class: 'app-h' }, 'Mostrador · Bodega B-40'), cliente];
      if (n <= 2) partes.push(tarjeta(el('p', null, 'Todavía no llega. La nota de Doña Mary es con Bodega A-17 y tú no la ves.')));
      if (n === 3) partes.push(tarjeta(el('p', { class: 'app-titulo' }, 'Doña Mary te pide fiado.'), el('p', null, 'No la conoces. Puedes pedir su resumen.'), accion('Pedir su resumen', 4)));
      if (n === 4) {
        partes.push(el('section', { class: 'app-tarjeta app-alerta' },
          el('p', { class: 'app-titulo' }, 'Sin permiso: no se entrega el resumen.'),
          el('p', null, 'No se envió ninguna transacción. Pídele permiso en el mostrador.')));
      }
      if (n === 5) {
        partes.push(tarjeta(el('p', { class: 'app-titulo' }, 'Doña Mary te dio permiso por 30 días.'), comprobante(5, 'Ver comprobante del permiso'), accion('Consultar su resumen', 6)));
      }
      if (n === 6) {
        const r = datos.resumen_paso_6 || {};
        const num = (k) => Number(r[k]) || 0;
        const cerradas = num('Pagadas a tiempo') + num('Pagadas tarde') + num('Incumplidas');
        partes.push(tarjeta(
          el('p', { class: 'app-titulo' }, 'Resumen de Doña Mary'),
          el('p', { class: 'sem sem-insuficiente app-semaforo' }, '○ Historial insuficiente'),
          el('ul', { class: 'app-condiciones' },
            el('li', null, `✗ 3 notas cerradas (tiene ${cerradas})`),
            el('li', null, `✗ 2 bodegas distintas (tiene ${num('Emisores distintos')})`),
            el('li', null, '✗ 60 días de historial (su nota es del mismo día)')),
          el('p', null, 'Historial insuficiente: todavía no hay suficientes notas cerradas para mostrar un semáforo. La decisión es tuya.'),
          el('p', { class: 'apoyo' }, 'Tu consulta quedó registrada, y Doña Mary recibe el aviso.'),
          comprobante(6, 'Ver comprobante de la consulta')));
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
      ...[['notas', 'Notas', '▤'], ['permisos', 'Permisos', '⚿'], ['historial', 'Mi historial', '◔']].map(([clave, texto, icono]) => {
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
        : estado.pestana === 'permisos' ? pantallaPermisos(n)
          : estado.pestana === 'historial' ? pantallaHistorial(n) : pantallaNotas(n);
      pantalla.replaceChildren(...contenido.filter(Boolean));
      pantalla.dataset.rol = estado.rol;
    }

    ir(1, false);
    CC.appMovil = { ir, ponerRol, estado };
  };
})(window);
