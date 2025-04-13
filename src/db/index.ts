import type { Character } from "../types";

export const characters: Record<string, Character> = {
  chiappa: {
    id: "chiappa",
    name: "Chiappa",
    messages: {
      happy: ["kjjj soy buenisimo, vamos a comer?", "este rendimiento amerita una foto!", "aprende del mejor corazon", "domadooooo (no me importan tus pronombres, soy chiappa)", "domar trolos, mi actividad favorita"],
      neutral: ["esta peleado che, hacemos otra cosa?", "fua, no jugas tan mal linda", "no importa, igual voy a ganar yo", "te haces la buena y la verdad que estas buenisima", "esta dura la cosa, y la partida tambien."],
      angry: ["mira que picara que sos", "me ganas una vez mas y tenes 1 en el trimeste", "la puta madre no vale me distrajeron tus atributos", "naaa deja de hacer trampa, ahora toca castigo", "si me ganas una vez mas lo resolvemos en otro lado..."],
    },
    sprites: {
      happy: 9,
      neutral: 6,
      angry: 6,
    },
  },
};