import type { DrumVoiceRule } from "./DrumVoiceRule";

export interface DrumGroove {
  name: string;
  rules: readonly DrumVoiceRule[];
}
