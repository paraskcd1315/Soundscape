import { sustainEnvelope } from "../../utils/envelopes.util";
import type { VoiceRenderer } from "../../types/VoiceRenderer";
import { createFilter, createGain, createOscillator } from "../../utils/voiceNodes.util";
import { DRAWBARS, CUTOFF_HZ } from "./constants/organVoice.constants";

export const organVoice: VoiceRenderer = (rig, spec) => {
  const output = createGain(rig, 0);
  const filter = createFilter(
    rig,
    "lowpass",
    CUTOFF_HZ * (0.5 + spec.brightness),
  );
  const end = sustainEnvelope(
    output.gain,
    spec.startTime,
    spec.duration,
    0.07 * spec.velocity,
    0.025,
    0.12,
  );
  DRAWBARS.forEach((level, index) => {
    const partial = spec.frequency * (index + 1);
    if (partial > 9000) return;
    createOscillator(rig, "sine", partial, spec.startTime, end)
      .connect(createGain(rig, level))
      .connect(filter);
  });
  filter.connect(output).connect(rig.destination);
  return end;
};
