import type { Settings } from "@soundscape/engine/models/Settings";
import type { EventTimeline } from "@soundscape/engine/services/transport/EventTimeline";
import { Transport } from "@soundscape/engine/services/transport/Transport";
import { LAYER_KINDS } from "@soundscape/engine/constants/layerKinds.constants";
import { AudioEngine } from "../engine/AudioEngine";
import { WorkerTicker } from "../ticker/WorkerTicker";
import type { DrumSampleBank } from "../samples/DrumSampleBank";
import {
  ALL_OTHER_LAYERS,
  EARLY_EXIT_LAYERS,
  LATE_ENTRY_LAYERS,
  TRANSITION_METRICS,
} from "./constants/transition.constants";
import { barSeconds } from "./utils/barSeconds.util";

export class Deck {
  private readonly engine: AudioEngine;
  private readonly transport: Transport;
  private readonly fader: GainNode;
  private frozen: Settings | null = null;
  private disposed = false;

  constructor(
    private readonly context: AudioContext,
    output: AudioNode,
    timeline: EventTimeline,
    private readonly live: () => Settings,
    drumBank: DrumSampleBank,
  ) {
    this.fader = context.createGain();
    this.fader.gain.value = 0;
    this.fader.connect(output);
    this.engine = new AudioEngine(context, this.fader, drumBank);
    this.engine.applySettings(live());
    this.transport = new Transport({
      clock: { now: () => context.currentTime },
      ticker: new WorkerTicker(),
      sink: this.engine,
      timeline,
      settings: () => this.settings(),
    });
  }

  get nextBarTime(): number {
    return this.transport.nextBarStartTime;
  }

  settings(): Settings {
    return this.frozen ?? this.live();
  }

  applySettings(settings: Settings): void {
    if (!this.frozen) this.engine.applySettings(settings);
  }

  introAt(startTime?: number): void {
    this.transport.start(startTime);
    const start = this.transport.nextBarStartTime;
    const bar = barSeconds(this.settings().tempo);
    this.fader.gain.setValueAtTime(0, this.context.currentTime);
    this.fader.gain.setValueAtTime(0, start);
    this.fader.gain.linearRampToValueAtTime(
      1,
      start + bar * TRANSITION_METRICS.fadeInBars,
    );
    this.engine.setLayersSilent(LATE_ENTRY_LAYERS);
    this.engine.rampLayers(
      LATE_ENTRY_LAYERS,
      1,
      start + bar * TRANSITION_METRICS.lateEntryBar,
      bar,
    );
  }

  outro(): number {
    this.frozen = this.settings();
    const now = this.context.currentTime;
    const bar = barSeconds(this.frozen.tempo);
    this.engine.rampLayers(
      EARLY_EXIT_LAYERS,
      0,
      now,
      bar * TRANSITION_METRICS.earlyExitBars,
    );
    this.engine.rampLayers(
      ALL_OTHER_LAYERS,
      0,
      now,
      bar * TRANSITION_METRICS.fadeOutBars,
    );
    return (
      now +
      bar * TRANSITION_METRICS.fadeOutBars +
      TRANSITION_METRICS.tailSeconds
    );
  }

  fadeOut(): number {
    const now = this.context.currentTime;
    const end = now + this.softFadeSeconds();
    this.rampFader(0, now, end);
    return end;
  }

  halt(): void {
    this.transport.pause();
  }

  fadeIn(): void {
    const now = this.context.currentTime;
    this.transport.resume();
    this.rampFader(1, now, now + this.softFadeSeconds());
  }

  private softFadeSeconds(): number {
    return Math.min(
      Math.max(
        barSeconds(this.settings().tempo),
        TRANSITION_METRICS.softFadeMinSeconds,
      ),
      TRANSITION_METRICS.softFadeMaxSeconds,
    );
  }

  private rampFader(target: number, from: number, to: number): void {
    const gain = this.fader.gain;
    gain.cancelScheduledValues(from);
    gain.setValueAtTime(gain.value, from);
    gain.linearRampToValueAtTime(target, to);
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.transport.pause();
    this.engine.rampLayers(
      LAYER_KINDS,
      0,
      this.context.currentTime,
      TRANSITION_METRICS.disposeSeconds,
    );
    this.fader.disconnect();
    this.engine.dispose();
  }
}
