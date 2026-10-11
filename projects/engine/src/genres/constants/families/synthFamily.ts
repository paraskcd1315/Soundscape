import type { StyleFamily } from "../../../models/StyleFamily";
import { bassSteps } from "../../utils/bassSteps.util";
import { grooveGrids } from "../../utils/grooveGrids.util";
import { OCTAVE_BOUNCE_BASS } from "../blocks/bassRules.constants";
import { SYNTHWAVE_DRIVE } from "../blocks/grooves.constants";
import { SYNTHWAVE_SPACE } from "../blocks/spaces.constants";
import { SYNCOPATED_STABS } from "../blocks/stabRules.constants";
import { songForm } from "../forms/chillForms";
import {
  MINOR_EPIC,
  MINOR_LIFT,
  NOSTALGIC_MAJOR,
} from "../progressions.constants";

export const SYNTH_FAMILY: StyleFamily = {
  tempoRange: { min: 96, max: 118 },
  defaultTempo: 106,
  swingRange: { min: 0, max: 0.05 },
  defaultSwing: 0,
  humanizeScale: 0.3,
  defaultReverb: 0.45,
  defaultBrightness: 0.6,
  ducking: true,
  scaleIds: ["minor", "dorian", "major"],
  defaultScaleId: "minor",
  progressions: [MINOR_EPIC, MINOR_LIFT, NOSTALGIC_MAJOR],
  drums: {
    grids: grooveGrids(SYNTHWAVE_DRIVE),
    fillChance: 0.4,
    fillVoice: "tom",
    minimumEnergy: 0.1,
  },
  bass: {
    voice: "sawBass",
    baseMidi: 36,
    minimumEnergy: 0.1,
    patterns: [bassSteps([0, 2, 4, 6, 8, 10, 12, 14], 2, ["root", "octave"])],
  },
  chords: {
    voice: "junoPad",
    rhythm: "held",
    centerMidi: 60,
    simpleSize: 3,
    richSize: 4,
    stabSteps: [0, 6, 10],
    arpStepLength: 1,
    velocity: 0.45,
  },
  melody: {
    voice: "softLead",
    baseMidi: 72,
    lowMidi: 62,
    highMidi: 86,
    restChance: 0.35,
    minimumNotes: 3,
    maximumNotes: 7,
    noteLengthSteps: [2, 2, 4, 6],
    stepBias: 0.65,
    minimumEnergy: 0.3,
  },
  texture: { kind: "arp", voice: "pulse", baseMidi: 72, chance: 0.6 },
  pad: { voice: "strings", size: 4, velocity: 0.3, minimumEnergy: 0.05 },
  counter: {
    voice: "brass",
    lowMidi: 60,
    highMidi: 79,
    chance: 0.35,
    steps: [0, 6, 10, 14],
    lengthSteps: [2, 3],
    minimumEnergy: 0.45,
    velocityScale: 0.8,
  },
  variants: {
    chordVoices: ["junoPad", "brass", "strings"],
    melodyVoices: ["softLead", "pulse", "supersaw"],
    bassVoices: ["sawBass", "pulse"],
    padVoices: ["strings", "junoPad", "choir"],
    counterVoices: ["brass", "bell", "pluck"],
    stabSteps: [
      [0, 6, 10],
      [0, 3, 8, 11],
    ],
    drumKits: [],
    chordCenterShifts: [-2, 0, 2],
  },
  patterns: {
    templateChance: 0.5,
    drumGrooves: [SYNTHWAVE_DRIVE],
    bass: OCTAVE_BOUNCE_BASS,
    stabs: SYNCOPATED_STABS,
  },
  form: songForm,
  space: SYNTHWAVE_SPACE,
};
