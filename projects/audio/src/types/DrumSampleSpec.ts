import type { DrumLayer } from "./DrumLayer";

export interface DrumSampleSpec {
  lengthSeconds: number;
  drive: number;
  outputGain: number;
  gateSeconds?: number;
  layers: readonly DrumLayer[];
}
