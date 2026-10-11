import type { DrumGrid } from "./DrumGrid";
import type { TonalVoiceId } from "./TonalVoiceId";

export interface SeedTimbre {
  chordVoice: TonalVoiceId;
  melodyVoice: TonalVoiceId;
  bassVoice: TonalVoiceId;
  padVoice: TonalVoiceId;
  counterVoice: TonalVoiceId;
  stabSteps: readonly number[];
  drumKit: readonly DrumGrid[];
  chordCenterShift: number;
  melodyShift: number;
  melodyBusy: number;
  leapBias: number;
  syncopation: number;
}
