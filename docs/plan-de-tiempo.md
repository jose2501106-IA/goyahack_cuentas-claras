# Plan de tiempo — viernes 25 de septiembre de 2026

> **Superado por `docs/plan-maestro.md`, sección 4 (25-sep, 09:50):** el organizador extendió el plazo al fin de semana. Se conserva como bitácora.
>
> **Actualización (25-sep, 12:35):** la entrega vuelve a ser hoy antes de las 20:00 (decisión #37). El plan vigente está en `docs/plan-maestro.md`, sección 4.

Entrega en plataforma: **20:00 CDMX** (plazo extendido, informado por José a las 01:55). Confirmar en el dashboard de `criptounam.xyz/hackathon/dashboard` la hora exacta, el track y los campos del formulario: el sitio no renderiza sin JavaScript y la investigación no pudo leerlo. Entregar con **60–90 minutos de margen**.

| Hora | Quién | Qué | Entregable |
|---|---|---|---|
| 02:45 – 07:30 | José | Dormir. | — |
| 02:45 – 03:30 | Claude (aquí) | Cerrar carpeta y repo local: research, docs, spec v0, README, CLAUDE.md, primer commit. | Repo local listo para push |
| 07:30 – 08:30 | José | Leer `docs/problema-solucion.md` y `docs/preguntas-pendientes.md`. Contestar las dos preguntas decisivas y las de parámetros (plazos, instrumento, ERP). Aprobar o corregir el reencuadre y la spec v0. Crear el repo público en GitHub y hacer el push (comandos en el README). Aprobar versión del plano. | Decisiones registradas; repo en línea |
| 08:30 – 13:00 | Claude Code (Codespaces) | Contrato `credi_ceda` con `cargo test` verde → build → deploy a testnet → guardar Contract ID → backend mínimo → frontend con un solo flujo → `demo.sh`. Commits frecuentes. | App en testnet; hashes de transacciones |
| 08:30 – 13:00 | Claude (aquí) | Guion de demo con plan B, pitch de 3 minutos (≈400 palabras), deck ≤10 diapositivas, README público (estructura en `research/00_sintesis-estrategica.md`, sección "Pitch, demo y README"). | `pitch/`, README |
| 13:00 – 15:00 | José + Claude Code | Ensayo de la demo con cuentas ya fondeadas y explorador abierto. Grabar video de 2–3 minutos con el flujo real en testnet, voz en off, sin acelerar. Subir público a YouTube. | Video en línea |
| 15:00 – 17:00 | José + Claude | Deck final con capturas del explorador; README con enlaces a video, app y contratos; sección de alcance y limitaciones; equipo. | Deck y README finales |
| 17:00 – 18:30 | José | Entrega en el dashboard. Verificar que el video sea público y que el repo abra en incógnito. | Entrega hecha |
| 18:30 – 20:00 | Todos | Margen. Nada nuevo se agrega después de las 17:00. | — |

## Reglas del día

- Un flujo completo vale más que dos a medias. Lo que no está verde a las 15:00 pasa a "siguientes pasos".
- Nunca se depura en el escenario: `demo.sh` y el video son el plan B.
- Después de las 17:00 solo se corrigen errores de la entrega (enlaces rotos, video privado).
- Mainnet, passkeys, MXNe, ZK y MEGA: diapositiva de siguientes pasos, no código de hoy.
