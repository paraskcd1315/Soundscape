import type { ChordSymbol } from './ChordSymbol';

export interface Progression {
  chords: readonly ChordSymbol[];
  barsPerChord: number;
}
