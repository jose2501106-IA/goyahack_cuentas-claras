# Lean Canvas — Cuentas Claras

**Estado:** borrador del 25-sep-2026 (14:45), pendiente de aprobación de José. No lleva precios ni montos: lo que no está medido dice *por validar en el piloto*. Los datos llevan su ID de `docs/hoja-de-hechos.md` (H-xx) o la etiqueta *experiencia de José*.

## El lienzo

| Bloque | Contenido |
|---|---|
| **1. Problema** | (a) En la Central, el fiado se pacta de palabra y cumplir no deja huella fuera de esa bodega: la reputación del cliente no viaja (Bakić Hayden, 2022; *experiencia de José*: las bodegas no se pasan referencias). (b) Al cliente que nadie conoce, el crédito se le raciona. En el crédito formal, 18.4 % de los rechazos a empresas son por falta de historial (H-05). (c) La salida informal cuesta caro: gota a gota dentro de la Central (H-03, H-04). |
| **Alternativas actuales** | Libreta o ERP de cada bodega, que nadie más puede verificar (*experiencia de José*). Evaluación «muy empírica» del cliente nuevo (*experiencia de José*). Gota a gota (H-03). Pago en efectivo, sin huella formal del cumplimiento (H-07). |
| **2. Segmentos de clientes** | Dos lados. **Bodegas** que fían: 347 de abarrotes y 1,981 de frutas y legumbres (H-01). **Clientes de fiado**: tienditas, fondas y locatarios. |
| **Primeros usuarios** | Una bodega de abarrotes con ERP que ya fía cientos de miles de pesos al día (H-02, *experiencia de José*) y sus clientes recurrentes. Después, el cliente cumplido que llega a una segunda bodega donde nadie lo conoce. |
| **3. Propuesta de valor única** | **Fiado de palabra, con cuentas claras.** Cada nota la firman la bodega y el cliente; nadie la altera ni la borra; el historial es del cliente y él decide quién lo consulta. |
| **Concepto de alto nivel** | «Cuentas claras, amistades largas», convertido en registro: la libreta de fiado, firmada por los dos y portable. |
| **4. Solución** | (1) Nota co-firmada en dos pasos: la bodega la crea y el cliente la acepta. (2) Estados que nadie maquilla: vencida no es incumplida, y una aclaración no es un impago. (3) Permiso del cliente, con vigencia y revocable, para que otra bodega vea su semáforo; cada consulta queda registrada. Lo hace cumplir un contrato en Stellar, no la buena fe del operador. |
| **5. Canales** | La bodega como canal, igual que el distribuidor para las fintech de tienditas (H-20; `docs/modelo-de-negocio.md`). Primera firma en persona, en el mostrador; las siguientes por WhatsApp (H-08, H-18). Administración de la Central como validadora de emisores (propuesta, decisión #24). Círculo de bodegas (campaña). |
| **6. Flujos de ingreso** | **A.** Suscripción de la bodega por su herramienta de cobranza (*propuesta; precio por validar en el piloto*). **D.** Fondos no dilutivos del Stellar Community Fund mientras se prueba A (H-25). B y C (membresía del Círculo, convenio con un lector) solo con dictamen legal. El cliente nunca paga. |
| **7. Estructura de costos** | Operación de la plataforma y comisiones de red (H-13; en testnet, sin costo). Acompañamiento a bodegas: capacitación y primera firma asistida. Dictamen legal (LRSIC y LFPDPPP). Auditoría del contrato antes de mainnet. Montos: *por cotizar*. |
| **8. Métricas clave** | Notas firmadas por los dos cada semana. Porcentaje de notas con pago confirmado por ambas partes. Clientes con dos ciclos cerrados. Consultas autorizadas por una segunda bodega. Disputas por cada 100 notas. **Nunca** «cuentas creadas» (H-11). |
| **9. Ventaja injusta** | Conocimiento operativo de la Central desde dentro de una bodega (*experiencia de José*) y acceso a la administración (*experiencia de José*). Un registro que ninguna bodega controla sola: sin custodio neutral no hay base de datos que confíen las rivales (decisión #3; H-12). |

## Supuestos más riesgosos (los mide el piloto)

1. **La bodega paga** por la herramienta de cobranza aunque ninguna otra la use.
2. **El cliente firma:** acepta su nota desde el teléfono sin sentirse vigilado.
3. **La bodega no teme regalar clientes** cuando el historial viaja (paradoja de la portabilidad, `docs/campana-marketing.md`, 4.1).
4. **La ruta legal existe:** el cliente porta y autoriza, y eso no convierte a Cuentas Claras en una sociedad de información crediticia (`docs/riesgos.md`).

## Versión de una diapositiva (para el deck)

> **Problema:** la palabra se cumple, pero no viaja. **Para quién:** la bodega que fía y su cliente. **Solución:** nota firmada por los dos; historial del cliente. **Canal:** la bodega y el mostrador. **Paga:** la bodega; el cliente, nunca. **Métrica:** notas firmadas por los dos cada semana. **Ventaja:** operamos dentro de la Central.
