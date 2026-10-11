import { STYLES } from "@soundscape/engine/genres/constants/styleCatalog.constants";
import type { Settings } from "@soundscape/engine/models/Settings";
import type { VisualizerThemeId } from "@soundscape/engine/models/VisualizerThemeId";
import { resolvePalette } from "@soundscape/visualizer/utils/resolvePalette.util";

export function themeSwatchColors(
  theme: VisualizerThemeId,
  settings: Settings,
): readonly string[] {
  const palette = resolvePalette(
    theme,
    settings.visualizerColors,
    STYLES[settings.styleId].palette,
  );
  return [palette.accents.drums, palette.accents.chords, palette.accents.bass];
}
