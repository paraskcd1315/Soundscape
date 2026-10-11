import { LAYER_KINDS } from "../../constants/layerKinds.constants";
import type { LayerKind } from "../../models/LayerKind";
import type { SectionPlan } from "../../models/SectionPlan";
import type { SectionOptions } from "../types/SectionOptions";

export function section(
  name: string,
  bars: number,
  options: SectionOptions = {},
): SectionPlan {
  const mask = {} as Record<LayerKind, number>;
  for (const kind of LAYER_KINDS) mask[kind] = options.mask?.[kind] ?? 1;
  return {
    name,
    bars,
    mask,
    energyShift: options.energyShift ?? 0,
    riserAtEnd: options.riserAtEnd ?? false,
    impactAtStart: options.impactAtStart ?? false,
  };
}
