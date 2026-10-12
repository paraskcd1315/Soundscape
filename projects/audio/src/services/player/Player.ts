import { EventTimeline } from "@soundscape/engine/services/transport/EventTimeline";
import type { SettingsStore } from "@soundscape/engine/services/settings/SettingsStore";
import { isIdentityChange } from "@soundscape/engine/services/settings/utils/isIdentityChange.util";
import type { Settings } from "@soundscape/engine/models/Settings";
import { AUDIO_METRICS } from "../../constants/audio.constants";
import { Deck } from "./Deck";
import { DrumSampleBank } from "../samples/DrumSampleBank";
import { preferPlaybackSession } from "../../utils/preferPlaybackSession.util";
import type { AudioSessionNavigator } from "../../types/AudioSessionNavigator";
import type { PlayerOptions } from "../../types/PlayerOptions";
import { MediaElementOutput } from "../output/MediaElementOutput";
import {
  MAX_LEAVING_DECKS,
  MILLISECONDS_PER_SECOND,
} from "./constants/player.constants";

export class Player {
  readonly timeline = new EventTimeline();
  private context: AudioContext | null = null;
  private bus: GainNode | null = null;
  private analyserNode: AnalyserNode | null = null;
  private active: Deck | null = null;
  private paused: Deck | null = null;
  private readonly leaving = new Set<Deck>();
  private suspendTimer = 0;
  private drumBank: DrumSampleBank | null = null;
  private drumsReady: Promise<void> = Promise.resolve();
  private output: MediaElementOutput | null = null;

  constructor(
    private readonly store: SettingsStore,
    private readonly options: PlayerOptions,
  ) {
    store.subscribe((next, previous) => this.onSettings(next, previous));
  }

  get isPlaying(): boolean {
    return this.active !== null;
  }

  analyser(): AnalyserNode | null {
    return this.analyserNode;
  }

  currentTime(): number {
    return this.context?.currentTime ?? 0;
  }

  async play(): Promise<void> {
    const context = this.ensureContext();
    const outputStarted = this.output?.start();
    window.clearTimeout(this.suspendTimer);
    await Promise.all([context.resume(), this.drumsReady, outputStarted]);
    if (this.active) return;
    if (this.paused) {
      this.active = this.paused;
      this.paused = null;
      this.active.fadeIn();
      return;
    }
    this.active = this.createDeck();
    this.active.introAt();
  }

  async pause(): Promise<void> {
    const deck = this.active;
    if (!deck || !this.context) return;
    this.active = null;
    this.paused = deck;
    const end = deck.fadeOut();
    const context = this.context;
    window.clearTimeout(this.suspendTimer);
    this.suspendTimer = window.setTimeout(
      () => {
        if (this.active) return;
        deck.halt();
        void context.suspend();
        this.output?.stop();
      },
      (end - context.currentTime) * MILLISECONDS_PER_SECOND,
    );
  }

  private onSettings(next: Settings, previous: Settings): void {
    if (this.paused && isIdentityChange(previous, next)) {
      this.paused.dispose();
      this.paused = null;
      return;
    }
    this.paused?.applySettings(next);
    const deck = this.active;
    if (!deck) return;
    if (!isIdentityChange(previous, next)) {
      deck.applySettings(next);
      return;
    }
    const startTime = deck.nextBarTime;
    this.retire(deck);
    this.active = this.createDeck();
    this.active.introAt(startTime);
  }

  private retire(deck: Deck): number {
    const end = deck.outro();
    if (this.leaving.size >= MAX_LEAVING_DECKS) {
      const oldest = this.leaving.values().next().value as Deck;
      oldest.dispose();
      this.leaving.delete(oldest);
    }
    this.leaving.add(deck);
    window.setTimeout(
      () => {
        deck.dispose();
        this.leaving.delete(deck);
      },
      (end - (this.context?.currentTime ?? 0)) * MILLISECONDS_PER_SECOND,
    );
    return end;
  }

  private createDeck(): Deck {
    return new Deck(
      this.context as AudioContext,
      this.bus as GainNode,
      this.timeline,
      () => this.store.get(),
      this.drumBank as DrumSampleBank,
    );
  }

  private ensureContext(): AudioContext {
    if (this.context) return this.context;
    preferPlaybackSession(navigator as AudioSessionNavigator);
    const context = new AudioContext({ latencyHint: "interactive" });
    const bus = context.createGain();
    const analyser = context.createAnalyser();
    analyser.fftSize = AUDIO_METRICS.analyserFftSize;
    analyser.smoothingTimeConstant = AUDIO_METRICS.analyserSmoothing;
    bus.connect(analyser);
    if (this.options.mediaElementOutput)
      this.output = new MediaElementOutput(context, bus);
    else bus.connect(context.destination);
    this.context = context;
    this.bus = bus;
    this.analyserNode = analyser;
    this.drumBank = new DrumSampleBank(context.sampleRate);
    this.drumsReady = this.drumBank.render().catch(() => undefined);
    return context;
  }
}
