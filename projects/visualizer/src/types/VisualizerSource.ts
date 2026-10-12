import type { SpectrumSource } from "@soundscape/engine/models/SpectrumSource";
import type { EventTimeline } from "@soundscape/engine/services/transport/EventTimeline";

export interface VisualizerSource {
  analyser(): SpectrumSource | null;
  currentTime(): number;
  timeline: EventTimeline;
}
