export type PcmListener = (
  streamTime: number,
  channels: Float32Array[],
) => void;
