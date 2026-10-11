import type { VisualizerModeId } from "../../domain/model/VisualizerModeId";
import type { VisualizerFrame } from "./VisualizerFrame";

export interface VisualizerMode {
  id: VisualizerModeId;
  clearsFrame: boolean;
  draw(frame: VisualizerFrame): void;
  reset(): void;
}
