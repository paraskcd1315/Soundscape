import type { VoiceRenderer } from "./VoiceRenderer";
import { createFilter, createGain, createNoise } from "./voiceNodes";
import { AUDIO_METRICS } from "../audioMetrics";

const START_HZ = 300;
const END_HZ = 3200;
const RELEASE_SECONDS = 0.6;

export const swellVoice: VoiceRenderer = (rig, spec) => {
  const duration = Math.max(0.5, spec.duration);
  const end = spec.startTime + duration + RELEASE_SECONDS;
  const filter = createFilter(rig, "bandpass", START_HZ, 2);
  filter.frequency.setValueAtTime(START_HZ, spec.startTime);
  filter.frequency.exponentialRampToValueAtTime(
    END_HZ,
    spec.startTime + duration,
  );
  const output = createGain(rig, 0);
  output.gain.setValueAtTime(AUDIO_METRICS.silence, spec.startTime);
  output.gain.linearRampToValueAtTime(
    0.22 * spec.velocity,
    spec.startTime + duration,
  );
  output.gain.exponentialRampToValueAtTime(AUDIO_METRICS.silence, end);
  createNoise(rig, spec.startTime, end)
    .connect(filter)
    .connect(output)
    .connect(rig.destination);
  return end;
};
