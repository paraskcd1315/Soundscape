import type { StyleDefinition } from "../../../models/StyleDefinition";
import { REESE_DRIVE_BASS } from "../blocks/bassRules.constants";
import { DARKSYNTH_STOMP } from "../blocks/grooves.constants";
import { DARKSYNTH_SPACE } from "../blocks/spaces.constants";
import { OFFBEAT_STABS } from "../blocks/stabRules.constants";
import { SYNTH_FAMILY } from "../families/synthFamily";
import { DARK_PHRYGIAN, HARMONIC_DRAMA } from "../progressions.constants";
import { grooveGrids } from "../../utils/grooveGrids.util";
import { bassSteps } from "../../utils/bassSteps.util";

export const cyberpunkStyle: StyleDefinition = {
  ...SYNTH_FAMILY,
  id: "cyberpunk",
  tempoRange: { min: 110, max: 136 },
  defaultTempo: 122,
  defaultBrightness: 0.55,
  scaleIds: ["phrygian", "harmonicMinor", "minor"],
  defaultScaleId: "phrygian",
  progressions: [DARK_PHRYGIAN, HARMONIC_DRAMA],
  drums: { ...SYNTH_FAMILY.drums, grids: grooveGrids(DARKSYNTH_STOMP) },
  bass: {
    voice: "reese",
    baseMidi: 33,
    minimumEnergy: 0.1,
    patterns: [bassSteps([0, 2, 3, 5, 6, 8, 10, 11, 13, 14], 1)],
  },
  chords: {
    ...SYNTH_FAMILY.chords,
    voice: "stab",
    rhythm: "stab",
    stabSteps: [0, 3, 6, 10],
    velocity: 0.5,
  },
  melody: {
    ...SYNTH_FAMILY.melody,
    voice: "acid",
    restChance: 0.3,
    noteLengthSteps: [1, 1, 2],
  },
  texture: { kind: "arp", voice: "pulse", baseMidi: 69, chance: 0.75 },
  pad: { voice: "pad", size: 3, velocity: 0.3, minimumEnergy: 0.05 },
  variants: {
    ...SYNTH_FAMILY.variants,
    chordVoices: ["stab", "brass", "pad"],
    melodyVoices: ["acid", "supersaw", "pulse"],
    bassVoices: ["reese", "sawBass"],
    counterVoices: ["pulse", "acid", "brass"],
  },
  patterns: {
    templateChance: 0.45,
    drumGrooves: [DARKSYNTH_STOMP],
    bass: REESE_DRIVE_BASS,
    stabs: OFFBEAT_STABS,
  },
  space: DARKSYNTH_SPACE,
  palette: {
    backgroundTop: "#050008",
    backgroundBottom: "#1a0014",
    accents: {
      drums: "#ff003c",
      bass: "#7400b8",
      chords: "#00f0ff",
      pad: "#2b0035",
      melody: "#fcee0a",
      counter: "#ff2079",
      texture: "#e0ffff",
    },
  },
};
