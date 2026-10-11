import type { StyleDefinition } from "../../../models/StyleDefinition";
import { PROGRESSIVE_ROLL_BASS } from "../blocks/bassRules.constants";
import {
  DEEP_HOUSE_SWING,
  PROGRESSIVE_ROLL,
} from "../blocks/grooves.constants";
import { PROGRESSIVE_SPACE } from "../blocks/spaces.constants";
import { OFFBEAT_STABS } from "../blocks/stabRules.constants";
import { HOUSE_FAMILY } from "../families/houseFamily";
import { progressiveForm } from "../forms/clubForms";

export const deepProgressiveHouseStyle: StyleDefinition = {
  ...HOUSE_FAMILY,
  id: "deepProgressiveHouse",
  tempoRange: { min: 118, max: 124 },
  defaultTempo: 121,
  defaultSwing: 0.06,
  defaultReverb: 0.45,
  scaleIds: ["minor", "dorian", "phrygian"],
  chords: {
    ...HOUSE_FAMILY.chords,
    voice: "pad",
    rhythm: "held",
    velocity: 0.4,
  },
  melody: { ...HOUSE_FAMILY.melody, voice: "pluck", restChance: 0.45 },
  texture: { kind: "arp", voice: "pluck", baseMidi: 72, chance: 0.45 },
  bass: { ...HOUSE_FAMILY.bass, voice: "sawBass" },
  variants: {
    ...HOUSE_FAMILY.variants,
    chordVoices: ["pad", "junoPad", "strings"],
    melodyVoices: ["pluck", "softLead", "bell"],
    bassVoices: ["sawBass", "reese", "subBass"],
  },
  patterns: {
    templateChance: 0.4,
    drumGrooves: [PROGRESSIVE_ROLL, DEEP_HOUSE_SWING],
    bass: PROGRESSIVE_ROLL_BASS,
    stabs: OFFBEAT_STABS,
  },
  form: progressiveForm,
  space: PROGRESSIVE_SPACE,
  palette: {
    backgroundTop: "#06101a",
    backgroundBottom: "#18324d",
    accents: {
      drums: "#8ecae6",
      bass: "#219ebc",
      chords: "#bde0fe",
      pad: "#1d3557",
      melody: "#edf6f9",
      counter: "#a8dadc",
      texture: "#f1faee",
    },
  },
};
