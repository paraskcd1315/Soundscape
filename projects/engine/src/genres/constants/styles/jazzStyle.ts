import type { StyleDefinition } from "../../../models/StyleDefinition";
import { jazzForm } from "../forms/jazzForm";
import { jazzPatterns } from "../patterns/jazzPatterns";
import { jazzSpace } from "../spaces.constants";

export const jazzStyle: StyleDefinition = {
  id: "jazz",
  tempoRange: { min: 100, max: 200 },
  defaultTempo: 144,
  swingRange: { min: 0.6, max: 1 },
  defaultSwing: 0.85,
  humanizeScale: 1.8,
  defaultReverb: 0.4,
  defaultBrightness: 0.5,
  ducking: false,
  scaleIds: ["dorian", "mixolydian", "major", "minor"],
  defaultScaleId: "dorian",
  progressions: [
    {
      barsPerChord: 1,
      chords: [
        { degree: 2, size: 4 },
        { degree: 5, size: 4 },
        { degree: 1, size: 4 },
        { degree: 4, size: 4 },
      ],
    },
    {
      barsPerChord: 1,
      chords: [
        { degree: 0, size: 4 },
        { degree: 5, size: 4 },
        { degree: 1, size: 4 },
        { degree: 4, size: 4 },
      ],
    },
    {
      barsPerChord: 2,
      chords: [
        { degree: 1, size: 4 },
        { degree: 4, size: 5 },
        { degree: 0, size: 5 },
        { degree: 3, size: 4 },
      ],
    },
    {
      barsPerChord: 1,
      chords: [
        { degree: 0, size: 5 },
        { degree: 2, size: 4 },
        { degree: 5, size: 4 },
        { degree: 1, size: 4 },
      ],
    },
    {
      barsPerChord: 1,
      chords: [
        { degree: 2, size: 4 },
        { degree: 5, size: 4 },
        { degree: 1, size: 4 },
        { degree: 4, size: 4 },
      ],
    },
    {
      barsPerChord: 1,
      chords: [
        { degree: 0, size: 5 },
        { degree: 4, size: 4 },
        { degree: 5, size: 4 },
        { degree: 3, size: 4 },
      ],
    },
    {
      barsPerChord: 2,
      chords: [
        { degree: 1, size: 5 },
        { degree: 4, size: 5 },
      ],
    },
    {
      barsPerChord: 1,
      chords: [
        { degree: 1, size: 4 },
        { degree: 4, size: 4 },
        { degree: 0, size: 4 },
        { degree: 0, size: 5 },
      ],
    },
    {
      barsPerChord: 1,
      chords: [
        { degree: 0, size: 4 },
        { degree: 3, size: 4 },
        { degree: 1, size: 4 },
        { degree: 4, size: 4 },
      ],
    },
    {
      barsPerChord: 2,
      chords: [
        { degree: 0, size: 5 },
        { degree: 5, size: 4 },
        { degree: 1, size: 4 },
        { degree: 4, size: 4 },
      ],
    },
  ],
  drums: {
    fillChance: 0.2,
    fillVoice: "snare",
    minimumEnergy: 0.05,
    grids: [
      {
        voice: "ride",
        steps: [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
      },
      {
        voice: "hat",
        steps: [0, 0, 0, 0, 0.9, 0, 0, 0, 0, 0, 0, 0, 0.9, 0, 0, 0],
      },
      {
        voice: "kick",
        steps: [0.5, 0, 0, 0, 0, 0, 0, 0, 0.3, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        voice: "snare",
        steps: [0, 0, 0, 0.2, 0, 0, 0, 0.2, 0, 0, 0, 0.2, 0, 0, 0, 0.2],
      },
    ],
  },
  bass: {
    voice: "upright",
    baseMidi: 36,
    minimumEnergy: 0.05,
    patterns: [
      [
        { step: 0, interval: "root", lengthSteps: 4, weight: 1 },
        { step: 4, interval: "third", lengthSteps: 4, weight: 0.85 },
        { step: 8, interval: "fifth", lengthSteps: 4, weight: 0.9 },
        { step: 12, interval: "approach", lengthSteps: 4, weight: 0.85 },
      ],
      [
        { step: 0, interval: "root", lengthSteps: 4, weight: 1 },
        { step: 4, interval: "fifth", lengthSteps: 4, weight: 0.85 },
        { step: 8, interval: "third", lengthSteps: 4, weight: 0.9 },
        { step: 12, interval: "approach", lengthSteps: 4, weight: 0.85 },
      ],
    ],
  },
  chords: {
    voice: "piano",
    rhythm: "stab",
    centerMidi: 60,
    simpleSize: 4,
    richSize: 5,
    stabSteps: [0, 7, 10],
    arpStepLength: 2,
    velocity: 0.5,
    rootless: true,
  },
  melody: {
    voice: "horn",
    baseMidi: 70,
    lowMidi: 58,
    highMidi: 84,
    restChance: 0.3,
    minimumNotes: 5,
    maximumNotes: 9,
    noteLengthSteps: [1, 2, 2, 3, 4],
    stepBias: 0.65,
    minimumEnergy: 0.2,
    chromaticChance: 0.35,
  },
  texture: { kind: "none", voice: null, baseMidi: 0, chance: 0 },
  pad: null,
  counter: {
    voice: "vibes",
    lowMidi: 64,
    highMidi: 88,
    chance: 0.45,
    steps: [3, 7, 10, 14, 2, 6],
    lengthSteps: [1, 2, 3],
    minimumEnergy: 0.35,
  },
  variants: {
    chordVoices: ["piano", "piano", "piano", "rhodes", "vibes"],
    melodyVoices: ["horn", "horn", "piano", "vibes", "muteTrumpet"],
    bassVoices: ["upright"],
    padVoices: ["organ"],
    counterVoices: ["vibes", "piano", "muteTrumpet"],
    stabSteps: [
      [0, 7, 10],
      [0, 6],
      [3, 10],
      [0, 4, 10, 14],
      [2, 8, 13],
      [0, 7, 11],
    ],
    chordCenterShifts: [-4, -2, 0, 2, 4],
    drumKits: [
      [
        {
          voice: "ride",
          steps: [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
        },
        {
          voice: "hat",
          steps: [0, 0, 0, 0, 0.9, 0, 0, 0, 0, 0, 0, 0, 0.9, 0, 0, 0],
        },
        {
          voice: "kick",
          steps: [0.5, 0, 0, 0, 0, 0, 0, 0, 0.3, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          voice: "snare",
          steps: [0, 0, 0, 0.2, 0, 0, 0, 0.2, 0, 0, 0, 0.2, 0, 0, 0, 0.2],
        },
      ],
      [
        {
          voice: "brush",
          steps: [1, 0, 0.5, 0, 1, 0, 0.5, 0, 1, 0, 0.5, 0, 1, 0, 0.5, 0],
        },
        {
          voice: "hat",
          steps: [0, 0, 0, 0, 0.9, 0, 0, 0, 0, 0, 0, 0, 0.9, 0, 0, 0],
        },
        {
          voice: "kick",
          steps: [0.4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.3, 0, 0, 0, 0, 0],
        },
        {
          voice: "snare",
          steps: [0, 0, 0, 0, 0, 0, 0.25, 0, 0, 0, 0, 0.25, 0, 0, 0, 0],
        },
      ],
    ],
  },
  patterns: jazzPatterns,
  form: jazzForm,
  space: jazzSpace,
  palette: {
    backgroundTop: "#1a1004",
    backgroundBottom: "#4a1220",
    accents: {
      drums: "#e8c25a",
      bass: "#b5453a",
      chords: "#f0a24b",
      melody: "#ffe08a",
      texture: "#fff4cf",
      pad: "#8a3a3a",
      counter: "#ffd36b",
    },
  },
};
