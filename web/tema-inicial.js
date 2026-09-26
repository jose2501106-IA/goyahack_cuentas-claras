// Tema elegido antes (si lo hay), aplicado antes de pintar para que no parpadee.
// Se carga en el <head> sin defer. Sin almacenamiento, el sitio sigue al sistema.
// Vive en un archivo aparte para que la CSP no necesite 'unsafe-inline' (decisión #56, W1).
try {
  var t = localStorage.getItem('cc-tema');
  if (t === 'claro' || t === 'oscuro') document.documentElement.setAttribute('data-tema', t);
} catch (e) { /* sin almacenamiento: sigue al sistema */ }
