# Playbook para el próximo hackathon de blockchain

**Aprendizajes de GOYA HACK 2026, donde Cuentas Claras quedó en 3.er lugar del Track Contenido y en 2.º lugar del Track Pollar**

**Fecha:** 4-oct-2026.

**Fuentes:**
- correo oficial «Goya Hack | Conoce a los finalistas» (CriptoUNAM, 4-oct-2026);
- repositorios y demos públicos de los finalistas, revisados el 4-oct-2026 (enlaces en la sección 2);
- la guía de pitch de Nader Dabit;
- nuestra propia bitácora (`docs/decisiones.md`).

Lo que no está escrito tal cual en una fuente va marcado *(inferencia)*.

---

## 1. Resultado y lectura en una línea

| Track | 🥇 | 🥈 | 🥉 |
|---|---|---|---|
| Stellar | AuraCafe | Cumple&Cobra | PaperPay |
| Avalanche | Gremium | CryptoTrace Insight | Nodo |
| Inteligencia Artificial | GoyaPay AI | Brevik | Metztli |
| **Contenido** | Micopay App | GoyaPay AI | **Cuentas Claras** |
| Pollar | *(sin publicar)* | **Cuentas Claras** | *(sin publicar)* |

**Actualización (17-oct-2026):** en la premiación del 16-oct-2026, los organizadores dieron a Cuentas Claras el 2.º lugar del Track Pollar. Cuentas Claras no integra el SDK de Pollar (quedó fuera de la ruta crítica; spec v2, sección 13) y el criterio de ese lugar no se publicó. Los demás lugares del track tampoco se han publicado.

**La lectura:** ganó quien **movió dinero real en una demo que el juez podía usar**, **integró al patrocinador por nombre** y le dio a la IA **un papel necesario**. Cuentas Claras ganó por **la calidad del problema y de la investigación**, pero no movía dinero ni usaba al patrocinador *(inferencia, a partir de lo que tienen en común los finalistas)*.

---

## 2. Qué hicieron los finalistas que encontramos

No encontramos repositorio ni demo pública de **AuraCafe, Gremium, Nodo ni Brevik**.

| Proyecto (lugar) | Qué es | Cadena | ¿Mueve valor? | IA | Lo que el jurado vio |
|---|---|---|---|---|---|
| [Micopay](https://github.com/Micopay/micopay-protocol) (1.º Contenido) | Cambiar USDC por efectivo con alguien cercano | Depósito en garantía en Soroban (HTLC), testnet | **Sí**, USDC | Agentes y x402 | Un proyecto de **6 meses** (más de 650 commits, otros hackathons, entrevistas con usuarios en 3 países), con app móvil |
| [GoyaPay AI](https://github.com/coronahernandezs931-cloud/GoyaPay-IA) (1.º IA, 2.º Contenido) | Cobros pequeños en la UNAM con un agente de voz | Stellar (XLM testnet) y Avalanche (declarado) | XLM de testnet; el resto, en gran parte animado en la interfaz *(inferencia)* | Agente de voz que cobra | Demo muy vistosa por voz; **integró a Pollar, Tangem y Avalanche a la vez**; sección «Verificación para jueces» |
| [Cumple&Cobra](https://github.com/rodyxdev/cumpleycobra) (2.º Stellar) | Depósito en garantía para programación por encargo: si el código cumple, se paga solo | Depósito en garantía en Soroban, testnet | **Sí**, USDC | Gemini juzga el código | Pago verificable por cualquiera, unas 330 pruebas, reto de Pollar atacado por nombre, sección «Límites honestos» |
| [PaperPay](https://github.com/josecadenax/paperpay) (3.º Stellar) | Pagar 0.50 USDC por un artículo científico, sin cuenta | Pagos clásicos de Stellar, testnet | **Sí**, USDC | No | Se entiende en 10 segundos; pago en vivo con Pollar o Freighter; landing pulida |
| [CryptoTrace Insight](https://github.com/OballenEC/cryptotrace-insight) (2.º Avalanche) | Explorador educativo del rastro de una wallet | Solo lectura (Ethereum y Stellar) | No | Heurísticas explicables | Explica por qué marca cada cosa y es honesto; en la demo usó **modo sin conexión** |
| [Metztli](https://github.com/jimenezfabricio470-alt/Metztli.) (3.º IA) | Certificar si un texto o una imagen fue hecho con IA | Hash en el memo de una transacción de Stellar | No | Gemini da el veredicto | Problema muy actual; propuesta simple y verificable |

---

## 3. Los siete patrones de los que quedaron arriba

1. **Se mueve valor en la demo.** Tres de los cuatro primeros y segundos lugares encontrados pasan USDC o XLM, aunque sea en testnet. Un jurado de Stellar quiere ver pagos.
2. **El reto del patrocinador, por su nombre.** Pollar aparece en 4 de los 6 finalistas encontrados de Stellar e IA. Cumple&Cobra cita «reto Stellar BAF y pool de Pollar» en su README. GoyaPay cubrió tres patrocinadores a la vez.
3. **La IA tiene un trabajo, no decora:** juzga código, cobra por voz o certifica contenido. Si hay track de IA, un mismo proyecto puede competir en dos tracks (GoyaPay quedó en dos).
4. **El juez lo prueba en 5 minutos.** Demo pública (Vercel con Railway, Modal o Render), login sin fricción (Pollar, con comisiones patrocinadas) y una guía «para jueces» con transacciones en el explorador.
5. **El README está escrito para el jurado,** con secciones como «Verificación rápida para jueces» y «Límites honestos», y pruebas contadas.
6. **Respaldo para la demo:** modo sin conexión, guion de demo y modo simulado claramente rotulado.
7. **Traer algo construido no penaliza.** Micopay ganó con un proyecto de meses. Los equipos de una persona que construyeron con Claude Code o Codex lo declaran sin problema *(inferencia: el jurado no lo penalizó visiblemente)*.

---

## 4. Cuentas Claras con honestidad: qué sí y qué faltó

**Lo que funcionó (consérvalo):**
- **Un problema real con fuentes** (FICEDA, ENAFIN, Banxico) y **experiencia desde dentro** de la Central.
- Un contrato en Soroban que **hace cumplir reglas** (dos firmas, vencimiento, sin actualización), en lugar de solo guardar datos.
- **Una auditoría propia** que encontró y cerró un hueco crítico (#55).
- **Escuchamos al mentor** y cambiamos el diseño (#57).
- **Privacidad honesta:** en la cadena no hay nombres ni montos exactos.
- Un sitio público verificable, el gemelo digital del Pasillo A-B y la documentación como bitácora.

**Lo que faltó:**

| Faltó | Por qué pesó | Cómo se corrige la próxima vez |
|---|---|---|
| **Mover dinero** (decidimos «no mueve dinero, no emite token») | El jurado de Stellar premió pagos visibles | Aunque el producto sea un registro, agrega **un pago pequeño en USDC de testnet** al flujo: por ejemplo, pagar la nota |
| **Usar al patrocinador** (Pollar quedó como «opcional» y no se usó) | 4 de 6 finalistas lo usaban | Desde el día 1, integra el login y las comisiones patrocinadas del patrocinador |
| **IA con un papel real** (solo agentes simulados) | El track de IA da una segunda oportunidad | Ponle a la IA una tarea necesaria: explicar el semáforo o redactar el recordatorio de cobro |
| **Demo que el juez usa** (era una repetición de la corrida real) | Los ganadores dejaban probar | Una liga con login de un clic y una guía de 5 minutos |
| **Concentración** (tres contratos nuevos, v3 → v5, y muchos documentos en 48 horas) | Le quitó tiempo a la experiencia | Congela el alcance el día 1; las mejoras van después |
| **Subir a todas las plataformas a tiempo** (no está confirmado que el proyecto quedara en Stellar Apex) | Stellar elegía desde Apex | Sube un borrador a cada plataforma **el primer día** y actualízalo |

---

## 5. Checklist por fase

### Semana previa
- [ ] Lee **los retos de cada patrocinador** y elige uno para atacarlo por nombre.
- [ ] Llega con **algo construido**: el proyecto base, su contrato y su demo.
- [ ] Prepara la plantilla del repositorio: README para jueces, `CLAUDE.md`, decisiones y carpeta de investigación.
- [ ] Crea las cuentas de testnet, la wallet del patrocinador (Pollar o la que toque) y Vercel o Railway.

### Día 1 (primeras 3 horas)
- [ ] Regístrate y **sube un borrador a TODAS las plataformas** (panel del organizador, Apex, etc.).
- [ ] Haz al organizador las preguntas de la sección 8.
- [ ] Escribe **un solo flujo de 4 a 6 pasos** que mueva valor y congela el alcance.
- [ ] Despliega un primer contrato «hola mundo» en testnet en la primera hora.

### Construcción
- [ ] El flujo completo funciona de punta a punta antes de cualquier adorno.
- [ ] Pruebas del contrato en verde antes de cada despliegue.
- [ ] Login sin fricción y comisiones patrocinadas.
- [ ] IA con un papel necesario (si hay track de IA).
- [ ] Ve a las mentorías: **su puntaje cuenta**. Aplica la retroalimentación y menciónala.

### Últimas 12 horas
- [ ] Demo pública estable, con **modo de respaldo** rotulado.
- [ ] README para jueces (plantilla en la sección 6).
- [ ] Video de 3 minutos como máximo, con la demo real.
- [ ] Deck o Lean Canvas, con el logo y la portada.
- [ ] Revisa todos los enlaces en una ventana de incógnito.

### Entrega y después
- [ ] Entrega **antes** de la hora límite y guarda capturas de cada confirmación.
- [ ] Pide al organizador la **retroalimentación y la rúbrica** del jurado.
- [ ] Publica el resultado en LinkedIn y redes, y actualiza el README.

---

## 6. Plantilla de README para jueces

```markdown
# Nombre — una frase que diga qué hace

> 🏁 Pruébalo en 5 minutos: <URL de la demo> · Video (3 min): <URL> · Track: <track> · Reto del patrocinador: <nombre>

## Verificación rápida para jueces
1. Abre <demo>, entra con <login sin fricción>.
2. Haz <acción 1> → mira la transacción: <liga al explorador>.
3. Haz <acción 2> → <resultado visible>.

## Qué problema resuelve (con fuente)
## Cómo funciona (diagrama de 5 cajas)
## Qué está en la cadena y qué no
## Pruebas: <n> del contrato · <n> del backend · <n> del frontend
## Límites honestos (qué está simulado y qué falta)
## Qué sigue
```

---

## 7. Estructura del video (3 minutos como máximo)

| Tiempo | Bloque | Qué debe quedar claro |
|---|---|---|
| 0:00–0:20 | **Gancho dirigido al organizador y al patrocinador** | Su misión, tu problema y tu respuesta en una frase |
| 0:20–0:45 | Solución | Beneficio, no funciones; una analogía |
| 0:45–1:05 | Por qué blockchain y stack | Qué regla hace cumplir la cadena; red y patrocinador |
| 1:05–2:20 | **Demo real** | Valor que se mueve y una transacción abierta en el explorador |
| 2:20–2:45 | Tracción, mercado y equipo | Lo que ya funciona; por qué tú |
| 2:45–3:00 | Llamado a la acción | Qué pides |

**Evita:** jerga en voz alta, más de un dato por bloque y funciones en lugar de beneficios. Ensaya con cronómetro.

---

## 8. Preguntas para el organizador el día 1

1. ¿Cuál es la **rúbrica** y cuánto pesa cada criterio?
2. ¿Dónde se entrega para **cada** track o patrocinador? (panel, Apex, otro)
3. ¿Se puede competir en más de un track con el mismo proyecto?
4. ¿Se aceptan proyectos que ya existían antes del evento?
5. ¿Qué retos concretos tiene cada patrocinador, y con qué premio?
6. ¿Hay presentación en vivo o solo video? ¿Cuánto dura?

---

## 9. Las 10 reglas de oro

1. **Mueve valor.**
2. **Ataca el reto del patrocinador por su nombre.**
3. **Un flujo completo vale más que diez documentos.**
4. **El juez debe poder probarlo en 5 minutos.**
5. **La IA trabaja; no decora.**
6. **Sube a todas las plataformas el día 1.**
7. **Congela el alcance temprano.**
8. **Declara tus límites:** la honestidad suma.
9. **Llega con algo construido** y sigue mejorando el mismo proyecto.
10. **Conserva tu ventaja:** problema real, datos con fuente y experiencia desde dentro.

---

**Fuentes:**
- Correo de CriptoUNAM «Goya Hack | Conoce a los finalistas», 4-oct-2026.
- Repositorios: [Cumple&Cobra](https://github.com/rodyxdev/cumpleycobra) · [PaperPay](https://github.com/josecadenax/paperpay) · [GoyaPay AI](https://github.com/coronahernandezs931-cloud/GoyaPay-IA) · [CryptoTrace Insight](https://github.com/OballenEC/cryptotrace-insight) · [Metztli](https://github.com/jimenezfabricio470-alt/Metztli.) · [Micopay](https://github.com/Micopay/micopay-protocol).
- Transacciones verificadas en Horizon testnet: [Cumple&Cobra](https://horizon-testnet.stellar.org/transactions/cd0a505a30222a70c89ff2993fa3de58626662fc78dcb1ac078a6134a11a8f9f) · [GoyaPay](https://horizon-testnet.stellar.org/transactions/b36f558f35475a17f4e140f2cf18acf207c5da416108e7a7c14fc5476fd69397).
- [How to Give a Killer Pitch or Hackathon Demo (Nader Dabit)](https://gist.github.com/dabit3/caef5eee4753dd7d23767bc31e70da28).
- Correos del organizador, 24 y 25-sep-2026 (`research/02_que-busca-el-organizador.md`).
