import { sustainEnvelope } from "./envelopes";
import type { VoiceRenderer } from "./VoiceRenderer";
import { createFilter, createGain, createOscillator } from "./voiceNodes";

const SWEEP_SECONDS = 0.22;
const FLOOR_HZ = 130;
const RESONANCE = 14;

export const acidVoice: VoiceRenderer = (rig, spec) => {
  const output = createGain(rig, 0);
  const startCutoff = 350 + spec.brightness * 3200 * (0.4 + spec.velocity);
  const filter = createFilter(rig, "lowpass", startCutoff, RESONANCE);
  const end = sustainEnvelope(
    output.gain,
    spec.startTime,
    spec.duration,
    0.16 * spec.velocity,
    0.003,
    0.04,
  );
  filter.frequency.setValueAtTime(startCutoff, spec.startTime);
  filter.frequency.exponentialRampToValueAtTime(
    FLOOR_HZ,
    spec.startTime + Math.min(SWEEP_SECONDS, spec.duration + 0.05),
  );
  createOscillator(
    rig,
    spec.velocity > 0.45 ? "sawtooth" : "square",
    spec.frequency,
    spec.startTime,
    end,
  ).connect(filter);
  filter.connect(output).connect(rig.destination);
  return end;
};
