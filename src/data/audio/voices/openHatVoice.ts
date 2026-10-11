import { pluckEnvelope } from "./envelopes";
import type { VoiceRenderer } from "./VoiceRenderer";
import { createFilter, createGain, createNoise } from "./voiceNodes";

const HIGHPASS_HZ = 6500;
const DECAY_SECONDS = 0.28;

export const openHatVoice: VoiceRenderer = (rig, spec) => {
  const output = createGain(rig, 0);
  const end = pluckEnvelope(
    output.gain,
    spec.startTime,
    0.2 * spec.velocity,
    0.002,
    DECAY_SECONDS,
  );
  createNoise(rig, spec.startTime, end)
    .connect(createFilter(rig, "highpass", HIGHPASS_HZ))
    .connect(output)
    .connect(rig.destination);
  return end;
};
