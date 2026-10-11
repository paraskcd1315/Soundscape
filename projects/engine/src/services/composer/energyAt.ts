import { createRng } from "../../utils/random/createRng";
import { clamp, lerp, smoothstep } from "../../utils/theory/clamp";
import type { Settings } from "../../models/Settings";
import { COMPOSER_METRICS } from "./constants/composer.constants";

function anchorValue(seed: number, anchor: number): number {
  return createRng(seed, "energy", anchor).next() * 2 - 1;
}

export function energyAt(settings: Settings, barIndex: number): number {
  const position = barIndex / COMPOSER_METRICS.energyAnchorBars;
  const anchor = Math.floor(position);
  const curve = lerp(
    anchorValue(settings.seed, anchor),
    anchorValue(settings.seed, anchor + 1),
    smoothstep(position - anchor),
  );
  const amplitude =
    COMPOSER_METRICS.energyAmplitude * (0.25 + 0.75 * settings.variation);
  return clamp(settings.energy + curve * amplitude, 0, 1);
}
