import type { Preset } from "../../../models/Preset";

export interface PresetRepository {
  load(): Preset[];
  save(presets: readonly Preset[]): void;
}
