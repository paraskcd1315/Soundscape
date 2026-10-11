import { sustainEnvelope } from "../../utils/envelopes.util";
import type { VoiceRenderer } from "../../types/VoiceRenderer";
import {
  createFilter,
  createGain,
  createOscillator,
} from "../../utils/voiceNodes.util";
import { BRASS_METRICS } from "./constants/brassVoice.constants";

export const brassVoice: VoiceRenderer = (rig, spec) => {
  const metrics = BRASS_METRICS;
  const output = createGain(rig, 0);
  const end = sustainEnvelope(
    output.gain,
    spec.startTime,
    spec.duration,
    metrics.peak * spec.velocity,
    metrics.attackSeconds,
    metrics.releaseSeconds,
  );
  const peak = metrics.openBaseHz + spec.brightness * metrics.openBrightnessHz;
  const filter = createFilter(
    rig,
    "lowpass",
    metrics.closedHz,
    metrics.resonance,
  );
  filter.frequency.setValueAtTime(metrics.closedHz, spec.startTime);
  filter.frequency.linearRampToValueAtTime(
    peak,
    spec.startTime + metrics.swellSeconds,
  );
  filter.frequency.setTargetAtTime(
    peak * metrics.settleRatio,
    spec.startTime + metrics.swellSeconds,
    metrics.settleSeconds,
  );
  for (const cents of metrics.detuneCents) {
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
