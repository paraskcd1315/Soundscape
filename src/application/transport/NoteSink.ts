import type { NoteEvent } from "../../domain/model/NoteEvent";

export interface NoteSink {
  schedule(event: NoteEvent, startTime: number, durationSeconds: number): void;
}
