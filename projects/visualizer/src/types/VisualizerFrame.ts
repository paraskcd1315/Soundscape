import type { TimelineItem } from "@soundscape/engine/services/transport/types/TimelineItem";
import type { BlendedPalette } from "./BlendedPalette";

export interface VisualizerFrame {
  g: CanvasRenderingContext2D;
  width: number;
  height: number;
  deltaSeconds: number;
  timeSeconds: number;
  bands: Float32Array;
  peaks: Float32Array;
  waveform: Uint8Array;
  level: number;
  beatPulse: number;
  notes: readonly TimelineItem[];
  palette: BlendedPalette;
  intensity: number;
  reducedMotion: boolean;
}
