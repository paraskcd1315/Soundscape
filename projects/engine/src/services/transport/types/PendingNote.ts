import type { NoteEvent } from "../../../models/NoteEvent";

export interface PendingNote {
  event: NoteEvent;
  startTime: number;
  durationSeconds: number;
}
