# spec/ — especificaciones para Claude Code

Aquí se redactan las especificaciones que Claude Code ejecuta en GitHub Codespaces. Desde el chat solo se escriben especificaciones; el código lo escribe Claude Code.

| Archivo | Estado | Qué cubre |
|---|---|---|
| `2026-09-25_especificacion-tecnica-v2.md` | **Vigente** (25-sep, 11:50; nombre actualizado a las 12:30) | v1 + corrección de privacidad (sección 3b), sin función de actualización, proyecto Cuentas Claras y equipo Palabra, contrato `cuentas_claras` y tópico `cclaras`, datos de demo ficticios, primera firma en persona, Pollar opcional |
| `2026-09-26_especificacion-frontend.md` | **Vigente para el fin de semana** (26-sep, 01:00; #44 y #45 aprobadas) | App local de cuatro vistas sin paquetes npm, API sobre el Stellar CLI, semáforo honesto, segundo emisor, criterios de aceptación y prompt |
| `2026-09-25_especificacion-rag.md` | Para después de la demo (decisión #38) | Búsqueda en el conocimiento del repositorio: trocear los `.md`, BM25 sin dependencias, modo vectorial opcional, criterios de aceptación |
| `2026-09-25_especificacion-tecnica-v1.md` | Superada por v2 | MVP completo: versiones fijas, estructura del repo, modelo de datos en cadena, parámetros (plazo por nota), interfaz del contrato, invariantes y pruebas, eventos, backend, frontend, guion de demo con datos ficticios, criterios de aceptación |
| `2026-09-25_especificacion-tecnica-v0.md` | Superada por v1 | Borrador original; se conserva como bitácora |

Convención: una versión nueva es un archivo nuevo con fecha y `vN`; la anterior no se borra. Cada cambio de parámetro se registra en `docs/decisiones.md`.
