import { LAYER_KINDS } from "../../../constants/layerKinds.constants";
import type { LayerKind } from "../../../models/LayerKind";
import type { LayerMix } from "../../../models/LayerMix";
import type { Preset } from "../../../models/Preset";
import type { Settings } from "../../../models/Settings";
import type { StyleId } from "../../../models/StyleId";
import { defaultSettingsFor } from "../../settings/defaultSettingsFor";
import { sanitizeSettings } from "../../settings/sanitizeSettings";
import { SETTINGS_METRICS } from "../../settings/constants/settings.constants";
import type { LayerLevels } from "../types/LayerLevels";

export function layersWith(
  base: Record<LayerKind, LayerMix>,
  levels: LayerLevels,
): Record<LayerKind, LayerMix> {
  const layers = {} as Record<LayerKind, LayerMix>;
  for (const kind of LAYER_KINDS)
    layers[kind] = { level: levels[kind] ?? base[kind].level, muted: false };
  return layers;
}

export function builtin(
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
