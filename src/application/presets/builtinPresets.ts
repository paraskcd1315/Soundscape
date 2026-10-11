import { LAYER_KINDS } from "../../domain/model/LayerKind";
import type { LayerKind } from "../../domain/model/LayerKind";
import type { LayerMix } from "../../domain/model/LayerMix";
import type { Preset } from "../../domain/model/Preset";
import type { Settings } from "../../domain/model/Settings";
import type { StyleId } from "../../domain/model/StyleId";
import { defaultSettingsFor } from "../settings/defaultSettingsFor";
import { sanitizeSettings } from "../settings/sanitizeSettings";
import { SETTINGS_METRICS } from "../settings/settingsMetrics";

type LayerLevels = Partial<Record<LayerKind, number>>;

function layersWith(
  base: Record<LayerKind, LayerMix>,
  levels: LayerLevels,
): Record<LayerKind, LayerMix> {
  const layers = {} as Record<LayerKind, LayerMix>;
  for (const kind of LAYER_KINDS)
    layers[kind] = { level: levels[kind] ?? base[kind].level, muted: false };
  return layers;
}

function builtin(
  id: string,
  name: string,
  styleId: StyleId,
  seed: number,
  overrides: Partial<Omit<Settings, "layers">>,
  levels: LayerLevels = {},
): Preset {
  const base = defaultSettingsFor(styleId, seed);
  return {
    schemaVersion: SETTINGS_METRICS.presetSchemaVersion,
    id: `builtin-${id}`,
    name,
    origin: "builtin",
    settings: sanitizeSettings(
      { ...base, ...overrides, layers: layersWith(base.layers, levels) },
      styleId,
    ),
  };
}

export const BUILTIN_PRESETS: readonly Preset[] = [
  builtin(
    "ambient-deep-drift",
    "Deep Drift",
    "ambient",
    1001,
    {
      keyRoot: 2,
      scaleId: "lydian",
      tempo: 56,
      energy: 0.3,
      density: 0.3,
      complexity: 0.6,
      variation: 0.3,
      reverb: 0.95,
      brightness: 0.45,
    },
    {
      bass: 0.6,
      chords: 0.5,
      pad: 0.85,
      melody: 0.5,
      counter: 0.5,
      texture: 0.7,
    },
  ),
  builtin("ambient-aurora", "Aurora", "ambient", 1002, {
    keyRoot: 7,
    scaleId: "dorian",
    tempo: 70,
    energy: 0.55,
    density: 0.5,
    brightness: 0.72,
    visualizerMode: "flow",
  }),
  builtin(
    "ambient-cathedral",
    "Cathedral",
    "ambient",
    1003,
    {
      keyRoot: 3,
      scaleId: "minor",
      tempo: 52,
      energy: 0.4,
      complexity: 0.8,
      variation: 0.5,
      reverb: 0.98,
      brightness: 0.35,
      visualizerMode: "radial",
    },
    { pad: 0.95, chords: 0.7, melody: 0.3, counter: 0.4 },
  ),
  builtin(
    "ambient-glass-garden",
    "Glass Garden",
    "ambient",
    1004,
    {
      keyRoot: 9,
      scaleId: "majorPentatonic",
      tempo: 78,
      energy: 0.5,
      density: 0.6,
      reverb: 0.7,
      brightness: 0.8,
      visualizerMode: "flow",
    },
    { melody: 0.85, counter: 0.9, pad: 0.45 },
  ),

  builtin(
    "lofi-rainy-study",
    "Rainy Study",
    "lofi",
    2001,
    {
      keyRoot: 9,
      scaleId: "dorian",
      tempo: 72,
      energy: 0.4,
      swing: 0.6,
      humanize: 0.7,
      brightness: 0.35,
    },
    { drums: 0.55, texture: 0.7 },
  ),
  builtin("lofi-late-night-bus", "Late Night Bus", "lofi", 2002, {
    keyRoot: 5,
    scaleId: "minor",
    tempo: 84,
    energy: 0.62,
    density: 0.6,
    swing: 0.5,
  }),
  builtin(
    "lofi-sunday-tape",
    "Sunday Tape",
    "lofi",
    2003,
    {
      keyRoot: 0,
      scaleId: "minorPentatonic",
      tempo: 66,
      energy: 0.3,
      swing: 0.75,
      humanize: 0.9,
      reverb: 0.5,
      brightness: 0.3,
    },
    { melody: 0.5, texture: 0.85, drums: 0.5 },
  ),
  builtin(
    "lofi-coffee-counter",
    "Coffee Counter",
    "lofi",
    2004,
    {
      keyRoot: 3,
      scaleId: "dorian",
      tempo: 90,
      energy: 0.7,
      density: 0.75,
      swing: 0.35,
      brightness: 0.5,
    },
    { melody: 0.8, counter: 0.7 },
  ),

  builtin("techno-warehouse", "Warehouse", "techno", 3001, {
    keyRoot: 0,
    scaleId: "minor",
    tempo: 128,
    energy: 0.72,
    variation: 0.5,
    brightness: 0.62,
    visualizerMode: "bars",
  }),
  builtin(
    "techno-dark-room",
    "Dark Room",
    "techno",
    3002,
    {
      keyRoot: 6,
      scaleId: "phrygian",
      tempo: 124,
      energy: 0.5,
      complexity: 0.6,
      brightness: 0.42,
    },
    { pad: 0.6, drums: 0.9 },
  ),
  builtin(
    "techno-acid-rain",
    "Acid Rain",
    "techno",
    3003,
    {
      keyRoot: 9,
      scaleId: "minor",
      tempo: 134,
      energy: 0.85,
      density: 0.8,
      complexity: 0.75,
      variation: 0.7,
      brightness: 0.78,
      visualizerMode: "flow",
    },
    { counter: 0.9, melody: 0.5 },
  ),
  builtin(
    "techno-deep-hypnosis",
    "Deep Hypnosis",
    "techno",
    3004,
    {
      keyRoot: 2,
      scaleId: "minorPentatonic",
      tempo: 122,
      energy: 0.45,
      density: 0.4,
      complexity: 0.3,
      variation: 0.2,
      reverb: 0.4,
      visualizerMode: "radial",
    },
    { chords: 0.5, melody: 0.4 },
  ),

  builtin("chiptune-level-one", "Level One", "chiptune", 4001, {
    keyRoot: 0,
    scaleId: "major",
    tempo: 140,
    energy: 0.7,
    visualizerMode: "bars",
  }),
  builtin(
    "chiptune-boss-rush",
    "Boss Rush",
    "chiptune",
    4002,
    {
      keyRoot: 9,
      scaleId: "minor",
      tempo: 160,
      energy: 0.9,
      complexity: 0.7,
      variation: 0.8,
    },
    { drums: 0.9, melody: 0.8 },
  ),
  builtin("chiptune-overworld", "Overworld", "chiptune", 4003, {
    keyRoot: 7,
    scaleId: "mixolydian",
    tempo: 124,
    energy: 0.55,
    density: 0.6,
    visualizerMode: "flow",
  }),
  builtin(
    "chiptune-pixel-lullaby",
    "Pixel Lullaby",
    "chiptune",
    4004,
    {
      keyRoot: 5,
      scaleId: "majorPentatonic",
      tempo: 112,
      energy: 0.35,
      density: 0.4,
      brightness: 0.6,
    },
    { drums: 0.4, bass: 0.6 },
  ),

  builtin("jazz-blue-hour", "Blue Hour", "jazz", 5001, {
    keyRoot: 2,
    scaleId: "dorian",
    tempo: 96,
    energy: 0.35,
    swing: 0.85,
  }),
  builtin("jazz-uptown", "Uptown", "jazz", 5002, {
    keyRoot: 7,
    scaleId: "mixolydian",
    tempo: 126,
    energy: 0.6,
    complexity: 0.7,
  }),
  builtin(
    "jazz-smoke-and-mirrors",
    "Smoke and Mirrors",
    "jazz",
    5003,
    {
      keyRoot: 0,
      scaleId: "minor",
      tempo: 84,
      energy: 0.3,
      swing: 0.7,
      complexity: 0.85,
      reverb: 0.55,
      brightness: 0.4,
    },
    { drums: 0.5, melody: 0.6 },
  ),
  builtin(
    "jazz-bebop-rush",
    "Bebop Rush",
    "jazz",
    5004,
    {
      keyRoot: 10,
      scaleId: "major",
      tempo: 148,
      energy: 0.8,
      density: 0.8,
      swing: 0.9,
      variation: 0.7,
      visualizerMode: "bars",
    },
    { melody: 0.85, counter: 0.7 },
  ),
];
