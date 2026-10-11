import { sustainEnvelope } from "./envelopes";
import type { VoiceRenderer } from "./VoiceRenderer";
import { createFilter, createGain, createOscillator } from "./voiceNodes";

const LAYERS = [
  { ratio: 1, cents: -8, gain: 0.5 },
  { ratio: 1, cents: 0, gain: 0.5 },
  { ratio: 1, cents: 8, gain: 0.5 },
  { ratio: 0.5, cents: 4, gain: 0.35 },
];
const ATTACK_SECONDS = 1.6;
const RELEASE_SECONDS = 2.2;
const DRIFT_HZ = 0.06;
const DRIFT_CENTS = 5;
const SWEEP_HZ = 0.04;

export const padVoice: VoiceRenderer = (rig, spec) => {
  const output = createGain(rig, 0);
  const cutoff = 450 + spec.brightness * 2600;
  const filter = createFilter(rig, "lowpass", cutoff, 0.8);
  const end = sustainEnvelope(
    output.gain,
    spec.startTime,
    spec.duration,
    0.085 * spec.velocity,
    ATTACK_SECONDS,
    RELEASE_SECONDS,
  );

  const sweep = createGain(rig, cutoff * 0.35);
  createOscillator(rig, "sine", SWEEP_HZ, spec.startTime, end)
    .connect(sweep)
    .connect(filter.frequency);
  const drift = createGain(rig, DRIFT_CENTS);
  createOscillator(rig, "sine", DRIFT_HZ, spec.startTime, end).connect(drift);

  for (const layer of LAYERS) {
    const oscillator = createOscillator(
      rig,
      "sawtooth",
      spec.frequency * layer.ratio,
      spec.startTime,
      end,
      layer.cents,
    );
    drift.connect(oscillator.detune);
    oscillator.connect(createGain(rig, layer.gain)).connect(filter);
  }
  filter.connect(output).connect(rig.destination);
  return end;
};
