import type { LayerKind } from "../../domain/model/LayerKind";
import { createRng } from "../../domain/random/createRng";
import type { FormPosition } from "./FormPosition";

const BARS_PER_DECISION = 2;

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
