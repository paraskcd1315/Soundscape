import type { StyleDefinition } from "../domain/model/StyleDefinition";

export const lofiStyle: StyleDefinition = {
  id: "lofi",
  tempoRange: { min: 60, max: 95 },
  defaultTempo: 78,
  swingRange: { min: 0.3, max: 0.85 },
  defaultSwing: 0.55,
  humanizeScale: 2.2,
  defaultReverb: 0.35,
  defaultBrightness: 0.4,
  ducking: false,
  scaleIds: ["dorian", "minor", "minorPentatonic"],
  defaultScaleId: "dorian",
  progressions: [
    {
      barsPerChord: 1,
      chords: [
        { degree: 0, size: 5 },
        { degree: 3, size: 4 },
        { degree: 5, size: 4 },
        { degree: 4, size: 4 },
      ],
    },
    {
      barsPerChord: 2,
      chords: [
        { degree: 0, size: 4 },
        { degree: 5, size: 4 },
        { degree: 2, size: 4 },
        { degree: 3, size: 4 },
      ],
    },
    {
      barsPerChord: 1,
      chords: [
        { degree: 1, size: 4 },
        { degree: 4, size: 4 },
        { degree: 0, size: 5 },
        { degree: 0, size: 4 },
      ],
    },
  ],
  drums: {
    fillChance: 0.3,
    fillVoice: "snare",
    minimumEnergy: 0.15,
    grids: [
      {
        voice: "kick",
        steps: [1, 0, 0, 0, 0, 0, 0, 0.3, 0, 0.5, 1, 0, 0, 0, 0, 0.2],
      },
      {
        voice: "snare",
        steps: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0.15, 1, 0, 0, 0.2],
      },
      {
        voice: "hat",
        steps: [
          0.9, 0, 0.8, 0, 0.9, 0, 0.8, 0.3, 0.9, 0, 0.8, 0, 0.9, 0, 0.8, 0.3,
        ],
      },
    ],
  },
  bass: {
    voice: "subBass",
    baseMidi: 36,
    minimumEnergy: 0.1,
    patterns: [
      [
        { step: 0, interval: "root", lengthSteps: 6, weight: 1 },
        { step: 10, interval: "root", lengthSteps: 4, weight: 0.8 },
      ],
      [
        { step: 0, interval: "root", lengthSteps: 4, weight: 1 },
        { step: 6, interval: "fifth", lengthSteps: 2, weight: 0.7 },
        { step: 10, interval: "root", lengthSteps: 4, weight: 0.8 },
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
    velocity: 0.6,
  },
  melody: {
    voice: "epiano",
    baseMidi: 72,
    lowMidi: 64,
    highMidi: 86,
    restChance: 0.45,
    minimumNotes: 3,
    maximumNotes: 5,
    noteLengthSteps: [2, 3, 4, 6],
    stepBias: 0.75,
    minimumEnergy: 0.25,
  },
  texture: { kind: "crackle", voice: "crackle", baseMidi: 0, chance: 0.8 },
  palette: {
    backgroundTop: "#1b0f12",
    backgroundBottom: "#4a2230",
    accents: {
      drums: "#ffb36b",
      bass: "#d9695f",
      chords: "#f4a6a0",
      melody: "#ffd7a8",
      texture: "#fff1de",
    },
  },
};
