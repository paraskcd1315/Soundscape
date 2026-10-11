export interface FmLayer {
  kind: "fm";
  carrierHz: number;
  ratio: number;
  index: number;
  gain: number;
  decaySeconds: number;
}
