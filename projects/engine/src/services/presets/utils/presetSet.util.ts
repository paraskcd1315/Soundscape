import type { Preset } from "../../../models/Preset";
import type { StyleId } from "../../../models/StyleId";
import type { PresetSeed } from "../types/PresetSeed";
import { builtin } from "./builtinPreset.util";

export function presetSet(
  styleId: StyleId,
  seedBase: number,
  entries: readonly PresetSeed[],
): Preset[] {
  return entries.map((entry, index) =>
    builtin(
      `${styleId}-${entry.slug}`,
      entry.name,
      styleId,
      seedBase + index,
      entry.overrides,
      entry.levels,
    ),
  );
}
