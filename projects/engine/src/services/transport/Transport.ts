import { composeBar } from "../composer/composeBar";
import { TRANSPORT_METRICS } from "./constants/transport.constants";
import type { PendingNote } from "./types/PendingNote";
import type { TransportDependencies } from "./types/TransportDependencies";

export class Transport {
  private queue: PendingNote[] = [];
  private nextBarIndex = 0;
  private nextBarTime = 0;
  private running = false;

  constructor(private readonly dependencies: TransportDependencies) {}

  get isRunning(): boolean {
    return this.running;
  }

  get currentBar(): number {
    return this.nextBarIndex;
  }

  get nextBarStartTime(): number {
    return this.nextBarTime;
  }

  start(startTime?: number): void {
    if (this.running) return;
    this.running = true;
    this.nextBarTime = Math.max(
      startTime ?? 0,
      this.dependencies.clock.now() + TRANSPORT_METRICS.startDelaySeconds,
    );
    this.dependencies.ticker.start(() => this.tick());
    this.tick();
  }

  pause(): void {
    this.running = false;
    this.dependencies.ticker.stop();
  }

  resume(): void {
    if (this.running) return;
    this.running = true;
    this.dependencies.ticker.start(() => this.tick());
  }

  reset(): void {
    this.queue = [];
    this.nextBarIndex = 0;
    this.dependencies.timeline.clear();
    this.nextBarTime =
      this.dependencies.clock.now() + TRANSPORT_METRICS.startDelaySeconds;
  }

  tick(): void {
    const now = this.dependencies.clock.now();
    const background = this.dependencies.inBackground();
    const barLead = background
      ? TRANSPORT_METRICS.backgroundBarLeadSeconds
      : TRANSPORT_METRICS.barLeadSeconds;
    const lookahead = background
      ? TRANSPORT_METRICS.backgroundLookaheadSeconds
      : TRANSPORT_METRICS.lookaheadSeconds;
    while (this.nextBarTime - now < barLead) this.composeNextBar();
    const horizon = now + lookahead;
    while (
      this.queue.length > 0 &&
      (this.queue[0] as PendingNote).startTime < horizon
    ) {
      const pending = this.queue.shift() as PendingNote;
      this.dependencies.sink.schedule(
        pending.event,
        pending.startTime,
        pending.durationSeconds,
      );
    }
  }

  private composeNextBar(): void {
    const settings = this.dependencies.settings();
    const secondsPerBeat = 60 / settings.tempo;
    const events = composeBar(settings, this.nextBarIndex);

    for (const event of events) {
      const startTime = this.nextBarTime + event.startBeat * secondsPerBeat;
      this.insert({
        event,
        startTime,
        durationSeconds: event.durationBeats * secondsPerBeat,
      });
      this.dependencies.timeline.push({
        kind: "note",
        time: startTime,
        layer: event.layer,
        midi: event.midi,
        velocity: event.velocity,
        beatInBar: event.startBeat,
        barIndex: this.nextBarIndex,
      });
    }

    for (let beat = 0; beat < TRANSPORT_METRICS.beatsPerBar; beat++) {
      this.dependencies.timeline.push({
        kind: "beat",
        time: this.nextBarTime + beat * secondsPerBeat,
        layer: null,
        midi: 0,
        velocity: beat === 0 ? 1 : 0.5,
        beatInBar: beat,
        barIndex: this.nextBarIndex,
      });
    }

    this.nextBarTime += TRANSPORT_METRICS.beatsPerBar * secondsPerBeat;
    this.nextBarIndex++;
  }

  private insert(note: PendingNote): void {
    let index = this.queue.length;
    while (
      index > 0 &&
      (this.queue[index - 1] as PendingNote).startTime > note.startTime
    )
      index--;
    this.queue.splice(index, 0, note);
  }
}
