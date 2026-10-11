import type { StyleDefinition } from "../domain/model/StyleDefinition";

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
  palette: {
    backgroundTop: "#1a1004",
    backgroundBottom: "#4a1220",
    accents: {
      drums: "#e8c25a",
      bass: "#b5453a",
      chords: "#f0a24b",
      melody: "#ffe08a",
      texture: "#fff4cf",
    },
  },
};
