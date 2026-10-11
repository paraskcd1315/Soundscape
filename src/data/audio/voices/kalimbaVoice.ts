import { pluckEnvelope } from "./envelopes";
import type { VoiceRenderer } from "./VoiceRenderer";
import { createGain, createOscillator } from "./voiceNodes";

const TINE_RATIO = 5.4;
const TINE_LIMIT_HZ = 9000;

export const kalimbaVoice: VoiceRenderer = (rig, spec) => {
  const output = createGain(rig, 0);
  const end = pluckEnvelope(
    output.gain,
    spec.startTime,
    0.24 * spec.velocity,
    0.001,
    1.3,
  );
  createOscillator(rig, "sine", spec.frequency, spec.startTime, end).connect(
    output,
  );
  if (spec.frequency * TINE_RATIO < TINE_LIMIT_HZ) {
    const tine = createGain(rig, 0);
    pluckEnvelope(tine.gain, spec.startTime, 0.1 * spec.velocity, 0.001, 0.25);
    createOscillator(
      rig,
      "sine",
      spec.frequency * TINE_RATIO,
      spec.startTime,
      end,
    )
      .connect(tine)
      .connect(output);
  }
  output.connect(rig.destination);
  return end;
};
