/* generado por web/herramientas/generar-datos.js; no editar a mano */
(window.CC_DATOS = window.CC_DATOS || {})["repeticion"] = {
  "fuente": "Generado por web/herramientas/generar-repeticion.js solo con demo/salida-demo.txt y demo/deploy.json. No editar a mano.",
  "red": "Stellar testnet",
  "contrato": {
    "id": "CD4DJQC4QBE7DNVBJMMVTIHUWDC76AE2JSWJCWRKDXDASJUXSH2Q37WL",
    "url": "https://stellar.expert/explorer/testnet/contract/CD4DJQC4QBE7DNVBJMMVTIHUWDC76AE2JSWJCWRKDXDASJUXSH2Q37WL",
    "desplegado_utc": "2026-09-27T04:47:27Z"
  },
  "seudonimo_cliente": "fe1b5cfb1b99ba1b…",
  "nota_id": "d4641e8ad7225970…",
  "pasos": [
    {
      "numero": 1,
      "accion": "Bodega A-17 registra una nota de fiado para Doña Mary (15 días, rango 5k–20k).",
      "firma": "Bodega A-17",
      "cuenta_publica": "GCGL3DROM7TTKNGK3NCCIMKA5EGVAAGAVGNDNAFQBKLJBAG4D26VL54W",
      "funcion": "create_note",
      "hash": "176b37e5fba26bc0993e1bfe758468d54f7423a74e88c8aea12aaa0d394f68f8",
      "url": "https://stellar.expert/explorer/testnet/tx/176b37e5fba26bc0993e1bfe758468d54f7423a74e88c8aea12aaa0d394f68f8",
      "sin_transaccion": null,
      "detalle_salida": null
    },
    {
      "numero": 2,
      "accion": "Doña Mary acepta la nota: sin su firma la deuda no existe.",
      "firma": "Doña Mary",
      "cuenta_publica": "GDAMZTSYAAUY4CBIF4VMQXRV25T6KNAQN7HKKYA7ZRZSFIXYUC6ZSGSO",
      "funcion": "accept_note",
      "hash": "8c01e4bcaef1965ded6ed07404d542128c6d13267e860c58c26834ad4ae98b75",
      "url": "https://stellar.expert/explorer/testnet/tx/8c01e4bcaef1965ded6ed07404d542128c6d13267e860c58c26834ad4ae98b75",
      "sin_transaccion": null,
      "detalle_salida": null
    },
    {
      "numero": 3,
      "accion": "Doña Mary paga y Bodega A-17 confirma el pago.",
      "firma": "Bodega A-17",
      "cuenta_publica": "GCGL3DROM7TTKNGK3NCCIMKA5EGVAAGAVGNDNAFQBKLJBAG4D26VL54W",
      "funcion": "confirm_paid",
      "hash": "9b87f36a4d3d2f283ebcc930ac4ac587a1ae10116e98615f8b1b43c123d43c44",
      "url": "https://stellar.expert/explorer/testnet/tx/9b87f36a4d3d2f283ebcc930ac4ac587a1ae10116e98615f8b1b43c123d43c44",
      "sin_transaccion": null,
      "detalle_salida": null
    },
    {
      "numero": 4,
      "accion": "Doña Mary le muestra su código a Bodega B-40 (en el mostrador; no es una transacción).",
      "firma": null,
      "cuenta_publica": null,
      "funcion": null,
      "hash": null,
      "url": null,
      "sin_transaccion": "No es una transacción: sucede en el mostrador.",
      "detalle_salida": "Código de Doña Mary: fe1b5cfb…"
    },
    {
      "numero": 5,
      "accion": "Bodega B-40 consulta el historial de Doña Mary con su código.",
      "firma": "Bodega B-40",
      "cuenta_publica": "GD2TUPI6ZZE7BGCQIEBTWA2AIZHEVALYF3UTEJFF6ENP7K76ERRNY55D",
      "funcion": "read_stats",
      "hash": "d86bc35f5e49dad92d095ab502bf3db3887f15ce59fbc2c5453eae47dfb1c833",
      "url": "https://stellar.expert/explorer/testnet/tx/d86bc35f5e49dad92d095ab502bf3db3887f15ce59fbc2c5453eae47dfb1c833",
      "sin_transaccion": null,
      "detalle_salida": "Esta consulta queda registrada en la cadena, con la bodega que preguntó (evento aggregate_read)."
    }
  ],
  "resumen_paso_5": {
    "Notas aceptadas": "2",
    "Pagadas a tiempo": "2",
    "Pagadas tarde": "0",
    "Vencidas abiertas": "0",
    "Incumplidas": "0",
    "Emisores distintos": "2",
    "Rango máximo visto": "B5k_20k"
  }
};
