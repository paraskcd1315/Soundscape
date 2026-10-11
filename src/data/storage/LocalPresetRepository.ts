import type { PresetRepository } from "../../application/presets/PresetRepository";
import { sanitizePreset } from "../../application/presets/sanitizePreset";
import type { Preset } from "../../domain/model/Preset";
import type { SafeStorage } from "./SafeStorage";
import { STORAGE_KEYS } from "./storageKeys";

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
