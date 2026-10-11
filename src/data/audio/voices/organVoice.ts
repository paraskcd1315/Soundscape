import { sustainEnvelope } from "./envelopes";
import type { VoiceRenderer } from "./VoiceRenderer";
import { createFilter, createGain, createOscillator } from "./voiceNodes";

const DRAWBARS = [1, 0.55, 0.32, 0.22];
const CUTOFF_HZ = 3200;

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
