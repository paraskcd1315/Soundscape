import type { LayerKind } from "@soundscape/engine/models/LayerKind";

export interface OrbitMark {
  layer: LayerKind;
  angle: number;
  radiusRatio: number;
  size: number;
  life: number;
}
