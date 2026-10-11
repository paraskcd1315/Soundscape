import type { Settings } from "../../../models/Settings";
import type { EventTimeline } from "../EventTimeline";
import type { AudioClock } from "./AudioClock";
import type { NoteSink } from "./NoteSink";
import type { Ticker } from "./Ticker";

export interface TransportDependencies {
  clock: AudioClock;
  ticker: Ticker;
  sink: NoteSink;
  timeline: EventTimeline;
  settings: () => Settings;
}
