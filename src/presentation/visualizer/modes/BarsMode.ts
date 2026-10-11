import { mixRgb, toCss } from "../colorMath";
import type { VisualizerFrame } from "../VisualizerFrame";
import type { VisualizerMode } from "../VisualizerMode";
import { VISUALIZER_METRICS } from "../visualizerMetrics";

const PEAK_CAP_HEIGHT = 3;
const MIN_BAR_HEIGHT = 2;
const BAR_GAP_RATIO = 0.22;

export class BarsMode implements VisualizerMode {
  readonly id = "bars";
  readonly clearsFrame = true;

  draw(frame: VisualizerFrame): void {
    const {
      g,
      width,
      height,
      bands,
      peaks,
      palette,
      intensity,
      beatPulse,
      reducedMotion,
    } = frame;
    const count = bands.length;
    const margin = width * VISUALIZER_METRICS.barsMarginRatio;
    const slot = (width - margin * 2) / count;
    const barWidth = slot * (1 - BAR_GAP_RATIO);
    const baseline = height * VISUALIZER_METRICS.barsBaselineRatio;
    const maxHeight =
      height * VISUALIZER_METRICS.barsMaxHeightRatio * (0.6 + 0.4 * intensity);

    if (!reducedMotion && beatPulse > 0.02) {
      const glow = g.createRadialGradient(
        width / 2,
        baseline,
        0,
        width / 2,
        baseline,
        width * 0.6,
      );
      glow.addColorStop(
        0,
        toCss(palette.accents.drums, 0.18 * beatPulse * intensity),
      );
      glow.addColorStop(1, toCss(palette.accents.drums, 0));
      g.fillStyle = glow;
      g.fillRect(0, 0, width, height);
    }

    for (let index = 0; index < count; index++) {
      const level = bands[index] as number;
      const barHeight = Math.max(MIN_BAR_HEIGHT, level * maxHeight);
      const x = margin + index * slot + (slot - barWidth) / 2;
      const color = mixRgb(
        palette.accents.bass,
        palette.accents.melody,
        index / count,
      );
      g.fillStyle = toCss(color, 0.9);
      g.fillRect(x, baseline - barHeight, barWidth, barHeight);
      g.fillStyle = toCss(color, 0.16);
      g.fillRect(
        x,
        baseline + 4,
        barWidth,
        barHeight * VISUALIZER_METRICS.barsReflectionRatio,
      );
      const peakHeight = Math.max(
        MIN_BAR_HEIGHT,
        (peaks[index] as number) * maxHeight,
      );
      g.fillStyle = toCss(palette.accents.texture, 0.85);
      g.fillRect(
        x,
        baseline - peakHeight - PEAK_CAP_HEIGHT - 2,
        barWidth,
        PEAK_CAP_HEIGHT,
      );
    }
  }

  reset(): void {}
}
