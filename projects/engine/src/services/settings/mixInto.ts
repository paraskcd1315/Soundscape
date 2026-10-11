import { DJ_NEIGHBOURS } from "../../constants/djNeighbours.constants";
import type { Settings } from "../../models/Settings";
import type { StyleId } from "../../models/StyleId";
import { withSeedCharacter } from "./withSeedCharacter";
import { withStyle } from "./withStyle";

export function nextMixStyle(current: StyleId, pick: number): StyleId {
  const neighbours = DJ_NEIGHBOURS[current];
  return neighbours[
    Math.floor(pick * neighbours.length) % neighbours.length
  ] as StyleId;
}

export function mixInto(
  settings: Settings,
  styleId: StyleId,
  seed: number,
): Settings {
  const keyRoot = settings.keyRoot;
  return { ...withSeedCharacter(withStyle(settings, styleId), seed), keyRoot };
}
