import type { OrbitPlanet } from "../../../types/OrbitPlanet";

export const ORBIT_METRICS = {
  coreRatio: 0.07,
  innerPeriodSeconds: 9,
  reducedMotionSpeed: 0.3,
  planetBaseRatio: 0.011,
  planetLevelRatio: 0.018,
  planetFlashRatio: 0.012,
  planetGlowScale: 3.2,
  flashDecayPerSecond: 3.5,
  trailLife: 1.4,
  markLimit: 220,
  trailArcSegments: 20,
  trailArcRadians: 1.1,
  trailArcWidthRatio: 0.0035,
  starCount: 160,
  starReferenceSide: 600,
  viewTilt: 0.45,
  depthScale: 0.18,
  fogDriftPerSecond: 0.05,
  fullTurn: Math.PI * 2,
  goldenAngle: Math.PI * (3 - Math.sqrt(5)),
} as const;

export const ORBIT_PLANETS: readonly OrbitPlanet[] = [
  { layer: "bass", ringRatio: 0.13 },
  { layer: "chords", ringRatio: 0.18 },
  { layer: "pad", ringRatio: 0.23 },
  { layer: "melody", ringRatio: 0.28 },
  { layer: "counter", ringRatio: 0.33 },
  { layer: "texture", ringRatio: 0.38 },
  { layer: "drums", ringRatio: 0.43 },
];
