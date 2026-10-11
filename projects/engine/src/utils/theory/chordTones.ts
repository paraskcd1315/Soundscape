import type { ChordSymbol } from "../../models/ChordSymbol";
import type { ScaleDefinition } from "../../models/ScaleDefinition";
import { degreeToMidi } from "./degreeToMidi";
import { SCALES } from "../../constants/scales.constants";
import {
  BASIC_CHORD_TONES,
  SEMITONES,
} from "./constants/avoidPitchClasses.constants";

export function chordScaleOf(scale: ScaleDefinition): ScaleDefinition {
  return SCALES[scale.chordScaleId];
}

export function chordDegrees(chord: ChordSymbol): number[] {
  return Array.from(
    { length: chord.size },
    (_, index) => chord.degree + index * 2,
  );
}

export function chordPitchClasses(
  chord: ChordSymbol,
  scale: ScaleDefinition,
  keyRoot: number,
): number[] {
  const chordScale = chordScaleOf(scale);
  const all = chordDegrees(chord).map(
    (degree) => degreeToMidi(chordScale, keyRoot, degree, 0) % SEMITONES,
  );
  const basic = all.slice(0, BASIC_CHORD_TONES);
  const extensions = all
    .slice(BASIC_CHORD_TONES)
    .filter(
      (pitchClass) =>
        !basic.some((tone) => (tone + 1) % SEMITONES === pitchClass),
    );
  return [...basic, ...extensions];
}

export function chordRootMidi(
  chord: ChordSymbol,
  scale: ScaleDefinition,
  keyRoot: number,
  baseMidi: number,
): number {
  return degreeToMidi(chordScaleOf(scale), keyRoot, chord.degree, baseMidi);
}
