import { EventTimeline } from "@soundscape/engine/services/transport/EventTimeline";
import { Transport } from "@soundscape/engine/services/transport/Transport";
import type { SettingsStore } from "@soundscape/engine/services/settings/SettingsStore";
import { AudioEngine } from "../engine/AudioEngine";
import { WorkerTicker } from "../ticker/WorkerTicker";

export class Player {
  readonly timeline = new EventTimeline();
  private context: AudioContext | null = null;
  private engine: AudioEngine | null = null;
  private transport: Transport | null = null;

  constructor(private readonly store: SettingsStore) {
    store.subscribe((settings) => this.engine?.applySettings(settings));
  }

  get isPlaying(): boolean {
    return this.transport?.isRunning ?? false;
  }

  analyser(): AnalyserNode | null {
    return this.engine?.analyser ?? null;
  }

  currentTime(): number {
    return this.context?.currentTime ?? 0;
  }

  async play(): Promise<void> {
    if (!this.context) this.build();
    const context = this.context as AudioContext;
    await context.resume();
    const transport = this.transport as Transport;
    if (transport.currentBar === 0 && !transport.isRunning) transport.start();
    else transport.resume();
  }

  async pause(): Promise<void> {
    this.transport?.pause();
    await this.context?.suspend();
  }

  private build(): void {
    const context = new AudioContext({ latencyHint: "interactive" });
    const engine = new AudioEngine(context);
    engine.applySettings(this.store.get());
    this.context = context;
    this.engine = engine;
    this.transport = new Transport({
      clock: { now: () => context.currentTime },
      ticker: new WorkerTicker(),
      sink: engine,
      timeline: this.timeline,
      settings: () => this.store.get(),
    });
  }
}
