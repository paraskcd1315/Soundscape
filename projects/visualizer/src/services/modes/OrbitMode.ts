import type { LayerKind } from "@soundscape/engine/models/LayerKind";
import type { OrbitMark } from "../../types/OrbitMark";
import type { OrbitPoint } from "../../types/OrbitPoint";
import type { OrbitPlanet } from "../../types/OrbitPlanet";
import type { VisualizerFrame } from "../../types/VisualizerFrame";
import type { VisualizerMode } from "../../types/VisualizerMode";
import { toCss } from "../../utils/colorMath.util";
import { createStarField } from "../../utils/createStarField.util";
import { STAR_FIELD } from "../../utils/constants/starField.constants";
import { ORBIT_METRICS, ORBIT_PLANETS } from "./constants/OrbitMode.constants";

export class OrbitMode implements VisualizerMode {
  readonly id = "orbit";
  readonly clearsFrame = true;
  private marks: OrbitMark[] = [];
  private fogPhase = 0;
  private readonly angles = new Map<LayerKind, number>(
    ORBIT_PLANETS.map((planet, index) => [
      planet.layer,
      index * ORBIT_METRICS.goldenAngle,
    ]),
  );
  private readonly flashes = new Map<LayerKind, number>();
  private readonly stars = createStarField(ORBIT_METRICS.starCount);
  private centerX = 0;
  private centerY = 0;
  private side = 0;

  draw(frame: VisualizerFrame): void {
    this.side = Math.min(frame.width, frame.height);
    this.centerX = frame.width / 2;
    this.centerY = frame.height / 2;
    const speed = frame.reducedMotion ? ORBIT_METRICS.reducedMotionSpeed : 1;
    this.fogPhase +=
      frame.deltaSeconds * ORBIT_METRICS.fogDriftPerSecond * speed;
    this.advancePlanets(frame.deltaSeconds * speed);
    this.collectNotes(frame);

    this.drawStars(frame);
    this.drawAmbience(frame);
    this.drawOrbits(frame);
    this.drawTrails(frame);
    const farSide = ORBIT_PLANETS.filter((planet) => this.depthOf(planet) < 0);
    const nearSide = ORBIT_PLANETS.filter(
      (planet) => this.depthOf(planet) >= 0,
    );
    farSide.forEach((planet) => this.drawPlanet(frame, planet));
    this.drawSun(frame);
    nearSide.forEach((planet) => this.drawPlanet(frame, planet));
  }

  reset(): void {
    this.marks = [];
    this.flashes.clear();
  }

  private project(angle: number, ringRatio: number): OrbitPoint {
    const radius = this.side * ringRatio;
    return {
      x: this.centerX + Math.cos(angle) * radius,
      y: this.centerY + Math.sin(angle) * radius * ORBIT_METRICS.viewTilt,
      depth: Math.sin(angle),
    };
  }

  private depthOf(planet: OrbitPlanet): number {
    return Math.sin(this.angles.get(planet.layer) ?? 0);
  }

  private advancePlanets(seconds: number): void {
    const inner = ORBIT_PLANETS[0]?.ringRatio ?? 1;
    for (const planet of ORBIT_PLANETS) {
      const period =
        ORBIT_METRICS.innerPeriodSeconds * (planet.ringRatio / inner) ** 1.5;
      const angle = this.angles.get(planet.layer) ?? 0;
      this.angles.set(
        planet.layer,
        (angle + (seconds / period) * ORBIT_METRICS.fullTurn) %
          ORBIT_METRICS.fullTurn,
      );
      const flash = this.flashes.get(planet.layer) ?? 0;
      this.flashes.set(
        planet.layer,
        Math.max(0, flash - seconds * ORBIT_METRICS.flashDecayPerSecond),
      );
    }
  }

  private collectNotes(frame: VisualizerFrame): void {
    for (const note of frame.notes) {
      if (note.kind !== "note" || note.layer === null) continue;
      const planet = ORBIT_PLANETS.find((entry) => entry.layer === note.layer);
      if (!planet) continue;
      this.flashes.set(
        note.layer,
        Math.max(this.flashes.get(note.layer) ?? 0, note.velocity),
      );
      if (this.marks.length >= ORBIT_METRICS.markLimit) this.marks.shift();
      this.marks.push({
        layer: note.layer,
        angle: this.angles.get(note.layer) ?? 0,
        radiusRatio: planet.ringRatio,
        size: 1.5 + note.velocity * 3,
        life: 0,
      });
    }
  }

  private drawStars(frame: VisualizerFrame): void {
    const { g, timeSeconds, reducedMotion, width, height } = frame;
    const scale = this.side / ORBIT_METRICS.starReferenceSide;
    for (const star of this.stars) {
      const wave =
        0.5 +
        0.5 *
          Math.sin(
            timeSeconds * star.speed * ORBIT_METRICS.fullTurn + star.phase,
          );
      const twinkle =
        star.twinkles && !reducedMotion
          ? 1 - STAR_FIELD.twinkleDepth * wave
          : 1;
      const alpha = star.brightness * twinkle;
      const x = star.x * width;
      const y = star.y * height;
      const radius = Math.max(0.5, star.size * scale);
      if (star.brightness > STAR_FIELD.glowAbove) {
        const halo = g.createRadialGradient(x, y, 0, x, y, radius * 4);
        halo.addColorStop(
          0,
          `rgba(${star.tint}, ${(alpha * 0.35).toFixed(3)})`,
        );
        halo.addColorStop(1, `rgba(${star.tint}, 0)`);
        g.fillStyle = halo;
        g.beginPath();
        g.arc(x, y, radius * 4, 0, ORBIT_METRICS.fullTurn);
        g.fill();
      }
      g.fillStyle = `rgba(${star.tint}, ${alpha.toFixed(3)})`;
      g.beginPath();
      g.arc(x, y, radius, 0, ORBIT_METRICS.fullTurn);
      g.fill();
    }
  }

  private drawAmbience(frame: VisualizerFrame): void {
    const { g, palette, layerLevels, intensity } = frame;
    const sources: readonly [LayerKind, number][] = [
      ["pad", 0],
      ["texture", Math.PI],
    ];
    for (const [layer, offset] of sources) {
      const angle = this.fogPhase * ORBIT_METRICS.fullTurn + offset;
      const x = this.centerX + Math.cos(angle) * this.side * 0.22;
      const y = this.centerY + Math.sin(angle * 0.7) * this.side * 0.16;
      const radius = this.side * (0.55 + 0.15 * layerLevels[layer]);
      const fog = g.createRadialGradient(x, y, 0, x, y, radius);
      fog.addColorStop(
        0,
        toCss(
          palette.accents[layer],
          (0.08 + 0.2 * layerLevels[layer]) * intensity,
        ),
      );
      fog.addColorStop(1, toCss(palette.accents[layer], 0));
      g.fillStyle = fog;
      g.fillRect(0, 0, frame.width, frame.height);
    }
  }

  private drawOrbits(frame: VisualizerFrame): void {
    const { g, palette, layerLevels } = frame;
    const segments = ORBIT_METRICS.trailArcSegments;
    const span = ORBIT_METRICS.trailArcRadians;
    g.lineWidth = Math.max(1, this.side * ORBIT_METRICS.trailArcWidthRatio);
    g.lineCap = "round";
    for (const planet of ORBIT_PLANETS) {
      const angle = this.angles.get(planet.layer) ?? 0;
      const radius = this.side * planet.ringRatio;
      const strength = 0.18 + 0.4 * layerLevels[planet.layer];
      for (let segment = 0; segment < segments; segment++) {
        const head = angle - (span * segment) / segments;
        const tail = angle - (span * (segment + 1)) / segments;
        g.strokeStyle = toCss(
          palette.accents[planet.layer],
          strength * (1 - segment / segments),
        );
        g.beginPath();
        g.ellipse(
          this.centerX,
          this.centerY,
          radius,
          radius * ORBIT_METRICS.viewTilt,
          0,
          tail,
          head,
        );
        g.stroke();
      }
    }
  }

  private drawTrails(frame: VisualizerFrame): void {
    const { g, palette, deltaSeconds, intensity } = frame;
    for (const mark of this.marks) mark.life += deltaSeconds;
    this.marks = this.marks.filter(
      (mark) => mark.life < ORBIT_METRICS.trailLife,
    );
    for (const mark of this.marks) {
      const fade = 1 - mark.life / ORBIT_METRICS.trailLife;
      const point = this.project(mark.angle, mark.radiusRatio);
      g.fillStyle = toCss(palette.accents[mark.layer], 0.6 * fade * intensity);
      g.beginPath();
      g.arc(point.x, point.y, mark.size * fade, 0, ORBIT_METRICS.fullTurn);
      g.fill();
    }
  }

  private drawPlanet(frame: VisualizerFrame, planet: OrbitPlanet): void {
    const { g, palette, layerLevels, intensity } = frame;
    const angle = this.angles.get(planet.layer) ?? 0;
    const flash = this.flashes.get(planet.layer) ?? 0;
    const point = this.project(angle, planet.ringRatio);
    const perspective = 1 + ORBIT_METRICS.depthScale * point.depth;
    const size =
      this.side *
      perspective *
      (ORBIT_METRICS.planetBaseRatio +
        ORBIT_METRICS.planetLevelRatio * layerLevels[planet.layer] +
        ORBIT_METRICS.planetFlashRatio * flash);
    const color = palette.accents[planet.layer];
    const glowRadius = size * ORBIT_METRICS.planetGlowScale;
    const glow = g.createRadialGradient(
      point.x,
      point.y,
      0,
      point.x,
      point.y,
      glowRadius,
    );
    glow.addColorStop(0, toCss(color, (0.25 + 0.5 * flash) * intensity));
    glow.addColorStop(1, toCss(color, 0));
    g.fillStyle = glow;
    g.beginPath();
    g.arc(point.x, point.y, glowRadius, 0, ORBIT_METRICS.fullTurn);
    g.fill();
    const towardSunX = this.centerX - point.x;
    const towardSunY = this.centerY - point.y;
    const distance = Math.hypot(towardSunX, towardSunY) || 1;
    const lightX = point.x + (towardSunX / distance) * size * 0.45;
    const lightY = point.y + (towardSunY / distance) * size * 0.45;
    const body = g.createRadialGradient(
      lightX,
      lightY,
      size * 0.05,
      point.x,
      point.y,
      size,
    );
    body.addColorStop(0, toCss(color, 1));
    body.addColorStop(0.6, toCss(color, 0.85));
    body.addColorStop(1, `rgba(4, 6, 14, 0.9)`);
    g.fillStyle = body;
    g.beginPath();
    g.arc(point.x, point.y, size, 0, ORBIT_METRICS.fullTurn);
    g.fill();
  }

  private drawSun(frame: VisualizerFrame): void {
    const { g, palette, beatPulse, layerLevels, reducedMotion } = frame;
    const pulse = reducedMotion
      ? 0
      : Math.max(beatPulse * 0.5, layerLevels.drums);
    const radius = this.side * ORBIT_METRICS.coreRatio * (1 + 0.2 * pulse);
    const corona = g.createRadialGradient(
      this.centerX,
      this.centerY,
      radius * 0.6,
      this.centerX,
      this.centerY,
      radius * 3,
    );
    corona.addColorStop(0, toCss(palette.accents.drums, 0.3 + 0.2 * pulse));
    corona.addColorStop(1, toCss(palette.accents.drums, 0));
    g.fillStyle = corona;
    g.beginPath();
    g.arc(this.centerX, this.centerY, radius * 3, 0, ORBIT_METRICS.fullTurn);
    g.fill();
    const disc = g.createRadialGradient(
      this.centerX,
      this.centerY,
      0,
      this.centerX,
      this.centerY,
      radius,
    );
    disc.addColorStop(0, "rgba(255, 255, 250, 1)");
    disc.addColorStop(0.45, toCss(palette.accents.texture, 0.95));
    disc.addColorStop(0.85, toCss(palette.accents.drums, 0.85));
    disc.addColorStop(1, toCss(palette.accents.drums, 0));
    g.fillStyle = disc;
    g.beginPath();
    g.arc(this.centerX, this.centerY, radius, 0, ORBIT_METRICS.fullTurn);
    g.fill();
  }
}
