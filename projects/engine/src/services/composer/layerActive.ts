import type { LayerKind } from "../../models/LayerKind";
import { createRng } from "../../utils/random/createRng";
import type { FormPosition } from "./types/FormPosition";
import { BARS_PER_DECISION } from "./constants/layerActive.constants";

export function layerActive(
  seed: number,
  form: FormPosition,
  layer: LayerKind,
  barIndex: number,
): boolean {
  const mask = form.plan.mask[layer];
  if (mask >= 1) return true;
  if (mask <= 0) return false;
  return createRng(
    seed,
    "mask",
    layer,
    Math.floor(barIndex / BARS_PER_DECISION),
  ).chance(mask);
}
