import { pluckEnvelope } from "./envelopes";
import type { VoiceRenderer } from "./VoiceRenderer";
import { createFilter, createGain, createNoise } from "./voiceNodes";

const BAND_HZ = 4500;
const ATTACK_SECONDS = 0.035;
const DECAY_SECONDS = 0.2;

export const brushVoice: VoiceRenderer = (rig, spec) => {
  const output = createGain(rig, 0);
  const end = pluckEnvelope(
    output.gain,
    spec.startTime,
    0.14 * spec.velocity,
    ATTACK_SECONDS,
    DECAY_SECONDS,
  );
  createNoise(rig, spec.startTime, end)
    .connect(createFilter(rig, "bandpass", BAND_HZ, 0.5))
    .connect(output)
    .connect(rig.destination);
  return end;
};
