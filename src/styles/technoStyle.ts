import type { BassStep } from "../domain/model/BassStep";
import type { StyleDefinition } from "../domain/model/StyleDefinition";
import { technoForm } from "./forms/technoForm";
import { technoPatterns } from "./patterns/technoPatterns";
import { technoSpace } from "./space/spaces";

const OFFBEAT_PATTERN: BassStep[] = [2, 6, 10, 14].map((step) => ({
  step,
  interval: "root",
  lengthSteps: 2,
  weight: 1,
}));

const ROLLING_PATTERN: BassStep[] = [2, 3, 6, 7, 10, 11, 14].map(
  (step, index) => ({
    step,
    interval: index % 3 === 2 ? "octave" : "root",
    lengthSteps: 1,
    weight: 0.9,
  }),
);

export const technoStyle: StyleDefinition = {
  id: "techno",
  tempoRange: { min: 120, max: 140 },
  defaultTempo: 128,
  swingRange: { min: 0, max: 0.2 },
  defaultSwing: 0,
  humanizeScale: 0.5,
  defaultReverb: 0.25,
  defaultBrightness: 0.6,
  ducking: true,
  scaleIds: ["minor", "phrygian", "minorPentatonic"],
  defaultScaleId: "minor",
  progressions: [
    {
      barsPerChord: 2,
      chords: [
        { degree: 0, size: 3 },
        { degree: 5, size: 3 },
        { degree: 2, size: 3 },
        { degree: 6, size: 3 },
      ],
    },
    {
      barsPerChord: 1,
      chords: [
        { degree: 0, size: 3 },
        { degree: 3, size: 3 },
        { degree: 0, size: 3 },
        { degree: 4, size: 3 },
      ],
    },
    {
      barsPerChord: 4,
      chords: [
        { degree: 0, size: 3 },
        { degree: 6, size: 3 },
      ],
    },
    { barsPerChord: 4, chords: [{ degree: 0, size: 3 }] },
    {
      barsPerChord: 2,
      chords: [
        { degree: 0, size: 3 },
        { degree: 5, size: 3 },
      ],
    },
    {
      barsPerChord: 1,
      chords: [
        { degree: 0, size: 3 },
        { degree: 0, size: 3 },
        { degree: 6, size: 3 },
        { degree: 5, size: 3 },
      ],
    },
  ],
  drums: {
    fillChance: 0.5,
    fillVoice: "clap",
    minimumEnergy: 0.1,
    grids: [
      {
        voice: "kick",
        steps: [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
      },
      {
        voice: "clap",
        steps: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      },
      {
        voice: "hat",
        steps: [0, 0.3, 1, 0.3, 0, 0.3, 1, 0.3, 0, 0.3, 1, 0.3, 0, 0.3, 1, 0.3],
      },
      {
        voice: "openHat",
        steps: [0, 0, 0, 0, 0, 0, 0.5, 0, 0, 0, 0, 0, 0, 0, 0.5, 0],
      },
      {
        voice: "perc",
        steps: [0, 0, 0, 0.3, 0, 0, 0.2, 0, 0, 0.3, 0, 0, 0, 0.3, 0, 0.3],
      },
    ],
  },
  bass: {
    voice: "sawBass",
    baseMidi: 36,
    minimumEnergy: 0.12,
    patterns: [OFFBEAT_PATTERN, ROLLING_PATTERN],
  },
  chords: {
    voice: "stab",
    rhythm: "stab",
    centerMidi: 60,
    simpleSize: 3,
    richSize: 4,
    stabSteps: [3, 7, 11],
    arpStepLength: 1,
    velocity: 0.55,
  },
  melody: {
    voice: "pulse",
    baseMidi: 72,
    lowMidi: 60,
    highMidi: 84,
    restChance: 0.6,
    minimumNotes: 2,
    maximumNotes: 5,
    noteLengthSteps: [1, 2, 3],
    stepBias: 0.5,
    minimumEnergy: 0.45,
  },
  texture: { kind: "offbeat", voice: "perc", baseMidi: 0, chance: 0.6 },
  pad: { voice: "pad", size: 3, velocity: 0.34, minimumEnergy: 0.1 },
  counter: {
    voice: "pulse",
    lowMidi: 60,
    highMidi: 84,
    chance: 0.5,
    steps: [2, 6, 10, 14, 3, 7, 11, 15],
    lengthSteps: [1, 2],
    minimumEnergy: 0.55,
  },
  variants: {
    chordVoices: ["stab", "organ"],
    melodyVoices: ["pulse", "softLead", "acid"],
    bassVoices: ["sawBass", "subBass"],
    padVoices: ["pad", "strings"],
    counterVoices: ["acid", "acid", "pulse", "kalimba"],
    stabSteps: [
      [3, 7, 11],
      [2, 6, 10, 14],
      [3, 10],
    ],
    chordCenterShifts: [-2, 0, 2],
    drumKits: [],
  },
  patterns: technoPatterns,
  form: technoForm,
  space: technoSpace,
  palette: {
    backgroundTop: "#0d0418",
    backgroundBottom: "#35104f",
    accents: {
      drums: "#ff3dc8",
      bass: "#8a2be2",
      chords: "#c77dff",
      melody: "#ff9cf0",
      texture: "#ffe3fb",
      pad: "#5a1f9c",
      counter: "#ff7ae0",
    },
  },
};
