import { sustainEnvelope } from "../../utils/envelopes.util";
import type { VoiceRenderer } from "../../types/VoiceRenderer";
import {
  createFilter,
  createGain,
  createNoise,
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
  const open = lowPass.frequency.value;
  lowPass.frequency.setValueAtTime(open, spec.startTime);
  lowPass.frequency.setTargetAtTime(
    open * metrics.settleRatio,
    spec.startTime + metrics.attackSeconds,
    metrics.settleSeconds,
  );
  const highPass = createFilter(rig, "highpass", metrics.highPassHz);
  const voices = metrics.detuneCents.length;
  metrics.detuneCents.forEach((cents, index) => {
    const pan = rig.context.createStereoPanner();
    pan.pan.value =
      voices > 1
        ? (index / (voices - 1)) * 2 * metrics.spread - metrics.spread
        : 0;
    createOscillator(
      rig,
      "sawtooth",
      spec.frequency,
      spec.startTime + Math.random() / spec.frequency,
      end,
      cents,
    )
      .connect(pan)
      .connect(lowPass);
  });
  createNoise(rig, spec.startTime, end)
    .connect(createFilter(rig, "highpass", metrics.noiseHighPassHz))
    .connect(createGain(rig, metrics.noiseGain))
    .connect(lowPass);
  lowPass.connect(highPass).connect(output).connect(rig.destination);
  return end;
};
