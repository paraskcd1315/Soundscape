import { pluckEnvelope } from "../../utils/envelopes.util";
import type { VoiceRenderer } from "../../types/VoiceRenderer";
import {
  createFilter,
  createGain,
  createNoise,
  createOscillator,
} from "../../utils/voiceNodes.util";
import { START_HZ, END_HZ, SWEEP_SECONDS, DECAY_SECONDS } from "./constants/rimVoice.constants";

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
