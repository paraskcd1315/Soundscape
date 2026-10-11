import type { DrumVoiceId } from './DrumVoiceId';

export interface DrumGrid {
  voice: DrumVoiceId;
  steps: readonly number[];
}
