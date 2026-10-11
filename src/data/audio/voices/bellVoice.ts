import { pluckEnvelope } from "./envelopes";
import type { VoiceRenderer } from "./VoiceRenderer";
import { createGain, createOscillator } from "./voiceNodes";

const MOD_RATIO = 3.5;
const MOD_DECAY_SECONDS = 1.5;
const DECAY_SECONDS = 2.8;

export const bellVoice: VoiceRenderer = (rig, spec) => {
  const output = createGain(rig, 0);
  const end = pluckEnvelope(
    output.gain,
    spec.startTime,
    0.16 * spec.velocity,
    0.006,
    DECAY_SECONDS,
  );
  const modulatorGain = createGain(rig, 0);
  modulatorGain.gain.setValueAtTime(spec.frequency * 1.6, spec.startTime);
  modulatorGain.gain.exponentialRampToValueAtTime(
    spec.frequency * 0.02,
    spec.startTime + MOD_DECAY_SECONDS,
  );
  const modulator = createOscillator(
    rig,
    "sine",
    spec.frequency * MOD_RATIO,
    spec.startTime,
    end,
  );
  const carrier = createOscillator(
    rig,
    "sine",
    spec.frequency,
    spec.startTime,
    end,
  );
  modulator.connect(modulatorGain).connect(carrier.frequency);
  carrier.connect(output).connect(rig.destination);
  return end;
};
