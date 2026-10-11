import type { StyleDefinition } from "../../../models/StyleDefinition";
import { CHILL_SYNC_BASS } from "../blocks/bassRules.constants";
import { HALF_TIME_GLOW } from "../blocks/grooves.constants";
import { DREAMWAVE_SPACE } from "../blocks/spaces.constants";
import { SYNTH_FAMILY } from "../families/synthFamily";
import { MAJOR_ANTHEM, NOSTALGIC_MAJOR } from "../progressions.constants";
import { grooveGrids } from "../../utils/grooveGrids.util";
import { bassSteps } from "../../utils/bassSteps.util";

export const dreamlandWavesStyle: StyleDefinition = {
  ...SYNTH_FAMILY,
  id: "dreamlandWaves",
  tempoRange: { min: 84, max: 106 },
  defaultTempo: 95,
  swingRange: { min: 0, max: 0.15 },
  defaultSwing: 0.06,
  defaultBrightness: 0.45,
  defaultReverb: 0.65,
  ducking: false,
  scaleIds: ["major", "mixolydian", "lydian"],
  defaultScaleId: "major",
  progressions: [NOSTALGIC_MAJOR, MAJOR_ANTHEM],
  drums: {
    ...SYNTH_FAMILY.drums,
    grids: grooveGrids(HALF_TIME_GLOW),
    fillVoice: "snare",
  },
  bass: {
    voice: "subBass",
    baseMidi: 36,
    minimumEnergy: 0.1,
    patterns: [bassSteps([0, 6, 10], 4, ["root", "fifth", "root"])],
  },
  chords: {
    ...SYNTH_FAMILY.chords,
    voice: "junoPad",
    simpleSize: 4,
    richSize: 5,
  },
  melody: {
    ...SYNTH_FAMILY.melody,
    voice: "epiano",
    restChance: 0.45,
    velocityScale: 0.85,
  },
  texture: { kind: "bells", voice: "bell", baseMidi: 84, chance: 0.35 },
  counter: { ...SYNTH_FAMILY.counter, voice: "pluck" },
  variants: {
    ...SYNTH_FAMILY.variants,
    chordVoices: ["junoPad", "pad"],
    melodyVoices: ["epiano", "softLead", "bell"],
    bassVoices: ["subBass"],
    counterVoices: ["pluck", "bell", "vibes"],
  },
  patterns: {
    templateChance: 0.5,
    drumGrooves: [HALF_TIME_GLOW],
    bass: CHILL_SYNC_BASS,
    stabs: null,
  },
  space: DREAMWAVE_SPACE,
  palette: {
    backgroundTop: "#1b0f2e",
    backgroundBottom: "#5b3a7a",
    accents: {
      drums: "#ffc8dd",
      bass: "#a2d2ff",
      chords: "#cdb4db",
      pad: "#6a4c93",
      melody: "#fff0f6",
      counter: "#bde0fe",
      texture: "#fffafc",
    },
  },
};
