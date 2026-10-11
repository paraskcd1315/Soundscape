import type { Settings } from "../../models/Settings";
import { STYLE_IDS } from "../../constants/styleIds.constants";
import type { StyleId } from "../../models/StyleId";
import { VISUALIZER_MODE_IDS } from "../../constants/visualizerModeIds.constants";
import { STYLES } from "../../genres/constants/styleCatalog.constants";
import { defaultSettingsFor } from "./defaultSettingsFor";
import { SETTINGS_METRICS } from "./constants/settings.constants";
import { isRecord, numberOr, sanitizeLayers } from "./utils/sanitize.util";

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
