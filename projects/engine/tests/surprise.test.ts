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

  it("reaches every style, jazz included, about as often as the others", () => {
    let current: Settings = defaultSettingsFor("lofi");
    const presses = STYLE_IDS.length * 20;
    const counts = new Map<string, number>();
    for (let press = 0; press < presses; press++) {
      current = surpriseSettings(current, false);
      counts.set(current.styleId, (counts.get(current.styleId) ?? 0) + 1);
    }
    const fairShare = presses / STYLE_IDS.length;
    for (const styleId of STYLE_IDS)
      expect(counts.get(styleId) ?? 0).toBeGreaterThanOrEqual(fairShare * 0.6);
  });
});
