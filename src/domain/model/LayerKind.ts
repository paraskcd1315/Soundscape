export const LAYER_KINDS = [
  "drums",
  "bass",
  "chords",
  "pad",
  "melody",
  "counter",
  "texture",
] as const;

export type LayerKind = (typeof LAYER_KINDS)[number];
