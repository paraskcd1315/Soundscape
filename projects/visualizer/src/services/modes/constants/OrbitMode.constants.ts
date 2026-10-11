import type { LayerKind } from "@soundscape/engine/models/LayerKind";

export const ORBIT_METRICS = {
  coreRatio: 0.07,
  bassRingRatio: 0.15,
  chordRingRatio: 0.23,
  melodyRingRatio: 0.31,
  drumRingRatio: 0.39,
  stepCount: 16,
  markLimit: 220,
  bassWaveSegments: 96,
  bassBandCount: 8,
  fogDriftPerSecond: 0.05,
  fullTurn: Math.PI * 2,
  topAngle: -Math.PI / 2,
  beatsPerBar: 4,
  lowestMidi: 36,
  midiSpan: 60,
} as const;

export const ORBIT_RING_FOR_LAYER: Readonly<Record<LayerKind, number>> = {
  drums: ORBIT_METRICS.drumRingRatio,
  bass: ORBIT_METRICS.bassRingRatio,
  chords: ORBIT_METRICS.chordRingRatio,
  pad: ORBIT_METRICS.chordRingRatio,
  melody: ORBIT_METRICS.melodyRingRatio,
  counter: ORBIT_METRICS.melodyRingRatio,
  texture: ORBIT_METRICS.drumRingRatio,
};

export const ORBIT_MARK_LIFE: Readonly<Record<LayerKind, number>> = {
  drums: 0.45,
  bass: 0.9,
  chords: 1.6,
  pad: 2.4,
  melody: 2.2,
  counter: 1.8,
  texture: 1.2,
};
