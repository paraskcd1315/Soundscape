import { sustainEnvelope } from "./envelopes";
import type { VoiceRenderer } from "./VoiceRenderer";
import { createGain, createOscillator } from "./voiceNodes";

export const triangleVoice: VoiceRenderer = (rig, spec) => {
  const output = createGain(rig, 0);
  const end = sustainEnvelope(
    output.gain,
    spec.startTime,
    spec.duration,
    0.2 * spec.velocity,
    0.005,
    0.05,
  );
  createOscillator(rig, "triangle", spec.frequency, spec.startTime, end)
    .connect(output)
    .connect(rig.destination);
  return end;
};
