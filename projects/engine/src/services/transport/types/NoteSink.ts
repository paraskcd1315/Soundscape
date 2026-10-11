import type { NoteEvent } from "../../../models/NoteEvent";

export interface NoteSink {
  schedule(event: NoteEvent, startTime: number, durationSeconds: number): void;
}
