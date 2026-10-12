import type { Settings } from "@soundscape/engine/models/Settings";
import type { SettingsStore } from "@soundscape/engine/services/settings/SettingsStore";
import { isIdentityChange } from "@soundscape/engine/services/settings/utils/isIdentityChange.util";
import { EventTimeline } from "@soundscape/engine/services/transport/EventTimeline";
import type { MusicPlayer } from "../../types/MusicPlayer";
import { Deck } from "../player/Deck";
import { MAX_LEAVING_DECKS } from "../player/constants/player.constants";
import { barSeconds } from "../player/utils/barSeconds.util";
import { DrumSampleBank } from "../samples/DrumSampleBank";
import { ManualTicker } from "../ticker/ManualTicker";
import { AacSink } from "./AacSink";
import { OffsetTimeline } from "./OffsetTimeline";
import { PcmAnalyser } from "./PcmAnalyser";
import { StreamSegment } from "./StreamSegment";
import { STREAM_METRICS } from "./constants/stream.constants";
import { crossfadeBatches } from "./utils/crossfadeBatches.util";

export class StreamPlayer implements MusicPlayer {
  readonly timeline = new EventTimeline();
  private readonly sink = new AacSink();
  private readonly spectrum = new PcmAnalyser(() => this.currentTime());
  private readonly leaving = new Map<Deck, number>();
  private tickers: ManualTicker[] = [];
  private segment: StreamSegment | null = null;
  private segmentTimeline: OffsetTimeline | null = null;
  private drumBank: DrumSampleBank | null = null;
  private ready: Promise<void> | null = null;
  private active: Deck | null = null;
  private playing = false;
  private pumping = false;
  private fadeTimer = 0;
  private fadeLevel = 0;

  constructor(private readonly store: SettingsStore) {
    store.subscribe((next, previous) => this.onSettings(next, previous));
    this.sink.element.addEventListener("timeupdate", () => void this.pump());
    document.addEventListener("visibilitychange", () => void this.pump());
    window.setInterval(() => void this.pump(), STREAM_METRICS.pumpMilliseconds);
  }

  static isSupported(): boolean {
    return AacSink.isSupported();
  }

  get isPlaying(): boolean {
    return this.playing;
  }

  analyser(): PcmAnalyser | null {
    return this.spectrum.hasData() ? this.spectrum : null;
  }

  currentTime(): number {
    return this.sink.element.currentTime;
  }

  async play(): Promise<void> {
    this.playing = true;
    const started = this.sink.element.play();
    this.fadeTo(1);
    await this.prepare();
    if (!this.active) {
      this.active = this.createDeck();
      this.active.introAt();
    }
    void this.pump();
    await started;
  }

  async pause(): Promise<void> {
    this.playing = false;
    await this.fadeTo(0);
    if (!this.playing) this.sink.element.pause();
  }

  private prepare(): Promise<void> {
    this.ready ??= (async () => {
      const bank = new DrumSampleBank(STREAM_METRICS.sampleRate);
      await bank.render().catch(() => undefined);
      this.drumBank = bank;
      this.adopt(await StreamSegment.create(0, STREAM_METRICS.segmentSeconds));
    })();
    return this.ready;
  }

  private adopt(segment: StreamSegment): OffsetTimeline {
    this.segment = segment;
    this.segmentTimeline = new OffsetTimeline(this.timeline, segment.startTime);
    this.tickers = [];
    segment.onPcm = (time, channels) => this.emit(time, channels);
    return this.segmentTimeline;
  }

  private emit(time: number, channels: Float32Array[]): void {
    this.sink.write(channels);
    if (!document.hidden) this.spectrum.record(time, channels);
  }

  private liveSettings(): Settings {
    return { ...this.store.get(), masterVolume: 1 };
  }

  private createDeck(): Deck {
    const segment = this.segment as StreamSegment;
    const ticker = new ManualTicker();
    this.tickers.push(ticker);
    return new Deck(
      segment.context,
      segment.bus,
      this.segmentTimeline as OffsetTimeline,
      () => this.liveSettings(),
      this.drumBank as DrumSampleBank,
      { ticker, inBackground: () => true },
    );
  }

  private onSettings(next: Settings, previous: Settings): void {
    this.applyVolume();
    const deck = this.active;
    if (!deck) return;
    if (!isIdentityChange(previous, next)) {
      deck.applySettings(this.liveSettings());
      return;
    }
    const startTime = deck.nextBarTime;
    this.retire(deck);
    this.active = this.createDeck();
    this.active.introAt(startTime);
  }

  private retire(deck: Deck): void {
    if (this.leaving.size >= MAX_LEAVING_DECKS) {
      const oldest = this.leaving.keys().next().value as Deck;
      oldest.dispose();
      this.leaving.delete(oldest);
    }
    this.leaving.set(deck, deck.outro());
  }

  private async pump(): Promise<void> {
    if (this.pumping || !this.segment) return;
    this.pumping = true;
    try {
      while (
        this.segment.renderedTime <
        this.currentTime() + this.depthSeconds()
      ) {
        if (this.shouldRotate()) await this.rotate();
        await this.renderStep(this.segment);
      }
    } finally {
      this.pumping = false;
    }
  }

  private async renderStep(segment: StreamSegment): Promise<void> {
    this.tickers.forEach((ticker) => ticker.tick());
    const now = segment.context.currentTime;
    this.leaving.forEach((end, deck) => {
      if (now < end) return;
      deck.dispose();
      this.leaving.delete(deck);
    });
    const step = document.hidden
      ? STREAM_METRICS.hiddenStepSeconds
      : STREAM_METRICS.visibleStepSeconds;
    await segment.renderTo(segment.renderedTime + step);
  }

  private depthSeconds(): number {
    const base = document.hidden
      ? STREAM_METRICS.hiddenDepthSeconds
      : STREAM_METRICS.visibleDepthSeconds;
    const segment = this.segment as StreamSegment;
    const age = segment.renderedTime - segment.startTime;
    const renewing =
      age >=
      STREAM_METRICS.rotateAfterSeconds - STREAM_METRICS.rotateLeadSeconds;
    return renewing ? Math.max(base, STREAM_METRICS.rotateDepthSeconds) : base;
  }

  private shouldRotate(): boolean {
    const segment = this.segment as StreamSegment;
    const age = segment.renderedTime - segment.startTime;
    if (
      segment.renderedTime >=
      segment.endTime - STREAM_METRICS.rotateForceMarginSeconds
    )
      return true;
    return (
      age >= STREAM_METRICS.rotateAfterSeconds &&
      this.leaving.size === 0 &&
      (this.active?.isSteady ?? true)
    );
  }

  private async rotate(): Promise<void> {
    const old = this.segment as StreamSegment;
    const oldTickers = this.tickers;
    const oldTimeline = this.segmentTimeline as OffsetTimeline;
    const oldDeck = this.active;
    const batchSeconds = STREAM_METRICS.batchFrames / STREAM_METRICS.sampleRate;
    const cut = old.renderedTime;
    const fadeEnd = cut + STREAM_METRICS.crossfadeBatches * batchSeconds;
    const next = await StreamSegment.create(
      cut - STREAM_METRICS.prerollBatches * batchSeconds,
      STREAM_METRICS.segmentSeconds,
    );

    const outgoing: Float32Array[][] = [];
    old.onPcm = (_time, channels) => outgoing.push(channels);
    oldTimeline.acceptUntil(cut);
    while (old.renderedTime < fadeEnd) {
      oldTickers.forEach((ticker) => ticker.tick());
      await old.renderTo(fadeEnd);
    }

    const nextTimeline = this.adopt(next);
    nextTimeline.acceptFrom(cut);
    const incoming: Float32Array[][] = [];
    next.onPcm = (time, channels) => {
      if (time >= cut - 1e-9) incoming.push(channels);
    };
    if (oldDeck) {
      const settings = oldDeck.settings();
      const bar = barSeconds(settings.tempo);
      let barIndex = oldDeck.nextBarIndex;
      let barTime = old.startTime + oldDeck.nextBarTime;
      while (barTime > next.startTime && barIndex > 0) {
        barIndex--;
        barTime -= bar;
      }
      this.active = this.createDeck();
      this.active.resumeAtBar(barIndex, barTime - next.startTime);
    }
    while (next.renderedTime < fadeEnd) await this.renderStep(next);

    crossfadeBatches(outgoing, incoming).forEach((channels, index) =>
      this.emit(cut + index * batchSeconds, channels),
    );
    next.onPcm = (time, channels) => this.emit(time, channels);
    oldDeck?.dispose();
    this.leaving.forEach((_end, deck) => deck.dispose());
    this.leaving.clear();
    old.finish();
  }

  private applyVolume(): void {
    this.sink.element.volume = Math.max(
      0,
      Math.min(1, this.store.get().masterVolume * this.fadeLevel),
    );
  }

  private fadeTo(target: number): Promise<void> {
    window.clearInterval(this.fadeTimer);
    if (document.hidden) {
      this.fadeLevel = target;
      this.applyVolume();
      return Promise.resolve();
    }
    const step =
      STREAM_METRICS.fadeStepMilliseconds / (STREAM_METRICS.fadeSeconds * 1000);
    return new Promise((resolve) => {
      this.fadeTimer = window.setInterval(() => {
        const delta = target - this.fadeLevel;
        this.fadeLevel =
          Math.abs(delta) <= step
            ? target
            : this.fadeLevel + Math.sign(delta) * step;
        this.applyVolume();
        if (this.fadeLevel !== target) return;
        window.clearInterval(this.fadeTimer);
        resolve();
      }, STREAM_METRICS.fadeStepMilliseconds);
    });
  }
}
