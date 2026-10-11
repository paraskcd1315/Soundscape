import { SEMITONES } from "./constants/avoidPitchClasses.constants";

export function avoidPitchClasses(
  chordPitchClasses: readonly number[],
): Set<number> {
  const avoid = new Set<number>();
  for (const pitchClass of chordPitchClasses) {
    const above = (pitchClass + 1) % SEMITONES;
    if (!chordPitchClasses.includes(above)) avoid.add(above);
  }
  return avoid;
}

export function clashesWith(first: number, second: number): boolean {
  const distance = (((first - second) % SEMITONES) + SEMITONES) % SEMITONES;
  return distance === 1 || distance === SEMITONES - 1;
}
