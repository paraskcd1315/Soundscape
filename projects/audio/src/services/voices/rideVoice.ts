import { pluckEnvelope } from "../../utils/envelopes.util";
import type { VoiceRenderer } from "../../types/VoiceRenderer";
import {
  createFilter,
  createGain,
  createNoise,
  createOscillator,
} from "../../utils/voiceNodes.util";
import { NOISE_HZ, PING_HZ, DECAY_SECONDS } from "./constants/rideVoice.constants";

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
