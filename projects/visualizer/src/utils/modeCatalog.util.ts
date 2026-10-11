import type { VisualizerModeId } from "@soundscape/engine/models/VisualizerModeId";
import type { VisualizerMode } from "../types/VisualizerMode";
import { BarsMode } from "../services/modes/BarsMode";
import { FlowMode } from "../services/modes/FlowMode";
import { RadialMode } from "../services/modes/RadialMode";

export function createModes(): Record<VisualizerModeId, VisualizerMode> {
  return {
    bars: new BarsMode(),
    radial: new RadialMode(),
    flow: new FlowMode(),
  };
}
