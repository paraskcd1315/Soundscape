import { sustainEnvelope } from "../../utils/envelopes.util";
import type { VoiceRenderer } from "../../types/VoiceRenderer";
import { createFilter, createGain, createOscillator } from "../../utils/voiceNodes.util";
import { TRIANGLE_MIX, CUTOFF_HZ } from "./constants/subBassVoice.constants";

export const subBassVoice: VoiceRenderer = (rig, spec) => {
  const output = createGain(rig, 0);
  const filter = createFilter(rig, "lowpass", CUTOFF_HZ);
  const end = sustainEnvelope(
    output.gain,
    spec.startTime,
    spec.duration,
    0.34 * spec.velocity,
    0.012,
    0.14,
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
