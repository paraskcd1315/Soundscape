import type { BassStep } from "../../../domain/model/BassStep";
import type { DrumGrid } from "../../../domain/model/DrumGrid";
import type { DrumVoiceRule } from "../../../domain/model/PatternRules";

export interface BarPatterns {
  drumKit: readonly DrumGrid[];
  drumRules: readonly DrumVoiceRule[];
  bass: readonly BassStep[];
  stabSteps: readonly number[];
}
