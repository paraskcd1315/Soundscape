export const LAYER_KINDS = ['drums', 'bass', 'chords', 'melody', 'texture'] as const;

export type LayerKind = (typeof LAYER_KINDS)[number];
