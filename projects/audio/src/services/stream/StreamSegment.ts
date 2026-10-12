import { PCM_TAP_NAME, PCM_TAP_SOURCE } from "./constants/pcmTap.constants";
import { STREAM_METRICS } from "./constants/stream.constants";
import type { PcmListener } from "./types/PcmListener";
import { alignToBatch } from "./utils/alignToBatch.util";

export class StreamSegment {
  readonly context: OfflineAudioContext;
  readonly bus: GainNode;
  onPcm: PcmListener = () => undefined;
  private framesReceived = 0;
  private framesRequested = 0;
  private started = false;
  private waiting: { frames: number; resolve: () => void } | null = null;

  private constructor(
    readonly startTime: number,
    lengthSeconds: number,
  ) {
    const frames = alignToBatch(lengthSeconds * STREAM_METRICS.sampleRate);
    this.context = new OfflineAudioContext(
      1,
      frames,
      STREAM_METRICS.sampleRate,
    );
    this.bus = this.context.createGain();
  }

  static async create(
    startTime: number,
    lengthSeconds: number,
  ): Promise<StreamSegment> {
    const segment = new StreamSegment(startTime, lengthSeconds);
    await segment.connectTap();
    return segment;
  }

  get renderedTime(): number {
    return this.startTime + this.framesReceived / STREAM_METRICS.sampleRate;
  }

  get endTime(): number {
    return this.startTime + this.context.length / STREAM_METRICS.sampleRate;
  }

  async renderTo(streamTime: number): Promise<void> {
    const limit = this.context.length - STREAM_METRICS.batchFrames;
    const target = Math.min(
      limit,
      alignToBatch((streamTime - this.startTime) * STREAM_METRICS.sampleRate),
    );
    if (target <= this.framesRequested) return;
    this.framesRequested = target;
    const reached = this.context.suspend(target / STREAM_METRICS.sampleRate);
    if (this.started) {
      await this.context.resume();
    } else {
      this.started = true;
      void this.context.startRendering().catch(() => undefined);
    }
    await reached;
    await this.received(target);
  }

  finish(): void {
    this.onPcm = () => undefined;
    this.bus.disconnect();
    if (this.started) void this.context.resume().catch(() => undefined);
  }

  private async connectTap(): Promise<void> {
    const url = URL.createObjectURL(
      new Blob([PCM_TAP_SOURCE], { type: "text/javascript" }),
    );
    try {
      await this.context.audioWorklet.addModule(url);
    } finally {
      URL.revokeObjectURL(url);
    }
    const tap = new AudioWorkletNode(this.context, PCM_TAP_NAME, {
      numberOfInputs: 1,
      numberOfOutputs: 1,
      outputChannelCount: [1],
      channelCount: STREAM_METRICS.channels,
      channelCountMode: "explicit",
      processorOptions: { batchFrames: STREAM_METRICS.batchFrames },
    });
    tap.port.onmessage = (event: MessageEvent<Float32Array[]>) =>
      this.accept(event.data);
    this.bus.connect(tap).connect(this.context.destination);
  }

  private accept(channels: Float32Array[]): void {
    const time = this.renderedTime;
    this.framesReceived += channels[0]?.length ?? 0;
    this.onPcm(time, channels);
    if (this.waiting && this.framesReceived >= this.waiting.frames) {
      const { resolve } = this.waiting;
      this.waiting = null;
      resolve();
    }
  }

  private received(frames: number): Promise<void> {
    if (this.framesReceived >= frames) return Promise.resolve();
    return new Promise((resolve) => {
      this.waiting = { frames, resolve };
    });
  }
}
