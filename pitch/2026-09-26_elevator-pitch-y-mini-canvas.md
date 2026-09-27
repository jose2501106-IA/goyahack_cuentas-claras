# Elevator pitch, mini canvas y entrada al mercado — Cuentas Claras

> **Borrador v1, pendiente de aprobación de José** · sáb 26-sep-2026, 20:45 · Equipo **Palabra**
> **Supone la decisión #57 (propuesta):** el historial se lee con el código del cliente, sin el paso de «dar permiso» (retroalimentación del mentor, 26-sep). Si José la rechaza, solo cambian las líneas marcadas con ◆.
> Datos con su ID de `docs/hoja-de-hechos.md` o la etiqueta *experiencia de José*. Nada inventado; lo que no está medido dice *por validar*.

## 1. Mini canvas (la guía que tienes a la vista mientras presentas)

| | |
|---|---|
| **Problema** | En la Central el fiado se da de palabra, y la palabra no viaja: quien paga puntual no lo puede demostrar en la bodega de enfrente. |
| **Dato** | Más de 2,300 bodegas (H-01). 18.4 % de los rechazos de crédito a empresas son por falta de historial (H-05). |
| **Para quién** | La bodega que fía (empezamos por abarrotes) y su cliente: tienditas, fondas y locatarios. |
| **Solución: tres reglas** | 1. Ninguna bodega escribe sola una deuda: firman los dos. 2. Nadie borra ni maquilla la nota, ni nosotros. 3. ◆ El historial es del cliente: lo muestra con su código donde quiera. |
| **¿Por qué blockchain?** | Bodegas que compiten no confían en una base de datos de otra. Una cadena pública es el registro que ninguna controla. Es público y verificable, sin nombre ni monto exacto. |
| **Prueba** | Funciona hoy en Stellar testnet. El contrato no se puede actualizar. Nuestra propia auditoría encontró huecos y los cerramos con un contrato nuevo. |
| **Entrada al mercado** | Una bodega ancla, primera firma en el mostrador, luego una segunda bodega. La bodega paga; el cliente nunca. |
| **Qué pedimos** | Ayuda para un piloto con una bodega y sus clientes, y el contacto con un primer lector (un banco o una financiera). |

## 2. Elevator pitch

### 30 segundos (unas 75 palabras)

> Cuentas claras, amistades largas. ‖ En la Central de Abasto, más de 2,300 bodegas fían de palabra, y esa palabra no viaja: quien paga puntual no tiene cómo demostrarlo en la bodega de enfrente. ‖ Cuentas Claras es la libreta de fiado firmada por los dos. La bodega y el cliente firman cada nota en Stellar, nadie la puede borrar, y ◆ el historial es del cliente, que lo muestra con su código donde quiera. ‖ Somos el Equipo Palabra.

### 60 segundos (unas 150 palabras)

> Cuentas claras, amistades largas. ‖ En la Central de Abasto, más de 2,300 bodegas fían de palabra. La palabra se cumple, pero no viaja: quien paga puntual no puede demostrarlo en la bodega de enfrente, y en el crédito formal 18.4 % de los rechazos son por falta de historial. ‖
>
> Cuentas Claras es la libreta de fiado firmada por los dos. Tiene tres reglas: ninguna bodega escribe sola una deuda; nadie borra ni maquilla la nota, ni nosotros; y ◆ el historial es del cliente, que lo muestra con su código. ‖
>
> ¿Por qué blockchain? Porque bodegas que compiten no le confían sus cuentas a la base de datos de otra. La cadena es pública y verificable, y en ella no va ni el nombre ni el monto exacto. ‖
>
> Ya corre en Stellar testnet. Empezamos con una bodega de abarrotes que fía cientos de miles de pesos al día. Buscamos un piloto. ‖ Somos el Equipo Palabra.

**Fuentes de lo que se dice:**
- «2,300 bodegas»: H-01 (FICEDA: 1,981 + 347).
- «18.4 %»: H-05 (ENAFIN 2024).
- «Cientos de miles de pesos al día»: H-02, *experiencia de José*, sin nombre de la bodega (decisión #28).

## 3. Estrategia de entrada al mercado (una página)

- **Cabeza de playa:**
  - **Qué:** las bodegas de **abarrotes** (347, H-01), empezando por la **bodega ancla** del equipo y 20 a 30 de sus clientes recurrentes (*experiencia de José*; meta del piloto *propuesta*).
  - **Por qué ahí:** el crédito de proveedor ya es el canal principal. 60.9 % de las empresas se financia con proveedores y 24.5 % con la banca (H-20; encuesta de Banxico a empresas, no a micronegocios).
- **El valor llega antes que la red:** para una sola bodega, Cuentas Claras ya es una herramienta de cobranza, con notas firmadas, recordatorios y cero discusiones de «yo no firmé eso». La portabilidad llega después, cuando hay una segunda bodega.
- **Canal:**
  - **La bodega:** es el canal, igual que el distribuidor para las fintech de tienditas.
  - **Primera firma:** en persona, en el mostrador, durante la compra, nunca con un enlace en frío. Hay 1.5 millones de quejas por posible fraude en el primer trimestre de 2026, sobre todo por mensajes con enlaces (H-18).
  - **Firmas siguientes:** por WhatsApp. 90.6 % usa mensajería (H-08).
- **Secuencia** *(propuesta; `docs/plan-maestro.md` §5 y §5b)*:

  | Cuándo | Paso | Sale cuando… |
  |---|---|---|
  | Oct (4 semanas) | Piloto en la bodega ancla | 100 notas firmadas por los dos y 10 clientes con dos ciclos cerrados *(metas propuestas)* |
  | Oct–nov | Dictamen legal (LRSIC y LFPDPPP), **antes** de la segunda bodega | Dictamen escrito |
  | Nov–dic | Segunda bodega, sugerida por la administración de la Central, que valida emisores sin custodiar datos (*experiencia de José*: contactos en la administración) | Un cliente obtiene crédito en la segunda bodega gracias a su historial |
  | Dic–feb | Primer lector: un banco con sucursal en la Central. Precedente: [Banco Agrario de Colombia](https://www.bancoagrario.gov.co/noticias/el-banco-agrario-anuncia-cupos-de-credito-para-tenderos-que-compran-en-corabastos) abrió crédito a tenderos que compran en Corabastos | Carta de un banco lector |
  | Feb-2027 | Propuesta de estándar abierto a la Central | Reunión con datos del piloto |
- **Ingresos:**
  - **Quién paga:** la **bodega**, una suscripción por la herramienta de cobranza (*precio por validar en el piloto*). **El cliente nunca paga.**
  - **Mientras tanto:** fondos no dilutivos del Stellar Community Fund (Build Award de hasta US$150,000, H-25).
- **Métrica norte:** notas firmadas por los dos cada semana. Nunca «cuentas creadas».
- **El riesgo que más importa:** la bodega teme que un historial portable le «robe» clientes. Lo enfrentamos así:
  - primero, herramienta para la propia bodega;
  - solo viaja el cumplimiento, nunca precios ni surtido;
  - ◆ no hay directorio de clientes: sin el código del cliente, nadie lo encuentra;
  - quien consulta también fía y firma.

## 4. Si preguntan (para después del pitch)

- **◆ «Si es público, ¿qué decide el cliente?»**
  - Lo que está en la cadena es público y verificable; esa es la idea.
  - Lo que el cliente decide es a quién le da su código.
  - Sin el código no hay forma de ligar ese historial con una persona: el seudónimo sale de una llave que no está en la cadena.
- **«¿Esto es un buró?»**
  - No recopilamos ni vendemos historiales, ni damos calificaciones.
  - El cliente porta el suyo y la bodega decide.
  - Antes de la segunda bodega pedimos un dictamen legal.
- **«¿Y si una bodega inventa un cliente?»**
  - En la v4, el cliente se vincula una sola vez: la plataforma lo invita y él confirma con su firma. En el piloto, la invitación va después de verificar su teléfono.
  - El semáforo exige dos bodegas distintas y dice «historial insuficiente» mientras no haya dos meses de historial.
