import type { BassInterval } from "../../domain/model/BassStep";
import type { BarHarmony } from "./BarHarmony";

const SEMITONES_PER_OCTAVE = 12;

function lowestAtOrAbove(pitchClass: number, floor: number): number {
  return (
    floor +
    ((pitchClass - (floor % SEMITONES_PER_OCTAVE) + SEMITONES_PER_OCTAVE) %
      SEMITONES_PER_OCTAVE)
  );
}

export function bassRoot(harmony: BarHarmony, baseMidi: number): number {
  return lowestAtOrAbove(harmony.pitchClasses[0] as number, baseMidi);
}

export function bassPitch(
  interval: BassInterval,
  harmony: BarHarmony,
  nextHarmony: BarHarmony,
  baseMidi: number,
  approachUp: boolean,
): number {
  const root = bassRoot(harmony, baseMidi);
  switch (interval) {
    case "root":
      return root;
    case "octave":
      return root + SEMITONES_PER_OCTAVE;
    case "third":
      return lowestAtOrAbove(harmony.pitchClasses[1] as number, root);
    case "fifth":
      return lowestAtOrAbove(harmony.pitchClasses[2] as number, root);
    case "approach":
      return bassRoot(nextHarmony, baseMidi) + (approachUp ? -1 : 1);
  }
}
