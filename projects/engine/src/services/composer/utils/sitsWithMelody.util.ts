import type { NoteEvent } from "../../../models/NoteEvent";
import { clashesWith } from "../../../utils/theory/avoidPitchClasses";

export function sitsWithMelody(
  midi: number,
  startBeat: number,
  durationBeats: number,
  melody: readonly NoteEvent[],
): boolean {
  const end = startBeat + durationBeats;
  return melody.every((note) => {
    const overlaps =
      note.startBeat < end && startBeat < note.startBeat + note.durationBeats;
    return !overlaps || (note.midi !== midi && !clashesWith(note.midi, midi));
  });
}
