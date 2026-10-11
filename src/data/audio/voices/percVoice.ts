import { pluckEnvelope } from "./envelopes";
import type { VoiceRenderer } from "./VoiceRenderer";
import { createGain, createOscillator } from "./voiceNodes";

const START_HZ = 900;
const END_HZ = 420;
const SWEEP_SECONDS = 0.05;
const DECAY_SECONDS = 0.09;

export const percVoice: VoiceRenderer = (rig, spec) => {
  const output = createGain(rig, 0);
  const end = pluckEnvelope(
    output.gain,
    spec.startTime,
    0.28 * spec.velocity,
    0.001,
    DECAY_SECONDS,
  );
  const tone = createOscillator(rig, "sine", START_HZ, spec.startTime, end);
  tone.frequency.setValueAtTime(START_HZ, spec.startTime);
  tone.frequency.exponentialRampToValueAtTime(
    END_HZ,
    spec.startTime + SWEEP_SECONDS,
  );
  tone.connect(output).connect(rig.destination);
  return end;
};
