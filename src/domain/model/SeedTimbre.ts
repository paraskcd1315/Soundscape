import type { DrumGrid } from "./DrumGrid";
import type { TonalVoiceId } from "./VoiceId";

export interface SeedTimbre {
  chordVoice: TonalVoiceId;
  melodyVoice: TonalVoiceId;
  bassVoice: TonalVoiceId;
  padVoice: TonalVoiceId;
  counterVoice: TonalVoiceId;
  stabSteps: readonly number[];
  drumKit: readonly DrumGrid[];
  chordCenterShift: number;
}
