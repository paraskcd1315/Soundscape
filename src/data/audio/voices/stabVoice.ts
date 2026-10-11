import { pluckEnvelope } from "./envelopes";
import type { VoiceRenderer } from "./VoiceRenderer";
import { createFilter, createGain, createOscillator } from "./voiceNodes";

const DETUNE_CENTS = [-7, 7];

export const stabVoice: VoiceRenderer = (rig, spec) => {
  const decay = Math.max(0.25, spec.duration);
  const output = createGain(rig, 0);
  const startCutoff = 800 + spec.brightness * 4000;
  const filter = createFilter(rig, "lowpass", startCutoff, 1.5);
  const end = pluckEnvelope(
    output.gain,
    spec.startTime,
    0.1 * spec.velocity,
    0.004,
    decay,
  );
  filter.frequency.setValueAtTime(startCutoff, spec.startTime);
  filter.frequency.exponentialRampToValueAtTime(300, spec.startTime + decay);
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
