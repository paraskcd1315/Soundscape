import {
  STREAM_ENCODER,
  STREAM_METRICS,
  STREAM_MIME,
} from "./constants/stream.constants";
import { joinBytes } from "./utils/joinBytes.util";

export class AacSink {
  readonly element: HTMLAudioElement;
  private readonly source = new MediaSource();
  private readonly encoder: AudioEncoder;
  private readonly pending: Uint8Array[] = [];
  private buffer: SourceBuffer | null = null;
  private framesEncoded = 0;
  private lastPrune = 0;

  constructor() {
    this.element = new Audio();
    this.element.src = URL.createObjectURL(this.source);
    this.source.addEventListener("sourceopen", () => this.open(), {
      once: true,
    });
    this.encoder = new AudioEncoder({
      output: (chunk) => this.collect(chunk),
      error: () => undefined,
    });
    this.encoder.configure(STREAM_ENCODER);
  }

  static isSupported(): boolean {
    return (
      typeof AudioEncoder !== "undefined" &&
      typeof MediaSource !== "undefined" &&
      MediaSource.isTypeSupported(STREAM_MIME)
    );
  }

  write(channels: Float32Array[]): void {
    const left = channels[0];
    if (!left) return;
    const right = channels[1] ?? left;
    const frames = left.length;
    const planar = new Float32Array(frames * STREAM_METRICS.channels);
    planar.set(left);
    planar.set(right, frames);
    const audio = new AudioData({
      format: "f32-planar",
      sampleRate: STREAM_METRICS.sampleRate,
      numberOfFrames: frames,
      numberOfChannels: STREAM_METRICS.channels,
      timestamp: Math.round(
        (this.framesEncoded / STREAM_METRICS.sampleRate) *
          STREAM_METRICS.microsecondsPerSecond,
      ),
      data: planar,
    });
    this.encoder.encode(audio);
    audio.close();
    this.framesEncoded += frames;
  }

  private open(): void {
    const buffer = this.source.addSourceBuffer(STREAM_MIME);
    buffer.mode = "sequence";
    buffer.addEventListener("updateend", () => this.drain());
    this.buffer = buffer;
    this.drain();
  }

  private collect(chunk: EncodedAudioChunk): void {
    const bytes = new Uint8Array(chunk.byteLength);
    chunk.copyTo(bytes);
    this.pending.push(bytes);
    this.drain();
  }

  private drain(): void {
    const buffer = this.buffer;
    if (!buffer || buffer.updating) return;
    if (this.prune(buffer)) return;
    if (this.pending.length === 0) return;
    buffer.appendBuffer(joinBytes(this.pending.splice(0)));
  }

  private prune(buffer: SourceBuffer): boolean {
    const now = this.element.currentTime;
    if (now - this.lastPrune < STREAM_METRICS.pruneEverySeconds) return false;
    this.lastPrune = now;
    const end = now - STREAM_METRICS.pruneKeepSeconds;
    if (buffer.buffered.length === 0 || end <= buffer.buffered.start(0))
      return false;
    buffer.remove(0, end);
    return true;
  }
}
