import type { NoteEvent } from "@soundscape/engine/models/NoteEvent";

export interface ScheduledNote {
  event: NoteEvent;
  startTime: number;
  seenAt: number;
}
