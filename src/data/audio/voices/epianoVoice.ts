import { pluckEnvelope } from "./envelopes";
import type { VoiceRenderer } from "./VoiceRenderer";
import { createGain, createOscillator } from "./voiceNodes";

const MOD_RATIO = 1;
const MOD_DECAY_SECONDS = 0.6;

export const epianoVoice: VoiceRenderer = (rig, spec) => {
  const decay = Math.min(2.2, Math.max(0.5, spec.duration + 0.4));
  const output = createGain(rig, 0);
  const end = pluckEnvelope(
    output.gain,
    spec.startTime,
    0.2 * spec.velocity,
    0.004,
    decay,
  );
  const modulatorGain = createGain(rig, 0);
  const index = spec.frequency * (1 + 3 * spec.velocity * spec.brightness);
  modulatorGain.gain.setValueAtTime(index, spec.startTime);
  modulatorGain.gain.exponentialRampToValueAtTime(
    spec.frequency * 0.05,
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
