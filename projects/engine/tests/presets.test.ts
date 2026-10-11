import { describe, expect, it } from "vitest";
import { PresetService } from "@soundscape/engine/services/presets/PresetService";
import { BUILTIN_PRESETS } from "@soundscape/engine/services/presets/constants/builtinPresets.constants";
import { defaultSettingsFor } from "@soundscape/engine/services/settings/defaultSettingsFor";
import { sanitizeSettings } from "@soundscape/engine/services/settings/sanitizeSettings";
import { SettingsStore } from "@soundscape/engine/services/settings/SettingsStore";
import { STYLES } from "@soundscape/engine/genres/constants/styleCatalog.constants";
import { MemoryPresetRepository as MemoryRepository } from "./support/MemoryPresetRepository";

describe("sanitizeSettings", () => {
  it("clamps and repairs garbage", () => {
    const result = sanitizeSettings(
      { styleId: "nope", tempo: 9999, energy: -4, scaleId: "x", seed: "a" },
      "techno",
    );
    expect(result.styleId).toBe("techno");
    expect(result.tempo).toBe(STYLES.techno.tempoRange.max);
    expect(result.energy).toBe(0);
    expect(STYLES.techno.scaleIds).toContain(result.scaleId);
    expect(Number.isInteger(result.seed)).toBe(true);
  });

  it("keeps every built-in preset inside its style ranges", () => {
    for (const preset of BUILTIN_PRESETS) {
      const style = STYLES[preset.settings.styleId];
      expect(preset.settings.tempo).toBeGreaterThanOrEqual(
        style.tempoRange.min,
      );
      expect(preset.settings.tempo).toBeLessThanOrEqual(style.tempoRange.max);
      expect(style.scaleIds).toContain(preset.settings.scaleId);
    }
  });
});

describe("PresetService", () => {
  it("saves, overwrites by name, exports and re-imports", () => {
    const repository = new MemoryRepository();
    const service = new PresetService(repository);
    const settings = defaultSettingsFor("jazz", 99);
    service.saveUser("Mine", settings);
    service.saveUser("Mine", { ...settings, energy: 0.2 });
    expect(repository.saved).toHaveLength(1);

    const text = service.exportFile(repository.saved);
    const other = new PresetService(new MemoryRepository());
    expect(other.importFile(text)).toEqual({ added: 1, rejected: 0 });
    expect(other.list().some((preset) => preset.name === "Mine")).toBe(true);
  });

  it("rejects broken and future files", () => {
    const service = new PresetService(new MemoryRepository());
    expect(service.importFile("not json").added).toBe(0);
    const future = JSON.stringify({
      presets: [{ name: "x", schemaVersion: 99, settings: {} }],
    });
    expect(service.importFile(future)).toEqual({ added: 0, rejected: 1 });
  });

  it("removes only user presets", () => {
    const service = new PresetService(new MemoryRepository());
    const saved = service.saveUser("Gone", defaultSettingsFor("lofi"));
    expect(service.remove(saved.id)).toBe(true);
    expect(service.remove("builtin-lofi-rainy-study")).toBe(false);
  });
});

describe("SettingsStore", () => {
  it("switches style with in-range tempo and notifies", () => {
    const store = new SettingsStore(defaultSettingsFor("lofi"));
    let calls = 0;
    store.subscribe(() => calls++);
    store.setStyle("techno");
    expect(store.get().styleId).toBe("techno");
    expect(store.get().tempo).toBe(STYLES.techno.defaultTempo);
    expect(calls).toBe(1);
  });
});
