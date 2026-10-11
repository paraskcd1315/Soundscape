import { STYLES } from "@soundscape/engine/genres/constants/styleCatalog.constants";
import type { NumericRange } from "@soundscape/engine/models/NumericRange";
import type { StyleId } from "@soundscape/engine/models/StyleId";
import type { SoundSettingKey } from "../types/SoundSettingKey";

export function sliderRange(
  key: SoundSettingKey,
  styleId: StyleId,
): NumericRange {
  const style = STYLES[styleId];
  if (key === "tempo") return style.tempoRange;
  if (key === "swing") return style.swingRange;
  return { min: 0, max: 1 };
}
