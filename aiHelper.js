export function generarVersoAleatorio(tema) {
  const versos = {
    amor: [
      "Tu nombre es un poema que no deja de latir.",
      "Entre tus brazos florece el tiempo.",
      "El amor es un eco de tus pasos en mi alma."
    ],
    libertad: [
      "Soy viento que no sabe de fronteras.",
      "La libertad no se escribe, se respira.",
      "Canto al sol que no pide permiso para brillar."
    ],
    tristeza: [
      "Mis lágrimas son versos que no riman.",
      "La noche abraza lo que el día no entiende.",
      "El silencio pesa más que mil palabras rotas."
    ]
  };

  const lista = versos[tema.toLowerCase()] || ["No hay versos disponibles para este tema."];
  const indice = Math.floor(Math.random() * lista.length);
  return lista[indice];
}
