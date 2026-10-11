import { pluckEnvelope } from "./envelopes";
import type { VoiceRenderer } from "./VoiceRenderer";
import { createFilter, createGain, createNoise } from "./voiceNodes";

const BAND_HZ = 7500;
const ATTACK_SECONDS = 0.012;
const DECAY_SECONDS = 0.06;

export const shakerVoice: VoiceRenderer = (rig, spec) => {
  const output = createGain(rig, 0);
  const end = pluckEnvelope(
    output.gain,
    spec.startTime,
    0.13 * spec.velocity,
    ATTACK_SECONDS,
    DECAY_SECONDS,
  );
  createNoise(rig, spec.startTime, end)
    .connect(createFilter(rig, "bandpass", BAND_HZ, 1.1))
    .connect(output)
    .connect(rig.destination);
  return end;
};
