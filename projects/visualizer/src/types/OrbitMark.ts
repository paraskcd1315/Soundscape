import type { LayerKind } from "@soundscape/engine/models/LayerKind";

export interface OrbitMark {
  layer: LayerKind;
  angle: number;
  offset: number;
  size: number;
  life: number;
  maxLife: number;
}
