import { AUDIO_METRICS } from "../constants/audio.constants";
import type { VoiceRig } from "../types/VoiceRig";

export function createOscillator(
  rig: VoiceRig,
  type: OscillatorType,
  frequency: number,
  startTime: number,
  endTime: number,
  detuneCents = 0,
): OscillatorNode {
  const oscillator = rig.context.createOscillator();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  oscillator.detune.value = detuneCents;
  oscillator.start(startTime);
  oscillator.stop(endTime + 0.05);
  return oscillator;
}

export function createFilter(
  rig: VoiceRig,
  type: BiquadFilterType,
  frequency: number,
  q = 0.707,
): BiquadFilterNode {
  const filter = rig.context.createBiquadFilter();
  filter.type = type;
  filter.frequency.value = Math.min(
    frequency,
    rig.context.sampleRate / 2 - 100,
  );
  filter.Q.value = q;
  return filter;
}

export function createNoise(
  rig: VoiceRig,
  startTime: number,
  endTime: number,
): AudioBufferSourceNode {
  const source = rig.context.createBufferSource();
  source.buffer = rig.noise;
  source.loop = true;
  const offset = Math.random() * (AUDIO_METRICS.noiseSeconds - 0.5);
  source.start(startTime, offset);
  source.stop(endTime + 0.05);
  return source;
}

export function createGain(rig: VoiceRig, value = 1): GainNode {
  const gain = rig.context.createGain();
  gain.gain.value = value;
  return gain;
}
