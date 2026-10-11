import { pluckEnvelope } from "../../utils/envelopes.util";
import type { VoiceRenderer } from "../../types/VoiceRenderer";
import { createFilter, createGain, createOscillator } from "../../utils/voiceNodes.util";
import { TRIANGLE_MIX, CUTOFF_HZ } from "./constants/uprightVoice.constants";

export const uprightVoice: VoiceRenderer = (rig, spec) => {
  const output = createGain(rig, 0);
  const filter = createFilter(
    rig,
    "lowpass",
    CUTOFF_HZ * (0.6 + spec.brightness),
  );
  const end = pluckEnvelope(
    output.gain,
    spec.startTime,
    0.4 * spec.velocity,
    0.01,
    spec.duration * 1.1 + 0.25,
  );
  const triangleGain = createGain(rig, TRIANGLE_MIX);
  createOscillator(rig, "sine", spec.frequency, spec.startTime, end).connect(
    filter,
  );
  createOscillator(rig, "triangle", spec.frequency, spec.startTime, end)
    .connect(triangleGain)
    .connect(filter);
  filter.connect(output).connect(rig.destination);
  return end;
};
