import { CURVE_SAMPLES } from "./constants/createSaturationCurve.constants";


export function createSaturationCurve(
  drive: number,
): Float32Array<ArrayBuffer> {
  const curve = new Float32Array(CURVE_SAMPLES);
  const normaliser = Math.tanh(drive);
  for (let index = 0; index < CURVE_SAMPLES; index++) {
    const x = (index / (CURVE_SAMPLES - 1)) * 2 - 1;
    curve[index] = Math.tanh(x * drive) / normaliser;
  }
  return curve;
}
