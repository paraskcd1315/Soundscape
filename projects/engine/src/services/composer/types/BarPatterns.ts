import type { BassStep } from "../../../models/BassStep";
import type { DrumGrid } from "../../../models/DrumGrid";
import type { DrumVoiceRule } from "../../../models/DrumVoiceRule";

export interface BarPatterns {
  drumKit: readonly DrumGrid[];
  drumRules: readonly DrumVoiceRule[];
  bass: readonly BassStep[];
  stabSteps: readonly number[];
}
