import type { StyleDefinition } from "../../../models/StyleDefinition";
import { SUB_DRONE_BASS } from "../blocks/bassRules.constants";
import { SOFT_PULSE } from "../blocks/grooves.constants";
import { SPACE_DREAMS_SPACE } from "../blocks/spaces.constants";
import { spaceForm } from "../forms/chillForms";
import { DRONE, SLOW_PAIR } from "../progressions.constants";
import { grooveGrids } from "../../utils/grooveGrids.util";
import { bassSteps } from "../../utils/bassSteps.util";
import { ambientStyle } from "./ambientStyle";

export const spaceDreamsStyle: StyleDefinition = {
  ...ambientStyle,
  id: "spaceDreams",
  tempoRange: { min: 60, max: 84 },
  defaultTempo: 72,
  defaultReverb: 0.8,
  defaultBrightness: 0.4,
  scaleIds: ["dorian", "minor", "lydian"],
  defaultScaleId: "dorian",
  progressions: [SLOW_PAIR, DRONE],
  drums: {
    grids: grooveGrids(SOFT_PULSE),
    fillChance: 0,
    fillVoice: "shaker",
    minimumEnergy: 0.45,
  },
  bass: {
    voice: "subBass",
    baseMidi: 33,
    minimumEnergy: 0.05,
    patterns: [bassSteps([0], 16)],
  },
  melody: {
    ...ambientStyle.melody,
    voice: "bell",
    restChance: 0.55,
    velocityScale: 0.5,
  },
  texture: { kind: "bells", voice: "bell", baseMidi: 84, chance: 0.6 },
  pad: { voice: "junoPad", size: 5, velocity: 0.4, minimumEnergy: 0.05 },
  variants: {
    ...ambientStyle.variants,
    chordVoices: ["pad", "junoPad", "choir"],
    melodyVoices: ["bell", "feltPiano", "pluck"],
    padVoices: ["junoPad", "strings", "choir"],
    counterVoices: ["pluck", "bell"],
  },
  patterns: {
    templateChance: 0.6,
    drumGrooves: [SOFT_PULSE],
    bass: SUB_DRONE_BASS,
    stabs: null,
  },
  form: spaceForm,
  space: SPACE_DREAMS_SPACE,
  palette: {
    backgroundTop: "#000207",
    backgroundBottom: "#0a1a3a",
    accents: {
      drums: "#5eead4",
      bass: "#1e3a8a",
      chords: "#93c5fd",
      pad: "#172554",
      melody: "#f0f9ff",
      counter: "#a5f3fc",
      texture: "#ffffff",
    },
  },
};
