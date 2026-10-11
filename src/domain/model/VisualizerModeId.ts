export const VISUALIZER_MODE_IDS = ['bars', 'radial', 'flow'] as const;

export type VisualizerModeId = (typeof VISUALIZER_MODE_IDS)[number];
