import { describe, expect, it } from "vitest";
import { defaultSettingsFor } from "@soundscape/engine/services/settings/defaultSettingsFor";
import { isIdentityChange } from "@soundscape/engine/services/settings/utils/isIdentityChange.util";
import { EventTimeline } from "@soundscape/engine/services/transport/EventTimeline";
import { Transport } from "@soundscape/engine/services/transport/Transport";

describe("transitions", () => {
  it("treats style, seed, key and scale as a new piece, and sliders as live tweaks", () => {
    const base = defaultSettingsFor("lofi", 7);
    expect(isIdentityChange(base, { ...base, styleId: "jazz" })).toBe(true);
    expect(isIdentityChange(base, { ...base, seed: 8 })).toBe(true);
    expect(isIdentityChange(base, { ...base, keyRoot: base.keyRoot + 1 })).toBe(
      true,
    );
    expect(isIdentityChange(base, { ...base, scaleId: "major" })).toBe(true);
    expect(isIdentityChange(base, { ...base, energy: 0.9 })).toBe(false);
    expect(isIdentityChange(base, { ...base, masterVolume: 0.2 })).toBe(false);
    expect(isIdentityChange(base, { ...base, tempo: base.tempo + 4 })).toBe(
      false,
    );
  });

  it("starts the incoming piece on the bar line it is handed", () => {
    const settings = defaultSettingsFor("techno", 3);
    const timeline = new EventTimeline();
    let now = 1;
    const transport = new Transport({
      clock: { now: () => now },
      ticker: { start: () => undefined, stop: () => undefined },
      sink: { schedule: () => undefined },
      timeline,
      settings: () => settings,
    });
    transport.start(5);
    expect(transport.currentBar).toBe(0);
    now = 4.8;
    transport.tick();
    const firstBeat = timeline.takeDue(5).find((item) => item.kind === "beat");
    expect(firstBeat?.time).toBe(5);
    expect(firstBeat?.barIndex).toBe(0);
  });
});
