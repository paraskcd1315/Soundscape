import type { LayerKind } from "../../models/LayerKind";

export interface SectionOptions {
  mask?: Partial<Record<LayerKind, number>>;
  energyShift?: number;
  riserAtEnd?: boolean;
  impactAtStart?: boolean;
}
