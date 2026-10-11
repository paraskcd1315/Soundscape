import type { DrumVoiceId } from './VoiceId';

export interface DrumGrid {
  voice: DrumVoiceId;
  steps: readonly number[];
}
