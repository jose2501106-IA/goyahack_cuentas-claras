---
título: Talleres y evaluadores — GOYA HACK 2026 (qué enseñó cada taller, qué valoran los jueces y cómo responde Palabra)
fecha: 2026-09-25
estado: investigación cerrada con huecos (ponentes y temarios no publicados; APEX sin identificar). Las recomendaciones de la sección 4 son propuestas y esperan la aprobación de José.
origen: notas de investigación `talleres_patrocinadores.md` (25-sep-2026, 26 consultas web); páginas públicas de Luma del evento y de los talleres; documentación oficial de Stellar, Pollar, Tangem, GrantFox, Avalanche y BAF; `research/02_que-busca-el-organizador.md`; `README.md`; `spec/2026-09-25_especificacion-tecnica-v1.md`
---

# Talleres y evaluadores: lo que habríamos aprendido en cada sesión

> **Nota de nombre (25-sep-2026, 12:30):** este documento se escribió cuando el proyecto se llamaba «Palabra». Desde las 12:06 el proyecto se llama **Cuentas Claras** y el equipo, **Palabra** (decisión #36). El texto conserva el nombre con el que se escribió.

Arrancamos el jueves en la noche y no asistimos a ningún taller. Este documento reconstruye cada sesión como si hubiéramos estado ahí, pero solo con lo que está publicado:
- la página de Luma del evento y de cada taller;
- lo que cada empresa enseña oficialmente en ese formato;
- los programas previos de cada patrocinador.

Con eso deducimos qué van a buscar los jueces y los mentores, y cómo responde Palabra.

**Reglas de este documento**
- **Fuentes y fechas:** cada hecho lleva enlace y fecha. "cons." es la fecha de consulta; todas las fuentes se consultaron el 25-sep-2026. "pub." es la fecha de publicación, cuando se conoce.
- **Inferencias:** lo que es razonamiento propio va marcado **(inferencia)**.
- **Huecos:** si algo no se publicó, se dice "no publicado". Ninguna página de taller nombra ponentes, y no encontramos láminas, repositorios ni grabaciones de ninguna sesión.
- **Privacidad:** los nombres de personas que aparecen como anfitrionas en Luma y el enlace de referido de Tangem se quedan en las notas privadas.

---

## 1. Resumen ejecutivo: qué buscan los evaluadores según los talleres

1. **Un contrato Soroban vivo en testnet, verificable por cualquiera.**
   - Qué dicen los talleres:
     - El taller de Stellar se llamó "Contratos Inteligentes, Wallets y despliegue en Testnet" ([Luma](https://luma.com/72nqilub), cons. 25-sep-2026).
     - El tutorial oficial de Stellar termina en despliegue a testnet y frontend ([Stellar Docs](https://developers.stellar.org/docs/build/smart-contracts/getting-started), cons. 25-sep-2026).
     - BAF, coanfitrión, premió en su último programa Stellar las "real integrations" y el "production grade use" ([BAF](https://www.blockchainacceleration.org/stellarweek2025), evento 16–24-nov-2025).
   - Palabra: su contrato hace cumplir reglas; no solo guarda datos. Falta que el Contract ID y los enlaces al explorador estén en el README.
2. **Firma del usuario sin frase semilla, y claridad sobre quién guarda la llave.**
   - Qué dicen los talleres: de los bloques técnicos del miércoles, dos fueron de wallets, el de Stellar y el de Pollar ([Luma](https://luma.com/0oogs8ym), cons. 25-sep-2026).
   - Palabra: hoy usa cuentas de demo custodiadas ([README](../README.md), 25-sep-2026). Hay que decirlo sin rodeos y mostrar la ruta a login social o passkey.
3. **Alguien paga: modelo de negocio.**
   - Qué dicen los talleres:
     - Hubo un taller dedicado a modelo de negocio ([Luma](https://luma.com/0oogs8ym), cons. 25-sep-2026).
     - Los mentores dan retroalimentación de pitch y modelo de negocio, y "asignarán un puntaje que será considerado en la selección de los proyectos ganadores" ([doc 02](02_que-busca-el-organizador.md), 25-sep-2026).
   - Palabra: el repo **no tiene** una sección de modelo de negocio (búsqueda en `docs/`, `spec/` y `pitch/`, 25-sep-2026). Es el hueco más visible.
4. **Un problema del mundo real.**
   - Qué dicen los patrocinadores:
     - BAF prioriza "real-world systems" ([BAF](https://www.blockchainacceleration.org/stellarweek2025), 2025).
     - Avalanche ya premió en México retos de crédito e inclusión financiera ([Avalanche Builder Hub](https://build.avax.network/events/8a8ee2e9-d91d-4087-adba-c1221b72e407), mayo 2026).
   - Palabra: es su punto más fuerte. Trabaja en la CEDA, con fuentes y con la experiencia de José etiquetada.
5. **Composabilidad: usar herramientas del ecosistema.**
   - Qué dicen los patrocinadores:
     - BAF tuvo un "Integrator Award" por composabilidad ([BAF](https://www.blockchainacceleration.org/stellarweek2025), 2025).
     - Pollar y GrantFox, dos herramientas del ecosistema Stellar, tuvieron sesión propia ([Luma](https://luma.com/0oogs8ym), cons. 25-sep-2026).
   - Palabra: débil hoy, solo usa Stellar CLI y SDK. Se puede reforzar sin código mostrando el contrato en Stellar Expert y Stellar Lab (inferencia). Pollar queda como opcional (sección 4).
6. **Continuidad y código abierto.**
   - Qué dicen los talleres y patrocinadores:
     - Hubo dos sesiones de "SUBE TU PROYECTO · APEX" y una de GrantFox, una plataforma de contribuciones open source ([Luma](https://luma.com/0oogs8ym), cons. 25-sep-2026; [SCF](https://communityfund.stellar.org/project/grantfox-4zq), cons. 25-sep-2026).
     - BAF organiza hackathons "Genesis y Scale" en la CDMX ([Luma](https://luma.com/waxc3081?locale=es), cons. 25-sep-2026).
   - Palabra: repo público con licencia MIT, `research/` con fuentes y una ruta al SCF ([plan maestro](../docs/plan-maestro.md), 25-sep-2026). Faltan issues abiertos que hagan visible la hoja de ruta.
7. **Velocidad y entrega completa.**
   - Qué dicen el organizador y los talleres:
     - "La velocidad de ejecución es clave" ([Luma](https://luma.com/72nqilub), cons. 25-sep-2026).
     - La entrega es en plataforma, hay "jurado en vivo" y hay "Mismos tracks y premios en campus o remoto" ([Luma](https://luma.com/0oogs8ym), cons. 25-sep-2026).
   - Palabra: tiene plan B (`demo.sh` + video). Faltan dos confirmaciones: qué es APEX y la hora final de entrega.

---

## 2. Taller por taller, como si hubiéramos asistido

Cada sesión se revisa en cinco puntos: **Quién**, **Qué se enseñó**, **Qué pide al proyecto** (inferencia), **Palabra hoy** y **Qué falta**. El estado de Palabra se toma del [README](../README.md) (corte del 25-sep, 09:30: "Código, demo, video y deck: en construcción durante el día") y de la [spec v1](../spec/2026-09-25_especificacion-tecnica-v1.md). Hay que verificar el avance real antes de usar este documento en el pitch.

### 2.1 Stellar · Contratos, wallets y Testnet (mié 23, 11:00–12:30, Edificio M · PC PUMA)

**Quién.** Lo presentó GOYA HACK. Anfitriones: CriptoUNAM Eventos, Blockchain Acceleration Foundation y una persona coordinadora. Ponente no publicado ([Luma 72nqilub](https://luma.com/72nqilub), cons. 25-sep-2026).

**Qué se enseñó.** El temario no está publicado. La página describe el formato:
- "La velocidad de ejecución es clave".
- Habrá "sesiones de mentoría bajo demanda y *office hours* con expertos del ecosistema".
- Se ofrece acceso a especialistas para depurar contratos, estructurar agentes de IA y "validar modelos de negocio".

([Luma 72nqilub](https://luma.com/72nqilub), cons. 25-sep-2026)

Lo que Stellar enseña oficialmente en este formato es el tutorial Getting Started:
- Pasos: "Setup" → "Hello World" → "Deploy to Testnet" → "Storing Data" → "Deploy the Increment Contract" → "Build a Hello World Frontend".
- Comandos: `stellar keys generate`, `stellar contract build` y `stellar contract deploy`.
- Herramientas: Friendbot, Freighter, Stellar Lab, Scaffold Stellar, Stellar Wallets Kit y Stellar Expert.
- Los contratos se escriben en Rust.

([Stellar Docs, Getting Started](https://developers.stellar.org/docs/build/smart-contracts/getting-started), cons. 25-sep-2026)

En su programa Stellar anterior, BAF enseñó un bloque "Stellar Lab" de tres días sobre contratos Soroban, wallet links, liquidez y rampas ([BAF, Stellar Week 2025](https://www.blockchainacceleration.org/stellarweek2025), 16–24-nov-2025).

**Qué pide al proyecto (inferencia).**
- Un contrato desplegado en testnet que se pueda revisar en un explorador.
- Cuentas y firmas reales en testnet.
- Un frontend mínimo.
- Rapidez: el taller asume que los equipos llegan a testnet en horas.

**Palabra hoy.** Según el [contexto del proyecto](../docs/problema-solucion.md) (25-sep-2026) y la spec v1 (25-sep-2026):
- Tiene un contrato con dos `require_auth` en pasos separados (bodega y cliente).
- Los estados son mecánicos ("vencida" por fecha, "incumplida" solo tras la gracia).
- Un tercero solo lee con un permiso firmado, y cada lectura deja un evento.
- El despliegue es en testnet, con Friendbot y una cuenta plataforma que paga las comisiones ([decisiones #8](../docs/decisiones.md), 25-sep-2026).
- El Contract ID y los hashes van en `demo/deploy.json`.

**Qué falta.**
- Poner en el README el Contract ID y los enlaces a Stellar Expert del contrato y de cada transacción del flujo.
- Mostrar en vivo la consulta sin permiso que falla.
- Nombrar las herramientas oficiales que se usaron (Stellar CLI, Friendbot, Stellar Expert).

### 2.2 POLLAR · Smart Wallets (mié 23, 13:00–14:00, Edificio M)

**Quién.** Pollar (empresa). Anfitrión: CriptoUNAM Eventos. Ponente no publicado ([Luma bz2uatth](https://luma.com/bz2uatth), cons. 25-sep-2026).

**Qué se enseñó.** La página es genérica: talleres con "enfoque cien por ciento práctico, guiando a los participantes desde los conceptos base hasta la implementación de código funcional" ([Luma bz2uatth](https://luma.com/bz2uatth), cons. 25-sep-2026). El correo del organizador lo presentó como taller de wallets embebidas con login de Google ([doc 02](02_que-busca-el-organizador.md), 25-sep-2026).

El quickstart oficial de Pollar tiene cinco pasos ([Pollar Quickstart](https://docs.pollar.xyz/docs/getting-started/quickstart), cons. 25-sep-2026):
1. `npm install @pollar/react`.
2. `PollarProvider` con `apiKey`.
3. Login y wallet con `usePollar()`.
4. Envío de USDC con `runTx()`.
5. Historial con `fetchTxHistory()`.

**Qué pide al proyecto (inferencia).** Que el usuario final entre sin frase semilla ni direcciones, con una experiencia de app de consumo.

**Palabra hoy.** El cliente acepta la nota desde su teléfono, pero firma con una cuenta G de testnet custodiada por el backend de la demo ([spec v1](../spec/2026-09-25_especificacion-tecnica-v1.md), 25-sep-2026). Las passkeys están fuera del alcance de hoy ([README](../README.md), 25-sep-2026).

**Qué falta.**
- Una lámina "quién tiene cada llave": hoy, el backend de la demo; en producción, login social o passkey.
- Decidir si se intenta Pollar (sección 4).

### 2.3 Modelo de negocio (mié 23, 14:00–15:00, Edificio M)

**Quién.** No publicado ([Luma 0oogs8ym](https://luma.com/0oogs8ym), cons. 25-sep-2026).

**Qué se enseñó.** No publicado. Tres señales de lo que se evalúa:
- Los mentores del jueves y viernes dan retroalimentación de pitch y modelo de negocio, y su puntaje cuenta para elegir ganadores ([doc 02](02_que-busca-el-organizador.md), 25-sep-2026).
- El taller de Stellar ofrece expertos para "validar modelos de negocio" ([Luma 72nqilub](https://luma.com/72nqilub), cons. 25-sep-2026).
- En México, Avalanche evaluó "modelo de negocio" y "viabilidad" en su hackathon institucional ([Avalanche Builder Hub](https://build.avax.network/events/8a8ee2e9-d91d-4087-adba-c1221b72e407), mayo 2026).

Como referencia de pesos, de otro hackathon de Stellar: impacto real 30 %, ejecución técnica en Stellar 25 %, UX 20 %, innovación 15 % y viabilidad 10 % ([Rise In](https://www.risein.com/programs/build-on-stellar-philippines-hackathon), 2026).

**Qué pide al proyecto (inferencia).** Quién paga, por qué, y cómo se sostiene el proyecto sin token ni especulación.

**Palabra hoy.** No hay sección de modelo de negocio en el repo (búsqueda en `docs/`, `spec/` y `pitch/`, 25-sep-2026). Sí hay piloto y ruta de financiamiento: piloto en la bodega ancla y SCF de Instawards a Build Award ([plan maestro](../docs/plan-maestro.md), 25-sep-2026).

**Qué falta.** Una lámina con el modelo que decida José. Opciones a evaluar, sin validar (inferencia):
- **(a)** La bodega emisora paga por la herramienta de cobranza con acuse. Es el lenguaje que ya se usa con bodegueros ([doc 02](02_que-busca-el-organizador.md)).
- **(b)** Financiamiento no dilutivo durante el piloto (SCF, que ya está en el plan maestro).
- **(c)** Cobrar a terceros por consulta. **Cuidado:** se parece al negocio que la LRSIC (art. 5o) reserva a sociedades autorizadas. No proponerlo sin dictamen.

### 2.4 Despliega tu L1 en Avalanche (mié 23, 15:00–16:30, Div. Ing. Mecánica e Industrial)

**Quién.** No publicado. Entre los anfitriones del evento aparece Team1, el "global community program" de Avalanche para "education, events, content, and direct support for builders and newcomers" ([Luma 0oogs8ym](https://luma.com/0oogs8ym), cons. 25-sep-2026; [Avalanche blog](https://www.avalanche.com/about/blog/avalanche-team1-applications-are-now-open), pub. 27-may-2026).

**Qué se enseñó.** No publicado. Lo que Avalanche enseña en este formato son los cursos de L1 de su Academy ([Avalanche Academy](https://build.avax.network/academy), cons. 25-sep-2026):
- Cursos: Avalanche Fundamentals; Customizing the EVM; Interchain Messaging; Permissioned L1s (Proof of Authority); Permissionless L1s (Proof of Stake); L1 Native Tokenomics; Access Restriction ("transaction and contract deployer allowlists"); entre otros.
- Herramientas: Builder Console, Remix IDE, Validator Manager y L1 Toolbox.

**Qué pide al proyecto (inferencia).** Justificar la elección de red. Un juez que vio este taller puede preguntar: "¿por qué no una L1 propia, permisionada, con allowlists de emisores?".

**Palabra hoy.** La red está elegida (Stellar testnet) y el "por qué blockchain" está documentado ([problema-solución](../docs/problema-solucion.md), 25-sep-2026).

**Qué falta.** Una respuesta de 20 segundos (inferencia):
- Una L1 propia necesita a alguien que opere los validadores.
- Si los opera una bodega o la administración, regresa el custodio que hoy no existe y que las bodegas rivales no aceptan (experiencia de José: no hay nada que centralice el crédito en la CEDA).
- Si los operan todas, es un costo inviable para un sector que en frutas y legumbres opera mayormente en papel (experiencia de José).
- Stellar ya es una red pública operada por otros y verificable por terceros, y Soroban hace cumplir las dos firmas sin infraestructura propia.

### 2.5 SUBE TU PROYECTO · APEX (jue 24, 11:00–12:00 y 15:00–16:00, Edificio M)

**Quién.** No publicado ([Luma 0oogs8ym](https://luma.com/0oogs8ym), cons. 25-sep-2026).

**Qué se enseñó.** No publicado, y **no pudimos identificar qué es APEX**. La única "Apex" Web3 de 2026 que encontramos es el Hedera Hello Future Apex Hackathon ([StackUp](https://hackathon.stackup.dev/web/events/hedera-hello-future-apex-hackathon-2026), cons. 25-sep-2026):
- Datos: AngelHack + Hedera; formato "Virtual"; del 17-feb al 23-mar-2026; bolsa de US$250,000; ya cerró.
- No menciona a CriptoUNAM, la UNAM, México, Stellar ni BAF, así que no es este.
- Aun así, sus requisitos de entrega sirven de referencia estándar: repo de GitHub, "Pitch Deck (in pdf)", video de demo de "Maximum length: 5 minutes" y enlace a la demo en vivo.

**Qué pide al proyecto (inferencia).** Por el título y porque se repitió dos veces el día de mentorías, parece una sesión práctica para registrar el proyecto en una plataforma, que podría ser la de entrega o una vitrina.

**Palabra hoy.** No sabemos si nos aplica.

**Qué falta.** Preguntar **hoy**, en Discord o a un mentor, qué es APEX y si hay que subir el proyecto ahí además del dashboard.

### 2.6 Office Hours Avalanche (jue 24, 11:00–12:00, Edificio M)

**Quién.** No publicado; lo más probable es que haya sido Team1 (inferencia) ([Luma 0oogs8ym](https://luma.com/0oogs8ym), cons. 25-sep-2026).

**Qué se enseñó.** Fue un formato de consulta; no hay contenido publicado.

**Qué pide al proyecto / Palabra hoy / Qué falta.** Nada: no cambiamos de red. Solo sirve como recordatorio de que habrá jueces o mentores del ecosistema Avalanche (ver 2.4).

### 2.7 GrantFox × CriptoUNAM (jue 24, 12:00–13:30, Edificio M)

**Quién.** GrantFox. Ponente no publicado. La búsqueda "GrantFox CriptoUNAM" no devolvió ninguna publicación sobre la sesión (25-sep-2026).

**Qué se enseñó.** No publicado. Esto es GrantFox:
- **Qué es:** "the new 'OnlyDust' collaboration platform built exclusively for the Stellar ecosystem". Los proyectos publican issues abiertos, los builders aplican y construyen "verified on-chain reputation", y todo se sincroniza con GitHub ([SCF, ficha GrantFox](https://communityfund.stellar.org/project/grantfox-4zq), cons. 25-sep-2026).
- **Financiamiento:** ganó US$60,000 en el SCF #40 ([SCF](https://communityfund.stellar.org/project/grantfox-4zq), cons. 25-sep-2026).
- **Pagos y equipo:** paga a los contribuidores con pagos "non-custodial, trustless" vía Trustless Work, y la construyó "a Costa Rican team" ([Trustless Work](https://www.trustlesswork.com/escrow-times/new-grantfox-scf-grant), pub. 24-dic-2025).
- **Otro mecanismo:** también ofrece "Bounties" para "validate their products with real user feedback before launch".
- **Volumen:** reporta "$201,324 USDC" distribuidos ([grantfox.xyz](https://grantfox.xyz/), cons. 25-sep-2026).

**Qué pide al proyecto (inferencia).** Repos abiertos con issues claros que otros puedan tomar, es decir, un proyecto que siga vivo después del hackathon.

**Palabra hoy.** Tiene repo público, licencia MIT, `research/` con fuentes y bitácora de decisiones ([README](../README.md), [decisiones #12](../docs/decisiones.md), 25-sep-2026).

**Qué falta.**
- Opcional hoy: 3 a 5 issues etiquetados con la hoja de ruta (login social o passkeys, relayer, pruebas, accesibilidad del frontend). Cuestan pocos minutos y hacen visible la continuidad.
- Publicar en GrantFox, solo después de entregar (sección 4).

### 2.8 Mentorías abiertas (jue 24, 14:00–16:00, CIA)

**Quién.** Mentores técnicos, de modelo de negocio y de pitch, sin nombres publicados ([doc 02](02_que-busca-el-organizador.md), 25-sep-2026).

**Qué se enseñó.** Fue retroalimentación, no un taller. Lo decisivo: "los mentores asignarán un puntaje que será considerado en la selección de los proyectos ganadores". El 25-sep es la última jornada presencial (CIA, 10:00–17:00), y también hay mentoría por Discord equipo por equipo ([doc 02](02_que-busca-el-organizador.md), 25-sep-2026).

**Qué pide al proyecto (inferencia).** Presentarse con demo y pitch, y escuchar.

**Palabra hoy.** El repo no registra si ya pasamos por mentoría. Hay que verificarlo con José.

**Qué falta.** Ir hoy o pedir turno en Discord, llevando la demo y la lámina de modelo de negocio.

### 2.9 Main stage Tangem (mié 23, 14:00–15:00), stands y requisito previo

**Quién.** Tangem. Ponente no publicado ([Luma 0oogs8ym](https://luma.com/0oogs8ym), cons. 25-sep-2026).

**Qué se enseñó.** No publicado. El requisito previo al kickoff era descargar la app de Tangem desde un enlace del evento, crear la wallet y activar "TangemPay + verificación" ([Luma 0oogs8ym](https://luma.com/0oogs8ym), cons. 25-sep-2026). Así funciona Tangem Pay ([Tangem Blog](https://tangem.com/en/blog/post/tangem-pay-setup/), pub. 26-mar-2026):
- **Qué es:** "a virtual Visa payment account" que se fondea con USDC en Polygon, y acepta USDC o USDT en Polygon, Base, Arbitrum y BNB Smart Chain.
- **Activación:** se escanea la Tangem Wallet y se hace KYC con Sumsub (~2 minutos).
- **Lo que no dice el artículo:** no lista países ni comisiones.

Tangem es, en esencia, una hardware wallet autocustodial en forma de tarjeta NFC. Su SDK de React Native está archivado desde el 23-jul-2025 ([GitHub tangem-sdk-react-native](https://github.com/tangem/tangem-sdk-react-native), cons. 25-sep-2026).

Lo más probable es que el main stage presentara Tangem Pay, que es lo que pedía el requisito (inferencia).

**Qué pide al proyecto (inferencia).** Nada técnico. El requisito apunta a los participantes, no a los proyectos: descargas atribuidas y cuentas verificadas, reforzadas con stands y rifas.

**Palabra hoy.** No aplica: Palabra no mueve dinero, y Tangem Pay no usa Stellar.

**Qué falta.** Confirmar con el organizador si el requisito de Tangem condiciona la elegibilidad o el pago de premios.

### 2.10 Main stage Stellar × BAF (jue 24, 14:00–15:00)

**Quién.** Stellar y BAF. Ponentes no publicados ([Luma 0oogs8ym](https://luma.com/0oogs8ym), cons. 25-sep-2026).

**Qué se enseñó.** No publicado. BAF es una "501(c)(3) nonprofit accelerating global blockchain adoption through education, community, and impact-driven programs". Sus programas son University Tours, Builder Residence, Conference Activations y Ambassador Program ([blockchainacceleration.org](https://www.blockchainacceleration.org/), cons. 25-sep-2026).

Su programa Stellar en LatAm, Stellar Week 2025 en Buenos Aires ([BAF](https://www.blockchainacceleration.org/stellarweek2025), 16–24-nov-2025):
- Priorizó "real integrations", "production grade use", "composability" y "real-world systems".
- Tuvo dos categorías principales, cada una con US$5,000 en USDC al primer lugar:
  - **Stellar Scale:** productos en funcionamiento que integran Soroban.
  - **Stellar Genesis:** DeFi experimental y finanzas del mundo real.
- Además, un "Integrator Award" por composabilidad.

En la CDMX, BAF organizó "Código Alebrije by Stellar", con días de hackathon "Genesis y Scale", en PÚBLICO Coworking (Reforma 333). Es un evento pasado; su fecha no aparece en la página ([Luma](https://luma.com/waxc3081?locale=es), cons. 25-sep-2026).

**Qué pide al proyecto (inferencia).**
- Un producto que funcione con Soroban (perfil "Scale").
- Un sistema del mundo real.
- Integración con el ecosistema.
- Un siguiente paso dentro de los programas de Stellar.

**Palabra hoy.** Encaja en "Scale" y en "real-world systems". La composabilidad es su punto débil (ver resumen, viñeta 5).

**Qué falta.** Una lámina de siguientes pasos que mencione los programas del ecosistema, sin prometer nada: SCF ([plan maestro](../docs/plan-maestro.md)) y programas de BAF y Stellar en la CDMX.

### 2.11 Main stage BAF × Stellar (vie 25, 14:00–15:00)

**Quién / Qué se enseñó.** Lo mismo que en 2.10: ponentes y contenido no publicados ([Luma 0oogs8ym](https://luma.com/0oogs8ym), cons. 25-sep-2026). Es la única sesión que queda antes de la clausura (18:00–20:00).

**Qué pide al proyecto (inferencia).** Probablemente se presenten los siguientes programas y lo que los patrocinadores esperan después del hackathon.

**Palabra hoy / Qué falta.** Si alguien del equipo puede, conviene asistir o verla en línea y anotar criterios y programas. Si no, pedir un resumen en Discord.

---

## 3. Patrocinadores y herramientas: qué son y qué ganan con el evento

| Actor | Qué es (con fuente) | Qué gana con el evento | Señal para la evaluación (inferencia) |
|---|---|---|---|
| **Stellar (SDF)** | Red del track. Su programa educativo "hosts workshops, provides speakers for events, and/or sponsors hackathons" y apoya "helping students create projects on Stellar". La lista de socios no menciona a BAF ni a la UNAM ([Stellar Next-Gen](https://stellar.org/foundation/next-gen), página sin fecha, cons. 25-sep-2026). | Nuevos desarrolladores de Soroban y proyectos que entren al embudo del SCF, cuyo criterio es "not as a superficial integration, or for data storage" ([SCF Handbook](https://stellar.gitbook.io/scf-handbook/scf-awards/build-award/submission-criteria), cons. 25-sep-2026). | Que el contrato haga cumplir reglas, no que guarde hashes. |
| **BAF** | ONG 501(c)(3) de educación blockchain y coanfitriona de GOYA HACK y del taller de Stellar ([Luma](https://luma.com/0oogs8ym); [BAF](https://www.blockchainacceleration.org/), cons. 25-sep-2026). Operó Stellar Week 2025 y Código Alebrije CDMX (ver 2.10). No encontramos un acuerdo formal publicado con la SDF. | Cumplir su misión de "education, community, and impact-driven programs" y formar cohortes para sus siguientes programas (inferencia). | "Real integrations", "production grade use", "composability", "real-world systems" ([BAF](https://www.blockchainacceleration.org/stellarweek2025), 2025). |
| **Pollar** | "The onboarding-to-payment infrastructure layer for consumer apps on Stellar" ([Pollar Docs](https://docs.pollar.xyz/docs), cons. 25-sep-2026). SDK `@pollar/core` y `@pollar/react` v0.11.3; primer paquete en npm el 27-feb-2026 ([npm](https://registry.npmjs.org/@pollar%2Fcore), cons. 25-sep-2026); 10 estrellas en GitHub ([GitHub](https://github.com/pollar-xyz/pollar), cons. 25-sep-2026). Empresa y equipo: no publicados en lo consultado. | Equipos que integren su SDK con una API key; cada proyecto es un cliente potencial. Las comisiones salen de la "sponsorship wallet" de la app ([Quickstart](https://docs.pollar.xyz/docs/getting-started/quickstart), cons. 25-sep-2026) (inferencia). | Onboarding sin frase semilla. Un competidor, PumaTrade, ya usa Pollar con login de Google ([doc 02](02_que-busca-el-organizador.md)). |
| **Tangem** | Hardware wallet NFC autocustodial ([GitHub](https://github.com/tangem/tangem-sdk-react-native), cons. 25-sep-2026). Tangem Pay es una cuenta Visa virtual con USDC en Polygon y otras redes EVM, con KYC ([Tangem Blog](https://tangem.com/en/blog/post/tangem-pay-setup/), pub. 26-mar-2026). | Descargas atribuidas y cuentas de Tangem Pay verificadas, con stands y rifas (inferencia; el requisito pedía "Crea tu wallet Activa TangemPay + verificación", [Luma](https://luma.com/0oogs8ym), cons. 25-sep-2026). | Ninguna para Palabra: no toca Stellar ni el flujo de una nota. |
| **GrantFox** | Plataforma de contribuciones open source exclusiva para Stellar, con premio del SCF #40 de US$60,000 ([SCF](https://communityfund.stellar.org/project/grantfox-4zq), cons. 25-sep-2026). Paga vía Trustless Work y la hizo un equipo de Costa Rica ([Trustless Work](https://www.trustlesswork.com/escrow-times/new-grantfox-scf-grant), pub. 24-dic-2025). | Contribuidores estudiantes y proyectos nuevos en su plataforma (inferencia). | Código abierto, issues claros y continuidad. |
| **APEX** | **Sin identificar.** El único "Apex" de 2026 encontrado es un hackathon de Hedera, virtual y cerrado desde el 23-mar-2026, que no coincide ([StackUp](https://hackathon.stackup.dev/web/events/hedera-hello-future-apex-hackathon-2026), cons. 25-sep-2026). | Desconocido. | Posible requisito de entrega. Verificar hoy. |
| **Avalanche (Team1)** | Programa comunitario global en "40+ countries", con "event funding pathways, content bounty opportunities" para sus miembros ([Avalanche blog](https://www.avalanche.com/about/blog/avalanche-team1-applications-are-now-open), pub. 27-may-2026). Enseña a crear L1 con Builder Console ([Academy](https://build.avax.network/academy), cons. 25-sep-2026). | Builders de L1 y presencia en universidades; los eventos son parte de su programa (inferencia). | Justificar la red. Crédito e inclusión ya fueron retos de Avalanche en México ([Builder Hub](https://build.avax.network/events/8a8ee2e9-d91d-4087-adba-c1221b72e407), mayo 2026). |

---

## 4. Recomendación: Pollar, Tangem, APEX y GrantFox

### 4.1 Pollar para la firma del cliente: **QUIZÁ, y por defecto NO en la ruta crítica**

**Lo que dice la documentación** ([Referencia @pollar/core](https://docs.pollar.xyz/docs/sdk-reference/pollar-core), cons. 25-sep-2026):
- **Qué firma:** `pollar.signAuthEntry(entryXdr, { validUntilLedger })` firma una sola `SorobanAuthorizationEntry`, que es lo que pide `require_auth` cuando el cliente no es quien paga la transacción.
- **Allowlist:** con cuentas G custodiadas (login con Google, GitHub o email), Pollar firma del lado del servidor solo si cada contrato y función de la invocación está en la allowlist "Treasury → Auth Policy" del dashboard.
- **Passkeys:** con smart wallets C de passkey, `signAuthEntry` **no está soportado** y regresa `{ status: 'error' }`.
- **`buildTx`:** está pensado para operaciones estándar, como `payment`; la documentación no trae ayudas para invocar contratos.
- **Requisitos:** la `apiKey` es obligatoria, y testnet es la red por defecto.

**Respuesta a la pregunta clave.** Sí, el cliente podría co-firmar una nota con una cuenta G de Pollar, bajo tres condiciones (inferencia):
1. Nuestro backend arma y simula la transacción `accept_note(subject, note_id)`. La misma mecánica aplica a `grant_consent(subject, reader, …)`, la otra función que firma el cliente en el flujo de la demo ([spec v1](../spec/2026-09-25_especificacion-tecnica-v1.md), sección 5).
2. El teléfono del cliente firma la entrada con `signAuthEntry`.
3. El backend la adjunta y la envía.

Esfuerzo: **desconocido**; no hay ningún ejemplo con un contrato propio.

**A favor:**
- Ni la bodega ni el operador de Palabra tendrían la llave del cliente. Hoy la tiene el backend de la demo ([spec v1](../spec/2026-09-25_especificacion-tecnica-v1.md)).
- Sin frase semilla.
- Es la herramienta que los jueces vieron en el taller: una señal de composabilidad (inferencia).

**En contra:**
- Pasos fuera del código: cuenta en el dashboard, API key y allowlist por contrato y función. La allowlist se repite en cada redespliegue, porque cambia el Contract ID.
- SDK 0.x de siete meses, con documentación que se contradice sobre OAuth y passkeys ([Pollar Docs](https://docs.pollar.xyz/docs); [Security Model](https://docs.pollar.xyz/docs/core-concepts/security-model), cons. 25-sep-2026).
- Riesgo, no verificado, de que el login con Google falle dentro del navegador interno de WhatsApp.
- No nos diferencia: un competidor ya lo usa.
- Con cuentas G, la llave la custodia Pollar (AWS KMS, [Security Model](https://docs.pollar.xyz/docs/core-concepts/security-model)). **No es autocustodia.**

**Condiciones para intentarlo (todas):**
1. La demo custodial completa está en testnet, el video de respaldo está grabado y la entrega está lista para enviarse.
2. La hora final de entrega está confirmada y deja margen.
3. Se trabaja en una rama aislada con interruptor, y la ruta custodial queda como respaldo.
4. Un solo objetivo: que `accept_note` se autorice en testnet con `signAuthEntry` desde una cuenta G de Pollar. Antes, dar de alta en la allowlist el Contract ID, `accept_note` y `grant_consent`, y usar un sujeto nuevo (ver la nota de migración abajo).
5. Un tope de tiempo fijo que decide José. Si se atora la API key, la allowlist o el login, se abandona sin tocar la rama principal.

**Siempre, sin código:**
- El contrato ya recibe `subject: Address`, y la spec lo dice explícitamente: "el contrato no cambia, porque solo ve `Address`" ([spec v1](../spec/2026-09-25_especificacion-tecnica-v1.md), sección 5.1).
- **Nota de migración (inferencia):** el vínculo `subject_id ↔ Address` queda fijo la primera vez que el sujeto acepta una nota ([spec v1](../spec/2026-09-25_especificacion-tecnica-v1.md), sección 5.1).
  - Para probar Pollar hay que usar un sujeto nuevo.
  - Pasar a un sujeto que ya existe a otra dirección exigiría una función de revinculación que la spec no tiene.
  - La spec prevé passkeys en producción, pero `signAuthEntry` de Pollar no las soporta. Con Pollar, el camino sería la cuenta G custodiada.
- En el pitch: "hoy, cuentas de demo custodiadas; siguiente paso, login social o passkey, sin frase semilla".
- Nunca decir "el cliente controla su llave" si se usa una cuenta custodiada por un tercero.

### 4.2 Tangem para la firma del cliente: **NO**

- Tangem Pay es Visa + USDC en redes EVM; no usa Stellar ([Tangem Blog](https://tangem.com/en/blog/post/tangem-pay-setup/), pub. 26-mar-2026).
- Firmar con la tarjeta exige una app nativa con NFC y la tarjeta física, y el SDK de React Native está archivado ([GitHub](https://github.com/tangem/tangem-sdk-react-native), cons. 25-sep-2026).
- Un cliente de la CEDA no tiene la tarjeta.
- Palabra no mueve dinero.
- **Única acción:** preguntar si el requisito de Tangem afecta la elegibilidad o el pago de premios.

### 4.3 APEX: **VERIFICAR HOY. Sí, si forma parte de la entrega**

- No está identificado (sección 2.5).
- Si es la plataforma de entrega o forma parte de ella, es obligatorio y va primero.
- Si es una vitrina o aceleradora externa, conviene subirse después de entregar, sin quitarle tiempo a la demo (inferencia).

### 4.4 GrantFox: **NO antes de entregar; QUIZÁ después**

- GrantFox no da grants a proyectos: conecta proyectos con contribuidores que cobran por issues ([SCF](https://communityfund.stellar.org/project/grantfox-4zq); [grantfox.xyz](https://grantfox.xyz/), cons. 25-sep-2026).
- Después de entregar, puede servir para abrir la hoja de ruta a colaboradores (frontend, pruebas, documentación). Quién fondea las recompensas no está confirmado; probablemente el proyecto (inferencia).
- La ruta de financiamiento sigue siendo el SCF ([plan maestro](../docs/plan-maestro.md), fase P3). GrantFox, por cierto, es un ejemplo de proyecto que recorrió esa ruta.

---

## 5. Checklist para la entrega y la evaluación en vivo (derivado de los talleres)

### Antes de entregar
- [ ] **Stellar:** Contract ID, cuentas públicas de la demo y hashes del flujo completo en `demo/deploy.json`, con enlaces a Stellar Expert en el README.
- [ ] **Stellar/GrantFox:** README con cómo correrlo (Stellar CLI), licencia MIT, arquitectura "vive en cadena / vive fuera" y alcance honesto: testnet, cuentas de demo custodiadas y datos ficticios.
- [ ] **APEX:** preguntar en Discord o a un mentor qué es APEX y si hay que subir ahí el proyecto.
- [ ] **Organizador:** confirmar la hora final de la entrega ampliada ([doc 02](02_que-busca-el-organizador.md), pendiente).
- [ ] **Organizador:** confirmar que "Equipo Palabra" esté registrado en el dashboard.
- [ ] **Tangem:** preguntar si el requisito de Tangem y Tangem Pay afecta la elegibilidad o el pago de premios.
- [ ] **Referencia estándar (Hedera Apex):** deck en PDF, video corto (tope común: 5 minutos; confirmar la duración que pide el formulario) y enlace a la demo que abra en incógnito ([StackUp](https://hackathon.stackup.dev/web/events/hedera-hello-future-apex-hackathon-2026), cons. 25-sep-2026).
- [ ] **GrantFox (opcional, minutos):** 3 a 5 issues etiquetados con la hoja de ruta.
- [ ] **Pollar (opcional):** solo con las condiciones de 4.1 cumplidas.

### En la evaluación en vivo (y con mentores)
- [ ] **Stellar/BAF:** mostrar las dos firmas (la bodega crea, el cliente acepta), el pago confirmado, el permiso y la consulta, y **la misma consulta sin permiso que falla**. Todo, con evidencia en el explorador.
- [ ] **Stellar/Pollar:** lámina "quién tiene cada llave". Hoy, el backend de la demo; en producción, login social o passkey. En producción, ni la bodega ni Palabra podrán firmar por el cliente.
- [ ] **Modelo de negocio:** una lámina con quién paga y por qué, decidida por José (opciones en 2.3). Los mentores lo puntúan.
- [ ] **Avalanche/SCF:** dos respuestas de 20 segundos:
  - "¿Por qué no una base de datos?": porque no hay un custodio neutral en quien confíen bodegas rivales.
  - "¿Por qué no una L1 propia?": porque alguien tendría que operar los validadores (ver 2.4).
- [ ] **BAF:** siguiente paso concreto y sin promesas: piloto en la bodega ancla (experiencia de José), SCF y mainnet después de la auditoría.
- [ ] **Mentorías:** pasar hoy (CIA, 10:00–17:00, o por Discord) con la demo y el pitch.
- [ ] **Stellar ("velocidad de ejecución"):** plan B listo, con `demo.sh` y el video, por si fallan la red o el wifi.
- [ ] **Organizador:** confirmar si la evaluación en vivo exige estar en la Facultad. Luma dice "Lo único 100 % presencial: los stands en Facultad" y "Mismos tracks y premios en campus o remoto" ([Luma](https://luma.com/0oogs8ym), cons. 25-sep-2026).
- [ ] **BAF × Stellar (hoy, 14:00–15:00):** asistir o pedir un resumen, y anotar criterios y programas.

---

## 6. Huecos

- **Ponentes, láminas, repos y grabaciones** de todos los talleres: no publicados ni encontrados. No revisamos X, Instagram ni LinkedIn (piden sesión), ni criptounam.xyz (bloqueado).
- **Contenido real** de Modelo de negocio, GrantFox × CriptoUNAM, Tangem, Stellar × BAF y BAF × Stellar.
- **APEX:** qué es, quién lo opera y si es requisito de entrega.
- **Pollar:**
  - Empresa, equipo y financiamiento.
  - Si la API key de testnet se obtiene de inmediato y sin costo.
  - Si `signAndSubmitTx` acepta un XDR externo.
  - Cómo funciona el login dentro del navegador interno de WhatsApp.
  - Si hubo premio o bounty de Pollar en el evento.
  - Una prueba real de `signAuthEntry` con nuestro contrato.
- **Tangem:**
  - Si el requisito condiciona los premios.
  - Si la app permite una wallet sin tarjeta.
  - Si Tangem Pay opera en México.
- **GrantFox:** cómo se da de alta un proyecto, quién fondea las recompensas y si hay campaña para proyectos de GOYA HACK.
- **BAF:**
  - Criterios y jueces en GOYA HACK.
  - Acuerdo formal con la SDF.
  - Fecha y resultados de Código Alebrije CDMX 2026, y si tendrá siguiente edición.
- **Organizador:** criterios oficiales con pesos, premios por track y por patrocinador, y hora final de entrega (ver [doc 02](02_que-busca-el-organizador.md)).

---

## 7. Fuentes

Todas consultadas el 25-sep-2026. Cuando se conoce la fecha de publicación, se indica.

**Evento y talleres**
- GOYA HACK · Hackathon UNAM 2026 (agenda, anfitriones, requisito Tangem): https://luma.com/0oogs8ym
- Stellar - Contratos Inteligentes, Wallets y despliegue en Testnet: https://luma.com/72nqilub
- POLLAR - Smart Wallets: https://luma.com/bz2uatth
- Qué busca el organizador (correos del 21 al 25 de septiembre, mentorías con puntaje, plazo ampliado): [02_que-busca-el-organizador.md](02_que-busca-el-organizador.md) (25-sep-2026)

**Stellar**
- Getting Started de contratos inteligentes: https://developers.stellar.org/docs/build/smart-contracts/getting-started
- Stellar Next-Gen (página sin fecha): https://stellar.org/foundation/next-gen
- SCF Handbook, criterios del Build Award: https://stellar.gitbook.io/scf-handbook/scf-awards/build-award/submission-criteria
- Rúbrica de otro hackathon de Stellar (2026): https://www.risein.com/programs/build-on-stellar-philippines-hackathon

**Pollar**
- Overview: https://docs.pollar.xyz/docs
- Referencia `@pollar/core` (`signAuthEntry`, `buildTx`, tipos de wallet, redes, `apiKey`): https://docs.pollar.xyz/docs/sdk-reference/pollar-core
- Quickstart: https://docs.pollar.xyz/docs/getting-started/quickstart
- Security Model: https://docs.pollar.xyz/docs/core-concepts/security-model
- Repositorio: https://github.com/pollar-xyz/pollar
- npm `@pollar/core` (creado el 27-feb-2026; modificado el 24-ago-2026): https://registry.npmjs.org/@pollar%2Fcore
- npm `@pollar/react`: https://registry.npmjs.org/@pollar%2Freact
- Competidor que usa Pollar (PumaTrade): https://github.com/zums-stuff/Goya-Hack

**Tangem**
- How to Set Up and Use Tangem Pay (pub. 26-mar-2026): https://tangem.com/en/blog/post/tangem-pay-setup/
- SDK de React Native (archivado el 23-jul-2025): https://github.com/tangem/tangem-sdk-react-native

**GrantFox**
- Sitio oficial: https://grantfox.xyz/
- Ficha en el Stellar Community Fund (SCF #40): https://communityfund.stellar.org/project/grantfox-4zq
- Trustless Work, "GrantFox Receives a Stellar Community Fund Build Award" (pub. 24-dic-2025): https://www.trustlesswork.com/escrow-times/new-grantfox-scf-grant

**APEX**
- Hedera Hello Future Apex Hackathon 2026 (17-feb al 23-mar-2026), descartado: https://hackathon.stackup.dev/web/events/hedera-hello-future-apex-hackathon-2026

**BAF**
- Sitio oficial: https://www.blockchainacceleration.org/
- Stellar Week 2025 (16–24-nov-2025): https://www.blockchainacceleration.org/stellarweek2025
- Código Alebrije by Stellar, Hackathon Day 1 (Genesis y Scale), CDMX 2026: https://luma.com/waxc3081?locale=es

**Avalanche**
- Team1 Applications Are Now Open (pub. 27-may-2026): https://www.avalanche.com/about/blog/avalanche-team1-applications-are-now-open
- Avalanche Academy: https://build.avax.network/academy
- Hackathon LatAm Institucional (México, mayo 2026): https://build.avax.network/events/8a8ee2e9-d91d-4087-adba-c1221b72e407

**Internas**
- [README](../README.md), [spec v1](../spec/2026-09-25_especificacion-tecnica-v1.md), [decisiones](../docs/decisiones.md), [plan maestro](../docs/plan-maestro.md) y [problema-solución](../docs/problema-solucion.md) (todas del 25-sep-2026).
