import { describe, expect, it } from "vitest";
import { defaultSettingsFor } from "@soundscape/engine/services/settings/defaultSettingsFor";
import { EventTimeline } from "@soundscape/engine/services/transport/EventTimeline";
import { Transport } from "@soundscape/engine/services/transport/Transport";
import { TRANSPORT_METRICS } from "@soundscape/engine/services/transport/constants/transport.constants";

function lastScheduledAfterOneTick(inBackground: boolean): number {
  const now = 10;
  const starts: number[] = [];
  const transport = new Transport({
    clock: { now: () => now },
    ticker: { start: () => undefined, stop: () => undefined },
    sink: { schedule: (_event, startTime) => starts.push(startTime) },
    timeline: new EventTimeline(),
    settings: () => defaultSettingsFor("techno", 5),
    inBackground: () => inBackground,
  });
  transport.start();
  return Math.max(...starts) - now;
}

describe("Transport in the background", () => {
  it("schedules seconds ahead while the page is hidden, so a throttled tick does not starve the audio", () => {
    expect(lastScheduledAfterOneTick(true)).toBeGreaterThan(
      TRANSPORT_METRICS.backgroundLookaheadSeconds - 1,
    );
  });

  it("keeps the short look-ahead in the foreground", () => {
    expect(lastScheduledAfterOneTick(false)).toBeLessThanOrEqual(
      TRANSPORT_METRICS.lookaheadSeconds,
    );
  });
});
