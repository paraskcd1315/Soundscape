import { LAYER_KINDS } from "../../domain/model/LayerKind";
import type { LayerKind } from "../../domain/model/LayerKind";
import type { SectionPlan } from "../../domain/model/SectionPlan";

export interface SectionOptions {
  mask?: Partial<Record<LayerKind, number>>;
  energyShift?: number;
  riserAtEnd?: boolean;
  impactAtStart?: boolean;
}

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
