import { SeededRng } from "../random/SeededRng";
import { clamp } from "../../utils/theory/clamp";
import { COMPOSER_METRICS } from "./constants/composer.constants";
import type { MotifNote } from "./types/MotifNote";
import { TRANSPOSE_CHOICES, MIN_OFFSET, MAX_OFFSET } from "./constants/varyMotif.constants";

function transpose(motif: readonly MotifNote[], rng: SeededRng): MotifNote[] {
  const shift = rng.pick(TRANSPOSE_CHOICES);
  return motif.map((note) => ({
    ...note,
    degreeOffset: clamp(note.degreeOffset + shift, MIN_OFFSET, MAX_OFFSET),
  }));
}

function invert(motif: readonly MotifNote[]): MotifNote[] {
  const pivot = (motif[0] as MotifNote).degreeOffset;
  return motif.map((note) => ({
    ...note,
    degreeOffset: clamp(
      pivot - (note.degreeOffset - pivot),
      MIN_OFFSET,
      MAX_OFFSET,
    ),
  }));
}

function mutate(motif: readonly MotifNote[], rng: SeededRng): MotifNote[] {
  const notes = motif.map((note) => ({ ...note }));
  const changes = rng.int(1, 2);
  for (let change = 0; change < changes; change++) {
    const target = notes[rng.int(0, notes.length - 1)] as MotifNote;
    target.degreeOffset = clamp(
      target.degreeOffset + rng.pick(TRANSPOSE_CHOICES),
      MIN_OFFSET,
      MAX_OFFSET,
    );
  }
  const occupied = new Set(notes.map((note) => note.step));
  if (notes.length < 8 && rng.chance(0.35)) {
    const step = rng.int(0, COMPOSER_METRICS.stepsPerBar - 1);
    if (!occupied.has(step)) {
      notes.push({
        step,
        degreeOffset: rng.int(MIN_OFFSET + 3, MAX_OFFSET - 2),
        lengthSteps: 1,
      });
    }
  } else if (notes.length > 2 && rng.chance(0.3)) {
    notes.splice(rng.int(1, notes.length - 1), 1);
  }
  return notes.sort((a, b) => a.step - b.step);
}

export function varyMotif(
  motif: readonly MotifNote[],
  rng: SeededRng,
  complexity: number,
): readonly MotifNote[] {
  if (motif.length === 0) return motif;
  const repeatProbability = 0.7 - 0.5 * complexity;
  if (rng.chance(repeatProbability)) return motif;
  const choice = rng.next();
  if (choice < 0.35) return transpose(motif, rng);
  if (choice < 0.6) return invert(motif);
  return mutate(motif, rng);
}
