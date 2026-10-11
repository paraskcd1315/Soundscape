import type { ScaleId } from './ScaleId';

export interface ScaleDefinition {
  id: ScaleId;
  intervals: readonly number[];
  chordScaleId: ScaleId;
}
