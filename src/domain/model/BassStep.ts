export type BassInterval = 'root' | 'third' | 'fifth' | 'octave' | 'approach';

export interface BassStep {
  step: number;
  interval: BassInterval;
  lengthSteps: number;
  weight: number;
}
