import type { DrumGrid } from "./DrumGrid";
import type { TonalVoiceId } from "./VoiceId";

export interface StyleVariants {
  chordVoices: readonly TonalVoiceId[];
  melodyVoices: readonly TonalVoiceId[];
  bassVoices: readonly TonalVoiceId[];
  padVoices: readonly TonalVoiceId[];
  counterVoices: readonly TonalVoiceId[];
  stabSteps: readonly (readonly number[])[];
  drumKits: readonly (readonly DrumGrid[])[];
  chordCenterShifts: readonly number[];
}
