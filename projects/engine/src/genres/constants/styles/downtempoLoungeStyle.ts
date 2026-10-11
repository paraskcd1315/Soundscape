import type { StyleDefinition } from "../../../models/StyleDefinition";
import { BROKEN_BEAT } from "../blocks/grooves.constants";
import { DOWNTEMPO_SPACE } from "../blocks/spaces.constants";
import { CHILL_FAMILY } from "../families/chillFamily";
import { MINOR_SEVENTHS, TWO_CHORD_DEEP } from "../progressions.constants";
import { grooveGrids } from "../../utils/grooveGrids.util";

export const downtempoLoungeStyle: StyleDefinition = {
  ...CHILL_FAMILY,
  id: "downtempoLounge",
  tempoRange: { min: 80, max: 98 },
  defaultTempo: 90,
  defaultSwing: 0.16,
  scaleIds: ["dorian", "minor"],
  defaultScaleId: "dorian",
  progressions: [TWO_CHORD_DEEP, MINOR_SEVENTHS],
  drums: {
    ...CHILL_FAMILY.drums,
    grids: grooveGrids(BROKEN_BEAT),
    fillVoice: "snare",
  },
  chords: {
    ...CHILL_FAMILY.chords,
    voice: "rhodes",
    rhythm: "stab",
    stabSteps: [0, 7, 10],
  },
  melody: { ...CHILL_FAMILY.melody, voice: "vibes", restChance: 0.55 },
  counter: { ...CHILL_FAMILY.counter, voice: "vocalChop" },
  variants: {
    ...CHILL_FAMILY.variants,
    melodyVoices: ["vibes", "flute", "vocalChop"],
    counterVoices: ["vocalChop", "vibes", "pluck"],
  },
  patterns: { ...CHILL_FAMILY.patterns, drumGrooves: [BROKEN_BEAT] },
  space: DOWNTEMPO_SPACE,
  palette: {
    backgroundTop: "#0b0f14",
    backgroundBottom: "#26323f",
    accents: {
      drums: "#c9d6df",
      bass: "#52616b",
      chords: "#a3bcd1",
      pad: "#2f4050",
      melody: "#f0f5f9",
      counter: "#d8a48f",
      texture: "#ffffff",
    },
  },
};
