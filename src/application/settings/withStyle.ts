import type { Settings } from "../../domain/model/Settings";
import type { StyleId } from "../../domain/model/StyleId";
import { clamp } from "../../domain/theory/clamp";
import { STYLES } from "../../styles/styleCatalog";

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
