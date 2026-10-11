import type { StyleDefinition } from "../../../models/StyleDefinition";
import { DUSTY_SPACE } from "../blocks/spaces.constants";
import { chillForm } from "../forms/chillForms";
import { JAZZ_TWO_FIVE, MAJOR_SEVENTH_DRIFT } from "../progressions.constants";
import { lofiStyle } from "./lofiStyle";

export const lofiLoungeStyle: StyleDefinition = {
  ...lofiStyle,
  id: "lofiLounge",
  tempoRange: { min: 70, max: 90 },
  defaultTempo: 80,
  defaultBrightness: 0.4,
  scaleIds: ["dorian", "major", "lydian"],
  defaultScaleId: "dorian",
  progressions: [...lofiStyle.progressions, JAZZ_TWO_FIVE, MAJOR_SEVENTH_DRIFT],
  melody: {
    ...lofiStyle.melody,
    voice: "vibes",
    restChance: 0.5,
    velocityScale: 0.85,
  },
  counter: lofiStyle.counter && { ...lofiStyle.counter, voice: "flute" },
  variants: {
    ...lofiStyle.variants,
    chordVoices: ["rhodes", "epiano", "nylonGuitar"],
    melodyVoices: ["vibes", "flute", "muteTrumpet", "nylonGuitar"],
    bassVoices: ["upright", "subBass"],
    counterVoices: ["flute", "vibes", "nylonGuitar"],
  },
  form: chillForm,
  space: DUSTY_SPACE,
  palette: {
    backgroundTop: "#120d16",
    backgroundBottom: "#3b2a3f",
    accents: {
      drums: "#e8c1a0",
      bass: "#8d6a9f",
      chords: "#f3d2c1",
      pad: "#4a3552",
      melody: "#fff4ec",
      counter: "#c9a7eb",
      texture: "#fdf6f0",
    },
  },
};
