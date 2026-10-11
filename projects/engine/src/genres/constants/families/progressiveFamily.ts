import type { StyleFamily } from "../../../models/StyleFamily";
import { bassSteps } from "../../utils/bassSteps.util";
import { grooveGrids } from "../../utils/grooveGrids.util";
import { PROGRESSIVE_ROLL_BASS } from "../blocks/bassRules.constants";
import {
  DEEP_HOUSE_SWING,
  PROGRESSIVE_ROLL,
} from "../blocks/grooves.constants";
import { PROGRESSIVE_SPACE } from "../blocks/spaces.constants";
import { OFFBEAT_STABS } from "../blocks/stabRules.constants";
import { progressiveForm } from "../forms/clubForms";
import {
  MINOR_LIFT,
  MINOR_SEVENTHS,
  SLOW_PAIR,
  TWO_CHORD_DEEP,
} from "../progressions.constants";

export const PROGRESSIVE_FAMILY: StyleFamily = {
  tempoRange: { min: 118, max: 128 },
  defaultTempo: 123,
  swingRange: { min: 0, max: 0.12 },
  defaultSwing: 0.04,
  humanizeScale: 0.5,
  defaultReverb: 0.45,
  defaultBrightness: 0.5,
  ducking: true,
  scaleIds: ["minor", "dorian", "phrygian"],
  defaultScaleId: "minor",
  progressions: [TWO_CHORD_DEEP, MINOR_SEVENTHS, SLOW_PAIR, MINOR_LIFT],
  drums: {
    grids: grooveGrids(PROGRESSIVE_ROLL),
    fillChance: 0.25,
    fillVoice: "rim",
    minimumEnergy: 0.1,
  },
  bass: {
    voice: "sawBass",
    baseMidi: 36,
    minimumEnergy: 0.1,
    patterns: [
      bassSteps([2, 3, 6, 7, 10, 11, 14, 15], 1),
      bassSteps([1, 3, 5, 7, 9, 11, 13, 15], 1, [
        "root",
        "root",
        "fifth",
        "octave",
      ]),
    ],
  },
  chords: {
    voice: "pluck",
    rhythm: "arp",
    centerMidi: 62,
    simpleSize: 4,
    richSize: 5,
    stabSteps: [3, 7, 11],
    arpStepLength: 1,
    velocity: 0.42,
  },
  melody: {
    voice: "pluck",
    baseMidi: 72,
    lowMidi: 62,
    highMidi: 86,
    restChance: 0.45,
    minimumNotes: 3,
    maximumNotes: 6,
    noteLengthSteps: [1, 2, 3, 4],
    stepBias: 0.7,
    minimumEnergy: 0.3,
  },
  texture: { kind: "offbeat", voice: "shaker", baseMidi: 0, chance: 0.4 },
  pad: { voice: "pad", size: 4, velocity: 0.38, minimumEnergy: 0.05 },
  counter: {
    voice: "bell",
    lowMidi: 67,
    highMidi: 88,
    chance: 0.35,
    steps: [2, 6, 10, 14, 7],
    lengthSteps: [2, 3],
    minimumEnergy: 0.35,
    velocityScale: 0.8,
  },
  variants: {
    chordVoices: ["pluck", "pluck", "epiano", "stab"],
    melodyVoices: ["pluck", "softLead", "bell"],
    bassVoices: ["sawBass", "reese", "subBass"],
    padVoices: ["pad", "strings", "junoPad"],
    counterVoices: ["bell", "pluck", "marimba"],
    stabSteps: [
      [3, 7, 11],
      [2, 6, 10, 14],
    ],
    drumKits: [grooveGrids(DEEP_HOUSE_SWING)],
    chordCenterShifts: [-3, 0, 3],
  },
  patterns: {
    templateChance: 0.45,
    drumGrooves: [PROGRESSIVE_ROLL, DEEP_HOUSE_SWING],
    bass: PROGRESSIVE_ROLL_BASS,
    stabs: OFFBEAT_STABS,
  },
  form: progressiveForm,
  space: PROGRESSIVE_SPACE,
};
