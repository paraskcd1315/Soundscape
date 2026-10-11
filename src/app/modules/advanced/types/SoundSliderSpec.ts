import type { SoundSettingKey } from "./SoundSettingKey";

export interface SoundSliderSpec {
  key: SoundSettingKey;
  label: string;
  step: number;
}
