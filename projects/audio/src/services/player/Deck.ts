import type { Settings } from "@soundscape/engine/models/Settings";
import type { EventTimeline } from "@soundscape/engine/services/transport/EventTimeline";
import { Transport } from "@soundscape/engine/services/transport/Transport";
import { LAYER_KINDS } from "@soundscape/engine/constants/layerKinds.constants";
import { AudioEngine } from "../engine/AudioEngine";
import type { DrumSampleBank } from "../samples/DrumSampleBank";
import type { DeckClock } from "../../types/DeckClock";
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
  private steadyFrom = Infinity;

  constructor(
    private readonly context: BaseAudioContext,
    output: AudioNode,
    timeline: EventTimeline,
    private readonly live: () => Settings,
    drumBank: DrumSampleBank,
    clock: DeckClock,
  ) {
    this.fader = context.createGain();
    this.fader.gain.value = 0;
    this.fader.connect(output);
    this.engine = new AudioEngine(context, this.fader, drumBank);
    this.engine.applySettings(live());
    this.transport = new Transport({
      clock: { now: () => context.currentTime },
      ticker: clock.ticker,
      sink: this.engine,
      timeline,
      settings: () => this.settings(),
      inBackground: clock.inBackground,
    });
  }

  get nextBarTime(): number {
    return this.transport.nextBarStartTime;
  }

  get nextBarIndex(): number {
    return this.transport.currentBar;
  }

  get isSteady(): boolean {
    return !this.frozen && this.context.currentTime >= this.steadyFrom;
  }

  resumeAtBar(barIndex: number, barTime: number): void {
    this.fader.gain.setValueAtTime(1, 0);
    this.transport.startAtBar(barIndex, barTime);
    this.steadyFrom = 0;
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
    this.steadyFrom =
      start +
      bar *
        Math.max(
          TRANSITION_METRICS.fadeInBars,
          TRANSITION_METRICS.lateEntryBar + 1,
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
    this.steadyFrom = now + this.softFadeSeconds();
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
