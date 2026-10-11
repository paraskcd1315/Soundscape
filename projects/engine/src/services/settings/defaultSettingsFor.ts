import type { LayerKind } from "../../models/LayerKind";
import { LAYER_KINDS } from "../../constants/layerKinds.constants";
import type { LayerMix } from "../../models/LayerMix";
import type { Settings } from "../../models/Settings";
import type { StyleId } from "../../models/StyleId";
import { STYLES } from "../../genres/constants/styleCatalog.constants";
import { SETTINGS_METRICS } from "./constants/settings.constants";

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
