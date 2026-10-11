import type { ScaleDefinition } from "../../models/ScaleDefinition";
import { degreeToMidi } from "../../utils/theory/degreeToMidi";
import { SEARCH_RADIUS } from "./constants/snapToChordTone.constants";

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
