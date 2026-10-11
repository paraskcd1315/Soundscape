export const SCALE_IDS = [
  'major',
  'minor',
  'dorian',
  'phrygian',
  'lydian',
  'mixolydian',
  'majorPentatonic',
  'minorPentatonic',
] as const;

export type ScaleId = (typeof SCALE_IDS)[number];
