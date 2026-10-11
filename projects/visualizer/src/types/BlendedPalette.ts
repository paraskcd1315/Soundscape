import type { LayerKind } from "@soundscape/engine/models/LayerKind";
import type { RgbColor } from "./RgbColor";

export interface BlendedPalette {
  top: RgbColor;
  bottom: RgbColor;
  accents: Record<LayerKind, RgbColor>;
}
