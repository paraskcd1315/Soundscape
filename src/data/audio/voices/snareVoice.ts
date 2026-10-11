import { pluckEnvelope } from "./envelopes";
import type { VoiceRenderer } from "./VoiceRenderer";
import {
  createFilter,
  createGain,
  createNoise,
  createOscillator,
} from "./voiceNodes";

const NOISE_DECAY_SECONDS = 0.18;
const BODY_DECAY_SECONDS = 0.1;
const BODY_HZ = 190;

export const snareVoice: VoiceRenderer = (rig, spec) => {
  const noiseGain = createGain(rig, 0);
  const noiseEnd = pluckEnvelope(
    noiseGain.gain,
    spec.startTime,
    0.5 * spec.velocity,
    0.001,
    NOISE_DECAY_SECONDS,
  );
  createNoise(rig, spec.startTime, noiseEnd)
    .connect(createFilter(rig, "bandpass", 1800, 0.8))
    .connect(noiseGain)
    .connect(rig.destination);

  const bodyGain = createGain(rig, 0);
  const bodyEnd = pluckEnvelope(
    bodyGain.gain,
    spec.startTime,
    0.3 * spec.velocity,
    0.001,
    BODY_DECAY_SECONDS,
  );
  createOscillator(rig, "triangle", BODY_HZ, spec.startTime, bodyEnd)
    .connect(bodyGain)
    .connect(rig.destination);
  return Math.max(noiseEnd, bodyEnd);
};
