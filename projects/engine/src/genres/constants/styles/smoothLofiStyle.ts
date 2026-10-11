import type { StyleDefinition } from "../../../models/StyleDefinition";
import { DUSTY_SPACE } from "../blocks/spaces.constants";
import { JAZZ_TWO_FIVE } from "../progressions.constants";
import { lofiStyle } from "./lofiStyle";

export const smoothLofiStyle: StyleDefinition = {
  ...lofiStyle,
  id: "smoothLofi",
  tempoRange: { min: 72, max: 90 },
  defaultTempo: 84,
  defaultSwing: Math.min(
    lofiStyle.swingRange.max,
    lofiStyle.defaultSwing + 0.06,
  ),
  progressions: [JAZZ_TWO_FIVE, ...lofiStyle.progressions],
  chords: { ...lofiStyle.chords, voice: "rhodes", rootless: true },
  melody: { ...lofiStyle.melody, voice: "muteTrumpet", chromaticChance: 0.15 },
  variants: {
    ...lofiStyle.variants,
    chordVoices: ["rhodes", "rhodes", "piano", "epiano"],
    melodyVoices: ["muteTrumpet", "piano", "rhodes", "vibes"],
    counterVoices: ["vibes", "bell", "nylonGuitar"],
  },
  space: { ...DUSTY_SPACE, toneCeilingHz: 7500, drive: 2.4 },
  palette: {
    backgroundTop: "#0e0b08",
    backgroundBottom: "#33261c",
    accents: {
      drums: "#d4a373",
      bass: "#7f5539",
      chords: "#e6ccb2",
      pad: "#583e2e",
      melody: "#fefae0",
      counter: "#ddb892",
      texture: "#faedcd",
    },
  },
};
