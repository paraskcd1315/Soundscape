import type { SpectrumSource } from "@soundscape/engine/models/SpectrumSource";
import { AUDIO_METRICS } from "../../constants/audio.constants";
import { fftMagnitudes } from "../../utils/fftMagnitudes.util";
import { STREAM_METRICS } from "./constants/stream.constants";
import type { PcmBatch } from "./types/PcmBatch";

export class PcmAnalyser implements SpectrumSource {
  readonly context = { sampleRate: STREAM_METRICS.sampleRate };
  readonly fftSize = AUDIO_METRICS.analyserFftSize;
  readonly frequencyBinCount = AUDIO_METRICS.analyserFftSize / 2;
  private readonly history: PcmBatch[] = [];
  private readonly window = new Float32Array(AUDIO_METRICS.analyserFftSize);
  private readonly magnitudes = new Float32Array(this.frequencyBinCount);
  private readonly smoothed = new Float32Array(this.frequencyBinCount);

  constructor(private readonly clock: () => number) {}

  record(time: number, channels: Float32Array[]): void {
    const left = channels[0];
    if (!left) return;
    const right = channels[1] ?? left;
    const mono = new Float32Array(left.length);
    for (let index = 0; index < left.length; index++)
      mono[index] = ((left[index] ?? 0) + (right[index] ?? 0)) / 2;
    this.history.push({ time, samples: mono });
    const oldest = this.clock() - STREAM_METRICS.analyserHistorySeconds;
    while (
      (this.history[0]?.time ?? Infinity) < oldest &&
      this.history.length > 1
    )
      this.history.shift();
  }

  dropFrom(time: number): void {
    const kept = this.history.filter((batch) => batch.time < time);
    this.history.splice(0, this.history.length, ...kept);
  }

  hasData(): boolean {
    return this.fill(this.clock());
  }

  getByteTimeDomainData(array: Uint8Array<ArrayBuffer>): void {
    this.fill(this.clock());
    for (let index = 0; index < array.length; index++)
      array[index] = clampByte(128 + (this.window[index] ?? 0) * 128);
  }

  getByteFrequencyData(array: Uint8Array<ArrayBuffer>): void {
    this.fill(this.clock());
    fftMagnitudes(this.window, this.magnitudes);
    const smoothing = AUDIO_METRICS.analyserSmoothing;
    const min = AUDIO_METRICS.analyserMinDecibels;
    const range = AUDIO_METRICS.analyserMaxDecibels - min;
    for (let bin = 0; bin < array.length; bin++) {
      const value =
        smoothing * (this.smoothed[bin] ?? 0) +
        (1 - smoothing) * (this.magnitudes[bin] ?? 0);
      this.smoothed[bin] = value;
      const decibels = 20 * Math.log10(Math.max(value, 1e-12));
      array[bin] = clampByte(((decibels - min) / range) * 255);
    }
  }

  private fill(end: number): boolean {
    const size = this.window.length;
    const sampleRate = STREAM_METRICS.sampleRate;
    const start = end - size / sampleRate;
    let written = 0;
    this.window.fill(0);
    for (const batch of this.history) {
      const offset = Math.round((batch.time - start) * sampleRate);
      const from = Math.max(0, -offset);
      const to = Math.min(batch.samples.length, size - offset);
      if (to <= from) continue;
      this.window.set(batch.samples.subarray(from, to), offset + from);
      written += to - from;
    }
    return written > 0;
  }
}

function clampByte(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}
