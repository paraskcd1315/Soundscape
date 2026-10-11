import type { VisualizerModeId } from "../../../domain/model/VisualizerModeId";
import type { VisualizerMode } from "../VisualizerMode";
import { BarsMode } from "./BarsMode";
import { FlowMode } from "./FlowMode";
import { RadialMode } from "./RadialMode";

export function createModes(): Record<VisualizerModeId, VisualizerMode> {
  return {
    bars: new BarsMode(),
    radial: new RadialMode(),
    flow: new FlowMode(),
  };
}
