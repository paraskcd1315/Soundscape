import type { EventTimeline } from "@soundscape/engine/services/transport/EventTimeline";
import type { SpectrumSource } from "@soundscape/engine/models/SpectrumSource";

export interface MusicPlayer {
  readonly timeline: EventTimeline;
  readonly isPlaying: boolean;
  analyser(): SpectrumSource | null;
  currentTime(): number;
  play(): Promise<void>;
  pause(): Promise<void>;
}
