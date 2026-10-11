import { pluckEnvelope } from "./envelopes";
import type { VoiceRenderer } from "./VoiceRenderer";
import { createGain, createOscillator } from "./voiceNodes";

const START_HZ = 160;
const END_HZ = 42;
const SWEEP_SECONDS = 0.12;
const DECAY_SECONDS = 0.38;

export const kickVoice: VoiceRenderer = (rig, spec) => {
  const output = createGain(rig, 0);
  const end = pluckEnvelope(
    output.gain,
    spec.startTime,
    0.95 * spec.velocity,
    0.002,
    DECAY_SECONDS,
  );
  const body = createOscillator(rig, "sine", START_HZ, spec.startTime, end);
  body.frequency.setValueAtTime(START_HZ, spec.startTime);
  body.frequency.exponentialRampToValueAtTime(
    END_HZ,
    spec.startTime + SWEEP_SECONDS,
  );
  body.connect(output).connect(rig.destination);
  return end;
};
