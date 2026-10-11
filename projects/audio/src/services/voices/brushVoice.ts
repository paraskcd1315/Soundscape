import { pluckEnvelope } from "../../utils/envelopes.util";
import type { VoiceRenderer } from "../../types/VoiceRenderer";
import { createFilter, createGain, createNoise } from "../../utils/voiceNodes.util";
import { BAND_HZ, ATTACK_SECONDS, DECAY_SECONDS } from "./constants/brushVoice.constants";

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
