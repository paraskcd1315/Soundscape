import type { ScaleDefinition } from "../models/ScaleDefinition";
import type { ScaleId } from "../models/ScaleId";

export const SCALES: Record<ScaleId, ScaleDefinition> = {
  major: {
    id: "major",
    intervals: [0, 2, 4, 5, 7, 9, 11],
    chordScaleId: "major",
  },
  minor: {
    id: "minor",
    intervals: [0, 2, 3, 5, 7, 8, 10],
    chordScaleId: "minor",
  },
  dorian: {
    id: "dorian",
    intervals: [0, 2, 3, 5, 7, 9, 10],
    chordScaleId: "dorian",
  },
  phrygian: {
    id: "phrygian",
    intervals: [0, 1, 3, 5, 7, 8, 10],
    chordScaleId: "phrygian",
  },
  lydian: {
    id: "lydian",
    intervals: [0, 2, 4, 6, 7, 9, 11],
    chordScaleId: "lydian",
  },
  mixolydian: {
    id: "mixolydian",
    intervals: [0, 2, 4, 5, 7, 9, 10],
    chordScaleId: "mixolydian",
  },
  majorPentatonic: {
    id: "majorPentatonic",
    intervals: [0, 2, 4, 7, 9],
    chordScaleId: "major",
  },
  minorPentatonic: {
    id: "minorPentatonic",
    intervals: [0, 3, 5, 7, 10],
    chordScaleId: "minor",
  },
  harmonicMinor: {
    id: "harmonicMinor",
    intervals: [0, 2, 3, 5, 7, 8, 11],
    chordScaleId: "harmonicMinor",
  },
};
