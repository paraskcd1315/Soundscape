import type { StylePalette } from "@soundscape/engine/models/StylePalette";
import type { PresetThemeId } from "../types/PresetThemeId";

export const THEME_PALETTES: Readonly<Record<PresetThemeId, StylePalette>> = {
  aurora: {
    backgroundTop: "#050b1a",
    backgroundBottom: "#0b2a2f",
    accents: {
      drums: "#7cffcb",
      bass: "#2b7bff",
      chords: "#45d6c6",
      pad: "#3a2f9f",
      melody: "#b9ff8a",
      counter: "#7ce8ff",
      texture: "#e6fff4",
    },
  },
  sunset: {
    backgroundTop: "#1a0710",
    backgroundBottom: "#3d1424",
    accents: {
      drums: "#ffb04a",
      bass: "#ff5e62",
      chords: "#ff8a65",
      pad: "#7d2b5a",
      melody: "#ffd36e",
      counter: "#ff9fb2",
      texture: "#fff0d9",
    },
  },
  neon: {
    backgroundTop: "#07021a",
    backgroundBottom: "#1b0436",
    accents: {
      drums: "#ff2fd6",
      bass: "#7a2bff",
      chords: "#2bd9ff",
      pad: "#4a0f8a",
      melody: "#e8ff2b",
      counter: "#ff7ae0",
      texture: "#ffffff",
    },
  },
  ocean: {
    backgroundTop: "#020c18",
    backgroundBottom: "#04253a",
    accents: {
      drums: "#7ad7ff",
      bass: "#0f6fb0",
      chords: "#2fb6d6",
      pad: "#123a6b",
      melody: "#b5f1ff",
      counter: "#66e0d0",
      texture: "#e8fbff",
    },
  },
  forest: {
    backgroundTop: "#06110a",
    backgroundBottom: "#13281a",
    accents: {
      drums: "#c9e86b",
      bass: "#3f8f4f",
      chords: "#7fbf6a",
      pad: "#2c4f2e",
      melody: "#f1e08a",
      counter: "#a7d98b",
      texture: "#f4ffe8",
    },
  },
  mono: {
    backgroundTop: "#0a0a0b",
    backgroundBottom: "#1c1c1f",
    accents: {
      drums: "#ffffff",
      bass: "#8a8a90",
      chords: "#bdbdc4",
      pad: "#4a4a52",
      melody: "#f0f0f4",
      counter: "#d4d4da",
      texture: "#ffffff",
    },
  },
};

export const CUSTOM_BACKGROUND_DARKNESS = 0.86;
export const CUSTOM_BACKGROUND_BASE = "#050507";
