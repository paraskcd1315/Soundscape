import { sustainEnvelope } from "./envelopes";
import type { VoiceRenderer } from "./VoiceRenderer";
import { createFilter, createGain, createOscillator } from "./voiceNodes";

const SWEEP_SECONDS = 0.15;
const FLOOR_HZ = 120;

export const sawBassVoice: VoiceRenderer = (rig, spec) => {
  const output = createGain(rig, 0);
  const filter = createFilter(rig, "lowpass", 300 + spec.brightness * 2500, 6);
  const end = sustainEnvelope(
    output.gain,
    spec.startTime,
    spec.duration,
    0.2 * spec.velocity,
    0.005,
    0.06,
  );
  filter.frequency.setValueAtTime(300 + spec.brightness * 2500, spec.startTime);
  filter.frequency.exponentialRampToValueAtTime(
    FLOOR_HZ,
    spec.startTime + SWEEP_SECONDS,
  );
  createOscillator(
    rig,
    "sawtooth",
    spec.frequency,
    spec.startTime,
    end,
  ).connect(filter);
  filter.connect(output).connect(rig.destination);
  return end;
};
