import type { BassStep } from "../../../domain/model/BassStep";
import type { DrumGrid } from "../../../domain/model/DrumGrid";

export interface BarPatterns {
  drumKit: readonly DrumGrid[];
  bass: readonly BassStep[];
  stabSteps: readonly number[];
}
