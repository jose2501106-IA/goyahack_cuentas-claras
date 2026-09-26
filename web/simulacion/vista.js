// Pasillo vivo: conecta el motor y los agentes con el gemelo y el feed (spec web §3).
// Simulación con personajes ficticios, fuera de la cadena. Un día simulado dura 2 s a 1×.
// El feed de texto repite todo lo que pasa en el mapa (alternativa accesible).
'use strict';

(function (raiz) {
  const CC = raiz.CC;
  const el = CC.el;
  const M = CC.Motor;
  const A = CC.Agentes;

  const MS_POR_DIA = 2000;
  const MAX_ANIMADOS = 10;   // animaciones por día; el resto solo va al feed
  const MAX_FEED = 30;
  const TONOS = [0, 1, 2, 3, 4].map((i) => `var(--tono-${i})`); // de poco a mucho fiado; cambian con el tema
  const R = 1.75;            // radio de la ficha de cliente, en unidades del plano

  const SEM_CLASE = { verde: 'sem-verde', amarillo: 'sem-amarillo', rojo: 'sem-rojo', insuficiente: 'sem-insuficiente' };

  CC.secciones['montaje-pasillo'] = function montarPasillo(destino) {
    const forma = CC.Gemelo.formaDelSitio();
    destino.replaceChildren();
    if (!forma) {
      destino.append(el('p', { class: 'apoyo', role: 'alert' }, 'No se encontró la forma del pasillo.'));
      return;
    }

    let perfiles = A.copiarPerfiles();
    let p = null;           // estado de la simulación
    let reloj = null;
    let velocidad = 1;
    let corriendo = false;
    let visible = false;
    let seleccion = null;   // { tipo: 'bodega' | 'cliente', id }
    let pendientes = [];    // temporizadores de animación del día en curso
    const reducido = CC.movimientoReducido();

    // ---------- Controles ----------
    const dia = el('p', { class: 'dia-simulado' }, 'Día 0');
    const bPausa = el('button', { type: 'button', class: 'boton boton-primario boton-chico' }, 'Empezar');
    const b1 = el('button', { type: 'button', class: 'boton boton-secundario boton-chico', 'aria-pressed': 'true' }, '1×');
    const b4 = el('button', { type: 'button', class: 'boton boton-secundario boton-chico', 'aria-pressed': 'false' }, '4×');
    const bReiniciar = el('button', { type: 'button', class: 'boton boton-secundario boton-chico' }, 'Reiniciar');
    const controles = el('div', { class: 'controles-sim', role: 'group', 'aria-label': 'Controles de la simulación' }, bPausa, b1, b4, bReiniciar);
    const rotulo60 = el('p', { class: 'rotulo-dia60', role: 'status' });

    destino.append(el('div', { class: 'barra-sim' }, dia, controles), rotulo60);
    if (reducido) {
      destino.append(el('p', { class: 'apoyo' }, 'Tienes activado «reducir movimiento»: la simulación no arranca sola y los trazos aparecen sin animación. Usa «Empezar» o «Pausa» cuando quieras.'));
    }

    const mapa = CC.Gemelo.montar(destino, forma, {
      descripcion: 'Pasillo A-B simulado: 20 bodegas y 40 clientes ficticios. Lo que pasa en el mapa se repite en texto en «Lo que pasa en el pasillo».',
      rotulo: 'Posiciones ilustrativas; ninguna bodega real participa. Bodegas y clientes ficticios.',
    });
    mapa.maqueta.parentElement.classList.add('marco-sim');

    const leyenda = el('details', { class: 'leyenda-sim detalles-sim' },
      el('summary', null, 'Cómo leer el mapa'),
      el('p', null, el('strong', null, 'Fichas: '), 'el semáforo que vería el propio cliente. ',
        el('span', { class: 'sem sem-verde' }, '● Verde'), ' · ',
        el('span', { class: 'sem sem-amarillo' }, '▲ Amarillo'), ' · ',
        el('span', { class: 'sem sem-rojo' }, '■ Rojo'), ' · ',
        el('span', { class: 'sem sem-insuficiente' }, '○ Historial insuficiente')),
      el('p', null, el('strong', null, 'Bodegas: '), 'el tono de la bodega indica cuánto ha fiado ',
        el('span', { class: 'tonos', 'aria-hidden': 'true' }, TONOS.map((t) => el('span', { style: `background:${t}` }))),
        ' de poco a mucho. Trazo de tinta: nota firmada por los dos. Sello: cumplida. Marca gris: incumplida. Línea punteada: permiso.'));
    if (typeof matchMedia === 'function' && matchMedia('(min-width: 900px)').matches) leyenda.open = true;
    destino.append(leyenda);

    // ---------- Hoja: Qué pasa / Clientes / Bodegas (docs/diseno-web-movil.md §3) ----------
    // En el celular es una hoja inferior fija que se abre y se cierra; desde 900 px va en la página.
    const tarjeta = el('div', { class: 'pensamiento' });
    const anuncio = el('p', { class: 'lector', role: 'status' });
    const feed = el('ol', { class: 'feed-sim' });
    const VISIBLES = 10;
    const listas = {
      clientes: { ul: el('ul', { class: 'lista-personajes' }), buscar: null, mas: null, todos: false },
      bodegas: { ul: el('ul', { class: 'lista-personajes' }), buscar: null, mas: null, todos: false },
    };
    for (const [clave, l] of Object.entries(listas)) {
      l.buscar = el('input', { type: 'search', class: 'buscar', placeholder: 'Buscar por nombre', 'aria-label': clave === 'clientes' ? 'Buscar cliente' : 'Buscar bodega' });
      l.mas = el('button', { type: 'button', class: 'boton boton-secundario boton-chico ver-mas' });
      l.buscar.addEventListener('input', () => pintarListas());
      l.mas.addEventListener('click', () => { l.todos = !l.todos; pintarListas(); });
    }
    const PESTANAS = [['feed', 'Qué pasa'], ['clientes', 'Clientes'], ['bodegas', 'Bodegas']];
    const pestanas = {};
    const paneles = {
      feed: el('div', null, el('p', { class: 'apoyo' }, 'Los últimos 30 movimientos, del más nuevo al más viejo.'), feed),
      clientes: el('div', null, listas.clientes.buscar, listas.clientes.ul, listas.clientes.mas),
      bodegas: el('div', null, listas.bodegas.buscar, listas.bodegas.ul, listas.bodegas.mas),
    };
    const tablist = el('div', { class: 'hoja-pestanas', role: 'tablist', 'aria-label': 'Detalles del pasillo' });
    for (const [clave, texto] of PESTANAS) {
      const idT = `pestana-${clave}`;
      const idP = `panel-${clave}`;
      pestanas[clave] = el('button', { type: 'button', role: 'tab', id: idT, 'aria-controls': idP, 'aria-selected': 'false', tabindex: '-1' }, texto);
      pestanas[clave].addEventListener('click', () => { elegirPestana(clave); abrirHoja(true); });
      pestanas[clave].addEventListener('keydown', (e) => {
        const orden = PESTANAS.map(([k]) => k);
        const i = orden.indexOf(clave);
        const sig = e.key === 'ArrowRight' ? orden[(i + 1) % orden.length] : e.key === 'ArrowLeft' ? orden[(i + orden.length - 1) % orden.length] : null;
        if (sig) { e.preventDefault(); elegirPestana(sig); pestanas[sig].focus(); }
      });
      tablist.append(pestanas[clave]);
      Object.assign(paneles[clave], { id: idP, role: 'tabpanel', tabIndex: 0 });
      paneles[clave].setAttribute('aria-labelledby', idT);
      paneles[clave].classList.add('hoja-panel');
    }
    const bHoja = el('button', { type: 'button', class: 'hoja-abrir', 'aria-expanded': 'false', 'aria-controls': 'hoja-cuerpo' }, 'Abrir');
    const hoja = el('section', { class: 'hoja', 'aria-label': 'Qué pasa, clientes y bodegas' },
      el('div', { class: 'hoja-cabeza' }, tablist, bHoja),
      el('div', { class: 'hoja-cuerpo', id: 'hoja-cuerpo' }, tarjeta, anuncio, paneles.feed, paneles.clientes, paneles.bodegas));
    destino.append(hoja);

    function elegirPestana(clave) {
      for (const [k] of PESTANAS) {
        const si = k === clave;
        pestanas[k].setAttribute('aria-selected', String(si));
        pestanas[k].tabIndex = si ? 0 : -1;
        paneles[k].hidden = !si;
      }
    }
    function abrirHoja(abierta) {
      hoja.classList.toggle('abierta', abierta);
      bHoja.setAttribute('aria-expanded', String(abierta));
      bHoja.textContent = abierta ? 'Cerrar' : 'Abrir';
    }
    bHoja.addEventListener('click', () => abrirHoja(!hoja.classList.contains('abierta')));
    elegirPestana('feed');

    // ---------- Parámetros editables ----------
    const tablaParams = el('tbody');
    const detallesParams = el('details', { class: 'detalles-sim' },
      el('summary', null, 'Parámetros de la simulación (inventados, editables)'),
      el('p', { class: 'apoyo' }, 'Probabilidades por perfil. Se normalizan para que pagar a tiempo, tarde y no pagar sumen 1. «Da permiso» es la probabilidad de aceptar cuando una bodega nueva se lo pide. Se aplican al reiniciar.'),
      el('div', { class: 'tabla-marco' }, el('table', { class: 'tabla tabla-params' },
        el('thead', null, el('tr', null, ['Perfil', 'Clientes', 'Paga a tiempo', 'Paga tarde', 'No paga', 'Da permiso'].map((t) => el('th', { scope: 'col' }, t)))),
        tablaParams)),
      el('button', { type: 'button', class: 'boton boton-secundario boton-chico', onclick: () => { leerParams(); reiniciar(); } }, 'Aplicar y reiniciar'));
    destino.append(detallesParams);

    function pintarParams() {
      tablaParams.replaceChildren(...Object.entries(perfiles).map(([k, v]) => el('tr', null,
        el('th', { scope: 'row' }, v.nombre),
        el('td', { class: 'mono' }, String(A.REPARTO[k] || 0)),
        ['aTiempo', 'tarde', 'noPaga', 'permiso'].map((campo) => el('td', null,
          el('input', {
            type: 'number', min: '0', max: '1', step: '0.01', value: String(+Number(v[campo]).toFixed(2)),
            'data-perfil': k, 'data-campo': campo, 'aria-label': `${v.nombre}: ${campo === 'aTiempo' ? 'paga a tiempo' : campo === 'tarde' ? 'paga tarde' : campo === 'noPaga' ? 'no paga' : 'da permiso'}`,
          }))))));
    }
    function leerParams() {
      for (const inp of tablaParams.querySelectorAll('input')) {
        const v = Number(inp.value);
        if (Number.isFinite(v)) perfiles[inp.dataset.perfil][inp.dataset.campo] = Math.min(1, Math.max(0, v));
      }
      for (const k of Object.keys(perfiles)) perfiles[k] = A.normalizar(perfiles[k]);
      pintarParams();
    }

    // ---------- Dibujo de bodegas y fichas ----------
    const S = mapa.s;
    let fichas = {};
    let casas = {};

    function prepararMapa() {
      for (const c of ['puente', 'trazos', 'pulso', 'fichas', 'notas', 'sello']) mapa.capas[c].replaceChildren();
      for (const b of Object.values(mapa.bodegas)) {
        b.g.classList.remove('bodega-sim');
        b.tapa.style.fill = '';
        b.g.onclick = null;
        const t = b.g.querySelector('title');
        if (t) t.remove();
      }
      for (const b of p.bodegas) {
        const caja = mapa.bodegas[b.lugar];
        caja.g.classList.add('bodega-sim');
        caja.g.append(S('title', null, b.nombre));
        caja.g.onclick = () => seleccionar('bodega', b.id);
      }
      const cor = mapa.corredor;
      fichas = {};
      casas = {};
      const azar = M.crearAzar(p.semilla + 1);
      for (const c of p.clientes) {
        const x = cor.xIni + 3 + azar() * (cor.xFin - cor.xIni - 6);
        const y = cor.centro + (azar() - 0.5) * (cor.abajo - cor.arriba - 2 * R - 0.6);
        casas[c.id] = { x, y };
        const g = S('g', { class: 'ficha-sim', 'data-id': c.id },
          S('title', null, c.nombre),
          S('circle', { cx: 0, cy: 0, r: R }),
          S('text', { x: 0, y: 0.55, 'text-anchor': 'middle', class: 'ficha-forma' }, '○'));
        g.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`;
        g.addEventListener('click', () => seleccionar('cliente', c.id));
        mapa.capas.fichas.append(g);
        fichas[c.id] = { g, x, y };
      }
    }

    function moverFicha(cid, x, y) {
      const f = fichas[cid];
      f.x = x;
      f.y = y;
      f.g.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`;
    }

    function frente(bid) {
      const b = p.bodegas.find((x) => x.id === bid);
      const caja = mapa.bodegas[b.lugar];
      const a = mapa.ancla(b.lugar);
      const cor = mapa.corredor;
      const y = caja.superior ? cor.arriba + R + 0.4 : cor.abajo - R - 0.4;
      return { a, x: a.x + (Math.random() - 0.5) * 3, y };
    }

    function pintarSemaforos() {
      for (const c of p.clientes) {
        const sem = A.semaforoDe(p, c.id);
        const f = fichas[c.id];
        f.g.setAttribute('class', `ficha-sim ficha-${sem.color}`);
        f.g.querySelector('.ficha-forma').textContent = sem.forma;
        f.g.querySelector('title').textContent = `${c.nombre}: ${sem.palabra}`;
      }
      const max = Math.max(1, ...p.bodegas.map((b) => b.fiado));
      for (const b of p.bodegas) {
        const nivel = Math.min(TONOS.length - 1, Math.floor((b.fiado / max) * TONOS.length));
        mapa.bodegas[b.lugar].tapa.style.fill = b.fiado ? TONOS[nivel] : TONOS[0];
      }
    }

    // ---------- Animación de un evento ----------
    function animar(e, dur) {
      const anim = !reducido;
      const b = p.bodegas.find((x) => x.id === e.bodega);
      const lugar = b && b.lugar;
      if (!lugar) return;
      if (e.tipo === 'fio' || e.tipo === 'permiso' || e.tipo === 'sin_permiso' || e.tipo === 'no_fio') {
        const fr = frente(e.bodega);
        moverFicha(e.cliente, fr.x, fr.y);
        if (e.tipo === 'fio') {
          const f = { x: fr.x, y: fr.y };
          const t1 = CC.Gemelo.trazo(mapa, 'trazos', fr.a, f, { animar: anim, curva: 1.2, clase: 'trazo-sim' });
          const t2 = CC.Gemelo.trazo(mapa, 'trazos', f, fr.a, { animar: anim, curva: -1.2, clase: `trazo-sim${anim ? ' dibujar-despues' : ''}` });
          quitarDespues([t1, t2], Math.max(1600, dur * 1.2));
        } else if (e.tipo === 'permiso') {
          const pu = S('path', { d: mapa.camino(fr.x, fr.y, fr.a.x, fr.a.y, 0.8), class: `puente-linea${anim ? ' aparecer' : ''}` });
          mapa.capas.puente.append(pu);
          quitarDespues([pu], Math.max(1600, dur * 1.2));
        } else {
          const caja = mapa.bodegas[lugar];
          caja.g.classList.add('sin-permiso-sim');
          setTimeout(() => caja.g.classList.remove('sin-permiso-sim'), Math.max(900, dur));
        }
      } else if (e.tipo === 'pago') {
        mapa.capas.sello.replaceChildren(); // un solo sello a la vez
        const s = CC.Gemelo.sello(mapa, mapa.centro(lugar), { animar: anim, clase: 'sello-sim' });
        quitarDespues([s], Math.max(1400, dur));
      } else if (e.tipo === 'incumplida') {
        const c = mapa.centro(lugar);
        const x = S('g', { class: `marca-gris${anim ? ' aparecer' : ''}` },
          S('path', { d: `M ${c.x - 1.6} ${c.y - 1.6} L ${c.x + 1.6} ${c.y + 1.6} M ${c.x + 1.6} ${c.y - 1.6} L ${c.x - 1.6} ${c.y + 1.6}` }));
        mapa.capas.notas.append(x);
        quitarDespues([x], Math.max(2000, dur * 1.5));
      }
    }

    function quitarDespues(nodos, ms) {
      const t = setTimeout(() => nodos.forEach((n) => n.remove()), ms);
      pendientes.push(t);
    }

    // ---------- Feed, tarjeta y listas ----------
    function alFeed(eventos) {
      const nuevos = eventos.slice().reverse().map((e) => el('li', { class: `feed-${e.tipo}` },
        el('span', { class: 'mono feed-dia' }, `Día ${e.dia}`), ' · ', e.texto));
      feed.prepend(...nuevos);
      while (feed.children.length > MAX_FEED) feed.lastElementChild.remove();
    }

    function semEl(sem) {
      return el('span', { class: `sem ${SEM_CLASE[sem.color]}` }, `${sem.forma} ${sem.palabra}`);
    }

    function pintarListas() {
      const filas = {
        clientes: p.clientes.map((c) => ({ id: c.id, nombre: c.nombre, tipo: 'cliente', extra: semEl(A.semaforoDe(p, c.id)) })),
        bodegas: p.bodegas.map((b) => ({ id: b.id, nombre: b.nombre, tipo: 'bodega', extra: el('span', { class: 'mono' }, `${b.notas} notas`) })),
      };
      for (const [clave, l] of Object.entries(listas)) {
        const q = l.buscar.value.trim().toLowerCase();
        const todas = filas[clave].filter((f) => !q || f.nombre.toLowerCase().includes(q));
        const vistas = l.todos || q ? todas : todas.slice(0, VISIBLES);
        l.ul.replaceChildren(...vistas.map((f) => el('li', null,
          el('button', { type: 'button', class: `personaje${seleccion && seleccion.id === f.id ? ' elegido' : ''}`, onclick: () => seleccionar(f.tipo, f.id) },
            el('span', null, f.nombre), f.extra))));
        if (!vistas.length) l.ul.append(el('li', { class: 'apoyo' }, 'Nadie con ese nombre.'));
        const resto = todas.length - VISIBLES;
        l.mas.hidden = !!q || resto <= 0;
        l.mas.textContent = l.todos ? `Ver solo los primeros ${VISIBLES}` : `Ver los ${resto} restantes`;
      }
    }

    function seleccionar(tipo, id) {
      seleccion = { tipo, id };
      pintarTarjeta();
      abrirHoja(true);
      const quien = tipo === 'cliente' ? p.clientes.find((c) => c.id === id) : p.bodegas.find((b) => b.id === id);
      anuncio.textContent = `${quien.nombre}. ${(quien.ultima && quien.ultima.frase) || 'Sin decisiones todavía.'}`;
      pintarListas();
      for (const f of Object.values(fichas)) f.g.classList.remove('elegida');
      for (const b of Object.values(mapa.bodegas)) b.g.classList.remove('elegida');
      if (tipo === 'cliente') fichas[id].g.classList.add('elegida');
      else mapa.bodegas[p.bodegas.find((b) => b.id === id).lugar].g.classList.add('elegida');
    }

    function pintarTarjeta() {
      if (!seleccion) {
        tarjeta.replaceChildren(el('p', { class: 'apoyo' }, 'Toca una bodega o un cliente para ver su perfil, su historial y su última decisión, explicada en una frase.'));
        return;
      }
      if (seleccion.tipo === 'bodega') {
        const b = p.bodegas.find((x) => x.id === seleccion.id);
        const ult = b.ultima;
        tarjeta.replaceChildren(
          el('p', { class: 'pensamiento-titulo' }, b.nombre),
          el('p', { class: 'apoyo' }, 'Bodega ficticia. Regla: verde, fía lo pedido; amarillo, la mitad; rojo, no fía; sin permiso o con historial insuficiente, fía poco ($1k–$5k) para conocerlo.'),
          el('dl', { class: 'datos-sim' },
            el('div', null, el('dt', null, 'Notas firmadas'), el('dd', { class: 'mono' }, String(b.notas))),
            el('div', null, el('dt', null, 'Ha fiado en total'), el('dd', { class: 'mono' }, A.pesos(b.fiado)))),
          ult
            ? el('blockquote', { class: 'frase' }, el('p', null, `Día ${ult.dia}, con ${nombreCliente(ult.cliente)}: «${ult.frase}»`))
            : el('p', { class: 'apoyo' }, 'Todavía no le han pedido fiado.'));
        return;
      }
      const c = p.clientes.find((x) => x.id === seleccion.id);
      const perfil = p.perfiles[c.perfil];
      const stats = M.resumen(p.mundo, c.id);
      const sem = A.semaforoDe(p, c.id);
      const ult = c.ultima;
      tarjeta.replaceChildren(
        el('p', { class: 'pensamiento-titulo' }, c.nombre, ' ', semEl(sem)),
        el('p', { class: 'apoyo' }, `Perfil: ${perfil.nombre} (a tiempo ${pct(perfil.aTiempo)}, tarde ${pct(perfil.tarde)}, no paga ${pct(perfil.noPaga)}). Personaje ficticio.`),
        el('dl', { class: 'datos-sim' },
          el('div', null, el('dt', null, 'Notas firmadas'), el('dd', { class: 'mono' }, String(stats.accepted))),
          el('div', null, el('dt', null, 'A tiempo / tarde'), el('dd', { class: 'mono' }, `${stats.paid_on_time} / ${stats.paid_late}`)),
          el('div', null, el('dt', null, 'Vencidas / incumplidas'), el('dd', { class: 'mono' }, `${stats.overdue_open} / ${stats.defaulted}`)),
          el('div', null, el('dt', null, 'Bodegas distintas'), el('dd', { class: 'mono' }, String(stats.issuers_count)))),
        el('ul', { class: 'condiciones' }, sem.condiciones.map((k) => el('li', null, k.cumple ? '✓ ' : '✗ ', el('span', { class: 'lector' }, k.cumple ? 'Se cumple: ' : 'No se cumple: '), k.texto))),
        ult
          ? el('blockquote', { class: 'frase' }, el('p', null, `Día ${ult.dia}, ${nombreBodega(ult.bodega)} pensó: «${ult.frase}»`))
          : el('p', { class: 'apoyo' }, 'Todavía no ha pedido fiado.'));
    }

    const pct = (x) => `${Math.round(x * 100)} %`;
    const nombreCliente = (id) => (p.clientes.find((c) => c.id === id) || {}).nombre || id;
    const nombreBodega = (id) => (p.bodegas.find((b) => b.id === id) || {}).nombre || id;

    // ---------- Tiempo ----------
    function unDia() {
      pendientes.forEach(clearTimeout);
      pendientes = [];
      const eventos = A.pasoDia(p);
      const d = p.mundo.dia;
      dia.textContent = `Día ${d}`;
      const dur = MS_POR_DIA / velocidad;
      if (!reducido) {
        mapa.maqueta.parentElement.classList.remove('noche');
        pendientes.push(setTimeout(() => mapa.maqueta.parentElement.classList.add('noche'), dur * 0.62));
      }
      // Los clientes que no se movieron hoy vuelven poco a poco a su lugar.
      const movidos = new Set(eventos.map((e) => e.cliente));
      for (const c of p.clientes) {
        if (!movidos.has(c.id) && fichas[c.id].x !== casas[c.id].x && p.azar() < 0.5) moverFicha(c.id, casas[c.id].x, casas[c.id].y);
      }
      const visibles = eventos.filter((e) => e.tipo !== 'no_fio').slice(0, MAX_ANIMADOS);
      visibles.forEach((e, i) => {
        pendientes.push(setTimeout(() => animar(e, dur / 2), (i * dur * 0.8) / Math.max(1, visibles.length)));
      });
      alFeed(eventos);
      pintarSemaforos();
      if (d % 2 === 0 || velocidad === 1) pintarListas();
      if (seleccion) pintarTarjeta();
      if (d >= M.MIN_DIAS && !rotulo60.dataset.visto) {
        rotulo60.dataset.visto = '1';
        rotulo60.textContent = 'Desde el día 60 hay historial suficiente para juzgar. Antes, el semáforo dice «historial insuficiente» a propósito.';
        rotulo60.classList.add('visible');
      }
    }

    function programar() {
      clearInterval(reloj);
      reloj = null;
      if (corriendo && visible && !document.hidden) reloj = setInterval(unDia, MS_POR_DIA / velocidad);
    }

    function ponerCorriendo(v) {
      corriendo = v;
      bPausa.textContent = v ? 'Pausa' : (p.mundo.dia === 0 ? 'Empezar' : 'Reanudar');
      bPausa.setAttribute('aria-label', v ? 'Pausar la simulación' : 'Correr la simulación');
      programar();
    }

    function ponerVelocidad(v) {
      velocidad = v;
      b1.setAttribute('aria-pressed', String(v === 1));
      b4.setAttribute('aria-pressed', String(v === 4));
      programar();
    }

    function reiniciar() {
      pendientes.forEach(clearTimeout);
      pendientes = [];
      p = A.crearPasillo({ forma, perfiles });
      seleccion = null;
      feed.replaceChildren(el('li', { class: 'apoyo' }, 'Día 0 · Todavía no pasa nada. Nadie tiene historial.'));
      rotulo60.textContent = 'Antes del día 60 todos dicen «historial insuficiente»: todavía no hay suficiente historia para juzgar a nadie.';
      rotulo60.classList.remove('visible');
      delete rotulo60.dataset.visto;
      dia.textContent = 'Día 0';
      mapa.maqueta.parentElement.classList.remove('noche');
      prepararMapa();
      pintarSemaforos();
      pintarListas();
      pintarTarjeta();
      ponerCorriendo(false);
    }

    bPausa.addEventListener('click', () => ponerCorriendo(!corriendo));
    b1.addEventListener('click', () => ponerVelocidad(1));
    b4.addEventListener('click', () => ponerVelocidad(4));
    bReiniciar.addEventListener('click', reiniciar);
    document.addEventListener('visibilitychange', programar);

    pintarParams();
    reiniciar();

    // Arranca sola cuando la sección está a la vista, salvo con movimiento reducido.
    if (typeof IntersectionObserver === 'function') {
      new IntersectionObserver((entradas) => {
        visible = entradas.some((e) => e.isIntersecting);
        if (visible && !reducido && !corriendo && p.mundo.dia === 0 && !destino.dataset.arrancada) {
          destino.dataset.arrancada = '1';
          ponerCorriendo(true);
        } else {
          programar();
        }
      }, { threshold: 0.15 }).observe(mapa.maqueta.parentElement);
    } else {
      visible = true;
    }

    // En el celular, los controles y la hoja son fijos abajo solo mientras se ve la sección.
    const seccion = destino.closest('section');
    if (seccion && typeof IntersectionObserver === 'function') {
      new IntersectionObserver((entradas) => {
        for (const e of entradas) seccion.classList.toggle('en-vista', e.isIntersecting);
      }, { threshold: 0 }).observe(seccion);
    } else if (seccion) {
      seccion.classList.add('en-vista');
    }

    // Para pruebas y capturas: avanzar sin esperar.
    CC.pasillo = {
      avanzar(n) { for (let i = 0; i < n; i++) unDia(); return p.mundo.dia; },
      estado: () => p,
      seleccionar,
      pausar: () => ponerCorriendo(false),
      abrirHoja,
      elegirPestana,
    };
  };
})(window);
