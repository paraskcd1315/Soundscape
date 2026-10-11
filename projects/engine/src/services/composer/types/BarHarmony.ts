import type { ChordSymbol } from "../../../models/ChordSymbol";

export interface BarHarmony {
  chord: ChordSymbol;
  pitchClasses: readonly number[];
  voicing: readonly number[];
  isChordStart: boolean;
  barsRemainingInChord: number;
}
