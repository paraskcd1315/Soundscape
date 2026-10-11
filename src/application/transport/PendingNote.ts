import type { NoteEvent } from "../../domain/model/NoteEvent";

export interface PendingNote {
  event: NoteEvent;
  startTime: number;
  durationSeconds: number;
}
