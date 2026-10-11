import type { LayerKind } from "@soundscape/engine/models/LayerKind";
import type { OrbitMark } from "../../types/OrbitMark";
import type { VisualizerFrame } from "../../types/VisualizerFrame";
import type { VisualizerMode } from "../../types/VisualizerMode";
import { toCss } from "../../utils/colorMath.util";
import {
  ORBIT_MARK_LIFE,
  ORBIT_METRICS,
  ORBIT_RING_FOR_LAYER,
} from "./constants/OrbitMode.constants";

export class OrbitMode implements VisualizerMode {
  readonly id = "orbit";
  readonly clearsFrame = true;
  private marks: OrbitMark[] = [];
  private fogPhase = 0;

  draw(frame: VisualizerFrame): void {
    const side = Math.min(frame.width, frame.height);
    const centerX = frame.width / 2;
    const centerY = frame.height / 2;
    this.fogPhase +=
      frame.deltaSeconds *
      ORBIT_METRICS.fogDriftPerSecond *
      (frame.reducedMotion ? 0.3 : 1);

    this.drawAmbience(frame, centerX, centerY, side);
    this.drawRings(frame, centerX, centerY, side);
    this.drawBassWave(frame, centerX, centerY, side);
    this.spawnMarks(frame);
    this.drawMarks(frame, centerX, centerY, side);
    this.drawPlayhead(frame, centerX, centerY, side);
    this.drawCore(frame, centerX, centerY, side);
  }

  reset(): void {
    this.marks = [];
  }

  private drawAmbience(
    frame: VisualizerFrame,
    centerX: number,
    centerY: number,
    side: number,
  ): void {
    const { g, palette, layerLevels, intensity } = frame;
    const sources: readonly [LayerKind, number][] = [
      ["pad", 0],
      ["texture", Math.PI],
    ];
    for (const [layer, offset] of sources) {
      const angle = this.fogPhase * ORBIT_METRICS.fullTurn + offset;
      const x = centerX + Math.cos(angle) * side * 0.22;
      const y = centerY + Math.sin(angle * 0.7) * side * 0.16;
      const radius = side * (0.55 + 0.15 * layerLevels[layer]);
      const fog = g.createRadialGradient(x, y, 0, x, y, radius);
      fog.addColorStop(
        0,
        toCss(
          palette.accents[layer],
          (0.12 + 0.28 * layerLevels[layer]) * intensity,
        ),
      );
      fog.addColorStop(1, toCss(palette.accents[layer], 0));
      g.fillStyle = fog;
      g.fillRect(0, 0, frame.width, frame.height);
    }
  }

  private drawRings(
    frame: VisualizerFrame,
    centerX: number,
    centerY: number,
    side: number,
  ): void {
    const { g, palette, layerLevels } = frame;
    const rings: readonly [LayerKind, number][] = [
      ["bass", ORBIT_METRICS.bassRingRatio],
      ["chords", ORBIT_METRICS.chordRingRatio],
      ["melody", ORBIT_METRICS.melodyRingRatio],
      ["drums", ORBIT_METRICS.drumRingRatio],
    ];
    for (const [layer, ratio] of rings) {
      g.strokeStyle = toCss(
        palette.accents[layer],
        0.12 + 0.25 * layerLevels[layer],
      );
      g.lineWidth = 1 + 2 * layerLevels[layer];
      g.beginPath();
      g.arc(centerX, centerY, side * ratio, 0, ORBIT_METRICS.fullTurn);
      g.stroke();
    }
    const drumRadius = side * ORBIT_METRICS.drumRingRatio;
    for (let step = 0; step < ORBIT_METRICS.stepCount; step++) {
      const angle =
        ORBIT_METRICS.topAngle +
        (step / ORBIT_METRICS.stepCount) * ORBIT_METRICS.fullTurn;
      const length = step % 4 === 0 ? 10 : 5;
      g.strokeStyle = toCss(palette.accents.drums, step % 4 === 0 ? 0.45 : 0.2);
      g.lineWidth = 2;
      g.beginPath();
      g.moveTo(
        centerX + Math.cos(angle) * (drumRadius - length),
        centerY + Math.sin(angle) * (drumRadius - length),
      );
      g.lineTo(
        centerX + Math.cos(angle) * drumRadius,
        centerY + Math.sin(angle) * drumRadius,
      );
      g.stroke();
    }
  }

  private drawBassWave(
    frame: VisualizerFrame,
    centerX: number,
    centerY: number,
    side: number,
  ): void {
    const { g, palette, bands, layerLevels, timeSeconds, intensity } = frame;
    let low = 0;
    for (let band = 0; band < ORBIT_METRICS.bassBandCount; band++)
      low += bands[band] as number;
    low /= ORBIT_METRICS.bassBandCount;
    const base = side * ORBIT_METRICS.bassRingRatio;
    const swell = side * 0.05 * (low + layerLevels.bass) * intensity;
    g.strokeStyle = toCss(palette.accents.bass, 0.35 + 0.5 * layerLevels.bass);
    g.lineWidth = 3 + 6 * layerLevels.bass;
    g.beginPath();
    for (
      let segment = 0;
      segment <= ORBIT_METRICS.bassWaveSegments;
      segment++
    ) {
      const angle =
        (segment / ORBIT_METRICS.bassWaveSegments) * ORBIT_METRICS.fullTurn;
      const ripple = Math.sin(angle * 6 + timeSeconds * 2.4) * swell;
      const x = centerX + Math.cos(angle) * (base + ripple);
      const y = centerY + Math.sin(angle) * (base + ripple);
      if (segment === 0) g.moveTo(x, y);
      else g.lineTo(x, y);
    }
    g.closePath();
    g.stroke();
  }

  private spawnMarks(frame: VisualizerFrame): void {
    for (const note of frame.notes) {
      if (note.kind !== "note" || note.layer === null || note.layer === "bass")
        continue;
      if (this.marks.length >= ORBIT_METRICS.markLimit) this.marks.shift();
      const pitch = Math.min(
        1,
        Math.max(
          0,
          (note.midi - ORBIT_METRICS.lowestMidi) / ORBIT_METRICS.midiSpan,
        ),
      );
      this.marks.push({
        layer: note.layer,
        angle:
          ORBIT_METRICS.topAngle +
          (note.beatInBar / ORBIT_METRICS.beatsPerBar) * ORBIT_METRICS.fullTurn,
        offset:
          note.layer === "drums" || note.layer === "texture"
            ? 0
            : (pitch - 0.5) * 0.06,
        size: 2 + note.velocity * 6,
        life: 0,
        maxLife: ORBIT_MARK_LIFE[note.layer],
      });
    }
  }

  private drawMarks(
    frame: VisualizerFrame,
    centerX: number,
    centerY: number,
    side: number,
  ): void {
    const { g, palette, deltaSeconds, intensity } = frame;
    this.marks = this.marks.filter((mark) => mark.life < mark.maxLife);
    for (const mark of this.marks) {
      mark.life += deltaSeconds;
      const fade = 1 - mark.life / mark.maxLife;
      const radius = side * (ORBIT_RING_FOR_LAYER[mark.layer] + mark.offset);
      const x = centerX + Math.cos(mark.angle) * radius;
      const y = centerY + Math.sin(mark.angle) * radius;
      const size = mark.size * (0.6 + 0.6 * fade);
      const glow = g.createRadialGradient(x, y, 0, x, y, size * 3);
      glow.addColorStop(
        0,
        toCss(palette.accents[mark.layer], 0.9 * fade * intensity),
      );
      glow.addColorStop(1, toCss(palette.accents[mark.layer], 0));
      g.fillStyle = glow;
      g.beginPath();
      g.arc(x, y, size * 3, 0, ORBIT_METRICS.fullTurn);
      g.fill();
    }
  }

  private drawPlayhead(
    frame: VisualizerFrame,
    centerX: number,
    centerY: number,
    side: number,
  ): void {
    const { g, palette, beatPhase } = frame;
    const angle = ORBIT_METRICS.topAngle + beatPhase * ORBIT_METRICS.fullTurn;
    const outer = side * (ORBIT_METRICS.drumRingRatio + 0.02);
    const gradient = g.createLinearGradient(
      centerX,
      centerY,
      centerX + Math.cos(angle) * outer,
      centerY + Math.sin(angle) * outer,
    );
    gradient.addColorStop(0, toCss(palette.accents.texture, 0));
    gradient.addColorStop(1, toCss(palette.accents.texture, 0.55));
    g.strokeStyle = gradient;
    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(centerX, centerY);
    g.lineTo(
      centerX + Math.cos(angle) * outer,
      centerY + Math.sin(angle) * outer,
    );
    g.stroke();
  }

  private drawCore(
    frame: VisualizerFrame,
    centerX: number,
    centerY: number,
    side: number,
  ): void {
    const { g, palette, beatPulse, layerLevels, reducedMotion } = frame;
    const pulse = reducedMotion
      ? 0
      : Math.max(beatPulse * 0.5, layerLevels.drums);
    const radius = side * ORBIT_METRICS.coreRatio * (1 + 0.35 * pulse);
    const core = g.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      radius,
    );
    core.addColorStop(0, toCss(palette.accents.texture, 0.95));
    core.addColorStop(0.55, toCss(palette.accents.drums, 0.6 + 0.3 * pulse));
    core.addColorStop(1, toCss(palette.accents.drums, 0));
    g.fillStyle = core;
    g.beginPath();
    g.arc(centerX, centerY, radius, 0, ORBIT_METRICS.fullTurn);
    g.fill();
  }
}
