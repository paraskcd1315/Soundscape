import type { Settings } from "../../models/Settings";
import type { StyleId } from "../../models/StyleId";
import { clamp } from "../../utils/theory/clamp";
import { STYLES } from "../../genres/constants/styleCatalog.constants";

export function withStyle(settings: Settings, styleId: StyleId): Settings {
  const style = STYLES[styleId];
  const keepsScale = style.scaleIds.includes(settings.scaleId);
  return {
    ...settings,
    styleId,
    tempo: clamp(
      style.defaultTempo,
      style.tempoRange.min,
      style.tempoRange.max,
    ),
    scaleId: keepsScale ? settings.scaleId : style.defaultScaleId,
    swing: style.defaultSwing,
    brightness: style.defaultBrightness,
    reverb: style.defaultReverb,
  };
}
