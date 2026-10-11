import { sustainEnvelope } from "./envelopes";
import type { VoiceRenderer } from "./VoiceRenderer";
import { createFilter, createGain, createOscillator } from "./voiceNodes";

const CUTOFF_HZ = 5200;

export const pulseVoice: VoiceRenderer = (rig, spec) => {
  const output = createGain(rig, 0);
  const filter = createFilter(
    rig,
    "lowpass",
    CUTOFF_HZ * (0.4 + spec.brightness * 0.6),
  );
  const end = sustainEnvelope(
    output.gain,
    spec.startTime,
    spec.duration,
    0.085 * spec.velocity,
    0.004,
    0.05,
  );
  createOscillator(rig, "square", spec.frequency, spec.startTime, end).connect(
    filter,
  );
  filter.connect(output).connect(rig.destination);
  return end;
};
