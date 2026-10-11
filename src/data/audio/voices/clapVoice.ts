import { pluckEnvelope } from "./envelopes";
import type { VoiceRenderer } from "./VoiceRenderer";
import { createFilter, createGain, createNoise } from "./voiceNodes";

const BURST_OFFSETS = [0, 0.012, 0.024];
const BURST_DECAY_SECONDS = 0.02;
const TAIL_DECAY_SECONDS = 0.18;

export const clapVoice: VoiceRenderer = (rig, spec) => {
  const filter = createFilter(rig, "bandpass", 1500, 1.2);
  const output = createGain(rig, 1);
  filter.connect(output).connect(rig.destination);
  let end = spec.startTime;
  BURST_OFFSETS.forEach((offset, index) => {
    const isLast = index === BURST_OFFSETS.length - 1;
    const start = spec.startTime + offset;
    const gain = createGain(rig, 0);
    const burstEnd = pluckEnvelope(
      gain.gain,
      start,
      0.45 * spec.velocity,
      0.001,
      isLast ? TAIL_DECAY_SECONDS : BURST_DECAY_SECONDS,
    );
    createNoise(rig, start, burstEnd).connect(gain).connect(filter);
    end = Math.max(end, burstEnd);
  });
  return end;
};
