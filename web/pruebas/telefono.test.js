// El teléfono nunca vacío (cola, tarea 11): al cargar, la repetición está en el paso 1 y el
// teléfono muestra la pantalla 1 con «Acepto»; «Acepto» avanza igual que «Siguiente».
// La prueba corre repeticion.js en un DOM mínimo hecho aquí (sin paquetes).
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const WEB = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(WEB, 'index.html'), 'utf8');

test('el HTML ya no invita a «Empezar»: la pantalla 1 trae «Acepto»', () => {
  assert.doesNotMatch(html, /tel-inicio|Toca «Empezar»/);
  const p1 = html.match(/<div class="tel-vista" data-vista="cliente">[\s\S]*?<li class="tel-pantalla" data-paso="1">([\s\S]*?)<\/li>/);
  assert.ok(p1);
  assert.match(p1[1], /Bodega A-17 te registró una nota/);
  assert.match(p1[1], /<button[^>]*class="[^"]*tel-avanza[^"]*"[^>]*>Acepto<\/button>/);
});

// --- DOM mínimo: lo justo para montar la repetición ---
class Nodo {
  constructor(tag = '#', attrs = {}) {
    this.tag = tag; this.attrs = { ...attrs }; this.hijos = []; this.oyentes = {}; this.textContent = '';
    this.dataset = {}; this.hidden = false; this.disabled = false; this.style = {};
    const c = new Set((attrs.class || '').split(/\s+/).filter(Boolean));
    this.classList = { add: (...x) => x.forEach((k) => c.add(k)), remove: (...x) => x.forEach((k) => c.delete(k)), toggle: (k, v) => ((v ?? !c.has(k)) ? c.add(k) : c.delete(k)), contains: (k) => c.has(k) };
    this._clases = c;
  }
  set className(v) { this._clases.clear(); String(v).split(/\s+/).filter(Boolean).forEach((k) => this._clases.add(k)); }
  setAttribute(k, v) { this.attrs[k] = String(v); if (k === 'class') this.className = v; }
  getAttribute(k) { return this.attrs[k] ?? null; }
  removeAttribute(k) { delete this.attrs[k]; }
  hasAttribute(k) { return k in this.attrs; }
  append(...h) { this.hijos.push(...h); }
  replaceChildren(...h) { this.hijos = h; }
  remove() {}
  addEventListener(t, f) { (this.oyentes[t] = this.oyentes[t] || []).push(f); }
  click() { (this.oyentes.click || []).forEach((f) => f()); }
  querySelectorAll() { return []; }
  querySelector() { return null; }
  get firstChild() { return this.hijos[0]; }
  get parentElement() { return this.padre || new Nodo(); }
  closest() { return null; }
  getBBox() { return {}; }
}

function montar() {
  // Pantallas y botones del teléfono tal como están en index.html (vista del cliente).
  const pantallas = [...html.matchAll(/<li class="tel-pantalla" data-paso="(\d)">([\s\S]*?)<\/li>/g)].map((m) => {
    const li = new Nodo('li', { class: 'tel-pantalla' });
    li.dataset.paso = m[1];
    li.avanza = [...m[2].matchAll(/tel-avanza/g)].map(() => new Nodo('button'));
    return li;
  });
  const app = new Nodo('aside', { class: 'app-en-mano' });
  app.querySelectorAll = (sel) => (sel === '.tel-pantalla' ? pantallas : sel === '.tel-avanza' ? pantallas.flatMap((p) => p.avanza) : []);
  const documento = {
    createElement: (t) => new Nodo(t),
    createElementNS: (_, t) => new Nodo(t),
    createTextNode: (t) => ({ texto: t }),
    querySelector: (sel) => (sel === '.app-en-mano' ? app : null),
    querySelectorAll: () => [],
    getElementById: () => null,
    readyState: 'loading', // app.js espera DOMContentLoaded; aquí se monta a mano
    addEventListener() {},
    documentElement: new Nodo('html'),
  };
  const ventana = { document: documento, CC: { secciones: {} }, CC_DATOS: {} };
  ventana.window = ventana;
  const ctx = vm.createContext({ ...ventana, Node: Nodo, console, matchMedia: () => ({ matches: false }) });
  ctx.window = ctx;
  for (const f of ['app.js', 'datos/pasillo-a-b.js', 'datos/repeticion.js', 'gemelo.js', 'repeticion.js']) {
    vm.runInContext(fs.readFileSync(path.join(WEB, f), 'utf8'), ctx, { filename: f });
  }
  const destino = new Nodo('div');
  ctx.CC.secciones['montaje-demo'](destino);
  return { ctx, app, pantallas, destino };
}

function botones(nodo, acc = []) {
  if (nodo && nodo.tag === 'button') acc.push(nodo);
  for (const h of (nodo && nodo.hijos) || []) if (h && typeof h === 'object') botones(h, acc);
  return acc;
}
const actual = (pantallas) => pantallas.filter((li) => li.classList.contains('actual')).map((li) => li.dataset.paso);

test('al cargar, sin tocar nada: paso 1 en el mapa y pantalla 1 en el teléfono', () => {
  const { app, pantallas } = montar();
  assert.equal(app.dataset.paso, '1');
  assert.deepEqual([...new Set(actual(pantallas))], ['1']);
});

test('«Acepto» avanza igual que «Siguiente»', () => {
  const a = montar();
  const acepto = a.pantallas.find((li) => li.dataset.paso === '1').avanza[0];
  acepto.click();
  const b = montar();
  const siguiente = botones(b.destino).find((x) => x.textContent === 'Siguiente' || x.hijos.includes('Siguiente'));
  assert.ok(siguiente, 'hay un botón «Siguiente»');
  siguiente.click();
  assert.equal(a.app.dataset.paso, '2');
  assert.equal(b.app.dataset.paso, '2');
});
