import { DRUM_VOICE_IDS } from "@soundscape/engine/constants/voiceIds.constants";
import type { DrumVoiceId } from "@soundscape/engine/models/DrumVoiceId";
import type { VoiceId } from "@soundscape/engine/models/VoiceId";

export function isDrumVoice(voice: VoiceId): voice is DrumVoiceId {
  return (DRUM_VOICE_IDS as readonly string[]).includes(voice);
}
