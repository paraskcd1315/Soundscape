import { clamp } from "../../domain/theory/clamp";
import { VISUALIZER_METRICS } from "./visualizerMetrics";

export class BandAnalyzer {
  readonly levels: Float32Array;
  readonly peaks: Float32Array;
  private edges: number[] = [];
  private edgeKey = "";

  constructor(readonly bandCount: number) {
    this.levels = new Float32Array(bandCount);
    this.peaks = new Float32Array(bandCount);
  }

  update(
    spectrum: Uint8Array | null,
    sampleRate: number,
    deltaSeconds: number,
  ): void {
    if (spectrum) this.ensureEdges(spectrum.length, sampleRate);
    for (let band = 0; band < this.bandCount; band++) {
      const target = spectrum ? this.bandValue(spectrum, band) : 0;
      const current = this.levels[band] as number;
      const rate =
        target > current
          ? VISUALIZER_METRICS.attackPerSecond
          : VISUALIZER_METRICS.releasePerSecond;
      const next =
        current + (target - current) * clamp(rate * deltaSeconds, 0, 1);
      this.levels[band] = next;
      const peak = Math.max(
        next,
        (this.peaks[band] as number) -
          VISUALIZER_METRICS.peakFallPerSecond * deltaSeconds,
      );
      this.peaks[band] = peak;
    }
  }

  private ensureEdges(binCount: number, sampleRate: number): void {
    const key = `${binCount}:${sampleRate}`;
    if (key === this.edgeKey) return;
    this.edgeKey = key;
    const nyquist = sampleRate / 2;
    const ratio = VISUALIZER_METRICS.maxHz / VISUALIZER_METRICS.minHz;
    this.edges = Array.from({ length: this.bandCount + 1 }, (_, index) => {
      const hertz =
        VISUALIZER_METRICS.minHz * Math.pow(ratio, index / this.bandCount);
      return Math.min(binCount - 1, Math.floor((hertz / nyquist) * binCount));
    });
  }

  private bandValue(spectrum: Uint8Array, band: number): number {
    const start = this.edges[band] as number;
    const end = Math.max(start + 1, this.edges[band + 1] as number);
    let sum = 0;
    for (let bin = start; bin < end; bin++) sum += spectrum[bin] as number;
    const tilt = 0.75 + 0.5 * (band / this.bandCount);
    return clamp((sum / (end - start) / 255) * tilt, 0, 1);
  }
}
