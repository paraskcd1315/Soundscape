import type { ScaleDefinition } from '../model/ScaleDefinition';

export function degreeToMidi(
  scale: ScaleDefinition,
  keyRoot: number,
  degree: number,
  baseMidi: number,
): number {
  const length = scale.intervals.length;
  const octave = Math.floor(degree / length);
  const index = ((degree % length) + length) % length;
  return baseMidi + keyRoot + (scale.intervals[index] as number) + 12 * octave;
}
