import { pluckEnvelope } from "./envelopes";
import type { VoiceRenderer } from "./VoiceRenderer";
import { createFilter, createGain, createNoise } from "./voiceNodes";

const HIGHPASS_HZ = 7000;
const DECAY_SECONDS = 0.045;

export const hatVoice: VoiceRenderer = (rig, spec) => {
  const output = createGain(rig, 0);
  const end = pluckEnvelope(
    output.gain,
    spec.startTime,
    0.22 * spec.velocity,
    0.001,
    DECAY_SECONDS,
  );
  createNoise(rig, spec.startTime, end)
    .connect(createFilter(rig, "highpass", HIGHPASS_HZ))
    .connect(output)
    .connect(rig.destination);
  return end;
};
