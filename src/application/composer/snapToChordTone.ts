import type { ScaleDefinition } from "../../domain/model/ScaleDefinition";
import { degreeToMidi } from "../../domain/theory/degreeToMidi";

const SEARCH_RADIUS = 3;

export function snapToChordTone(
  degree: number,
  scale: ScaleDefinition,
  keyRoot: number,
  baseMidi: number,
  chordPitchClasses: readonly number[],
): number {
  let best = degree;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (
    let candidate = degree - SEARCH_RADIUS;
    candidate <= degree + SEARCH_RADIUS;
    candidate++
  ) {
    const pitchClass = degreeToMidi(scale, keyRoot, candidate, baseMidi) % 12;
    if (!chordPitchClasses.includes(pitchClass)) continue;
    const distance = Math.abs(candidate - degree);
    if (distance < bestDistance) {
      best = candidate;
      bestDistance = distance;
    }
  }
  return best;
}
