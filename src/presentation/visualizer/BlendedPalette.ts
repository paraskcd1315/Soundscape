import type { LayerKind } from "../../domain/model/LayerKind";
import type { RgbColor } from "./RgbColor";

export interface BlendedPalette {
  top: RgbColor;
  bottom: RgbColor;
  accents: Record<LayerKind, RgbColor>;
}
