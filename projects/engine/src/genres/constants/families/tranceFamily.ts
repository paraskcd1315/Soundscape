import type { StyleFamily } from "../../../models/StyleFamily";
import { bassSteps } from "../../utils/bassSteps.util";
import { grooveGrids } from "../../utils/grooveGrids.util";
import { TRANCE_ROLL_BASS } from "../blocks/bassRules.constants";
import { BIG_ROOM, TRANCE_DRIVE } from "../blocks/grooves.constants";
import { TRANCE_SPACE } from "../blocks/spaces.constants";
import { OFFBEAT_STABS } from "../blocks/stabRules.constants";
import { tranceForm } from "../forms/clubForms";
import {
  MAJOR_ANTHEM,
  MINOR_EPIC,
  MINOR_LIFT,
} from "../progressions.constants";

export const TRANCE_FAMILY: StyleFamily = {
  tempoRange: { min: 132, max: 142 },
  defaultTempo: 138,
  swingRange: { min: 0, max: 0.05 },
  defaultSwing: 0,
  humanizeScale: 0.3,
  defaultReverb: 0.4,
  defaultBrightness: 0.7,
  ducking: true,
  scaleIds: ["minor", "major", "dorian"],
  defaultScaleId: "minor",
  progressions: [MINOR_EPIC, MINOR_LIFT, MAJOR_ANTHEM],
  drums: {
    grids: grooveGrids(TRANCE_DRIVE),
    fillChance: 0.45,
    fillVoice: "snare",
    minimumEnergy: 0.1,
  },
  bass: {
    voice: "sawBass",
    baseMidi: 36,
    minimumEnergy: 0.1,
    patterns: [
      bassSteps([2, 3, 6, 7, 10, 11, 14, 15], 1, [
        "root",
        "root",
        "root",
        "octave",
      ]),
    ],
  },
  chords: {
    voice: "supersaw",
    rhythm: "stab",
    centerMidi: 62,
    simpleSize: 3,
    richSize: 4,
    stabSteps: [2, 6, 10, 14],
    arpStepLength: 1,
    velocity: 0.5,
  },
  melody: {
    voice: "supersaw",
    baseMidi: 74,
    lowMidi: 64,
    highMidi: 88,
    restChance: 0.3,
    minimumNotes: 4,
    maximumNotes: 8,
    noteLengthSteps: [1, 2, 2, 3, 4],
    stepBias: 0.6,
    minimumEnergy: 0.3,
  },
  texture: { kind: "arp", voice: "pluck", baseMidi: 72, chance: 0.6 },
  pad: { voice: "strings", size: 4, velocity: 0.42, minimumEnergy: 0.05 },
  counter: {
    voice: "pluck",
    lowMidi: 67,
    highMidi: 91,
    chance: 0.5,
    steps: [2, 6, 10, 14, 3, 11],
    lengthSteps: [1, 2],
    minimumEnergy: 0.4,
  },
  variants: {
    chordVoices: ["supersaw", "supersaw", "pluck", "stab"],
    melodyVoices: ["supersaw", "pluck", "softLead"],
    bassVoices: ["sawBass", "sawBass", "subBass"],
    padVoices: ["strings", "pad", "choir"],
    counterVoices: ["pluck", "bell", "supersaw"],
    stabSteps: [
      [2, 6, 10, 14],
      [2, 6, 10, 14],
      [0, 3, 6, 11],
    ],
    drumKits: [grooveGrids(BIG_ROOM)],
    chordCenterShifts: [-2, 0, 2],
  },
  patterns: {
    templateChance: 0.5,
    drumGrooves: [TRANCE_DRIVE, BIG_ROOM],
    bass: TRANCE_ROLL_BASS,
    stabs: OFFBEAT_STABS,
  },
  form: tranceForm,
  space: TRANCE_SPACE,
};
