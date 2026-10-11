import type { LayerKind } from "./LayerKind";

export interface SectionPlan {
  name: string;
  bars: number;
  mask: Record<LayerKind, number>;
  energyShift: number;
  riserAtEnd: boolean;
  impactAtStart: boolean;
}
