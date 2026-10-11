import { LAYER_KINDS } from "../../domain/model/LayerKind";
import type { LayerKind } from "../../domain/model/LayerKind";
import type { LayerMix } from "../../domain/model/LayerMix";
import type { Settings } from "../../domain/model/Settings";
import { STYLE_IDS } from "../../domain/model/StyleId";
import type { StyleId } from "../../domain/model/StyleId";
import { VISUALIZER_MODE_IDS } from "../../domain/model/VisualizerModeId";
import { clamp } from "../../domain/theory/clamp";
import { STYLES } from "../../styles/styleCatalog";
import { defaultSettingsFor } from "./defaultSettingsFor";
import { SETTINGS_METRICS } from "./settingsMetrics";

type Loose = Record<string, unknown>;

function isRecord(value: unknown): value is Loose {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function numberOr(
  value: unknown,
  fallback: number,
  low: number,
  high: number,
): number {
  return typeof value === "number" && Number.isFinite(value)
    ? clamp(value, low, high)
    : fallback;
}

function sanitizeLayers(
  raw: unknown,
  fallback: Record<LayerKind, LayerMix>,
): Record<LayerKind, LayerMix> {
  const layers = {} as Record<LayerKind, LayerMix>;
  const source = isRecord(raw) ? raw : {};
  for (const kind of LAYER_KINDS) {
    const entry = source[kind];
    const base = fallback[kind];
    layers[kind] = isRecord(entry)
      ? {
          level: numberOr(entry.level, base.level, 0, 1),
          muted: entry.muted === true,
        }
      : base;
  }
  return layers;
}

export function sanitizeSettings(
  raw: unknown,
  fallbackStyle: StyleId = "lofi",
): Settings {
  const source = isRecord(raw) ? raw : {};
  const styleId = STYLE_IDS.includes(source.styleId as StyleId)
    ? (source.styleId as StyleId)
    : fallbackStyle;
  const style = STYLES[styleId];
  const base = defaultSettingsFor(styleId);
  const scaleId = style.scaleIds.includes(source.scaleId as never)
    ? (source.scaleId as Settings["scaleId"])
    : base.scaleId;
  const visualizerMode = VISUALIZER_MODE_IDS.includes(
    source.visualizerMode as never,
  )
    ? (source.visualizerMode as Settings["visualizerMode"])
    : base.visualizerMode;
  const seed =
    typeof source.seed === "number" && Number.isFinite(source.seed)
      ? Math.floor(source.seed) >>> 0
      : base.seed;

  return {
    styleId,
    seed,
    tempo: numberOr(
      source.tempo,
      base.tempo,
      style.tempoRange.min,
      style.tempoRange.max,
    ),
    keyRoot: Math.round(
      numberOr(source.keyRoot, base.keyRoot, 0, SETTINGS_METRICS.keyCount - 1),
    ),
    scaleId,
    energy: numberOr(source.energy, base.energy, 0, 1),
    density: numberOr(source.density, base.density, 0, 1),
    complexity: numberOr(source.complexity, base.complexity, 0, 1),
    variation: numberOr(source.variation, base.variation, 0, 1),
    swing: numberOr(
      source.swing,
      base.swing,
      style.swingRange.min,
      style.swingRange.max,
    ),
    humanize: numberOr(source.humanize, base.humanize, 0, 1),
    brightness: numberOr(source.brightness, base.brightness, 0, 1),
    reverb: numberOr(source.reverb, base.reverb, 0, 1),
    masterVolume: numberOr(source.masterVolume, base.masterVolume, 0, 1),
    layers: sanitizeLayers(source.layers, base.layers),
    visualizerMode,
    visualizerIntensity: numberOr(
      source.visualizerIntensity,
      base.visualizerIntensity,
      0,
      1,
    ),
  };
}
