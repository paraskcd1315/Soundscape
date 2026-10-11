import type { Settings } from "../../domain/model/Settings";
import type { StringKey } from "../i18n/en";

export type NumericSettingKey =
  | "tempo"
  | "energy"
  | "density"
  | "complexity"
  | "variation"
  | "swing"
  | "humanize"
  | "brightness"
  | "reverb"
  | "masterVolume";

export interface SliderDefinition {
  key: NumericSettingKey;
  label: StringKey;
  step: number;
  unit: "bpm" | "percent";
  settings?: Settings;
}
