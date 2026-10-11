import type { StyleFamily } from "../../../models/StyleFamily";
import { bassSteps } from "../../utils/bassSteps.util";
import { grooveGrids } from "../../utils/grooveGrids.util";
import { DEEP_HOUSE_BASS } from "../blocks/bassRules.constants";
import {
  DEEP_HOUSE_SWING,
  PROGRESSIVE_ROLL,
} from "../blocks/grooves.constants";
import { DEEP_HOUSE_SPACE } from "../blocks/spaces.constants";
import { FIRST_OFFBEAT_STABS } from "../blocks/stabRules.constants";
import { houseForm } from "../forms/clubForms";
import {
  MINOR_SEVENTHS,
  TWO_CHORD_DEEP,
  TWO_CHORD_MINOR,
} from "../progressions.constants";

export const HOUSE_FAMILY: StyleFamily = {
  tempoRange: { min: 118, max: 126 },
  defaultTempo: 123,
  swingRange: { min: 0.05, max: 0.35 },
  defaultSwing: 0.18,
  humanizeScale: 0.8,
  defaultReverb: 0.35,
  defaultBrightness: 0.45,
  ducking: true,
  scaleIds: ["minor", "dorian"],
  defaultScaleId: "minor",
  progressions: [TWO_CHORD_DEEP, TWO_CHORD_MINOR, MINOR_SEVENTHS],
  drums: {
    grids: grooveGrids(DEEP_HOUSE_SWING),
    fillChance: 0.2,
    fillVoice: "clap",
    minimumEnergy: 0.1,
  },
  bass: {
    voice: "subBass",
    baseMidi: 36,
    minimumEnergy: 0.1,
    patterns: [
      bassSteps([3, 6, 10, 14], 2, ["root", "fifth", "root", "octave"]),
      bassSteps([2, 7, 10, 13], 2),
    ],
  },
  chords: {
    voice: "organ",
    rhythm: "stab",
    centerMidi: 60,
    simpleSize: 4,
    richSize: 5,
    stabSteps: [2, 7, 10],
    arpStepLength: 2,
    velocity: 0.5,
  },
  melody: {
    voice: "vocalChop",
    baseMidi: 72,
    lowMidi: 62,
    highMidi: 82,
    restChance: 0.55,
    minimumNotes: 2,
    maximumNotes: 5,
    noteLengthSteps: [1, 2, 3],
    stepBias: 0.7,
    minimumEnergy: 0.35,
  },
  texture: { kind: "offbeat", voice: "shaker", baseMidi: 0, chance: 0.35 },
  pad: { voice: "pad", size: 4, velocity: 0.32, minimumEnergy: 0.05 },
  counter: {
    voice: "rhodes",
    lowMidi: 62,
    highMidi: 84,
    chance: 0.35,
    steps: [3, 7, 11, 14],
    lengthSteps: [1, 2],
    minimumEnergy: 0.35,
    velocityScale: 0.85,
  },
  variants: {
    chordVoices: ["organ", "rhodes", "epiano", "stab"],
    melodyVoices: ["vocalChop", "rhodes", "pluck"],
    bassVoices: ["subBass", "sawBass", "reese"],
    padVoices: ["pad", "strings", "junoPad"],
    counterVoices: ["rhodes", "vocalChop", "bell"],
    stabSteps: [
      [2, 7, 10],
      [3, 10],
      [2, 6, 10, 14],
    ],
    drumKits: [grooveGrids(PROGRESSIVE_ROLL)],
    chordCenterShifts: [-2, 0, 2],
  },
  patterns: {
    templateChance: 0.45,
    drumGrooves: [DEEP_HOUSE_SWING],
    bass: DEEP_HOUSE_BASS,
    stabs: FIRST_OFFBEAT_STABS,
  },
  form: houseForm,
  space: DEEP_HOUSE_SPACE,
};
