import { pluckEnvelope } from "./envelopes";
import type { VoiceRenderer } from "./VoiceRenderer";
import {
  createFilter,
  createGain,
  createNoise,
  createOscillator,
} from "./voiceNodes";

const NOISE_HZ = 6500;
const PING_HZ = 3200;
const DECAY_SECONDS = 0.7;

export const rideVoice: VoiceRenderer = (rig, spec) => {
  const output = createGain(rig, 0);
  const end = pluckEnvelope(
    output.gain,
    spec.startTime,
    0.13 * spec.velocity,
    0.002,
    DECAY_SECONDS,
  );
  createNoise(rig, spec.startTime, end)
    .connect(createFilter(rig, "bandpass", NOISE_HZ, 0.6))
    .connect(output);
  const pingGain = createGain(rig, 0.25);
  createOscillator(rig, "sine", PING_HZ, spec.startTime, end)
    .connect(pingGain)
    .connect(output);
  output.connect(rig.destination);
  return end;
};
