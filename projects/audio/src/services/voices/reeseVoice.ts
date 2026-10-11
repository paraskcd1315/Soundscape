import { sustainEnvelope } from "../../utils/envelopes.util";
import type { VoiceRenderer } from "../../types/VoiceRenderer";
import {
  createFilter,
  createGain,
  createOscillator,
} from "../../utils/voiceNodes.util";
import { REESE_METRICS } from "./constants/reeseVoice.constants";

export const reeseVoice: VoiceRenderer = (rig, spec) => {
  const metrics = REESE_METRICS;
  const output = createGain(rig, 0);
  const end = sustainEnvelope(
    output.gain,
    spec.startTime,
    spec.duration,
    metrics.peak * spec.velocity,
    metrics.attackSeconds,
    metrics.releaseSeconds,
  );
  const filter = createFilter(
    rig,
    "lowpass",
    metrics.cutoffBaseHz + spec.brightness * metrics.cutoffBrightnessHz,
    metrics.resonance,
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
  createOscillator(rig, "sine", spec.frequency / 2, spec.startTime, end)
    .connect(createGain(rig, metrics.subGain))
    .connect(output);
  filter.connect(output).connect(rig.destination);
  return end;
};
