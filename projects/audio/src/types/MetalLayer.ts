export interface MetalLayer {
  kind: "metal";
  baseHz: number;
  ratios: readonly number[];
  highPassHz: number;
  bandHz: number;
  gain: number;
  decaySeconds: number;
}
