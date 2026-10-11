import { sustainEnvelope } from "../../utils/envelopes.util";
import type { VoiceRenderer } from "../../types/VoiceRenderer";
import {
  createFilter,
  createGain,
  createOscillator,
} from "../../utils/voiceNodes.util";
import { createSaturationCurve } from "../../utils/createSaturationCurve";
import { SAW_BASS_METRICS } from "./constants/sawBassVoice.constants";

export const sawBassVoice: VoiceRenderer = (rig, spec) => {
  const metrics = SAW_BASS_METRICS;
  const output = createGain(rig, 0);
  const end = sustainEnvelope(
    output.gain,
    spec.startTime,
    spec.duration,
    metrics.peak * spec.velocity,
    metrics.attackSeconds,
    metrics.releaseSeconds,
  );
  const open = metrics.openBaseHz + spec.brightness * metrics.openBrightnessHz;
  const lowPass = createFilter(rig, "lowpass", open, metrics.resonance);
  lowPass.frequency.setValueAtTime(open, spec.startTime);
  lowPass.frequency.exponentialRampToValueAtTime(
    metrics.floorHz,
    spec.startTime + metrics.sweepSeconds,
  );
  const shaper = rig.context.createWaveShaper();
  shaper.curve = createSaturationCurve(metrics.drive);
  createOscillator(rig, "sawtooth", spec.frequency, spec.startTime, end)
    .connect(createFilter(rig, "highpass", metrics.splitHz))
    .connect(lowPass)
    .connect(shaper)
    .connect(createGain(rig, metrics.midGain))
    .connect(output);
  createOscillator(rig, "sine", spec.frequency, spec.startTime, end)
    .connect(createGain(rig, metrics.subGain))
    .connect(output);
  output.connect(rig.destination);
  return end;
};
