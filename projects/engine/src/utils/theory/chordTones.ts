import type { ChordSymbol } from '../../models/ChordSymbol';
import type { ScaleDefinition } from '../../models/ScaleDefinition';
import { degreeToMidi } from './degreeToMidi';
import { SCALES } from '../../constants/scales.constants';

export function chordScaleOf(scale: ScaleDefinition): ScaleDefinition {
  return SCALES[scale.chordScaleId];
}

export function chordDegrees(chord: ChordSymbol): number[] {
  return Array.from({ length: chord.size }, (_, index) => chord.degree + index * 2);
}

export function chordPitchClasses(
  chord: ChordSymbol,
  scale: ScaleDefinition,
  keyRoot: number,
): number[] {
  const chordScale = chordScaleOf(scale);
  return chordDegrees(chord).map((degree) => degreeToMidi(chordScale, keyRoot, degree, 0) % 12);
}

export function chordRootMidi(
  chord: ChordSymbol,
  scale: ScaleDefinition,
  keyRoot: number,
  baseMidi: number,
): number {
  return degreeToMidi(chordScaleOf(scale), keyRoot, chord.degree, baseMidi);
}
