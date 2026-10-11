import { AUDIO_SESSION_PLAYBACK } from "../constants/audioSession.constants";
import type { AudioSessionNavigator } from "../types/AudioSessionNavigator";

export function preferPlaybackSession(target: AudioSessionNavigator): void {
  if (target.audioSession) target.audioSession.type = AUDIO_SESSION_PLAYBACK;
}
