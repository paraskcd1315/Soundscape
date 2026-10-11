import { sustainEnvelope } from "../../utils/envelopes.util";
import type { VoiceRenderer } from "../../types/VoiceRenderer";
import { createFilter, createGain, createOscillator } from "../../utils/voiceNodes.util";
import { SWEEP_SECONDS, FLOOR_HZ, RESONANCE } from "./constants/acidVoice.constants";

export const acidVoice: VoiceRenderer = (rig, spec) => {
  const output = createGain(rig, 0);
  const startCutoff = 350 + spec.brightness * 3200 * (0.4 + spec.velocity);
  const filter = createFilter(rig, "lowpass", startCutoff, RESONANCE);
  const end = sustainEnvelope(
    output.gain,
    spec.startTime,
    spec.duration,
    0.16 * spec.velocity,
    0.003,
    0.04,
  );
  filter.frequency.setValueAtTime(startCutoff, spec.startTime);
  filter.frequency.exponentialRampToValueAtTime(
    FLOOR_HZ,
    spec.startTime + Math.min(SWEEP_SECONDS, spec.duration + 0.05),
  );
  createOscillator(
    rig,
    spec.velocity > 0.45 ? "sawtooth" : "square",
    spec.frequency,
    spec.startTime,
    end,
  ).connect(filter);
  filter.connect(output).connect(rig.destination);
  return end;
};
