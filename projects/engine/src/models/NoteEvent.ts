import type { LayerKind } from './LayerKind';
import type { VoiceId } from './VoiceId';

export interface NoteEvent {
  layer: LayerKind;
  voice: VoiceId;
  startBeat: number;
  durationBeats: number;
  midi: number;
  velocity: number;
}
