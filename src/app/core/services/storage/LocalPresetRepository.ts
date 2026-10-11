import type { PresetRepository } from "@soundscape/engine/services/presets/types/PresetRepository";
import { sanitizePreset } from "@soundscape/engine/services/presets/sanitizePreset";
import type { Preset } from "@soundscape/engine/models/Preset";
import type { SafeStorage } from "./SafeStorage";
import { STORAGE_KEYS } from "../../constants/storageKeys.constants";

export class LocalPresetRepository implements PresetRepository {
  constructor(private readonly storage: SafeStorage) {}

  load(): Preset[] {
    const text = this.storage.read(STORAGE_KEYS.presets);
    if (!text) return [];
    try {
      const parsed: unknown = JSON.parse(text);
      if (!Array.isArray(parsed)) return [];
      return parsed
        .map(sanitizePreset)
        .filter((preset): preset is Preset => preset !== null);
    } catch {
      return [];
    }
  }

  save(presets: readonly Preset[]): void {
    this.storage.write(STORAGE_KEYS.presets, JSON.stringify(presets));
  }
}
