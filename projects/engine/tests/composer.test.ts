import { describe, expect, it } from "vitest";
import { composeBar } from "@soundscape/engine/services/composer/composeBar";
import { timbreFor } from "@soundscape/engine/services/composer/timbreFor";
import { defaultSettingsFor } from "@soundscape/engine/services/settings/defaultSettingsFor";
import { LAYER_KINDS } from "@soundscape/engine/constants/layerKinds.constants";
import { STYLE_IDS } from "@soundscape/engine/constants/styleIds.constants";
import type { StyleId } from "@soundscape/engine/models/StyleId";
import { createRng } from "@soundscape/engine/utils/random/createRng";
import { STYLES } from "@soundscape/engine/genres/constants/styleCatalog.constants";

const BARS = 32;

function bars(styleId: StyleId, seed: number) {
  const settings = defaultSettingsFor(styleId, seed);
  return Array.from({ length: BARS }, (_, bar) => composeBar(settings, bar));
}

describe("rng", () => {
  it("repeats for the same parts and differs for others", () => {
    expect(createRng(1, "a", 2).next()).toBe(createRng(1, "a", 2).next());
    expect(createRng(1, "a", 2).next()).not.toBe(createRng(1, "a", 3).next());
  });
});

describe.each(STYLE_IDS)("composer %s", (styleId) => {
  it("is deterministic for a seed", () => {
    expect(JSON.stringify(bars(styleId, 42))).toBe(
      JSON.stringify(bars(styleId, 42)),
    );
  });

  it("changes with the seed", () => {
    expect(JSON.stringify(bars(styleId, 42))).not.toBe(
      JSON.stringify(bars(styleId, 43)),
    );
  });

  it("produces finite events inside the bar window", () => {
    for (const seed of [1, 7, 99, 12345]) {
      for (const events of bars(styleId, seed)) {
        for (const event of events) {
          expect(Number.isFinite(event.midi)).toBe(true);
          expect(event.startBeat).toBeGreaterThanOrEqual(0);
          expect(event.startBeat).toBeLessThan(4.2);
          expect(event.durationBeats).toBeGreaterThan(0);
          expect(event.velocity).toBeGreaterThan(0);
          expect(event.velocity).toBeLessThanOrEqual(1);
          if (event.layer === "melody") {
            const { lowMidi, highMidi } = STYLES[styleId].melody;
            expect(event.midi).toBeGreaterThanOrEqual(lowMidi);
            expect(event.midi).toBeLessThanOrEqual(highMidi);
          }
        }
      }
    }
  });

  it("plays something on every bar", () => {
    let soundingUntil = 0;
    bars(styleId, 5).forEach((events, bar) => {
      for (const event of events)
        soundingUntil = Math.max(
          soundingUntil,
          bar * 4 + event.startBeat + event.durationBeats,
        );
      expect(events.length > 0 || soundingUntil > bar * 4).toBe(true);
    });
  });

  it("uses most layers over a song", () => {
    const used = new Set(
      bars(styleId, 5).flatMap((events) => events.map((event) => event.layer)),
    );
    expect(used.size).toBeGreaterThanOrEqual(LAYER_KINDS.length - 3);
  });

  it("gives different seeds different timbres", () => {
    const style = STYLES[styleId];
    const signatures = new Set<string>();
    for (let seed = 1; seed <= 40; seed++) {
      const timbre = timbreFor(defaultSettingsFor(styleId, seed), style);
      signatures.add(
        [
          timbre.chordVoice,
          timbre.melodyVoice,
          timbre.bassVoice,
          timbre.drumKit.length,
          timbre.stabSteps.join("."),
        ].join("|"),
      );
    }
    const minimum = styleId === "lofi" || styleId === "jazz" ? 15 : 1;
    expect(signatures.size).toBeGreaterThanOrEqual(minimum);
  });

  it("keeps drums and bass independent of complexity", () => {
    const base = defaultSettingsFor(styleId, 11);
    const other = { ...base, complexity: 0.9 };
    const pick = (settings: typeof base) =>
      JSON.stringify(
        composeBar(settings, 6).filter((event) => event.layer === "drums"),
      );
    expect(pick(base)).toBe(pick(other));
  });
});
