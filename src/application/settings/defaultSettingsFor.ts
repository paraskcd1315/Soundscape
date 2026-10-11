import type { LayerKind } from "../../domain/model/LayerKind";
import { LAYER_KINDS } from "../../domain/model/LayerKind";
import type { LayerMix } from "../../domain/model/LayerMix";
import type { Settings } from "../../domain/model/Settings";
import type { StyleId } from "../../domain/model/StyleId";
import { STYLES } from "../../styles/styleCatalog";
import { SETTINGS_METRICS } from "./settingsMetrics";

function defaultLayers(): Record<LayerKind, LayerMix> {
  const layers = {} as Record<LayerKind, LayerMix>;
  for (const kind of LAYER_KINDS) {
    layers[kind] = {
      level: SETTINGS_METRICS.defaultLayerLevels[kind],
      muted: false,
    };
  }
  return layers;
}

export function defaultSettingsFor(
  styleId: StyleId,
  seed: number = SETTINGS_METRICS.defaultSeed,
): Settings {
  const style = STYLES[styleId];
  return {
    styleId,
    seed,
    tempo: style.defaultTempo,
    keyRoot: SETTINGS_METRICS.defaultKeyRoot,
    scaleId: style.defaultScaleId,
    energy: SETTINGS_METRICS.defaultEnergy,
    density: SETTINGS_METRICS.defaultDensity,
    complexity: SETTINGS_METRICS.defaultComplexity,
    variation: SETTINGS_METRICS.defaultVariation,
    swing: style.defaultSwing,
    humanize: SETTINGS_METRICS.defaultHumanize,
    brightness: style.defaultBrightness,
    reverb: style.defaultReverb,
    masterVolume: SETTINGS_METRICS.defaultMasterVolume,
    layers: defaultLayers(),
    visualizerMode: "radial",
    visualizerIntensity: SETTINGS_METRICS.defaultVisualizerIntensity,
  };
}
