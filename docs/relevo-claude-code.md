# Relevo para Claude Code — cómo retomar en una sesión nueva

**Actualizado:** sábado 26-sep-2026, 13:15. Léelo completo antes de tocar nada; son dos minutos.

## 1. Dónde estamos

- **Entrega:** domingo 27-sep, antes de las 20:00 (meta interna). **Código congelado el domingo a las 15:00.** Decisión #43; plan en `docs/plan-maestro.md` §4b.
- **Contrato vigente en testnet:** `CDPFZNYZEBTEBB3GLOW62I32CV3LD3QI7KV4YQPFVMZXWC2XRFIGBDTW` (`demo/deploy.json`).
  - 13 pruebas en verde (`cd contracts/cuentas_claras && cargo test`).
  - Sin función de actualización (#30).
  - Contratos anteriores, obsoletos, en `contratos_anteriores`: el primero se retiró por `get_stats` (#42), el segundo por la excepción del emisor (#46).
- **Regla de lectura actual:** el resumen (`read_stats`) solo lo lee sin permiso el propio cliente. Cualquier bodega, incluso la que le fió, necesita su permiso vigente.
- **App local** (`node backend/server.js`, puerto 8080, sin `npm install`):
  - servidor Node sin dependencias que llama al Stellar CLI (#45);
  - frontend HTML, CSS y JS sin framework;
  - portada «Pasillo A-B»: gemelo digital con la forma real del pasillo, leída de `plano/pasillo-a-b.json` (#47, #48);
  - cuatro vistas: Bodega A, Teléfono de Doña Mary, Bodega B y Para el jurado;
  - 27 pruebas con `node --test backend/`.
- **Datos de demo:**
  - Bodega A = A-17, Bodega B = B-40 (la que no conoce a Doña Mary), Bodega C = A-73 (segundo emisor, sembrado con `demo/sembrar.sh`). Posiciones ilustrativas.
  - Doña Mary es ficticia.
- **Respaldo:** `./demo/demo.sh --paso-a-paso` (plan B por línea de comandos).
- **Pitch y demo vigentes:** `pitch/2026-09-26_pitch-3-minutos-v2.md` y `pitch/2026-09-26_guion-demo-v2.md`.

## 2. Llaves de testnet: lo que hay que saber

Las identidades `plataforma`, `bodega_a`, `bodega_b`, `bodega_c` y `dona_mary` viven en `~/.config/stellar/identity/` del **Codespace original**. Nunca van al repo ni al chat.

- **Si trabajas en ese mismo Codespace:** todo firma como siempre.
- **Si trabajas en otro lado** (Claude Code en la web, en la Mac o en un Codespace nuevo): **no hay llaves**. Solo haz trabajo que no firme: frontend, simulación, sitio estático y documentos. No despliegues ni generes identidades nuevas sin que José lo apruebe: un contrato nuevo cambia el Contract ID en todos los documentos.

## 3. Pendientes (en orden)

1. **Revisión visual** de la app en un navegador real (José). Detalles vistos en la captura:
   - letras de las etiquetas con espacios raros («B odega A»);
   - la etiqueta «Firmada por los dos» se encima con la ficha de Doña Mary;
   - revisar la inclinación isométrica y las animaciones.
2. **Capturas** de las cuatro vistas y la portada en `demo/capturas/`.
3. **Video** de 2–3 minutos con el flujo real (guion de demo v2, §5).
4. **Sitio público y «Pasillo vivo»** (#49–#51): se construyen en `web/` siguiendo `docs/cola-de-trabajo.md` y `spec/2026-09-26_especificacion-web-y-agentes.md`, desde Claude Code en la web. No necesitan llaves.

## 4. Reglas que no cambian

Están en `CLAUDE.md`:
- solo testnet;
- nada personal ni dinero en la cadena;
- ninguna llave en el repo;
- cero paquetes fuera de lo que pida la spec;
- no tocar `research/` ni `privado/`;
- nada del plano fuera de `plano/pasillo-a-b.json`;
- `git pull --rebase` antes de cada push;
- si algo falla dos veces, detenerse y escribir el error.

## 5. Prompt de arranque para una sesión nueva

```
Sesión nueva de Claude Code. Primero: git pull --rebase origin main. Lee CLAUDE.md,
docs/relevo-claude-code.md completo, llms.txt, demo/deploy.json y en docs/decisiones.md
de la #42 a la última. Dime en 5 renglones:
(1) en qué entorno estás;
(2) si existen las identidades de stellar en ~/.config/stellar/identity (solo sus
    nombres, nunca las llaves);
(3) si pasan cargo test y node --test backend/;
(4) qué pendientes de la sección 3 puedes hacer aquí;
(5) qué necesitas de José.
No cambies nada todavía.
```
