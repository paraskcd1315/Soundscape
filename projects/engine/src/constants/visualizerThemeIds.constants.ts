export const VISUALIZER_THEME_IDS = [
  "style",
  "aurora",
  "sunset",
  "neon",
  "ocean",
  "forest",
  "mono",
  "custom",
] as const;

export const DEFAULT_CUSTOM_COLORS: readonly [string, string] = [
  "#7c5cff",
  "#2ee6c8",
];

export const HEX_COLOR_PATTERN = /^#[0-9a-f]{6}$/i;
