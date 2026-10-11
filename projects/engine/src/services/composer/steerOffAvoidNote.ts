import type { ScaleDefinition } from "../../models/ScaleDefinition";
import { degreeToMidi } from "../../utils/theory/degreeToMidi";
import { STEER_ORDER } from "./constants/steerOffAvoidNote.constants";

export function steerOffAvoidNote(
  degree: number,
  scale: ScaleDefinition,
  keyRoot: number,
  baseMidi: number,
  avoid: ReadonlySet<number>,
): number {
  for (const offset of STEER_ORDER) {
    const candidate = degree + offset;
    if (!avoid.has(degreeToMidi(scale, keyRoot, candidate, baseMidi) % 12))
      return candidate;
  }
  return degree;
}
