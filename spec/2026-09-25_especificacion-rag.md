# Especificación: búsqueda en el conocimiento del repositorio (RAG)

**Estado:** aprobada en el plan (decisión #38) para construirse **después de entregar la demo**. Hoy no entra en la ruta crítica.

**Destinatario:** Claude Code en GitHub Codespaces. Lee primero `llms.txt` y `docs/indice.md`.

## Objetivo

Consultar el conocimiento del repositorio con preguntas en español y recibir solo los fragmentos relevantes, con su archivo, su sección y su estado. Así una sesión nueva (Claude Code, un chat del proyecto o un evaluador) no tiene que leer documentos completos.

## Por qué primero búsqueda léxica

El corpus es pequeño (unas 150 mil palabras) y está lleno de identificadores exactos: hechos H-01 a H-25, decisiones #1 a #38 y nombres de funciones. BM25 los encuentra sin dependencias ni llaves. Los vectores quedan como modo opcional.

## Alcance

1. **`scripts/trocear.py`** (Python 3, solo biblioteca estándar).
   - Recorre `*.md` y `llms.txt`; excluye `privado/`, `node_modules/` y `target/`.
   - Corta por encabezados `##` y `###`, en fragmentos de hasta 400 palabras con 50 de traslape.
   - Escribe `rag/fragmentos.jsonl`, un objeto por fragmento, con estos campos:
     - `id` (`archivo#ancla`), `archivo`, `titulo`, `ruta_de_encabezados`, `texto` y `palabras`.
     - `etiquetas` y `estado`, leídos de `docs/indice.md`.
     - `hechos` (los H-xx que aparecen) y `decisiones` (los #nn que aparecen).
2. **`scripts/buscar.py "pregunta" [--k 5] [--estado vigente]`**
   - BM25 en biblioteca estándar; normaliza mayúsculas y acentos.
   - Imprime los `k` fragmentos con archivo, sección, estado y puntaje.
   - Ante un empate, prefiere *vigente* sobre *bitácora*.
3. **Opcional: `--modo vectorial`.**
   - Usa un modelo multilingüe local si está instalado; si no, vuelve a BM25 y lo avisa.
   - Nunca llaves de API en el repositorio.
4. **Opcional: `.github/workflows/indice-rag.yml`.** En cada push a `main`:
   - Regenera `rag/fragmentos.jsonl`.
   - Falla si un `.md` nuevo no aparece en `docs/indice.md` y en `llms.txt`.

## Criterios de aceptación

- `python3 scripts/buscar.py "¿quién paga?"` devuelve `docs/modelo-de-negocio.md` entre los tres primeros.
- `"privacidad cadena pública"` devuelve la sección 3b de la spec v2 entre los tres primeros.
- `"horario de venta abarrotes"` devuelve el hecho H-21.
- BM25 corre sin dependencias externas, `rag/fragmentos.jsonl` pesa menos de 5 MB y ningún fragmento sale de `privado/`.

## Reglas

- No modifica el contenido de ningún documento; el índice se genera, no se edita a mano.
- Si agregas un documento, actualiza `docs/indice.md` y `llms.txt` en el mismo commit.
