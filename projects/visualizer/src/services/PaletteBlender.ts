import { LAYER_KINDS } from "@soundscape/engine/constants/layerKinds.constants";
import type { LayerKind } from "@soundscape/engine/models/LayerKind";
import type { StylePalette } from "@soundscape/engine/models/StylePalette";
import { clamp } from "@soundscape/engine/utils/theory/clamp";
import type { BlendedPalette } from "../types/BlendedPalette";
import { mixRgb, parseHex } from "../utils/colorMath.util";
import { VISUALIZER_METRICS } from "../constants/visualizer.constants";

function toBlended(palette: StylePalette): BlendedPalette {
  const accents = {} as BlendedPalette["accents"];
  for (const kind of LAYER_KINDS)
    accents[kind] = parseHex(palette.accents[kind]);
  return {
    top: parseHex(palette.backgroundTop),
    bottom: parseHex(palette.backgroundBottom),
    accents,
  };
}

export class PaletteBlender {
  private current: BlendedPalette;
  private target: BlendedPalette;

  constructor(initial: StylePalette) {
    this.current = toBlended(initial);
    this.target = toBlended(initial);
  }

  setTarget(palette: StylePalette): void {
    this.target = toBlended(palette);
  }

  step(deltaSeconds: number): BlendedPalette {
    const amount = clamp(
      deltaSeconds * VISUALIZER_METRICS.paletteBlendPerSecond,
      0,
      1,
    );
    const accents = {} as Record<LayerKind, BlendedPalette["top"]>;
    for (const kind of LAYER_KINDS)
      accents[kind] = mixRgb(
        this.current.accents[kind],
        this.target.accents[kind],
        amount,
      );
    this.current = {
      top: mixRgb(this.current.top, this.target.top, amount),
      bottom: mixRgb(this.current.bottom, this.target.bottom, amount),
      accents,
    };
    return this.current;
  }
}
