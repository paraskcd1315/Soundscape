import type { StyleDefinition } from "../domain/model/StyleDefinition";
import { jazzForm } from "./forms/jazzForm";
import { jazzPatterns } from "./patterns/jazzPatterns";
import { jazzSpace } from "./space/spaces";

export const jazzStyle: StyleDefinition = {
  id: "jazz",
  tempoRange: { min: 80, max: 150 },
  defaultTempo: 112,
  swingRange: { min: 0.4, max: 1 },
  defaultSwing: 0.8,
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
    voice: "epiano",
    rhythm: "stab",
    centerMidi: 62,
    simpleSize: 4,
    richSize: 5,
    stabSteps: [0, 7, 10],
    arpStepLength: 2,
    velocity: 0.55,
  },
  melody: {
    voice: "epiano",
    baseMidi: 72,
    lowMidi: 62,
    highMidi: 86,
    restChance: 0.4,
    minimumNotes: 4,
    maximumNotes: 7,
    noteLengthSteps: [2, 3, 4, 6],
    stepBias: 0.55,
    minimumEnergy: 0.2,
  },
  texture: { kind: "none", voice: null, baseMidi: 0, chance: 0 },
  pad: { voice: "organ", size: 4, velocity: 0.36, minimumEnergy: 0.25 },
  counter: {
    voice: "vibes",
    lowMidi: 64,
    highMidi: 88,
    chance: 0.65,
    steps: [3, 7, 10, 14, 2, 6],
    lengthSteps: [2, 3, 4, 6],
    minimumEnergy: 0.25,
  },
  variants: {
    chordVoices: ["epiano", "rhodes", "vibes", "organ"],
    melodyVoices: ["epiano", "vibes", "softLead", "kalimba", "rhodes"],
    bassVoices: ["upright", "subBass"],
    padVoices: ["strings", "organ", "pad"],
    counterVoices: ["vibes", "kalimba", "bell"],
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
      [
        {
          voice: "rim",
          steps: [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
        },
        {
          voice: "shaker",
          steps: [
            0.8, 0, 0.6, 0, 0.8, 0, 0.6, 0, 0.8, 0, 0.6, 0, 0.8, 0, 0.6, 0,
          ],
        },
        {
          voice: "kick",
          steps: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        },
        {
          voice: "hat",
          steps: [0, 0, 0, 0, 0.7, 0, 0, 0, 0, 0, 0, 0, 0.7, 0, 0, 0],
        },
      ],
      [
        {
          voice: "ride",
          steps: [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0],
        },
        {
          voice: "shaker",
          steps: [
            0.5, 0.3, 0.5, 0.3, 0.5, 0.3, 0.5, 0.3, 0.5, 0.3, 0.5, 0.3, 0.5,
            0.3, 0.5, 0.3,
          ],
        },
        {
          voice: "kick",
          steps: [0.6, 0, 0, 0, 0, 0, 0, 0, 0.4, 0, 0, 0, 0, 0, 0.3, 0],
        },
        {
          voice: "rim",
          steps: [0, 0, 0, 0, 0.4, 0, 0, 0, 0, 0, 0, 0, 0.4, 0, 0, 0],
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
