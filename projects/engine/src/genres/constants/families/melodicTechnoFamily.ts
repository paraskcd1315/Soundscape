import type { StyleFamily } from "../../../models/StyleFamily";
import { bassSteps } from "../../utils/bassSteps.util";
import { grooveGrids } from "../../utils/grooveGrids.util";
import { PROGRESSIVE_ROLL_BASS } from "../blocks/bassRules.constants";
import { MELODIC_TECHNO, PROGRESSIVE_ROLL } from "../blocks/grooves.constants";
import { MELODIC_TECHNO_SPACE } from "../blocks/spaces.constants";
import { OFFBEAT_STABS } from "../blocks/stabRules.constants";
import { progressiveForm } from "../forms/clubForms";
import {
  MINOR_EPIC,
  MINOR_LIFT,
  TWO_CHORD_DEEP,
} from "../progressions.constants";

export const MELODIC_TECHNO_FAMILY: StyleFamily = {
  tempoRange: { min: 120, max: 128 },
  defaultTempo: 124,
  swingRange: { min: 0, max: 0.06 },
  defaultSwing: 0,
  humanizeScale: 0.3,
  defaultReverb: 0.5,
  defaultBrightness: 0.5,
  ducking: true,
  scaleIds: ["minor", "phrygian", "dorian"],
  defaultScaleId: "minor",
  progressions: [MINOR_EPIC, TWO_CHORD_DEEP, MINOR_LIFT],
  drums: {
    grids: grooveGrids(MELODIC_TECHNO),
    fillChance: 0.2,
    fillVoice: "clap",
    minimumEnergy: 0.1,
  },
  bass: {
    voice: "sawBass",
    baseMidi: 36,
    minimumEnergy: 0.1,
    patterns: [bassSteps([1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15], 1)],
  },
  chords: {
    voice: "pad",
    rhythm: "held",
    centerMidi: 60,
    simpleSize: 4,
    richSize: 5,
    stabSteps: [3, 11],
    arpStepLength: 1,
    velocity: 0.42,
  },
  melody: {
    voice: "softLead",
    baseMidi: 72,
    lowMidi: 62,
    highMidi: 86,
    restChance: 0.4,
    minimumNotes: 3,
    maximumNotes: 6,
    noteLengthSteps: [2, 3, 4, 6],
    stepBias: 0.65,
    minimumEnergy: 0.3,
  },
  texture: { kind: "arp", voice: "pluck", baseMidi: 72, chance: 0.6 },
  pad: { voice: "strings", size: 4, velocity: 0.36, minimumEnergy: 0.05 },
  counter: {
    voice: "pluck",
    lowMidi: 64,
    highMidi: 88,
    chance: 0.4,
    steps: [2, 6, 10, 14, 3, 11],
    lengthSteps: [1, 2],
    minimumEnergy: 0.4,
  },
  variants: {
    chordVoices: ["pad", "junoPad", "strings"],
    melodyVoices: ["softLead", "supersaw", "pluck"],
    bassVoices: ["sawBass", "reese", "subBass"],
    padVoices: ["strings", "pad", "choir"],
    counterVoices: ["pluck", "bell", "softLead"],
    stabSteps: [
      [3, 11],
      [3, 7, 11, 15],
    ],
    drumKits: [grooveGrids(PROGRESSIVE_ROLL)],
    chordCenterShifts: [-2, 0, 2],
  },
  patterns: {
    templateChance: 0.4,
    drumGrooves: [MELODIC_TECHNO, PROGRESSIVE_ROLL],
    bass: PROGRESSIVE_ROLL_BASS,
    stabs: OFFBEAT_STABS,
  },
  form: progressiveForm,
  space: MELODIC_TECHNO_SPACE,
};
