export interface ToneLayer {
  kind: "tone";
  wave: OscillatorType;
  startHz: number;
  endHz: number;
  sweepSeconds: number;
  gain: number;
  attackSeconds: number;
  decaySeconds: number;
}
