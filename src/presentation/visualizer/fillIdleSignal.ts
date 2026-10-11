import { VISUALIZER_METRICS } from "./visualizerMetrics";

const WAVE_AMPLITUDE = 6;

export function fillIdleSpectrum(
  buffer: Uint8Array,
  timeSeconds: number,
): void {
  for (let bin = 0; bin < buffer.length; bin++) {
    const shape = 1 / (1 + bin * 0.02);
    const wobble = 0.5 + 0.5 * Math.sin(timeSeconds * 1.2 + bin * 0.05);
    buffer[bin] = 255 * VISUALIZER_METRICS.idleLevel * 4 * shape * wobble;
  }
}

export function fillIdleWaveform(
  buffer: Uint8Array,
  timeSeconds: number,
): void {
  for (let index = 0; index < buffer.length; index++) {
    buffer[index] = 128 + WAVE_AMPLITUDE * Math.sin(timeSeconds + index * 0.03);
  }
}
