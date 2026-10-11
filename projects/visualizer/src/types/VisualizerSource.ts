import type { EventTimeline } from "@soundscape/engine/services/transport/EventTimeline";

export interface VisualizerSource {
  analyser(): AnalyserNode | null;
  currentTime(): number;
  timeline: EventTimeline;
}
