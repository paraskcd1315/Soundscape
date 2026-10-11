import type { Preset } from "@soundscape/engine/models/Preset";
import type { PresetRepository } from "@soundscape/engine/services/presets/types/PresetRepository";

export class MemoryPresetRepository implements PresetRepository {
  saved: Preset[] = [];

  load(): Preset[] {
    return this.saved;
  }

  save(presets: readonly Preset[]): void {
    this.saved = [...presets];
  }
}
