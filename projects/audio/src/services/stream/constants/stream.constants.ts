export const STREAM_METRICS = {
  sampleRate: 48000,
  channels: 2,
  batchFrames: 4096,
  segmentSeconds: 90,
  rotateAfterSeconds: 60,
  rotateForceMarginSeconds: 10,
  rotateLeadSeconds: 10,
  rotateDepthSeconds: 6,
  prerollBatches: 72,
  crossfadeBatches: 2,
  visibleDepthSeconds: 1.5,
  hiddenDepthSeconds: 45,
  visibleStepSeconds: 0.5,
  hiddenStepSeconds: 3,
  pumpMilliseconds: 250,
  pruneKeepSeconds: 20,
  pruneEverySeconds: 10,
  fadeSeconds: 0.5,
  fadeStepMilliseconds: 30,
  analyserHistorySeconds: 6,
  microsecondsPerSecond: 1_000_000,
} as const;

export const STREAM_MIME = "audio/aac";

export const STREAM_ENCODER = {
  codec: "mp4a.40.2",
  sampleRate: STREAM_METRICS.sampleRate,
  numberOfChannels: STREAM_METRICS.channels,
  bitrate: 192_000,
  aac: { format: "adts" },
} as const;
