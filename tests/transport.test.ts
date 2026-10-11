import { describe, expect, it } from "vitest";
import { defaultSettingsFor } from "../src/application/settings/defaultSettingsFor";
import { EventTimeline } from "../src/application/transport/EventTimeline";
import { Transport } from "../src/application/transport/Transport";
import { TRANSPORT_METRICS } from "../src/application/transport/transportMetrics";
import type { NoteEvent } from "../src/domain/model/NoteEvent";

interface Scheduled {
  event: NoteEvent;
  startTime: number;
  seenAt: number;
}

describe("Transport", () => {
  it("schedules every note ahead of its time and in order", () => {
    let now = 0;
    const scheduled: Scheduled[] = [];
    const settings = defaultSettingsFor("techno", 5);
    const transport = new Transport({
      clock: { now: () => now },
      ticker: { start: () => undefined, stop: () => undefined },
      sink: {
        schedule: (event, startTime) =>
          scheduled.push({ event, startTime, seenAt: now }),
      },
      timeline: new EventTimeline(),
      settings: () => settings,
    });

    transport.start();
    for (let step = 0; step < 800; step++) {
      now += TRANSPORT_METRICS.tickMilliseconds / 1000;
      transport.tick();
    }

    expect(scheduled.length).toBeGreaterThan(200);
    for (const item of scheduled)
      expect(item.startTime).toBeGreaterThanOrEqual(item.seenAt);
    for (let index = 1; index < scheduled.length; index++) {
      expect((scheduled[index] as Scheduled).startTime).toBeGreaterThanOrEqual(
        (scheduled[index - 1] as Scheduled).startTime - 1e-9,
      );
    }
  });

  it("lets the timeline hand notes over when they are due", () => {
    const timeline = new EventTimeline();
    timeline.push({
      kind: "beat",
      time: 1,
      layer: null,
      midi: 0,
      velocity: 1,
      beatInBar: 0,
      barIndex: 0,
    });
    timeline.push({
      kind: "beat",
      time: 2,
      layer: null,
      midi: 0,
      velocity: 1,
      beatInBar: 1,
      barIndex: 0,
    });
    expect(timeline.takeDue(0.5)).toHaveLength(0);
    expect(timeline.takeDue(1.5)).toHaveLength(1);
    expect(timeline.takeDue(5)).toHaveLength(1);
  });
});
