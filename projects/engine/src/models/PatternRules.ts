import type { BassPatternRules } from "./BassPatternRules";
import type { DrumGroove } from "./DrumGroove";
import type { StabPatternRules } from "./StabPatternRules";

export interface PatternRules {
  templateChance: number;
  drumGrooves: readonly DrumGroove[];
  bass: BassPatternRules;
  stabs: StabPatternRules | null;
}
