import { pluckEnvelope } from "../../utils/envelopes.util";
import type { VoiceRenderer } from "../../types/VoiceRenderer";
import { createFilter, createGain, createNoise } from "../../utils/voiceNodes.util";
import { HIGHPASS_HZ, DECAY_SECONDS } from "./constants/hatVoice.constants";

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
