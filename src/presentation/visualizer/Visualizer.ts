import type { StylePalette } from "../../domain/model/StylePalette";
import type { VisualizerModeId } from "../../domain/model/VisualizerModeId";
import { clamp } from "../../domain/theory/clamp";
import { BandAnalyzer } from "./BandAnalyzer";
import { toCss } from "./colorMath";
import { fillIdleSpectrum, fillIdleWaveform } from "./fillIdleSignal";
import { createModes } from "./modes/modeCatalog";
import { PaletteBlender } from "./PaletteBlender";
import type { VisualizerFrame } from "./VisualizerFrame";
import { VISUALIZER_METRICS } from "./visualizerMetrics";
import type { VisualizerMode } from "./VisualizerMode";
import type { VisualizerSource } from "./VisualizerSource";

const IDLE_BINS = 1024;
const MAX_DELTA_SECONDS = 0.1;
const MIN_DELTA_SECONDS = 0.001;
const DEFAULT_SAMPLE_RATE = 48000;

export class Visualizer {
  private readonly g: CanvasRenderingContext2D;
  private readonly modes = createModes();
  private readonly bands = new BandAnalyzer(VISUALIZER_METRICS.bandCount);
  private readonly blender: PaletteBlender;
  private readonly idleSpectrum = new Uint8Array(IDLE_BINS);
  private readonly idleWaveform = new Uint8Array(IDLE_BINS);
  private readonly motionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );
  private readonly resizeObserver: ResizeObserver;
  private spectrum: Uint8Array<ArrayBuffer> | null = null;
  private waveform: Uint8Array<ArrayBuffer> | null = null;
  private mode: VisualizerMode;
  private intensity = 0.7;
  private beatPulse = 0;
  private lastTimestamp = 0;
  private handle = 0;
  private slowFrames = 0;
  private resolutionScale = 1;
  private cssWidth = 0;
  private cssHeight = 0;
  private needsOpaqueClear = true;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly source: VisualizerSource,
    palette: StylePalette,
    modeId: VisualizerModeId,
  ) {
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas 2D is not available");
    this.g = context;
    this.blender = new PaletteBlender(palette);
    this.mode = this.modes[modeId];
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(canvas);
  }

  setMode(id: VisualizerModeId): void {
    if (this.modes[id] === this.mode) return;
    this.mode.reset();
    this.mode = this.modes[id];
    this.needsOpaqueClear = true;
  }

  setPalette(palette: StylePalette): void {
    this.blender.setTarget(palette);
  }

  setIntensity(value: number): void {
    this.intensity = value;
  }

  start(): void {
    if (this.handle !== 0) return;
    this.resize();
    this.lastTimestamp = performance.now();
    this.handle = requestAnimationFrame((timestamp) => this.frame(timestamp));
  }

  stop(): void {
    cancelAnimationFrame(this.handle);
    this.handle = 0;
  }

  dispose(): void {
    this.stop();
    this.resizeObserver.disconnect();
  }

  resize(): void {
    const ratio = Math.min(
      window.devicePixelRatio || 1,
      VISUALIZER_METRICS.maxDevicePixelRatio,
    );
    const scale = ratio * this.resolutionScale;
    this.cssWidth = this.canvas.clientWidth;
    this.cssHeight = this.canvas.clientHeight;
    this.canvas.width = Math.max(1, Math.floor(this.cssWidth * scale));
    this.canvas.height = Math.max(1, Math.floor(this.cssHeight * scale));
    this.g.setTransform(
      this.canvas.width / Math.max(1, this.cssWidth),
      0,
      0,
      this.canvas.height / Math.max(1, this.cssHeight),
      0,
      0,
    );
    this.needsOpaqueClear = true;
  }

  private frame(timestamp: number): void {
    this.handle = requestAnimationFrame((next) => this.frame(next));
    const deltaSeconds = clamp(
      (timestamp - this.lastTimestamp) / 1000,
      MIN_DELTA_SECONDS,
      MAX_DELTA_SECONDS,
    );
    this.lastTimestamp = timestamp;
    this.adaptResolution(deltaSeconds * 1000);
    if (document.hidden || this.cssWidth === 0 || this.cssHeight === 0) return;

    const timeSeconds = timestamp / 1000;
    const analyser = this.source.analyser();
    const sampleRate = analyser?.context.sampleRate ?? DEFAULT_SAMPLE_RATE;

    let spectrum: Uint8Array;
    let waveform: Uint8Array;
    if (analyser) {
      if (
        !this.spectrum ||
        this.spectrum.length !== analyser.frequencyBinCount
      ) {
        this.spectrum = new Uint8Array(analyser.frequencyBinCount);
        this.waveform = new Uint8Array(analyser.fftSize);
      }
      analyser.getByteFrequencyData(this.spectrum);
      analyser.getByteTimeDomainData(this.waveform as Uint8Array<ArrayBuffer>);
      spectrum = this.spectrum;
      waveform = this.waveform as Uint8Array;
    } else {
      fillIdleSpectrum(this.idleSpectrum, timeSeconds);
      fillIdleWaveform(this.idleWaveform, timeSeconds);
      spectrum = this.idleSpectrum;
      waveform = this.idleWaveform;
    }

    this.bands.update(spectrum, sampleRate, deltaSeconds);

    const now = this.source.currentTime();
    const due = this.source.timeline
      .takeDue(now)
      .filter((item) => item.time > now - VISUALIZER_METRICS.staleItemSeconds);
    this.beatPulse *= Math.exp(
      -deltaSeconds * VISUALIZER_METRICS.beatDecayPerSecond,
    );
    for (const item of due) {
      if (item.kind === "beat")
        this.beatPulse = Math.max(this.beatPulse, item.velocity);
    }

    const palette = this.blender.step(deltaSeconds);
    const frame: VisualizerFrame = {
      g: this.g,
      width: this.cssWidth,
      height: this.cssHeight,
      deltaSeconds,
      timeSeconds,
      bands: this.bands.levels,
      peaks: this.bands.peaks,
      waveform,
      level: this.measureLevel(waveform),
      beatPulse: this.beatPulse,
      notes: due,
      palette,
      intensity: this.intensity,
      reducedMotion: this.motionQuery.matches,
    };

    if (this.mode.clearsFrame || this.needsOpaqueClear) {
      const background = this.g.createLinearGradient(0, 0, 0, this.cssHeight);
      background.addColorStop(0, toCss(palette.top));
      background.addColorStop(1, toCss(palette.bottom));
      this.g.fillStyle = background;
      this.g.fillRect(0, 0, this.cssWidth, this.cssHeight);
      this.needsOpaqueClear = false;
    }
    this.mode.draw(frame);
  }

  private measureLevel(waveform: Uint8Array): number {
    let sum = 0;
    for (let index = 0; index < waveform.length; index += 4) {
      const sample = ((waveform[index] as number) - 128) / 128;
      sum += sample * sample;
    }
    return clamp(Math.sqrt(sum / (waveform.length / 4)) * 3, 0, 1);
  }

  private adaptResolution(frameMilliseconds: number): void {
    if (frameMilliseconds > VISUALIZER_METRICS.slowFrameMilliseconds)
      this.slowFrames++;
    else this.slowFrames = Math.max(0, this.slowFrames - 1);
    if (
      this.slowFrames >= VISUALIZER_METRICS.slowFrameLimit &&
      this.resolutionScale > VISUALIZER_METRICS.minResolutionScale
    ) {
      this.resolutionScale = Math.max(
        VISUALIZER_METRICS.minResolutionScale,
        this.resolutionScale - VISUALIZER_METRICS.resolutionStep,
      );
      this.slowFrames = 0;
      this.resize();
    }
  }
}
