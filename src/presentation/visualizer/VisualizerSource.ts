import type { EventTimeline } from "../../application/transport/EventTimeline";

export interface VisualizerSource {
  analyser(): AnalyserNode | null;
  currentTime(): number;
  timeline: EventTimeline;
}
