import type { StyleDefinition } from "../../../models/StyleDefinition";
import { ambientForm } from "../forms/ambientForm";
import { ambientPatterns } from "../patterns/ambientPatterns";
import { ambientSpace } from "../spaces.constants";

export const ambientStyle: StyleDefinition = {
  id: "ambient",
  tempoRange: { min: 50, max: 85 },
  defaultTempo: 64,
  swingRange: { min: 0, max: 0 },
  defaultSwing: 0,
  humanizeScale: 1.5,
  defaultReverb: 0.85,
  defaultBrightness: 0.55,
  ducking: false,
  scaleIds: ["dorian", "lydian", "majorPentatonic", "minor"],
  defaultScaleId: "dorian",
  progressions: [
    {
      barsPerChord: 4,
      chords: [
        { degree: 0, size: 5 },
        { degree: 3, size: 4 },
      ],
    },
    {
      barsPerChord: 2,
      chords: [
        { degree: 5, size: 4 },
        { degree: 3, size: 5 },
        { degree: 0, size: 5 },
        { degree: 4, size: 4 },
      ],
    },
    {
      barsPerChord: 2,
      chords: [
        { degree: 0, size: 4 },
        { degree: 6, size: 4 },
        { degree: 5, size: 4 },
        { degree: 4, size: 5 },
      ],
    },
    {
      barsPerChord: 2,
      chords: [
        { degree: 0, size: 4 },
        { degree: 3, size: 4 },
        { degree: 5, size: 4 },
        { degree: 4, size: 4 },
      ],
    },
    {
      barsPerChord: 4,
      chords: [
        { degree: 0, size: 5 },
        { degree: 5, size: 4 },
      ],
    },
    {
      barsPerChord: 2,
      chords: [
        { degree: 0, size: 4 },
        { degree: 2, size: 4 },
        { degree: 3, size: 5 },
        { degree: 0, size: 4 },
      ],
    },
  ],
  drums: null,
  bass: {
    voice: "subBass",
    baseMidi: 36,
    minimumEnergy: 0.1,
    patterns: [[{ step: 0, interval: "root", lengthSteps: 16, weight: 1 }]],
  },
  chords: {
    voice: "pad",
    rhythm: "held",
    centerMidi: 60,
    simpleSize: 4,
    richSize: 5,
    stabSteps: [],
    arpStepLength: 4,
    velocity: 0.7,
  },
  melody: {
    voice: "feltPiano",
    baseMidi: 69,
    lowMidi: 62,
    highMidi: 84,
    restChance: 0.6,
    minimumNotes: 2,
    maximumNotes: 4,
    noteLengthSteps: [8, 12, 16],
    stepBias: 0.75,
    minimumEnergy: 0.1,
    velocityScale: 0.55,
  },
  texture: { kind: "bells", voice: "bell", baseMidi: 84, chance: 0.4 },
  pad: { voice: "strings", size: 5, velocity: 0.4, minimumEnergy: 0.1 },
  counter: {
    voice: "bell",
    lowMidi: 67,
    highMidi: 88,
    chance: 0.3,
    steps: [0, 4, 8, 12],
    lengthSteps: [6, 8],
    minimumEnergy: 0.2,
    velocityScale: 0.6,
  },
  variants: {
    chordVoices: ["pad", "strings", "organ", "choir"],
    melodyVoices: ["feltPiano", "feltPiano", "bell", "vibes"],
    bassVoices: ["subBass"],
    padVoices: ["strings", "pad", "choir"],
    counterVoices: ["bell", "feltPiano"],
    stabSteps: [[0]],
    chordCenterShifts: [-3, 0, 3],
    drumKits: [],
  },
  patterns: ambientPatterns,
  form: ambientForm,
  space: ambientSpace,
  palette: {
    backgroundTop: "#04101f",
    backgroundBottom: "#0b3a46",
    accents: {
      drums: "#7fd6e6",
      bass: "#2f7fa8",
      chords: "#4fb7c9",
      melody: "#b8f0ff",
      texture: "#e5f9ff",
      pad: "#1f6f8f",
      counter: "#cdeeff",
    },
  },
};
