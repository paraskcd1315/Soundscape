import { t } from "../i18n/t";
import type { SliderDefinition } from "./SliderDefinition";

export function formatSliderValue(
  definition: Pick<SliderDefinition, "unit">,
  value: number,
): string {
  return definition.unit === "bpm"
    ? t("tempoUnit", Math.round(value))
    : t("percent", Math.round(value * 100));
}
