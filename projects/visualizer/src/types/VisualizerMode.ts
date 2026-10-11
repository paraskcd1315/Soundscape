import type { VisualizerModeId } from "@soundscape/engine/models/VisualizerModeId";
import type { VisualizerFrame } from "./VisualizerFrame";

export interface VisualizerMode {
  id: VisualizerModeId;
  clearsFrame: boolean;
  draw(frame: VisualizerFrame): void;
  reset(): void;
}
