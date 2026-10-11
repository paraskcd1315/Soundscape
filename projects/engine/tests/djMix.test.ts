import { describe, expect, it } from "vitest";
import { DJ_NEIGHBOURS } from "@soundscape/engine/constants/djNeighbours.constants";
import { STYLE_IDS } from "@soundscape/engine/constants/styleIds.constants";
import { defaultSettingsFor } from "@soundscape/engine/services/settings/defaultSettingsFor";
import {
  mixInto,
  nextMixStyle,
} from "@soundscape/engine/services/settings/mixInto";
import { STYLES } from "@soundscape/engine/genres/constants/styleCatalog.constants";

describe("DJ mix", () => {
  it("gives every style at least one neighbour other than itself", () => {
    for (const styleId of STYLE_IDS) {
      const neighbours = DJ_NEIGHBOURS[styleId];
      expect(neighbours.length).toBeGreaterThan(0);
      expect(neighbours).not.toContain(styleId);
    }
  });

  it("moves into a neighbour and keeps the key, inside the new style's tempo range", () => {
    const current = defaultSettingsFor("deepHouse", 5);
    const next = nextMixStyle(current.styleId, 0.4);
    expect(DJ_NEIGHBOURS.deepHouse).toContain(next);
    const mixed = mixInto(current, next, 99);
    expect(mixed.styleId).toBe(next);
    expect(mixed.keyRoot).toBe(current.keyRoot);
    expect(mixed.tempo).toBeGreaterThanOrEqual(STYLES[next].tempoRange.min);
    expect(mixed.tempo).toBeLessThanOrEqual(STYLES[next].tempoRange.max);
  });
});
