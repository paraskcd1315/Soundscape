import type { StyleDefinition } from "../../../models/StyleDefinition";
import { TECH_HOUSE_BASS } from "../blocks/bassRules.constants";
import { TECH_HOUSE_PERC } from "../blocks/grooves.constants";
import { TECH_HOUSE_SPACE } from "../blocks/spaces.constants";
import { SYNCOPATED_STABS } from "../blocks/stabRules.constants";
import { HOUSE_FAMILY } from "../families/houseFamily";
import { grooveGrids } from "../../utils/grooveGrids.util";
import { bassSteps } from "../../utils/bassSteps.util";
import { DRONE, TWO_CHORD_MINOR } from "../progressions.constants";

export const techHouseStyle: StyleDefinition = {
  ...HOUSE_FAMILY,
  id: "techHouse",
  tempoRange: { min: 123, max: 128 },
  defaultTempo: 126,
  swingRange: { min: 0, max: 0.2 },
  defaultSwing: 0.08,
  humanizeScale: 0.4,
  defaultReverb: 0.2,
  defaultBrightness: 0.55,
  progressions: [DRONE, TWO_CHORD_MINOR],
  drums: {
    ...HOUSE_FAMILY.drums,
    grids: grooveGrids(TECH_HOUSE_PERC),
    fillChance: 0.35,
  },
  bass: {
    voice: "sawBass",
    baseMidi: 36,
    minimumEnergy: 0.1,
    patterns: [bassSteps([2, 3, 6, 7, 10, 11, 14, 15], 1, ["root", "octave"])],
  },
  chords: {
    ...HOUSE_FAMILY.chords,
    voice: "stab",
    stabSteps: [3, 10],
    velocity: 0.42,
  },
  melody: {
    ...HOUSE_FAMILY.melody,
    voice: "vocalChop",
    restChance: 0.45,
    noteLengthSteps: [1, 1, 2],
  },
  pad: null,
  variants: {
    ...HOUSE_FAMILY.variants,
    chordVoices: ["stab", "organ"],
    melodyVoices: ["vocalChop", "acid", "pluck"],
    bassVoices: ["sawBass", "reese"],
    drumKits: [],
  },
  patterns: {
    templateChance: 0.4,
    drumGrooves: [TECH_HOUSE_PERC],
    bass: TECH_HOUSE_BASS,
    stabs: SYNCOPATED_STABS,
  },
  space: TECH_HOUSE_SPACE,
  palette: {
    backgroundTop: "#0d0d0d",
    backgroundBottom: "#2a2a2a",
    accents: {
      drums: "#f9c74f",
      bass: "#f3722c",
      chords: "#90be6d",
      pad: "#43aa8b",
      melody: "#f8f9fa",
      counter: "#f94144",
      texture: "#ffffff",
    },
  },
};
