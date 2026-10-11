import { pluckEnvelope } from "./envelopes";
import type { VoiceRenderer } from "./VoiceRenderer";
import {
  createFilter,
  createGain,
  createNoise,
  createOscillator,
} from "./voiceNodes";

const START_HZ = 1750;
const END_HZ = 1100;
const SWEEP_SECONDS = 0.02;
const DECAY_SECONDS = 0.05;

export const rimVoice: VoiceRenderer = (rig, spec) => {
  const output = createGain(rig, 0);
  const end = pluckEnvelope(
    output.gain,
    spec.startTime,
    0.2 * spec.velocity,
    0.001,
    DECAY_SECONDS,
  );
  const tone = createOscillator(rig, "triangle", START_HZ, spec.startTime, end);
  tone.frequency.setValueAtTime(START_HZ, spec.startTime);
  tone.frequency.exponentialRampToValueAtTime(
    END_HZ,
    spec.startTime + SWEEP_SECONDS,
  );
  tone.connect(output);
  createNoise(rig, spec.startTime, end)
    .connect(createFilter(rig, "highpass", 3000))
    .connect(createGain(rig, 0.25))
    .connect(output);
  output.connect(rig.destination);
  return end;
};
