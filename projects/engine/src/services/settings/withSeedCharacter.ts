import type { Settings } from "../../models/Settings";
import { createRng } from "../../utils/random/createRng";
import { STYLES } from "../../genres/constants/styleCatalog.constants";
import { sanitizeSettings } from "./sanitizeSettings";
import { SETTINGS_METRICS } from "./constants/settings.constants";

export function withSeedCharacter(settings: Settings, seed: number): Settings {
  const style = STYLES[settings.styleId];
  const rng = createRng(seed, "character", style.id);
  const centred = (low: number, high: number): number =>
    low + ((rng.next() + rng.next()) / 2) * (high - low);
  return sanitizeSettings(
    {
      ...settings,
      seed,
      keyRoot: rng.int(0, SETTINGS_METRICS.keyCount - 1),
      scaleId: rng.pick(style.scaleIds),
      tempo: Math.round(centred(style.tempoRange.min, style.tempoRange.max)),
      swing: centred(style.swingRange.min, style.swingRange.max),
      energy: centred(0.3, 0.85),
      density: centred(0.3, 0.8),
      complexity: centred(0.2, 0.85),
      variation: centred(0.25, 0.8),
    },
    style.id,
  );
}
