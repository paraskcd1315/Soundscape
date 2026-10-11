import { pluckEnvelope } from "./envelopes";
import type { VoiceRenderer } from "./VoiceRenderer";
import { createFilter, createGain, createOscillator } from "./voiceNodes";

const DETUNE_CENTS = [-10, 0, 10];
const RESONANCE = 7;
const OPEN_SECONDS = 0.012;

export const stabVoice: VoiceRenderer = (rig, spec) => {
  const decay = Math.max(0.18, Math.min(spec.duration, 0.5));
  const output = createGain(rig, 0);
  const base = 700 + spec.brightness * 600;
  const peak = 1800 + spec.brightness * 2600 + spec.velocity * 800;
  const filter = createFilter(rig, "lowpass", base, RESONANCE);
  const end = pluckEnvelope(
    output.gain,
    spec.startTime,
    0.075 * spec.velocity,
    0.002,
    decay,
  );
  filter.frequency.setValueAtTime(base, spec.startTime);
  filter.frequency.linearRampToValueAtTime(peak, spec.startTime + OPEN_SECONDS);
  filter.frequency.exponentialRampToValueAtTime(
    base * 0.5,
    spec.startTime + decay,
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
