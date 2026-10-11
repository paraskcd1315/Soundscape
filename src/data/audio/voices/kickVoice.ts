import { pluckEnvelope } from "./envelopes";
import type { VoiceRenderer } from "./VoiceRenderer";
import {
  createFilter,
  createGain,
  createNoise,
  createOscillator,
} from "./voiceNodes";

const START_HZ = 180;
const END_HZ = 47;
const SWEEP_SECONDS = 0.05;
const DECAY_SECONDS = 0.36;
const CLICK_SECONDS = 0.004;
const CLICK_HZ = 3000;

export const kickVoice: VoiceRenderer = (rig, spec) => {
  const output = createGain(rig, 0);
  const end = pluckEnvelope(
    output.gain,
    spec.startTime,
    0.95 * spec.velocity,
    0.0015,
    DECAY_SECONDS,
  );
  const body = createOscillator(rig, "sine", START_HZ, spec.startTime, end);
  body.frequency.setValueAtTime(START_HZ, spec.startTime);
  body.frequency.exponentialRampToValueAtTime(
    END_HZ,
    spec.startTime + SWEEP_SECONDS,
  );
  body.connect(output);

  const click = createGain(rig, 0);
  const clickEnd = pluckEnvelope(
    click.gain,
    spec.startTime,
    0.12 * spec.velocity,
    0.0005,
    CLICK_SECONDS,
  );
  createNoise(rig, spec.startTime, clickEnd)
    .connect(createFilter(rig, "highpass", CLICK_HZ))
    .connect(click)
    .connect(output);

  output.connect(rig.destination);
  return end;
};
