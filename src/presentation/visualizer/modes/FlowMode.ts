import { toCss } from "../colorMath";
import type { VisualizerFrame } from "../VisualizerFrame";
import type { VisualizerMode } from "../VisualizerMode";
import { VISUALIZER_METRICS } from "../visualizerMetrics";
import type { FlowParticle } from "./FlowParticle";

const RIBBON_LAYERS = ["chords", "melody", "texture"] as const;
const FULL_TURN = Math.PI * 2;
const LOWEST_MIDI = 36;
const MIDI_SPAN = 60;
const SAMPLE_STEP = 4;

export class FlowMode implements VisualizerMode {
  readonly id = "flow";
  readonly clearsFrame = false;
  private particles: FlowParticle[] = [];

  draw(frame: VisualizerFrame): void {
    const {
      g,
      width,
      height,
      palette,
      intensity,
      waveform,
      timeSeconds,
      level,
      reducedMotion,
    } = frame;

    g.fillStyle = toCss(palette.bottom, VISUALIZER_METRICS.flowTrailAlpha);
    g.fillRect(0, 0, width, height);

    const glow = g.createLinearGradient(0, height, 0, height * 0.55);
    glow.addColorStop(0, toCss(palette.accents.bass, 0.35 * level * intensity));
    glow.addColorStop(1, toCss(palette.accents.bass, 0));
    g.fillStyle = glow;
    g.fillRect(0, height * 0.55, width, height * 0.45);

    g.lineWidth = 2;
    RIBBON_LAYERS.forEach((layer, ribbon) => {
      const offset = (ribbon - 1) * height * 0.12;
      const amplitude =
        height * 0.18 * (0.4 + intensity * 0.6) * (ribbon + 1) * 0.6;
      g.strokeStyle = toCss(palette.accents[layer], 0.55);
      g.beginPath();
      for (let x = 0; x <= width; x += SAMPLE_STEP) {
        const sample =
          (waveform[
            Math.floor((x / width) * (waveform.length - 1))
          ] as number) - 128;
        const drift =
          Math.sin(x * 0.01 + timeSeconds * (0.6 + ribbon * 0.3)) *
          height *
          0.015;
        const y = height * 0.5 + offset + (sample / 128) * amplitude + drift;
        if (x === 0) g.moveTo(x, y);
        else g.lineTo(x, y);
      }
      g.stroke();
    });

    this.spawn(frame);
    this.drawParticles(frame, reducedMotion ? 0.4 : 1);
  }

  reset(): void {
    this.particles = [];
  }

  private spawn(frame: VisualizerFrame): void {
    const { width, height } = frame;
    for (const note of frame.notes) {
      if (note.kind !== "note" || note.layer === null) continue;
      if (this.particles.length >= VISUALIZER_METRICS.flowParticleLimit)
        this.particles.shift();
      const pitchPosition =
        note.layer === "drums"
          ? Math.random()
          : (note.midi - LOWEST_MIDI) / MIDI_SPAN;
      this.particles.push({
        x: Math.min(0.97, Math.max(0.03, pitchPosition)) * width,
        y: height * (0.82 + Math.random() * 0.1),
        velocityY: -(height * (0.06 + 0.16 * note.velocity)),
        sway: (Math.random() - 0.5) * 2,
        size: 1.5 + note.velocity * 5 * (height / 800 + 0.4),
        life: 0,
        maxLife: 2.2 + Math.random() * 1.6,
        color: frame.palette.accents[note.layer],
      });
    }
  }

  private drawParticles(frame: VisualizerFrame, speed: number): void {
    const { g, deltaSeconds, timeSeconds, intensity } = frame;
    this.particles = this.particles.filter(
      (particle) => particle.life < particle.maxLife,
    );
    for (const particle of this.particles) {
      particle.life += deltaSeconds;
      particle.y += particle.velocityY * deltaSeconds * speed;
      particle.x +=
        Math.sin(timeSeconds * 2 + particle.sway * 5) *
        14 *
        particle.sway *
        deltaSeconds *
        speed;
      const fade = 1 - particle.life / particle.maxLife;
      g.fillStyle = toCss(particle.color, Math.max(0, fade) * 0.9 * intensity);
      g.beginPath();
      g.arc(
        particle.x,
        particle.y,
        particle.size * (0.5 + fade * 0.5),
        0,
        FULL_TURN,
      );
      g.fill();
    }
  }
}
