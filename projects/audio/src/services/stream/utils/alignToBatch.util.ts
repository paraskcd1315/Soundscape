import { STREAM_METRICS } from "../constants/stream.constants";

export function alignToBatch(frames: number): number {
  return (
    Math.ceil(frames / STREAM_METRICS.batchFrames) * STREAM_METRICS.batchFrames
  );
}
