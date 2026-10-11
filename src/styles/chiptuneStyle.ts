import type { BassStep } from "../domain/model/BassStep";
import type { StyleDefinition } from "../domain/model/StyleDefinition";
import { chiptuneForm } from "./forms/chiptuneForm";
import { chiptunePatterns } from "./patterns/chiptunePatterns";
import { chiptuneSpace } from "./space/spaces";

const WALKING_EIGHTHS: BassStep[] = [
  { step: 0, interval: "root", lengthSteps: 2, weight: 1 },
  { step: 2, interval: "octave", lengthSteps: 2, weight: 0.8 },
  { step: 4, interval: "root", lengthSteps: 2, weight: 1 },
  { step: 6, interval: "fifth", lengthSteps: 2, weight: 0.8 },
  { step: 8, interval: "root", lengthSteps: 2, weight: 1 },
  { step: 10, interval: "octave", lengthSteps: 2, weight: 0.8 },
  { step: 12, interval: "root", lengthSteps: 2, weight: 1 },
  { step: 14, interval: "fifth", lengthSteps: 2, weight: 0.8 },
];

export const chiptuneStyle: StyleDefinition = {
  id: "chiptune",
  tempoRange: { min: 110, max: 170 },
  defaultTempo: 140,
  swingRange: { min: 0, max: 0 },
  defaultSwing: 0,
  humanizeScale: 0,
  defaultReverb: 0.1,
  defaultBrightness: 0.8,
  ducking: false,
  scaleIds: ["major", "minor", "mixolydian", "majorPentatonic"],
  defaultScaleId: "major",
  progressions: [
    {
      barsPerChord: 1,
      chords: [
        { degree: 0, size: 3 },
        { degree: 2, size: 3 },
        { degree: 3, size: 3 },
        { degree: 4, size: 3 },
      ],
    },
    {
      barsPerChord: 1,
      chords: [
        { degree: 5, size: 3 },
        { degree: 4, size: 3 },
        { degree: 3, size: 3 },
        { degree: 4, size: 3 },
      ],
    },
    {
      barsPerChord: 2,
      chords: [
        { degree: 0, size: 3 },
        { degree: 6, size: 3 },
        { degree: 5, size: 3 },
        { degree: 4, size: 3 },
      ],
    },
    {
      barsPerChord: 1,
      chords: [
        { degree: 0, size: 3 },
        { degree: 4, size: 3 },
        { degree: 5, size: 3 },
        { degree: 3, size: 3 },
      ],
    },
    {
      barsPerChord: 1,
      chords: [
        { degree: 5, size: 3 },
        { degree: 3, size: 3 },
        { degree: 0, size: 3 },
        { degree: 4, size: 3 },
      ],
    },
    {
      barsPerChord: 1,
      chords: [
        { degree: 0, size: 3 },
        { degree: 5, size: 3 },
        { degree: 3, size: 3 },
        { degree: 4, size: 3 },
      ],
    },
  ],
  drums: {
    fillChance: 0.35,
    fillVoice: "snare",
    minimumEnergy: 0.1,
    grids: [
      {
        voice: "kick",
        steps: [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0.4, 0, 0, 0, 0, 0],
      },
      {
        voice: "snare",
        steps: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0.3],
      },
      { voice: "hat", steps: [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0] },
    ],
  },
  bass: {
    voice: "triangle",
    baseMidi: 36,
    minimumEnergy: 0.05,
    patterns: [WALKING_EIGHTHS],
  },
  chords: {
    voice: "pulse",
    rhythm: "arp",
    centerMidi: 64,
    simpleSize: 3,
    richSize: 4,
    stabSteps: [],
    arpStepLength: 1,
    velocity: 0.28,
  },
  melody: {
    voice: "pulse",
    baseMidi: 72,
    lowMidi: 64,
    highMidi: 88,
    restChance: 0.25,
    minimumNotes: 5,
    maximumNotes: 9,
    noteLengthSteps: [1, 2, 2, 3, 4],
    stepBias: 0.6,
    minimumEnergy: 0.15,
  },
  texture: { kind: "arp", voice: "triangle", baseMidi: 84, chance: 0.5 },
  pad: null,
  counter: {
    voice: "triangle",
    lowMidi: 72,
    highMidi: 96,
    chance: 0.5,
    steps: [0, 2, 4, 6, 8, 10, 12, 14],
    lengthSteps: [1, 2],
    minimumEnergy: 0.35,
  },
  variants: {
    chordVoices: ["pulse"],
    melodyVoices: ["pulse", "triangle"],
    bassVoices: ["triangle", "subBass"],
    padVoices: ["pulse"],
    counterVoices: ["triangle", "pulse"],
    stabSteps: [[0]],
    chordCenterShifts: [-2, 0, 2],
    drumKits: [],
  },
  patterns: chiptunePatterns,
  form: chiptuneForm,
  space: chiptuneSpace,
  palette: {
    backgroundTop: "#04140a",
    backgroundBottom: "#0a3a3a",
    accents: {
      drums: "#c6ff3d",
      bass: "#27d39a",
      chords: "#3dd6ff",
      melody: "#f4ff7a",
      texture: "#a8fff0",
      pad: "#1c8c6a",
      counter: "#c8ffe8",
    },
  },
};
