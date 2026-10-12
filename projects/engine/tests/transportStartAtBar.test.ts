import { describe, expect, it } from "vitest";
import { composeBar } from "@soundscape/engine/services/composer/composeBar";
import { defaultSettingsFor } from "@soundscape/engine/services/settings/defaultSettingsFor";
import { EventTimeline } from "@soundscape/engine/services/transport/EventTimeline";
import { Transport } from "@soundscape/engine/services/transport/Transport";

describe("Transport.startAtBar", () => {
  it("plays the bar it is handed, at the time it is handed", () => {
    const settings = defaultSettingsFor("techno", 5);
    const secondsPerBeat = 60 / settings.tempo;
    const barTime = 0.5;
    const scheduled: { midi: number; startTime: number }[] = [];
    const transport = new Transport({
      clock: { now: () => 0 },
      ticker: { start: () => undefined, stop: () => undefined },
      sink: {
        schedule: (event, startTime) =>
          scheduled.push({ midi: event.midi, startTime }),
      },
      timeline: new EventTimeline(),
      settings: () => settings,
      inBackground: () => true,
    });

    transport.startAtBar(12, barTime);

    const expected = composeBar(settings, 12)
      .map((event) => ({
        midi: event.midi,
        startTime: barTime + event.startBeat * secondsPerBeat,
      }))
      .sort((a, b) => a.startTime - b.startTime);
    const firstBarEnd = barTime + 4 * secondsPerBeat;
    const played = scheduled
      .filter((note) => note.startTime < firstBarEnd - 1e-9)
      .sort((a, b) => a.startTime - b.startTime);
    expect(played.length).toBeGreaterThan(0);
    expect(played.map((note) => note.midi).sort()).toEqual(
      expected.map((note) => note.midi).sort(),
    );
    expect(played[0]?.startTime).toBeCloseTo(expected[0]?.startTime ?? -1, 6);
  });
});
