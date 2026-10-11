import type { DrumGrid } from "../../models/DrumGrid";
import type { DrumGroove } from "../../models/DrumGroove";
import { GROOVE_GRID_METRICS } from "../constants/grooveGrid.constants";

export function grooveGrids(groove: DrumGroove): DrumGrid[] {
  return groove.rules
    .filter((rule) => rule.presence >= GROOVE_GRID_METRICS.minimumPresence)
    .map((rule) => ({
      voice: rule.voice,
      steps: Array.from(
        { length: GROOVE_GRID_METRICS.stepsPerBar },
        (_, step) =>
          rule.anchors.includes(step)
            ? 1
            : (rule.weights[step] ?? 0) >= GROOVE_GRID_METRICS.minimumWeight
              ? (rule.weights[step] as number) * GROOVE_GRID_METRICS.ghostScale
              : 0,
      ),
    }));
}
