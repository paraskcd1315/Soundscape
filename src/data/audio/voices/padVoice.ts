import { sustainEnvelope } from "./envelopes";
import type { VoiceRenderer } from "./VoiceRenderer";
import { createFilter, createGain, createOscillator } from "./voiceNodes";

const DETUNE_CENTS = [-9, 0, 9];
const ATTACK_SECONDS = 0.9;
const RELEASE_SECONDS = 1.4;

export const padVoice: VoiceRenderer = (rig, spec) => {
  const output = createGain(rig, 0);
  const filter = createFilter(
    rig,
    "lowpass",
    500 + spec.brightness * 3500,
    0.7,
  );
  const end = sustainEnvelope(
    output.gain,
    spec.startTime,
    spec.duration,
    0.1 * spec.velocity,
    ATTACK_SECONDS,
    RELEASE_SECONDS,
  );
  for (const cents of DETUNE_CENTS) {
    createOscillator(
      rig,
      "sawtooth",
      spec.frequency,
      spec.startTime,
      end,
      cents,
    ).connect(filter);
  }
  filter.connect(output).connect(rig.destination);
  return end;
};
