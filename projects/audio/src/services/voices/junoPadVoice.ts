import { sustainEnvelope } from "../../utils/envelopes.util";
import type { VoiceRenderer } from "../../types/VoiceRenderer";
import {
  createFilter,
  createGain,
  createOscillator,
} from "../../utils/voiceNodes.util";
import { JUNO_PAD_METRICS } from "./constants/junoPadVoice.constants";

export const junoPadVoice: VoiceRenderer = (rig, spec) => {
  const metrics = JUNO_PAD_METRICS;
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
  metrics.chorus.forEach((voice) => {
    const oscillator = createOscillator(
      rig,
      voice.type,
      spec.frequency,
      spec.startTime,
      end,
      voice.cents,
    );
    const depth = createGain(rig, metrics.chorusDepthCents);
    createOscillator(rig, "sine", voice.rateHz, spec.startTime, end)
      .connect(depth)
      .connect(oscillator.detune);
    oscillator.connect(createGain(rig, voice.gain)).connect(filter);
  });
  filter.connect(output).connect(rig.destination);
  return end;
};
