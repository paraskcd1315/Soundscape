import { sustainEnvelope } from "../../utils/envelopes.util";
import type { VoiceRenderer } from "../../types/VoiceRenderer";
import {
  createFilter,
  createGain,
  createOscillator,
} from "../../utils/voiceNodes.util";
import { SUPERSAW_METRICS } from "./constants/supersawVoice.constants";

export const supersawVoice: VoiceRenderer = (rig, spec) => {
  const metrics = SUPERSAW_METRICS;
  const output = createGain(rig, 0);
  const end = sustainEnvelope(
    output.gain,
    spec.startTime,
    spec.duration,
    metrics.peak * spec.velocity,
    metrics.attackSeconds,
    metrics.releaseSeconds,
  );
  const lowPass = createFilter(
    rig,
    "lowpass",
    metrics.cutoffBaseHz + spec.brightness * metrics.cutoffBrightnessHz,
    metrics.resonance,
  );
  const highPass = createFilter(rig, "highpass", metrics.highPassHz);
  for (const cents of metrics.detuneCents) {
    createOscillator(
      rig,
      "sawtooth",
      spec.frequency,
      spec.startTime,
      end,
      cents,
    ).connect(lowPass);
  }
  lowPass.connect(highPass).connect(output).connect(rig.destination);
  return end;
};
