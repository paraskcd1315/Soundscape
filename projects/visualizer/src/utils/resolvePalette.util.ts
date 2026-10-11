import { LAYER_KINDS } from "@soundscape/engine/constants/layerKinds.constants";
import type { LayerKind } from "@soundscape/engine/models/LayerKind";
import type { StylePalette } from "@soundscape/engine/models/StylePalette";
import type { VisualizerThemeId } from "@soundscape/engine/models/VisualizerThemeId";
import {
  CUSTOM_BACKGROUND_BASE,
  CUSTOM_BACKGROUND_DARKNESS,
  THEME_PALETTES,
} from "../constants/themes.constants";
import { mixHex } from "./colorMath.util";

export function customPalette(colors: readonly [string, string]): StylePalette {
  const [first, second] = colors;
  const accents = {} as Record<LayerKind, string>;
  LAYER_KINDS.forEach((kind, index) => {
    accents[kind] = mixHex(first, second, index / (LAYER_KINDS.length - 1));
  });
  return {
    backgroundTop: mixHex(
      first,
      CUSTOM_BACKGROUND_BASE,
      CUSTOM_BACKGROUND_DARKNESS + 0.08,
    ),
    backgroundBottom: mixHex(
      second,
      CUSTOM_BACKGROUND_BASE,
      CUSTOM_BACKGROUND_DARKNESS,
    ),
    accents,
  };
}

export function resolvePalette(
  theme: VisualizerThemeId,
  colors: readonly [string, string],
  stylePalette: StylePalette,
): StylePalette {
  if (theme === "style") return stylePalette;
  if (theme === "custom") return customPalette(colors);
  return THEME_PALETTES[theme];
}
