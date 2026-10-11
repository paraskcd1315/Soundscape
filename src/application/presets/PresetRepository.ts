import type { Preset } from "../../domain/model/Preset";

export interface PresetRepository {
  load(): Preset[];
  save(presets: readonly Preset[]): void;
}
