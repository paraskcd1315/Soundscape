import type { Preset } from "../../models/Preset";
import type { Settings } from "../../models/Settings";
import { sanitizeSettings } from "../settings/sanitizeSettings";
import { SETTINGS_METRICS } from "../settings/constants/settings.constants";
import { BUILTIN_PRESETS } from "./constants/builtinPresets.constants";
import type { PresetFile } from "./types/PresetFile";
import type { PresetRepository } from "./types/PresetRepository";
import { sanitizePreset } from "./sanitizePreset";
import type { ImportOutcome } from "./types/ImportOutcome";

export class PresetService {
  private userPresets: Preset[];

  constructor(private readonly repository: PresetRepository) {
    this.userPresets = repository.load();
  }

  list(): Preset[] {
    return [...BUILTIN_PRESETS, ...this.userPresets];
  }

  find(id: string): Preset | undefined {
    return this.list().find((preset) => preset.id === id);
  }

  saveUser(name: string, settings: Settings): Preset {
    const trimmed = name.trim().slice(0, SETTINGS_METRICS.presetNameMaxLength);
    const existing = this.userPresets.find((preset) => preset.name === trimmed);
    const preset: Preset = {
      schemaVersion: SETTINGS_METRICS.presetSchemaVersion,
      id:
        existing?.id ??
        `user-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6).toString(36)}`,
      name: trimmed,
      origin: "user",
      settings: sanitizeSettings(settings, settings.styleId),
    };
    this.userPresets = existing
      ? this.userPresets.map((entry) =>
          entry.id === existing.id ? preset : entry,
        )
      : [...this.userPresets, preset];
    this.repository.save(this.userPresets);
    return preset;
  }

  remove(id: string): boolean {
    const next = this.userPresets.filter((preset) => preset.id !== id);
    if (next.length === this.userPresets.length) return false;
    this.userPresets = next;
    this.repository.save(this.userPresets);
    return true;
  }

  exportFile(presets: readonly Preset[]): string {
    const file: PresetFile = {
      app: "soundscape",
      schemaVersion: SETTINGS_METRICS.presetSchemaVersion,
      presets: presets.map((preset) => ({ ...preset, origin: "user" })),
    };
    return JSON.stringify(file, null, 2);
  }

  importFile(text: string): ImportOutcome {
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      return { added: 0, rejected: 1 };
    }
    const entries = Array.isArray((parsed as PresetFile | null)?.presets)
      ? (parsed as PresetFile).presets
      : Array.isArray(parsed)
        ? (parsed as unknown[])
        : [parsed];
    let added = 0;
    let rejected = 0;
    for (const entry of entries) {
      const preset = sanitizePreset(entry);
      if (!preset) {
        rejected++;
        continue;
      }
      this.saveUser(preset.name, preset.settings);
      added++;
    }
    return { added, rejected };
  }
}
