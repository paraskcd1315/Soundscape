import { DRUM_BANK_METRICS } from "../services/samples/constants/drumKit.constants";

export function playSample(
  context: BaseAudioContext,
  buffer: AudioBuffer,
  destination: AudioNode,
  startTime: number,
  velocity: number,
): number {
  const source = context.createBufferSource();
  source.buffer = buffer;
  const gain = context.createGain();
  gain.gain.value = Math.pow(velocity, DRUM_BANK_METRICS.velocityCurve);
  source.connect(gain).connect(destination);
  source.start(startTime);
  return startTime + buffer.duration;
}
