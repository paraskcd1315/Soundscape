export const STYLE_IDS = ['ambient', 'lofi', 'techno', 'chiptune', 'jazz'] as const;

export type StyleId = (typeof STYLE_IDS)[number];
