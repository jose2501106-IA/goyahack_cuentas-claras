// Pasillo vivo: conecta el motor y los agentes con el gemelo y el feed (spec web §3).
// Versión provisional (cola, tarea 2): solo dibuja el pasillo; la simulación llega en la tarea 5.
'use strict';

(function (raiz) {
  const CC = raiz.CC;
  CC.secciones['montaje-pasillo'] = function montarPasillo(destino) {
    const forma = CC.Gemelo.formaDelSitio();
    destino.replaceChildren();
    if (!forma) {
      destino.append(CC.el('p', { class: 'apoyo', role: 'alert' }, 'No se encontró la forma del pasillo.'));
      return;
    }
    CC.Gemelo.montar(destino, forma, {
      barra: CC.el('p', { class: 'apoyo' }, 'La simulación se está construyendo.'),
    });
  };
})(window);
