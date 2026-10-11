import { describe, expect, it } from "vitest";
import { defaultSettingsFor } from "@soundscape/engine/services/settings/defaultSettingsFor";
import { surpriseSettings } from "@soundscape/engine/services/settings/surpriseSettings";
import { STYLE_IDS } from "@soundscape/engine/constants/styleIds.constants";
import type { Settings } from "@soundscape/engine/models/Settings";

describe("surprise me", () => {
  it("never repeats the current style and shows every style within one round", () => {
    let current: Settings = defaultSettingsFor("lofi");
    const seen = new Set<string>();
    for (let press = 0; press < STYLE_IDS.length; press++) {
      const next = surpriseSettings(current, false);
      expect(next.styleId).not.toBe(current.styleId);
      seen.add(next.styleId);
      current = next;
    }
    expect(seen.size).toBeGreaterThanOrEqual(STYLE_IDS.length - 1);
  });

  it("reaches jazz regularly", () => {
    let current: Settings = defaultSettingsFor("lofi");
    let jazz = 0;
    for (let press = 0; press < 100; press++) {
      current = surpriseSettings(current, false);
      if (current.styleId === "jazz") jazz++;
    }
    expect(jazz).toBeGreaterThanOrEqual(15);
  });
});
