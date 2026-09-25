---
titulo: "Palabra: implementación con la administración de la CEDA y replicabilidad en otras centrales de abasto"
fecha: 2026-09-25
estado: "v1: investigación cerrada; falta revisión de José (ver marcas 'pendiente de confirmar con José')"
origen: "Ronda 3 de investigación (subagente, 25-sep-2026, 30 consultas web). Notas fuente: research_notes/Análisis holístico CREDI CEDA/implementacion_replicabilidad.md. Base: contexto común de Palabra, mapa_sistemico_ceda.md, economia_mercados_informales.md, docs/plan-maestro.md §5b y spec v1."
---

# Implementación con la administración de la CEDA y replicabilidad

> **Nota de nombre (25-sep-2026, 12:30):** este documento se escribió cuando el proyecto se llamaba «Palabra». Desde las 12:06 el proyecto se llama **Cuentas Claras** y el equipo, **Palabra** (decisión #36). El texto conserva el nombre con el que se escribió.

**Convenciones.** Tipo de fuente: **[P]** primaria (gobierno, operador, cuenta oficial o sitio de la propia organización); **[S]** secundaria (prensa, directorios de terceros, Wikipedia); **[H]** solo se leyó el título o encabezado. *(inferencia)* marca deducciones propias. **Pendiente de confirmar con José** marca lo que solo él puede verificar. *Experiencia de José* marca conocimiento operativo del equipo. Montos en MXN; cuando la fuente usa otra moneda, se deja así y no se convierte. Todas las fuentes se consultaron el 25-sep-2026. Los sitios oficiales ficeda.com.mx, sedeco.cdmx.gob.mx, jefaturadegobierno.cdmx.gob.mx y economia-sniim.gob.mx no se pudieron abrir desde el entorno de investigación; sus documentos se citan por título y José debe abrirlos antes de usarlos en público.

---

## 1. Resumen ejecutivo

1. **Horarios reales.** La CEDA opera 365 días "sin cerrar", pero los accesos vehiculares se cierran de 18:00 a 22:00 para limpieza. Según la coordinadora de la CEDA, citada por [Chilango (2-oct-2025)](https://www.chilango.com/que-hacer/guia-para-comprar-en-la-central-de-abasto-horarios-pasillos-y-todo-lo-que-hay/): los **abarroteros venden de 04:00 a 15:00**, "algunas bodegas" de 02:00 a 08:00 y flores y manojeros de 22:00 a 02:00. La cuenta oficial recomienda a los compradores la franja de **06:00 a 13:00** ([X @CdeAbastoCDMX, 14-jul-2025](https://x.com/CdeAbastoCDMX/status/1944851440133882353)).
2. **Ajuste al plan maestro §5b.** La ventana de onboarding de 11:00 a 14:00 cae dentro del horario de venta de abarrotes. *(Inferencia)* Las sesiones con el personal de la bodega van mejor de **13:00 a 15:00** o de **15:00 a 17:00**. La primera co-firma del cliente se hace **en el mostrador, durante su compra habitual**, sin sesión aparte. **Pendiente de confirmar con José.**
3. **Calendario.** Diciembre es la temporada alta documentada: +18 % de ventas en 2022 ([El Heraldo, 30-dic-2022](https://heraldodemexico.com.mx/nacional/2022/12/30/central-de-abasto-cdmx-incrementa-sus-ventas-en-18-esta-temporada-469848.html)). El plan de 16 semanas va del **5-oct-2026 al 24-ene-2027**: no se dan de alta bodegas del 7-dic al 3-ene y termina antes del **1-feb-2027**, fecha en que vencen los contratos privados de servicios de la Central ([MVS, 2020](https://mvsnoticias.com/nacional/cdmx/2020/10/28/fideicomiso-para-la-central-de-abasto-estaba-en-numeros-rojo-sheinbaum-500103.html)).
4. **Administración.** La Central la gobierna un fideicomiso (FICEDA, 1981) con un Comité Técnico mixto: planillas electas por sector más 10 integrantes del gobierno. La operación depende de una "Coordinación General de la Central de Abasto" que aparece en la estructura de SEDECO. La titular, desde oct-2024, es Mónica Pacheco Skidmore. **No se encontró** el organigrama con gerencias ni ningún procedimiento público para presentar propuestas. La puerta es un **oficio a la Coordinación General** más los contactos de José.
5. **Actores en piso.** La única organización de comerciantes con nombre público verificado es la **Unión de Comerciantes en Frutas, Legumbres, Abarrotes y Locales Comerciales de la Central de Abasto de la Ciudad de México, A.C. (UNCOFYL)**, fundada en 1925. Hay además "una veintena de organizaciones" que controlan accesos ([TV Azteca, 2022](https://www.tvazteca.com/aztecanoticias/central-abasto-monopolio-bodegueros-acaparadores-roor)). *(Inferencia)* Antes de cualquier difusión institucional hay que presentar Palabra a los representantes de Abarrotes y Víveres, como iniciativa de locatarios.
6. **Bancos y programas.** Directorios de terceros registran sucursales de **BBVA (2), Santander, Banamex ("Abastos Abarrotes") y Banorte** dentro de la Central. Santander es además el fiduciario del fideicomiso. El programa público más cercano es el crédito de **FONDESO para locatarios de mercados públicos**, que son los clientes típicos de las bodegas: de 5,000 a 25,000 MXN, con 0.25 % quincenal y obligado solidario ([Infobae, 7-jun-2025](https://www.infobae.com/mexico/2025/06/07/vendes-en-un-mercado-publico-asi-puedes-obtener-un-credito-de-hasta-25-mil-pesos-con-fondeso/)).
7. **Rol de la administración.** *(Propuesta)* "La Central confirma quién es bodega; bodega y cliente firman; el cliente decide quién ve." La administración emite una **constancia de emisor** y recibe **solo agregados semanales**; nunca recibe notas, nombres ni teléfonos. En producción, el registro de emisores pasa a multifirma con la administración como una de las firmas.
8. **Replicabilidad.** La Secretaría de Economía registraba **66 centrales y módulos de abasto más 19 mercados mayoristas** (inventario al 10-sep-2010), y un censo de 2012 lista **89 centrales**. Después de la CEDA, las mayores por bodegas ocupadas eran Guadalajara (1,600) y Huixcolotla, Puebla (1,311). En LatAm, Corabastos, CEAGESP, el Mercado Central de Buenos Aires y Lo Valledor comparten el patrón de trato bilateral; **Corabastos** ya tiene un precedente de crédito bancario basado en una certificación de la central.

---

## 2. Operación de la CEDA

### 2.1 Datos de operación con fuente

| Tema | Dato | Fuente y fecha | Tipo |
|---|---|---|---|
| Días y cierre | Opera "365 días al año, sin cerrar"; los accesos vehiculares se cierran "de 18:00 a 22:00 horas" para limpieza, "aunque los bodegueros continúan trabajando" | [Chilango, 2-oct-2025](https://www.chilango.com/que-hacer/guia-para-comprar-en-la-central-de-abasto-horarios-pasillos-y-todo-lo-que-hay/) (cita a la coordinadora de la CEDA) | S |
| Abarrotes y víveres | Los "abarroteros empiezan a vender a las 4 de la mañana y terminan de vender a las 3 de la tarde" | Chilango, 2-oct-2025 (misma cita) | S |
| Bodegas de madrugada | "algunas bodegas empiezan a abrir a las 2 de la mañana y terminan de vender a las 8 de la mañana" (la nota no dice el sector; *(inferencia)* frutas y legumbres, **pendiente de confirmar con José**) | Chilango, 2-oct-2025 | S |
| Flores y manojeros | "de 10 de la noche a 2 de la mañana" | Chilango, 2-oct-2025 | S |
| Franja para compradores (oficial) | "De 6:00 a.m a 1:00 p.m. encontrarás mayor variedad y frescura. Si compras al mayoreo…" (la continuación no es visible) | [X @CdeAbastoCDMX, 14-jul-2025](https://x.com/CdeAbastoCDMX/status/1944851440133882353) | P |
| Recepción de camiones | "desde las tres de la mañana" | [La Jornada, 2-may-2022](https://www.jornada.com.mx/notas/2022/05/02/economia/inflan-intermediarios-hasta-680-precios-de-agroproductos/) | S |
| Horario general y acceso | "4:00 am hasta las 18:00 pm"; a pie, gratis; automóvil o taxi, "$10 pesos"; visitas guiadas de lunes a viernes, 9:00–15:00 | [El CEO, 30-abr-2024](https://elceo.com/negocios/cuanto-cobran-por-entrar-a-la-central-de-abasto-de-la-cdmx/) | S |
| Cobro de accesos | Cobros de peaje, rentas y servicios "digitalizados" | [MVS, 28-oct-2020](https://mvsnoticias.com/nacional/cdmx/2020/10/28/fideicomiso-para-la-central-de-abasto-estaba-en-numeros-rojo-sheinbaum-500103.html) | S |
| Personas y vehículos | "90 mil personas trabajan diariamente"; "más de 55 mil vehículos" | [FAO México en X, may-2025](https://x.com/FAOMexico/status/1922805025346031644) (cita a la Administradora General) | P |
| Bodegas por sector | 1,981 de frutas y legumbres; 347 de abarrotes | [FICEDA, sin fecha](https://ficeda.com.mx/sectores-de-actividad/) | P |
| Días de mayor venta en la semana | **No encontrado** | — | **Pendiente de confirmar con José** |
| Diciembre | Ventas "+18%" (no se precisa contra qué periodo). Más vendidos en abarrotes: semillas, especias, chocolates, aceite de oliva, chile guajillo, camarón, bacalao, maíz. En frutas: naranja, mandarina, tejocote, uva, romeritos. En cárnicos: cerdo, res, pavo | [El Heraldo, 30-dic-2022](https://heraldodemexico.com.mx/nacional/2022/12/30/central-de-abasto-cdmx-incrementa-sus-ventas-en-18-esta-temporada-469848.html) (atribuye el dato a la Jefatura de Gobierno); [boletín oficial, solo título](https://www.jefaturadegobierno.cdmx.gob.mx/comunicacion/nota/la-central-de-abasto-de-la-ciudad-de-mexico-incrementa-sus-ventas-en-18-por-temporada-navidena) | S; P[H] |
| Diciembre (seguridad) | "Central de Abasto refuerza seguridad ante compras de la cena navideña" (fecha no verificada) | [La Prensa](https://oem.com.mx/la-prensa/metropoli/central-de-abasto-refuerza-seguridad-ante-compras-de-la-cena-navidena-27396514) | S[H] |
| Día de Muertos | Romería, participación en el "Desfile de Muertos 2025", galería de 2024; **sin cifra de ventas** | [Milenio](https://www.milenio.com/politica/comunidad/por-dia-de-muertos-inauguran-romeria-en-la-central-de-abasto); [La Prensa](https://oem.com.mx/la-prensa/metropoli/central-de-abasto-de-la-cdmx-se-suma-al-desfile-de-muertos-2025-26571605); [Excélsior](https://www.excelsior.com.mx/comunidad/fotos-color-tradicion-central-de-abasto-cdmx-dia-de-muertos-2024/1682179) | S[H] |
| Cuaresma | Boletín titulado "Derrama económica de 1,523 mdp por venta de pescados y mariscos en cuaresma"; **no se verificó si se refiere a la CEDA ni de qué año es: no usar la cifra** | [Gobierno CDMX](https://gobierno.cdmx.gob.mx/noticias/derrama-economica-de-1523-mdp-por-venta-de-pescados-y-mariscos-en-cuaresma/) | P[H] |
| Fiestas patrias | **No encontrado** | — | — |
| Cifras oficiales que no cuadran | Conversatorio FAO–CEDA: "120 mil toneladas" diarias y 438 t/día de residuos, contra 30,000 t/día ([Guía Gastronómica 2026 vía Guacamole Proyect](https://www.guacamoleproyect.com.mx/cdmx/500-mil-personas-y-30-mil-toneladas-el-pulso-diario-de-la-central-de-abasto/)) y 470 t/día de residuos (may-2025) | [ONU México, 3-oct-2025](https://mexico.un.org/es/302715-cosechar-responsabilidad-compartir-futuro-fao-y-la-central-de-abasto-unen-esfuerzos-contra) | P |

### 2.2 Ventanas de trabajo para Palabra *(inferencia a partir de 2.1)*

| Actividad | Abarrotes y víveres (piloto) | Frutas y legumbres (fase posterior) | Razón |
|---|---|---|---|
| Sesión de 30 min con el personal de la bodega (dueño, crédito o cobranza, caja) | **13:00–15:00** (cola de la jornada) o **15:00–17:00** (tras cerrar la venta y antes de que cierren los accesos, a las 18:00) | 09:00–11:00 | Abarrotes venden de 04:00 a 15:00; los compradores se concentran de 06:00 a 13:00; el sector de madrugada vende de 02:00 a 08:00 |
| Primera co-firma del cliente | En el mostrador, durante su compra habitual (06:00–13:00), en menos de un minuto, con enlace por WhatsApp | Igual, al terminar su compra de madrugada | El cliente ya está en la bodega; una sesión aparte le quita tiempo de trabajo |
| Reuniones con la administración | De lunes a viernes, en horario de oficina; el horario exacto está por confirmar (referencia: visitas guiadas de 09:00 a 15:00) | — | [El CEO, 2024](https://elceo.com/negocios/cuanto-cobran-por-entrar-a-la-central-de-abasto-de-la-cdmx/) |
| Evitar | 18:00–22:00 (accesos cerrados), diciembre y la semana de Día de Muertos | 02:00–08:00 | Chilango 2025; El Heraldo 2022 |

**Pendiente de confirmar con José:** qué días de la semana baja la venta en la bodega ancla y si la franja de 13:00 a 15:00 le funciona al personal.

---

## 3. Administración y actores

### 3.1 Quién decide

| Órgano o persona | Qué es y qué hace | Fuente | Tipo |
|---|---|---|---|
| FICEDA (Fideicomiso para la Construcción y Operación de la Central de Abasto) | Constituido el 7-jul-1981, a 99 años; fiduciario: Banco Santander; el Administrador General sale de una terna del Jefe de Gobierno; operación privada desde jul-2002 | [Wikipedia ES, refs. 3 y 13](https://es.wikipedia.org/wiki/Central_de_Abasto_de_la_Ciudad_de_M%C3%A9xico) | S |
| Comité Técnico | Planillas electas por sector (Frutas y Legumbres, Abarrotes y Víveres, Locales Comerciales, Cooperativas) más "10 integrantes de la parte gubernamental". En 2018 ganaron la planilla Marrón en Abarrotes y Víveres (18,208 votos) y la Morado en Frutas y Legumbres (29,268) | [Capital CDMX, 2018](https://capital-cdmx.org/nota-Fideicomiso-de-la-Central-de-Abasto-de-la-CDMX-elige-Comite-Tecnico-plural20181108/) | S |
| Coordinación General de la Central de Abasto | Aparece en la estructura orgánica de SEDECO ("coordinadora general de la Central de Abasto") | [SEDECO, estructura 214](https://www.sedeco.cdmx.gob.mx/secretaria/estructura/214) | P[H] |
| Titular | Mónica Pacheco Skidmore: designada por Clara Brugada el 23-oct-2024; se le llama "Coordinadora General" y también "Administradora General" | [El Heraldo, 23-oct-2024](https://heraldodemexico.com.mx/nacional/2024/10/23/brugada-designa-titulares-de-central-de-abasto-injuve-pilares-648130.html); [FAO México, may-2025](https://x.com/FAOMexico/status/1922805025346031644); [ONU México, 3-oct-2025](https://mexico.un.org/es/302715-cosechar-responsabilidad-compartir-futuro-fao-y-la-central-de-abasto-unen-esfuerzos-contra) | S; P |
| Proveedores privados de servicios | Contratos de 2013, extendidos hasta el **1-feb-2027** | [MVS, 28-oct-2020](https://mvsnoticias.com/nacional/cdmx/2020/10/28/fideicomiso-para-la-central-de-abasto-estaba-en-numeros-rojo-sheinbaum-500103.html) | S |
| Gerencias (Desarrollo Comercial, Planeación y Evaluación, Sistemas, etc.) | **No verificadas.** El único manual administrativo que apareció en la Gaceta es de otro fideicomiso (FIDERE III) | — | **Pendiente de confirmar con José**, o pedir el organigrama por transparencia |

### 3.2 Cómo se relaciona con los locatarios
- **Representación:** mediante el Comité Técnico, con planillas por sector (arriba).
- **Cobros:** peajes, rentas y servicios digitalizados, a cargo de proveedores privados ([MVS, 2020](https://mvsnoticias.com/nacional/cdmx/2020/10/28/fideicomiso-para-la-central-de-abasto-estaba-en-numeros-rojo-sheinbaum-500103.html)).
- **Seguridad:** el C2 tiene 636 cámaras, 100 botones de auxilio y 96 altavoces ([Akabani, Excélsior c. 2024](https://www.excelsior.com.mx/opinion/columnista-invitado-nacional/la-central-de-abasto-de-la-ciudad-de-mexico-a-5-anos-de)). Los altavoces son un sistema de voceo, no una radio.
- **Reconocimientos y programas:** reconocimientos de SADER y FAO a comerciantes y bodegueros ([SADER](https://www.gob.mx/agricultura/prensa/reconoce-agricultura-a-comerciantes-de-la-central-de-abasto-de-la-cdmx-por-buen-manejo-de-vegetales), [Mexicampo](https://www.mexicampo.com.mx/reconoce-fao-a-bodegueros-de-la-central-de-abasto-de-la-cdmx); solo títulos, sin fecha verificada); programa Itacate: "400 toneladas" recuperadas desde 2020 ([ONU México, 2025](https://mexico.un.org/es/302715-cosechar-responsabilidad-compartir-futuro-fao-y-la-central-de-abasto-unen-esfuerzos-contra)).
- **Capacitación específica para comerciantes (finanzas, digitalización):** **no encontrada**.

### 3.3 Canales oficiales
| Canal | Uso observado | Fuente |
|---|---|---|
| X @CdeAbastoCDMX | Formato #PreguntasFrecuentes (horarios) | [P](https://x.com/CdeAbastoCDMX/status/1944851440133882353) |
| Facebook @CdeAbastoCDMX | Aniversarios por sector ("el Mercado de Abarrotes y Víveres… celebra"), #CEDAenMedios, temporadas | [P][H](https://www.facebook.com/CdeAbastoCDMX/posts/aniversario-el-mercado-de-abarrotes-y-v%C3%ADveres-de-central-de-abasto-cdmx-celebra-/891032899864426/) |
| X @CEDAFideicomiso | Cuenta "Central de Abasto Fideicomiso" | [P][H](https://x.com/cedafideicomiso?lang=es) |
| ficeda.com.mx | Sitio oficial: sectores, "Central Segura", directorio de sucursales bancarias | [P][H, inaccesible desde aquí](https://ficeda.com.mx/) |
| Boletín impreso, radio interna, WhatsApp oficial | **No encontrados** | **Pendiente de confirmar con José** |

### 3.4 Precedentes de terceros que trabajan con la administración
| Tercero | Qué hizo con la CEDA | Fuente | Lección para Palabra *(inferencia)* |
|---|---|---|---|
| FAO | Conversatorio sobre pérdida y desperdicio de alimentos (3-oct-2025); no se menciona un convenio formal | [ONU México](https://mexico.un.org/es/302715-cosechar-responsabilidad-compartir-futuro-fao-y-la-central-de-abasto-unen-esfuerzos-contra) | La administración se asocia mediante eventos y reconocimientos, sin presupuesto |
| SADER | Reconocimiento a comerciantes por buen manejo de vegetales | [gob.mx, solo título](https://www.gob.mx/agricultura/prensa/reconoce-agricultura-a-comerciantes-de-la-central-de-abasto-de-la-cdmx-por-buen-manejo-de-vegetales) | Un distintivo para bodegas es un formato conocido |
| Broxel (medios de pago) | Acuerdo para recibir vales de despensa (2022) | [El Heraldo, 30-dic-2022](https://heraldodemexico.com.mx/nacional/2022/12/30/central-de-abasto-cdmx-incrementa-sus-ventas-en-18-esta-temporada-469848.html) | Ya hubo un acuerdo con una empresa de pagos |
| Alcaldía GAM (MEGA) | Plataforma que conecta 54 mercados públicos con la CEDA: catálogo, precios, ofertas y asesoría; lo publicado no incluye pagos ni crédito (4-sep-2026) | [La Crónica](https://www.cronica.com.mx/metropoli/2026/09/04/mercados-de-gam-tendran-conexion-con-la-central-de-abasto-a-traves-de-una-plataforma-digital/) | La administración ya adopta herramientas digitales orientadas a los compradores |
| Click Abasto | Compra en línea, ≈2019 (dato viejo) | [Zoé IT Customs](https://www.zoeitcustoms.com/la-central-de-abastos-cdmx-se-digitaliza/) | — |
| SEDECO | "Estrategia de Digitalización para los Centros de Abasto" (contenido bloqueado) | [SEDECO, solo título](https://www.sedeco.cdmx.gob.mx/servicios/servicio/estrategia-de-digitalizacion-para-los-centros-de-abasto) | Leer antes de la reunión: **pendiente de José** |
| UNAM, IPN, UAM | **No se encontró ningún convenio con la CEDA**. Solo hay una alianza académica general UNAM–IPN–UAM–Cinvestav para la CDMX | [Gaceta UNAM, solo título](https://www.gaceta.unam.mx/unam-ipn-cinvestav-y-uam-crean-alianza-para-posicionar-a-la-ciudad-de-mexico-como-capital-del-conocimiento-de-america/) | El origen UNAM del proyecto es un argumento, no un convenio existente |

### 3.5 Organizaciones de comerciantes y organismos nacionales o regionales
| Organización | Qué se sabe | Fuente | Tipo |
|---|---|---|---|
| **UNCOFYL**: Unión de Comerciantes en Frutas, Legumbres, Abarrotes y Locales Comerciales de la Central de Abasto de la Ciudad de México, A.C. | Fundada el 25-abr-1925; asociación civil desde el 7-jul-1954; con su nombre actual desde el 16-ago-1996; reforma de estatutos en 2016; la mesa directiva más reciente visible es la de 2018–2020. **El sitio no describe servicios ni programas de innovación** | [uncofyl.com/historia](https://www.uncofyl.com/historia); [directorio empresarial](https://directorioempresarialmexico.com/empresa/0000717056/listings-detail.html) | P; S |
| "Una veintena de organizaciones" | Controlan bodegas y puntos de venta, según denuncias de productores | [TV Azteca, 24-nov-2022](https://www.tvazteca.com/aztecanoticias/central-abasto-monopolio-bodegueros-acaparadores-roor) | S |
| Asociaciones específicas de abarrotes y víveres | **Nombres no encontrados** | — | **Pendiente de confirmar con José** |
| **CONACCA**: Confederación Nacional de Comerciantes de Centrales de Abasto, A.C. | Sitio con secciones "Centrales de Abasto" y "Directorio" (no se pudo leer); nota de la FAO titulada "El IICA y la CONACCA impulsarán la competitividad en centrales de abasto"; el SNIIM aloja un directorio de CONACCA. **No hay evidencia sobre programas de innovación** | [conacca.com.mx](http://conacca.com.mx/); [FAO, solo título](https://www.fao.org/family-farming/detail/en/c/327440/); [SNIIM, solo título](http://www.economia-sniim.gob.mx/nuevo/dirconacca.htm) | P[H] |
| **FLAMA**: Federación Latinoamericana de Mercados de Abastecimiento | Federación regional con acuerdo FAO–FLAMA; no se verificó si la CEDA CDMX es miembro | [laflama.org](https://laflama.org/index_php/flama-menu/que-es); [CAAF, acuerdo FAO–FLAMA](https://www.caaf.com.ar/AcuerdoFao-Flama.html) | P[H]; S[H] |

### 3.6 Cómo presentar la propuesta
No se encontró ninguna convocatoria ni procedimiento público para que terceros presenten proyectos. *(Inferencia)* Se proponen dos puertas en paralelo:
1. **Formal:** un oficio dirigido a la Coordinación General de la Central de Abasto que pida una reunión de 20 minutos. Se anexan una hoja de presentación, el enlace al video de la demo y el resumen de la investigación. Si la Coordinación lo pide, se copia a SEDECO.
2. **Relacional:** los contactos de José en la administración ubican al área y al enlace adecuados (¿Desarrollo Comercial?) antes de enviar el oficio, para que no se pierda en oficialía de partes.
3. **Sectorial (semana 3):** los representantes de Abarrotes y Víveres en el Comité Técnico y UNCOFYL escuchan la propuesta como iniciativa de locatarios de la bodega ancla antes de que haya difusión institucional.

### 3.7 El rol de la administración: aval y validador de emisores sin custodiar datos *(propuesta)*

**Frase para la reunión:** "La Central confirma quién es bodega; la bodega y el cliente firman; el cliente decide quién ve."

| La administración sí | La administración no |
|---|---|
| Emite una **constancia de emisor**: "la bodega X opera en la Central", con fecha y vigencia. Con base en ella, el operador ejecuta `add_issuer` en el contrato, que requiere la firma del administrador según la [spec v1](../spec/2026-09-25_especificacion-tecnica-v1.md) | Recibir, guardar o consultar notas de fiado, nombres, teléfonos o montos |
| Avisa cuando una bodega deja de operar, y entonces se ejecuta `remove_issuer` | Imponer la herramienta a ninguna bodega; no hay exclusividad |
| Recibe un **reporte semanal de una página** con agregados: notas co-firmadas, porcentaje con pago confirmado por ambas partes, mediana de minutos hasta la firma, disputas, consultas autorizadas y número de bodegas emisoras | Leer el semáforo de ningún cliente |
| Presta un espacio y abre puertas (bodegas "amigas", representantes sectoriales) | Aportar dinero en esta etapa |
| En producción (fase P5) es **una de las firmas del registro de emisores** en una multifirma, por ejemplo 2 de 3: operador de Palabra, administración y representante sectorial. Así tiene veto sobre quién emite, sin ver datos | Custodiar llaves de clientes o de bodegas |

**Por qué le conviene a la administración** *(inferencia)*:
- Obtiene una métrica pública de adopción sin gastar en infraestructura ni cargar con datos.
- El registro sobrevive a los cambios de titular (hubo relevos en 2018 y 2024) y al vencimiento de contratos del 1-feb-2027.
- No custodiar datos de crédito entre particulares la protege de volverse responsable de esa información como ente público. Esto debe **verificarlo el abogado** en la fase P2.
- Replica el precedente de Corabastos, donde la central certifica y el banco presta ([Banco Agrario](https://www.bancoagrario.gov.co/noticias/el-banco-agrario-anuncia-cupos-de-credito-para-tenderos-que-compran-en-corabastos)), con una diferencia: aquí la central certifica a la bodega, no al cliente.

Vocabulario en la reunión: "bitácora de fiado co-firmada", "historial del cliente", "consentimiento". La tecnología se explica solo si la preguntan.

---

## 4. Bancos y programas

| Entidad | Presencia o programa | Fuente | Tipo | Papel posible *(inferencia)* |
|---|---|---|---|---|
| BBVA | Sucursales "CDMX Central de Abastos I" y "II"; "Central de abasto CDMX, Av. Río Churubusco S/N" | [sucursal.com.mx (I)](https://www.sucursal.com.mx/Sucursales/BBVA_MeXICO/Ciudad_De_Mexico/Iztapalapa/Cdmx_Central_De_Abastos_I/), [(II)](https://www.sucursal.com.mx/Sucursales/BBVA_MeXICO/Ciudad_De_Mexico/Iztapalapa/Cdmx_Central_De_Abastos_II/); [bancos.live](https://www.bancos.live/sucursal-bbva-central-de-abasto-cdmx-av-rio-churubusco-sn-iztapalapa/) | S (directorios de terceros; vigencia no verificada) | Candidato a primer lector |
| Santander | Sucursal "Central De Abastos"; además, **fiduciario de FICEDA** | [sucursal.com.mx](https://www.sucursal.com.mx/Sucursales/SANTANDER/Ciudad_De_Mexico/Iztapalapa/Central_De_Abastos/); [Wikipedia ES](https://es.wikipedia.org/wiki/Central_de_Abasto_de_la_Ciudad_de_M%C3%A9xico) | S | Candidato a primer lector, con relación institucional previa |
| Banamex | Sucursal "Abastos Abarrotes" (el nombre sugiere que está en el sector de abarrotes; **pendiente de confirmar con José**) | [sucursal.com.mx](https://www.sucursal.com.mx/Sucursales/BANAMEX/Ciudad_De_Mexico/Iztapalapa/Abastos_Abarrotes/) | S | Lector cercano a la bodega ancla, si se confirma |
| Banorte | "Área Federal Central de Abastos" | [sucursales24h.com.mx](https://sucursales24h.com.mx/banorte/ciudad-de-mexico-iztapalapa/area-federal-central-de-abastos-central-de-abasto-cdmx/) | S | — |
| Directorio oficial | PDF "SUCURSALES BANCARIAS" de FICEDA (inaccesible desde aquí) | [ficeda.com.mx](https://ficeda.com.mx/pdf/sc_sucursales_bancarias.pdf) | P[H] | José debe abrirlo y confirmar la lista |
| FONDESO (CDMX) | Crédito para locatarios de mercados públicos: 5,000–25,000 MXN; "0.25 por ciento por quincena" fija; hasta 18 meses; requiere curso empresarial, obligado solidario y Cédula de Empadronamiento; se tramita en módulos de alcaldía de lunes a viernes, 9:00–15:00. **La nota no menciona la CEDA** | [Infobae, 7-jun-2025](https://www.infobae.com/mexico/2025/06/07/vendes-en-un-mercado-publico-asi-puedes-obtener-un-credito-de-hasta-25-mil-pesos-con-fondeso/); [ficha FONDESO, solo título](https://www.fondeso.cdmx.gob.mx/programas/programa/financiamiento-para-locatarios-de-mercados-publicos) | S; P[H] | Conversación exploratoria: sus usuarios son los clientes de las bodegas |
| Gobierno CDMX | "Garantiza GCDMX financiamiento a locatarios de mercados públicos"; "FONDESO realiza su primera entrega de créditos 2025" | [SEDECO, solo título](https://www.sedeco.cdmx.gob.mx/comunicacion/nota/garantiza-gcdmx-financiamiento-locatarios-de-mercados-publicos); [Jefatura, solo título](https://www.jefaturadegobierno.cdmx.gob.mx/comunicacion/nota/fondeso-realiza-su-primera-entrega-de-creditos-2025) | P[H] | — |
| Precedente en la CEDA | "Darán créditos a afectados por incendio en la Central de Abasto" (8-abr-2015) | [Proceso, solo título](https://www.proceso.com.mx/nacional/cdmx/2015/4/8/daran-creditos-afectados-por-incendio-en-la-central-de-abasto-145437.html) | S[H] | — |
| Broxel | Acuerdo de vales de despensa con la CEDA (2022) | [El Heraldo, 30-dic-2022](https://heraldodemexico.com.mx/nacional/2022/12/30/central-de-abasto-cdmx-incrementa-sus-ventas-en-18-esta-temporada-469848.html) | S | Precedente de acuerdo con una empresa de pagos |
| Nafin; Financiera para el Bienestar | **Ningún programa específico para la CEDA encontrado** | — | — | — |
| Fintechs | "algunas fintech" dan crédito a comerciantes que compran en la CEDA; no se nombran | [Emprendedor, dic-2023](https://emprendedor.com/central-de-abastos-el-mejor-proveedor-para-tu-micronegocio/) | S | — |

**Condición previa para cualquier lector institucional:** el dictamen legal de la fase P2 sobre la LRSIC y la LFPDPPP (ver `docs/riesgos.md`). La primera petición a un banco es una **carta de interés**; no se piden préstamos ni se entregan datos.

---

## 5. Plan de implementación afinado: 16 semanas

### 5.0 Antes de la semana 1 (28-sep al 2-oct-2026)
- **José confirma:** el área y el enlace en la administración; el organigrama; la vigencia del Comité Técnico y quiénes representan a Abarrotes y Víveres; su relación con UNCOFYL; los días de venta baja en la bodega ancla; si hay un espacio para sesiones conjuntas; y qué banco tiene sucursal en el sector de abarrotes.
- **Materiales:** hoja de presentación institucional sin logos de CEDA, FICEDA ni UNAM; video de la demo en testnet (2–3 min); formato de constancia de emisor; aviso de privacidad con QR; cartel "Tu historial es tuyo"; formato del reporte semanal agregado.

### 5.1 Calendario semana a semana

| Sem. | Fechas | Con la administración y los actores | En piso (bodegas y clientes) | Logística concreta | Entregable o criterio de salida |
|---|---|---|---|---|---|
| 1 | 5–11 oct | José ubica al área y al enlace por sus contactos; se envía el oficio a la Coordinación General pidiendo 20 minutos | La bodega ancla elige de 20 a 30 clientes recurrentes que ya tienen crédito (*experiencia de José*) y capacita a su personal | Capacitación interna de 30 min en la bodega ancla, de 13:00 a 15:00 | Oficio con acuse; lista de candidatos, que se guarda solo en la bodega ancla y nunca en el repositorio |
| 2 | 12–18 oct | Reunión de 20 min. **Se pide:** validar el problema, un enlace designado, 2–3 bodegas de abarrotes "amigas" y un espacio. **No se pide:** datos, sistemas, custodia ni dinero | **Arranca la fase P1** en la bodega ancla (4 semanas): primeras notas con los clientes de mayor confianza | Co-firma en el mostrador, de 06:00 a 13:00, durante la compra; el personal envía el enlace por WhatsApp | Minuta con acuerdos; primeras notas co-firmadas |
| 3 | 19–25 oct | **Acercamiento sectorial:** representantes de Abarrotes y Víveres y UNCOFYL (si José confirma la relación) escuchan la propuesta como iniciativa de locatarios. Se pide retroalimentación, no aval | P1 continúa; se miden los minutos hasta la firma y las notas que no se aceptan | Reuniones de 13:00 a 15:00 o de 15:00 a 17:00 | Minuta sectorial con la lista de objeciones |
| 4 | 26 oct–1 nov | Circula la carta de intención (sin recursos). Semana de Día de Muertos: no se agendan reuniones nuevas | P1 continúa | Solo soporte fuera de la franja pico | Carta de intención enviada a firma |
| 5 | 2–8 nov | Primer reporte agregado para el observador de la administración. Se acuerda el **procedimiento de constancia de emisor**: qué certifica, quién la firma, en cuánto tiempo y cómo se revoca | P1 termina: primeros ciclos de nota pagada y confirmada por ambas partes | El reporte, de una página, se entrega por correo o impreso | Procedimiento acordado por escrito; reporte 1 |
| 6 | 9–15 nov | El enlace sugiere bodegas "amigas" y José elige la segunda. Se revisa con el abogado (fase P2) si la constancia hace a la administración parte del tratamiento de datos | Cierre formal de P1 con los criterios de salida del plan maestro (≥100 notas, ≥70 % con pago confirmado, ≥10 clientes con dos ciclos; *metas propuestas*) | — | Reporte de cierre de P1 |
| 7 | 16–22 nov (16 es feriado) | **Primera constancia de emisor** para la segunda bodega; se ejecuta `add_issuer` | **Onboarding de la segunda bodega** (inicio de la fase P4) | Sesión de 30 min con el dueño y el encargado de crédito, de 13:00 a 15:00, en la bodega | Segunda bodega dada de alta como emisor |
| 8 | 23–29 nov | Se invita al observador a una sesión conjunta | Los clientes que compran en ambas bodegas firman permisos de lectura (30 días); **primera consulta autorizada** | Sesión conjunta de 13:00 a 15:00, con un máximo de 10 clientes, en el espacio prestado si existe | ≥1 cliente con crédito en la segunda bodega gracias a su historial (criterio de P4) |
| 9 | 30 nov–6 dic | Reporte de 8 semanas. Se pide **permiso por escrito** para difundir en las redes de la Central como "iniciativa de locatarios", sin logos salvo autorización | Última semana de altas antes de diciembre | — | Informe de 8 semanas; decisión sobre la difusión |
| 10 | 7–13 dic | Temporada alta: sin reuniones nuevas | **No hay altas nuevas.** Solo operación y medición del fiado en temporada | Soporte después de las 15:00 | Reporte semanal |
| 11 | 14–20 dic | — | Igual que la semana 10 | Igual que la semana 10 | Reporte semanal |
| 12 | 21–27 dic | — | Igual que la semana 10 | Igual que la semana 10 | Reporte semanal |
| 13 | 28 dic–3 ene | Se redacta la **propuesta de estándar abierto** con los agregados del piloto | Pausa operativa | — | Borrador de la propuesta |
| 14 | 4–10 ene | **Mesa de trabajo** con el enlace (y con SEDECO si la Coordinación lo pide): datos del piloto, procedimiento de constancia y estándar independiente del proveedor de servicios | Se reanudan las altas: tercera bodega si se cumplió el criterio de P4 | Reunión de lunes a viernes en horario de oficina | Minuta de la mesa |
| 15 | 11–17 ene | **Bancos:** presentación de 20 min a Santander y a BBVA (y a Banamex "Abastos Abarrotes" si se confirma). Se pide una carta de interés como lector. Conversación exploratoria con FONDESO | Operación normal | Solo si el dictamen de la fase P2 lo permite | ≥1 carta de interés |
| 16 | 18–24 ene | Se entrega la propuesta de estándar abierto a la Coordinación General, **antes del 1-feb-2027** | Decisión de seguir o no hacia la fase P5 | — | Propuesta entregada; registro en `docs/decisiones.md` |

### 5.2 Logística concreta
- **Sesión con el personal de la bodega (30 min):** 5 min para explicar qué es y qué no es (no mueve dinero, no es una sociedad de información crediticia, no califica a nadie); 10 min de demo con una nota ficticia; 10 min para la primera nota real con un cliente presente que acepte; 5 min de dudas y colocación del cartel.
- **Activación del cliente:** en el mostrador, en menos de un minuto. Guion: "Fiado de palabra, firmado por los dos. Tu historial es tuyo". El aviso de privacidad va por QR. Nunca se dicen "cripto", "token" ni "blockchain".
- **Reporte semanal a la administración:** una página, solo con agregados. Nunca incluye nombres, teléfonos, montos por cliente ni la ubicación de bodegas participantes.
- **Constancia de emisor (formato mínimo propuesto):** nombre comercial de la bodega, sector, confirmación de que opera en la Central, fecha, vigencia y firma del área. La relación entre la bodega y su cuenta en la red la guarda el backend de Palabra, no la constancia.
- **Bitácora:** cada sesión se anota en `docs/bitacora-piloto.md` con la fecha, la bodega (seudónimo), número de clientes, notas creadas y problemas.
- **Congelamientos:** semana de Día de Muertos (sin reuniones nuevas); del 7-dic al 3-ene (sin altas). Para la fase siguiente: Cuaresma 2027, del 10-feb al 28-mar (la cifra de ventas no está verificada, pero conviene prever carga en pescados y mariscos).
- **Responsables:** José (administración, bodegas, sesiones); Claude Code (ajustes técnicos y reportes); abogado (fase P2).

### 5.3 Qué cambia respecto al plan maestro §5b
1. El horario de onboarding pasa de 11:00–14:00 a **13:00–15:00 o 15:00–17:00** para el personal, y la activación del cliente se hace en el mostrador de 06:00 a 13:00.
2. Se agrega el **acercamiento sectorial en la semana 3**, antes de cualquier difusión.
3. Se agregan los **congelamientos** de temporada.
4. Se define la **constancia de emisor** y su evolución a multifirma.
5. Los primeros lectores ya tienen nombre: **Santander, BBVA** y, por confirmar, Banamex; FONDESO queda como conversación exploratoria.
6. El plan **cierra el 24-ene-2027**, antes del vencimiento de contratos del 1-feb-2027.

---

## 6. Replicabilidad

### 6.1 Cuántas centrales hay en México
- "Unidades mayoristas existentes: **66 centrales y módulos de abasto, 19 mercados mayoristas**. Última fecha de actualización: 10 de Septiembre de 2010." — [P] [SE, Inventario Nacional de Centrales y Módulos de Abasto y Mercados Mayoristas](http://www.elogistica.economia.gob.mx/swb/work/models/elogistica/Resource/19/1/images/INVENTARIONACIONALCEDAS10.pdf)
- "PRIMER CENSO NACIONAL DE CENTRALES DE ABASTO EN MÉXICO" (2012), elaborado por Estrategias y Soluciones Empresariales AMAE y alojado en el sitio de Prologyca (SE): directorio de **89 centrales** — [P] [PDF](http://www.protlcuem.gob.mx/work/models/Prologyca/Resource/2/1/images/DirectorioNacionaldeCentralesdeAbasto.pdf)
- No se encontró un conteo oficial posterior; las páginas del SNIIM y de CONACCA son inaccesibles desde aquí. En público conviene decir: "entre 85 y 89 unidades mayoristas según dos registros de la Secretaría de Economía (2010 y 2012)".

### 6.2 Principales centrales de México (inventario de la SE, 2010)

Bodegas ocupadas y desocupadas y fecha de inicio: verificadas en dos lecturas del PDF. Superficie total: tomada de una lectura automática sin segunda verificación, **hay que revisarla antes de citarla en público**. Todos los datos son de 2010 y pueden haber cambiado.

| Central | Inicio | Bodegas ocupadas / desocupadas | Superficie total (m², verificar) | Nota |
|---|---|---|---|---|
| Ciudad de México (Iztapalapa) | 1982 | 2,340 / 38 | 3,040,000 | El proyecto usa el desglose actual de FICEDA: 1,981 de frutas y legumbres y 347 de abarrotes ([P](https://ficeda.com.mx/sectores-de-actividad/)) |
| Mercado de Abastos de Guadalajara | 1967 | 1,600 / 0 (1,168 de frutas y hortalizas; 176 de abarrotes) | 700,000 | La segunda más grande |
| Central de Abastos de Huixcolotla (Puebla) | 1995 | 1,311 / 437 | sin dato confiable | Predominio de frutas y hortalizas *(inferencia por su tipo; no verificado)* |
| Central de Abasto Toluca | 1994 | 612 / 128 | 464,000 | — |
| Centro de Abastos de San Luis Potosí | 1975 | 553 / 47 | 280,000 | — |
| Central de Abasto de Puebla | 1988 | 460 / 190 | sin dato confiable | — |
| Centro de Abasto de Ecatepec | 1985 | 336 / 0 | 178,000 | — |
| Central de Abasto de Querétaro | 1985 | 322 / 0 | 245,000 | — |
| Central de Abastos y Servicios Monterrey (Guadalupe) | 1983 | 315 / 30 | 150,000 | El Mercado de Abasto Estrella (San Nicolás) **no está** entre las filas verificadas; sin dato |
| Central de Abastos de León | 1982 | 207 / 6 | 185,000 | — |
| Central de Abasto de Mérida | 1982 | 114 / 0 | 73,000 | — |

La columna "Toneladas" del inventario no se reporta: para la CDMX marca 70,000, contra las 30,000 t/día oficiales actuales, y no está claro si mide volumen diario o capacidad.

### 6.3 Mercados mayoristas de LatAm

| Mercado | Dato de tamaño | Operador o gobierno | Relevancia para Palabra | Fuente |
|---|---|---|---|---|
| Corabastos (Bogotá) | 12–14 mil t/día | Mixto: 52.8 % privado; 47 % Gobernación de Cundinamarca y Distrito | **Precedente directo:** el Banco Agrario presta hasta 5 millones de COP a tenderos con "una certificación de la central… de que el negocio tiene al menos un año" | [Cerosetenta, Uniandes](https://cerosetenta.uniandes.edu.co/liga-contra-el-silencio-depredadores-alimentarios-campesinos/) [S]; [Banco Agrario](https://www.bancoagrario.gov.co/noticias/el-banco-agrario-anuncia-cupos-de-credito-para-tenderos-que-compran-en-corabastos) [P] |
| CEAGESP, Entreposto Terminal São Paulo | 3.2 millones de t/año; ~48,000 personas y 14,000 vehículos diarios; terreno de 637,897 m² | Entidad pública (sitio gov.br); prepara un "Canal do Comerciante" y un pré-recadastramento de permissionários | El registro (cadastro) de permissionários funcionaría como validador de emisores | [CEAGESP, ETSP](https://ceagesp.gov.br/entrepostos/etsp/) [P]; [pré-recadastramento, solo título](https://ceagesp.gov.br/comunicacao/noticias/ceagesp-inicia-pre-recadastramento-de-permissionarios-do-etsp/) [P] |
| Mercado Central de Buenos Aires | 106 mil t/mes; 900 puestos; 540 ha; 10,000 participantes comerciales; 55–60 % del abasto de frutas y hortalizas del AMBA | Ente interjurisdiccional: 33 % Nación, 33 % Ciudad, 33 % Provincia | Validador: la Corporación del Mercado Central | [Informe Digital Metropolitano](https://metropolitana.org.ar/idm/como-funciona-el-mercado-central/) [S]; [GCBA](https://www.buenosaires.gob.ar/gobierno/institucional-ministerio-de-gobierno/corporacion-mercado-central) [P] |
| Lo Valledor (Santiago) | Mueve el "60%" de las frutas y verduras que se venden en ferias libres y tiendas de Chile | Privado: La Administradora de Mercado S.A.; plan de expansión de US$60 millones que incluye "bancos" | Bancos dentro del mercado como lectores naturales | [Emol, 19-abr-2025](https://www.emol.com/noticias/Nacional/2025/04/19/1163962/cuantioso-plan-expandir-lo-valledor.html) [S] |

### 6.4 Adaptaciones por tipo de mercado *(inferencia)*

| Tipo | Ejemplos | Quién valida emisores | Quién lee | Adaptaciones de producto y operación |
|---|---|---|---|---|
| Fideicomiso público con comité mixto | CEDA CDMX | La administración (constancia), después en multifirma con un representante sectorial | Bancos con sucursal en la Central; FONDESO (exploratorio) | Ninguna adicional: es el diseño base |
| Grandes, con predominio de frutas y hortalizas y venta de madrugada | Guadalajara (1,168 de 1,600 bodegas son de frutas y hortalizas), Huixcolotla | Administración local o asociación de comerciantes | Bancos locales | Flujo que empieza en papel (foto de la nota más co-firma, como en la fase P6 del plan maestro); onboarding después de la venta de madrugada; consignación con productores como caso adicional |
| Medianas (114–612 bodegas) | Toluca, SLP, Puebla, Ecatepec, Querétaro, Monterrey (Guadalupe), León, Mérida | Asociación de comerciantes o administración municipal o estatal (régimen por verificar en cada una) | Financieras locales o fondos estatales parecidos a FONDESO | Con pocas bodegas por central, la **portabilidad entre centrales** de una misma región vale más que dentro de la central |
| Administradas por asociaciones civiles | p. ej., la asociación de comerciantes de Irapuato ([sitio](https://www.abastosira.com/)) | La asociación, con multifirma obligatoria para evitar captura | Por definir | Gobernanza de emisores más estricta |
| LatAm | Corabastos, CEAGESP, Mercado Central, Lo Valledor | El operador (S.A., empresa pública o ente interjurisdiccional) | Bancos dentro del mercado (esquema del Banco Agrario) | Idioma (pt-BR en CEAGESP), rangos de monto en moneda local, ley local de datos personales e información crediticia (**por verificar país por país**), identificadores (el HMAC del teléfono funciona igual) |

**Lo que no cambia en ningún mercado:** la co-firma de dos partes, el consentimiento con vigencia y revocable, los seudónimos y los rangos, y que ninguna parte pueda editar ni borrar. **Lo que cambia:** quién valida emisores, quién lee, el idioma, la moneda y el marco legal.

### 6.5 Canales de replicación
- **México:** CONACCA, confederación nacional de comerciantes de centrales ([sitio](http://conacca.com.mx/); programas de innovación no verificados).
- **LatAm:** FLAMA, que tiene un acuerdo con la FAO ([laflama.org](https://laflama.org/index_php/flama-menu/que-es); membresía de la CEDA no verificada).
- *(Inferencia)* La presentación ante estos canales solo tiene sentido con datos del piloto (después de la semana 16).

---

## 7. Riesgos

| Riesgo | Evidencia | Mitigación en el plan | Señal de alerta |
|---|---|---|---|
| Cambio de titular o de enlace | Relevos en 2018 y 2024 ([Capital CDMX](https://capital-cdmx.org/nota-Fideicomiso-de-la-Central-de-Abasto-de-la-CDMX-elige-Comite-Tecnico-plural20181108/); [El Heraldo](https://heraldodemexico.com.mx/nacional/2024/10/23/brugada-designa-titulares-de-central-de-abasto-injuve-pilares-648130.html)) | Acuerdos por escrito con el área, no con la persona; carta de intención; el registro funciona aunque la administración salga | El enlace no responde en 2 semanas |
| Vencimiento de contratos privados (1-feb-2027) | [MVS, 2020](https://mvsnoticias.com/nacional/cdmx/2020/10/28/fideicomiso-para-la-central-de-abasto-estaba-en-numeros-rojo-sheinbaum-500103.html) | Palabra no depende de servicios del proveedor; el vencimiento es la ventana para proponer el estándar abierto (semana 16) | Cambios en cobros o sistemas en ene-2027 |
| Organizaciones y planillas que controlan accesos | [TV Azteca, 2022](https://www.tvazteca.com/aztecanoticias/central-abasto-monopolio-bodegueros-acaparadores-roor); Comité por planillas | Acercamiento sectorial en la semana 3; "iniciativa de locatarios"; sin exclusividad | Objeciones en el Comité o rumores de "control" |
| Que se perciba como fiscalización | *(inferencia)* | La administración solo ve agregados; el cliente decide quién lee; no hay montos por cliente fuera de rangos | Preguntas como "¿esto lo ve Hacienda?" |
| Que el registro sirva de mapa para la extorsión | [Proceso, 2022](https://www.proceso.com.mx/reportajes/2022/11/17/la-central-de-abasto-una-gran-bodega-de-la-delincuencia-organizada-296458.html); [La Silla Rota, 2023](https://lasillarota.com/metropoli/2023/7/4/niegan-extorsiones-en-la-ceda-diableros-tienen-otros-datos-350133.html) | No se publica la lista de bodegas participantes; las constancias no son públicas; en la red no hay nombres ni locales | Alguien pide listas de participantes |
| Que la administración termine custodiando datos | *(inferencia; verificar con el abogado)* | Solo reportes agregados; no se entrega ninguna base de datos | La administración pide "una base de datos" |
| Uso de la marca CEDA o FICEDA sin permiso | Regla del proyecto | Sin logos salvo autorización escrita (semana 9) | — |
| Temporadas altas | [El Heraldo, 2022](https://heraldodemexico.com.mx/nacional/2022/12/30/central-de-abasto-cdmx-incrementa-sus-ventas-en-18-esta-temporada-469848.html); notas de Día de Muertos | Congelamientos (sección 5.2) | Baja la respuesta de bodegas y clientes |
| Proceso electoral de 2027 en la CDMX | *(inferencia; calendario no verificado)* | Cerrar la propuesta antes de febrero; no asociar Palabra con partidos ni campañas | — |
| Depender de un solo contacto | *Experiencia de José* | Oficio formal y un segundo interlocutor desde la semana 1 | — |
| Cifras oficiales que no concuerdan | [ONU México, 2025](https://mexico.un.org/es/302715-cosechar-responsabilidad-compartir-futuro-fao-y-la-central-de-abasto-unen-esfuerzos-contra) frente a la Guía de Sectur 2026 | No repetir ante la administración cifras suyas sin validar | — |
| Lectores bancarios antes del dictamen LRSIC | `docs/riesgos.md` | Dictamen de la fase P2 antes de la semana 15 | — |

---

## 8. Huecos y pendientes de confirmar con José

**Pendiente de confirmar con José**
1. Nombre formal del área y de la persona enlace en la administración; organigrama (¿existen Desarrollo Comercial, Planeación y Evaluación, Sistemas?).
2. Composición y vigencia del Comité Técnico actual; quiénes representan a Abarrotes y Víveres.
3. Relación de la bodega ancla con UNCOFYL u otras organizaciones; nombres de asociaciones de abarrotes.
4. Días de la semana con menos venta en abarrotes; si la franja de 13:00 a 15:00 le sirve al personal; si en diciembre y enero sube el fiado.
5. Qué sector abre de 02:00 a 08:00 (¿frutas y legumbres?).
6. Espacio físico para sesiones conjuntas.
7. Si la administración ya tiene un padrón digital de bodegas que permita emitir la constancia sin un trámite nuevo.
8. Lista vigente de sucursales bancarias (PDF de FICEDA) y si Banamex "Abastos Abarrotes" está en el sector de abarrotes.
9. Contenido de la "Estrategia de Digitalización para los Centros de Abasto" de SEDECO y del libro "Canales de Abasto 2019-2024".
10. Si conviene explorar con la administración algún vínculo con MEGA. No hay nada publicado que lo sugiera y **no se afirma**.

**No encontrado en fuentes públicas**
- Procedimiento o convocatoria para que terceros presenten propuestas a la administración.
- Boletín, radio interna o canal oficial de WhatsApp con locatarios.
- Programas de capacitación en finanzas o digitalización para comerciantes.
- Convenios de la CEDA con la UNAM, el IPN o la UAM.
- Programas de Nafin o de Financiera para el Bienestar dirigidos a la CEDA; si FONDESO acepta a bodegueros de la CEDA.
- Cifras verificadas de Cuaresma, Día de Muertos y fiestas patrias en la CEDA.
- Conteo oficial de centrales posterior a 2012; datos actuales de tamaño; superficie de Puebla y Huixcolotla; Mercado de Abasto Estrella.
- Prácticas de crédito comercial en CEAGESP, el Mercado Central y Lo Valledor; si la CEDA es miembro de FLAMA.

---

## 9. Fuentes

Todas se consultaron el 25-sep-2026. Si una fecha de publicación viene del ID de una publicación en X, se indica.

**Operación**
- Chilango, "Guía para comprar fresco y barato en la Central de Abasto: horarios, pasillos y todo lo que hay", Edgar Segura, 2-oct-2025 — https://www.chilango.com/que-hacer/guia-para-comprar-en-la-central-de-abasto-horarios-pasillos-y-todo-lo-que-hay/
- X @CdeAbastoCDMX, #PreguntasFrecuentes sobre horarios, 14-jul-2025 (fecha tomada del ID) — https://x.com/CdeAbastoCDMX/status/1944851440133882353
- El CEO, "¿Cuánto cobra la caseta de la Central de Abasto de la CDMX?", 30-abr-2024 — https://elceo.com/negocios/cuanto-cobran-por-entrar-a-la-central-de-abasto-de-la-cdmx/
- La Jornada, 2-may-2022 — https://www.jornada.com.mx/notas/2022/05/02/economia/inflan-intermediarios-hasta-680-precios-de-agroproductos/
- El Heraldo de México, "Central de Abasto CDMX incrementa sus ventas en 18% esta temporada", 30-dic-2022 — https://heraldodemexico.com.mx/nacional/2022/12/30/central-de-abasto-cdmx-incrementa-sus-ventas-en-18-esta-temporada-469848.html
- Jefatura de Gobierno CDMX, boletín de ventas +18 % (solo título) — https://www.jefaturadegobierno.cdmx.gob.mx/comunicacion/nota/la-central-de-abasto-de-la-ciudad-de-mexico-incrementa-sus-ventas-en-18-por-temporada-navidena
- La Prensa (OEM), seguridad por la cena navideña (solo título) — https://oem.com.mx/la-prensa/metropoli/central-de-abasto-refuerza-seguridad-ante-compras-de-la-cena-navidena-27396514 ; ventas de fin de año (solo título) — https://oem.com.mx/la-prensa/metropoli/ventas-en-central-de-abasto-incrementa-en-temporada-de-fin-de-ano-27426226 ; Desfile de Muertos 2025 (solo título) — https://oem.com.mx/la-prensa/metropoli/central-de-abasto-de-la-cdmx-se-suma-al-desfile-de-muertos-2025-26571605
- Milenio, romería de Día de Muertos (solo título) — https://www.milenio.com/politica/comunidad/por-dia-de-muertos-inauguran-romeria-en-la-central-de-abasto
- Excélsior, Día de Muertos 2024 (solo título) — https://www.excelsior.com.mx/comunidad/fotos-color-tradicion-central-de-abasto-cdmx-dia-de-muertos-2024/1682179
- Gobierno CDMX, Cuaresma (solo título) — https://gobierno.cdmx.gob.mx/noticias/derrama-economica-de-1523-mdp-por-venta-de-pescados-y-mariscos-en-cuaresma/
- FAO México en X, may-2025 — https://x.com/FAOMexico/status/1922805025346031644
- ONU México, "Cosechar Responsabilidad, Compartir Futuro…", 3-oct-2025 — https://mexico.un.org/es/302715-cosechar-responsabilidad-compartir-futuro-fao-y-la-central-de-abasto-unen-esfuerzos-contra
- Guacamole Proyect (cita la Guía Gastronómica 2026 de Sectur CDMX), 8-ago-2026 — https://www.guacamoleproyect.com.mx/cdmx/500-mil-personas-y-30-mil-toneladas-el-pulso-diario-de-la-central-de-abasto/
- FICEDA, sectores de actividad (sin fecha) — https://ficeda.com.mx/sectores-de-actividad/

**Administración y actores**
- Wikipedia ES, Central de Abasto de la Ciudad de México — https://es.wikipedia.org/wiki/Central_de_Abasto_de_la_Ciudad_de_M%C3%A9xico
- SEDECO, estructura: coordinadora general de la Central de Abasto (solo título) — https://www.sedeco.cdmx.gob.mx/secretaria/estructura/214
- El Heraldo de México, designación de titulares, 23-oct-2024 — https://heraldodemexico.com.mx/nacional/2024/10/23/brugada-designa-titulares-de-central-de-abasto-injuve-pilares-648130.html
- Capital CDMX, elección del Comité Técnico, 2018 — https://capital-cdmx.org/nota-Fideicomiso-de-la-Central-de-Abasto-de-la-CDMX-elige-Comite-Tecnico-plural20181108/
- MVS Noticias, 28-oct-2020 — https://mvsnoticias.com/nacional/cdmx/2020/10/28/fideicomiso-para-la-central-de-abasto-estaba-en-numeros-rojo-sheinbaum-500103.html
- Akabani, columna en Excélsior (c. 2024) — https://www.excelsior.com.mx/opinion/columnista-invitado-nacional/la-central-de-abasto-de-la-ciudad-de-mexico-a-5-anos-de
- Facebook @CdeAbastoCDMX (solo títulos) — https://www.facebook.com/CdeAbastoCDMX/ ; https://www.facebook.com/CdeAbastoCDMX/posts/aniversario-el-mercado-de-abarrotes-y-v%C3%ADveres-de-central-de-abasto-cdmx-celebra-/891032899864426/
- X @CEDAFideicomiso (solo título) — https://x.com/cedafideicomiso?lang=es
- SADER, reconocimiento a comerciantes (solo título) — https://www.gob.mx/agricultura/prensa/reconoce-agricultura-a-comerciantes-de-la-central-de-abasto-de-la-cdmx-por-buen-manejo-de-vegetales
- Mexicampo, reconocimiento de la FAO a bodegueros (solo título) — https://www.mexicampo.com.mx/reconoce-fao-a-bodegueros-de-la-central-de-abasto-de-la-cdmx
- La Crónica, MEGA, 4-sep-2026 — https://www.cronica.com.mx/metropoli/2026/09/04/mercados-de-gam-tendran-conexion-con-la-central-de-abasto-a-traves-de-una-plataforma-digital/
- Zoé IT Customs, Click Abasto (≈2019) — https://www.zoeitcustoms.com/la-central-de-abastos-cdmx-se-digitaliza/
- SEDECO, Estrategia de Digitalización para los Centros de Abasto (solo título) — https://www.sedeco.cdmx.gob.mx/servicios/servicio/estrategia-de-digitalizacion-para-los-centros-de-abasto
- Gaceta UNAM, alianza UNAM–IPN–Cinvestav–UAM (solo título) — https://www.gaceta.unam.mx/unam-ipn-cinvestav-y-uam-crean-alianza-para-posicionar-a-la-ciudad-de-mexico-como-capital-del-conocimiento-de-america/
- UNCOFYL, Historia — https://www.uncofyl.com/historia
- Directorio Empresarial México, UNCOFYL — https://directorioempresarialmexico.com/empresa/0000717056/listings-detail.html
- TV Azteca, 24-nov-2022 — https://www.tvazteca.com/aztecanoticias/central-abasto-monopolio-bodegueros-acaparadores-roor
- CONACCA — http://conacca.com.mx/ ; FAO, IICA–CONACCA (solo título) — https://www.fao.org/family-farming/detail/en/c/327440/ ; SNIIM, directorio de CONACCA (solo título) — http://www.economia-sniim.gob.mx/nuevo/dirconacca.htm
- FLAMA — https://laflama.org/index_php/flama-menu/que-es ; CAAF, acuerdo FAO–FLAMA — https://www.caaf.com.ar/AcuerdoFao-Flama.html

**Bancos y programas**
- sucursal.com.mx: BBVA I — https://www.sucursal.com.mx/Sucursales/BBVA_MeXICO/Ciudad_De_Mexico/Iztapalapa/Cdmx_Central_De_Abastos_I/ ; BBVA II — https://www.sucursal.com.mx/Sucursales/BBVA_MeXICO/Ciudad_De_Mexico/Iztapalapa/Cdmx_Central_De_Abastos_II/ ; Banamex — https://www.sucursal.com.mx/Sucursales/BANAMEX/Ciudad_De_Mexico/Iztapalapa/Abastos_Abarrotes/ ; Santander — https://www.sucursal.com.mx/Sucursales/SANTANDER/Ciudad_De_Mexico/Iztapalapa/Central_De_Abastos/
- bancos.live, BBVA Central de Abasto — https://www.bancos.live/sucursal-bbva-central-de-abasto-cdmx-av-rio-churubusco-sn-iztapalapa/
- sucursales24h.com.mx, Banorte — https://sucursales24h.com.mx/banorte/ciudad-de-mexico-iztapalapa/area-federal-central-de-abastos-central-de-abasto-cdmx/
- FICEDA, sucursales bancarias (inaccesible) — https://ficeda.com.mx/pdf/sc_sucursales_bancarias.pdf
- Excélsior, 2-feb-2017 — https://www.excelsior.com.mx/comunidad/2017/02/02/1143930
- Infobae, FONDESO, 7-jun-2025 — https://www.infobae.com/mexico/2025/06/07/vendes-en-un-mercado-publico-asi-puedes-obtener-un-credito-de-hasta-25-mil-pesos-con-fondeso/
- FONDESO, ficha del programa (solo título) — https://www.fondeso.cdmx.gob.mx/programas/programa/financiamiento-para-locatarios-de-mercados-publicos
- SEDECO, financiamiento a locatarios (solo título) — https://www.sedeco.cdmx.gob.mx/comunicacion/nota/garantiza-gcdmx-financiamiento-locatarios-de-mercados-publicos
- Jefatura de Gobierno, FONDESO 2025 (solo título) — https://www.jefaturadegobierno.cdmx.gob.mx/comunicacion/nota/fondeso-realiza-su-primera-entrega-de-creditos-2025
- Proceso, créditos por el incendio, 8-abr-2015 (solo título) — https://www.proceso.com.mx/nacional/cdmx/2015/4/8/daran-creditos-afectados-por-incendio-en-la-central-de-abasto-145437.html
- Emprendedor, dic-2023 — https://emprendedor.com/central-de-abastos-el-mejor-proveedor-para-tu-micronegocio/

**Replicabilidad**
- SE, Inventario Nacional de Centrales y Módulos de Abasto y Mercados Mayoristas (actualizado al 10-sep-2010) — http://www.elogistica.economia.gob.mx/swb/work/models/elogistica/Resource/19/1/images/INVENTARIONACIONALCEDAS10.pdf
- SE/Prologyca, Primer Censo Nacional de Centrales de Abasto en México (2012) — http://www.protlcuem.gob.mx/work/models/Prologyca/Resource/2/1/images/DirectorioNacionaldeCentralesdeAbasto.pdf
- Cerosetenta (Uniandes), Corabastos — https://cerosetenta.uniandes.edu.co/liga-contra-el-silencio-depredadores-alimentarios-campesinos/
- Banco Agrario de Colombia, crédito a tenderos de Corabastos — https://www.bancoagrario.gov.co/noticias/el-banco-agrario-anuncia-cupos-de-credito-para-tenderos-que-compran-en-corabastos
- CEAGESP, ETSP — https://ceagesp.gov.br/entrepostos/etsp/ ; pré-recadastramento — https://ceagesp.gov.br/comunicacao/noticias/ceagesp-inicia-pre-recadastramento-de-permissionarios-do-etsp/
- Informe Digital Metropolitano, Mercado Central — https://metropolitana.org.ar/idm/como-funciona-el-mercado-central/ ; GCBA, Corporación Mercado Central — https://www.buenosaires.gob.ar/gobierno/institucional-ministerio-de-gobierno/corporacion-mercado-central
- Emol, Lo Valledor, 19-abr-2025 — https://www.emol.com/noticias/Nacional/2025/04/19/1163962/cuantioso-plan-expandir-lo-valledor.html
- Asociación de Comerciantes y Productores de Frutas, Legumbres y Carnes de Irapuato, A.C. — https://www.abastosira.com/

**Repositorio**
- `docs/plan-maestro.md` §5 y §5b; `docs/riesgos.md`; `spec/2026-09-25_especificacion-tecnica-v1.md` (funciones `add_issuer` y `remove_issuer`); `research/notas/ronda-2/mapa_sistemico_ceda.md`; `research/notas/ronda-2/economia_mercados_informales.md`.
