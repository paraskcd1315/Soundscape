import { mixRgb, toCss } from "../colorMath";
import type { VisualizerFrame } from "../VisualizerFrame";
import type { VisualizerMode } from "../VisualizerMode";
import { VISUALIZER_METRICS } from "../visualizerMetrics";
import type { RadialRing } from "./RadialRing";

const RING_FADE_PER_SECOND = 0.6;
const RING_SPEED_RATIO = 0.35;
const FULL_TURN = Math.PI * 2;

export class RadialMode implements VisualizerMode {
  readonly id = "radial";
  readonly clearsFrame = true;
  private rotation = 0;
  private rings: RadialRing[] = [];

  draw(frame: VisualizerFrame): void {
    const {
      g,
      width,
      height,
      bands,
      palette,
      intensity,
      beatPulse,
      reducedMotion,
      deltaSeconds,
      level,
    } = frame;
    const side = Math.min(width, height);
    const centerX = width / 2;
    const centerY = height / 2;
    const pulse = reducedMotion ? 0 : beatPulse;
    const baseRadius =
      side * VISUALIZER_METRICS.radialBaseRatio * (1 + pulse * 0.07);
    const maxLength =
      side * VISUALIZER_METRICS.radialMaxLengthRatio * (0.6 + 0.4 * intensity);
    const spin =
      VISUALIZER_METRICS.radialRotationPerSecond *
      (reducedMotion ? 0.25 : 0.4 + level * 2);
    this.rotation += deltaSeconds * spin;

    this.spawnRings(frame, baseRadius, side);
    this.drawRings(frame, centerX, centerY);

    const count = bands.length;
    const total = count * 2;
    g.lineCap = "round";
    g.lineWidth = Math.max(2, (FULL_TURN * baseRadius) / total - 2);
    for (let index = 0; index < total; index++) {
      const band = index < count ? index : total - 1 - index;
      const length = Math.max(2, (bands[band] as number) * maxLength);
      const angle = this.rotation + (index / total) * FULL_TURN;
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const color = mixRgb(
        palette.accents.chords,
        palette.accents.melody,
        band / count,
      );
      g.strokeStyle = toCss(color, 0.92);
      g.beginPath();
      g.moveTo(centerX + cos * baseRadius, centerY + sin * baseRadius);
      g.lineTo(
        centerX + cos * (baseRadius + length),
        centerY + sin * (baseRadius + length),
      );
      g.stroke();
    }

    const core = g.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      baseRadius * 0.95,
    );
    core.addColorStop(0, toCss(palette.accents.texture, 0.5 + 0.35 * pulse));
    core.addColorStop(1, toCss(palette.accents.bass, 0.05));
    g.fillStyle = core;
    g.beginPath();
    g.arc(centerX, centerY, baseRadius * 0.95, 0, FULL_TURN);
    g.fill();
  }

  reset(): void {
    this.rings = [];
    this.rotation = 0;
  }

  private spawnRings(
    frame: VisualizerFrame,
    baseRadius: number,
    side: number,
  ): void {
    for (const note of frame.notes) {
      if (note.kind !== "note" || note.layer === null) continue;
      if (this.rings.length >= VISUALIZER_METRICS.maxRings) this.rings.shift();
      this.rings.push({
        radius: baseRadius,
        alpha: 0.2 + 0.5 * note.velocity,
        speed: side * RING_SPEED_RATIO * (frame.reducedMotion ? 0.4 : 1),
        color: frame.palette.accents[note.layer],
      });
    }
  }

  private drawRings(
    frame: VisualizerFrame,
    centerX: number,
    centerY: number,
  ): void {
    const { g, deltaSeconds } = frame;
    g.lineWidth = 2;
    this.rings = this.rings.filter((ring) => ring.alpha > 0.01);
    for (const ring of this.rings) {
      ring.radius += ring.speed * deltaSeconds;
      ring.alpha -= RING_FADE_PER_SECOND * deltaSeconds;
      g.strokeStyle = toCss(
        ring.color,
        Math.max(0, ring.alpha) * frame.intensity,
      );
      g.beginPath();
      g.arc(centerX, centerY, ring.radius, 0, FULL_TURN);
      g.stroke();
    }
  }
}
