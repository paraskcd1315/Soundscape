export interface NoiseLayer {
  kind: "noise";
  filter: BiquadFilterType;
  hz: number;
  q: number;
  gain: number;
  attackSeconds: number;
  decaySeconds: number;
  burstOffsets: readonly number[];
}
