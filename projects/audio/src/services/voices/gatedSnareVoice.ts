import { pluckEnvelope } from "../../utils/envelopes.util";
import type { VoiceRenderer } from "../../types/VoiceRenderer";
import {
  createFilter,
  createGain,
  createNoise,
  createOscillator,
} from "../../utils/voiceNodes.util";
import { GATED_SNARE_METRICS } from "./constants/gatedSnareVoice.constants";

export const gatedSnareVoice: VoiceRenderer = (rig, spec) => {
  const metrics = GATED_SNARE_METRICS;
  const start = spec.startTime;
  const gateEnd = start + metrics.gateSeconds;
  const noiseGain = createGain(rig, 0);
  noiseGain.gain.setValueAtTime(0, start);
  noiseGain.gain.linearRampToValueAtTime(
    metrics.noisePeak * spec.velocity,
    start + metrics.attackSeconds,
  );
  noiseGain.gain.linearRampToValueAtTime(
    metrics.noisePeak * metrics.holdRatio * spec.velocity,
    gateEnd,
  );
  noiseGain.gain.linearRampToValueAtTime(0, gateEnd + metrics.cutSeconds);
  createNoise(rig, start, gateEnd + metrics.cutSeconds)
    .connect(createFilter(rig, "bandpass", metrics.noiseHz, metrics.noiseQ))
    .connect(noiseGain)
    .connect(rig.destination);
  const bodyGain = createGain(rig, 0);
  const bodyEnd = pluckEnvelope(
    bodyGain.gain,
    start,
    metrics.bodyPeak * spec.velocity,
    metrics.attackSeconds,
    metrics.bodyDecaySeconds,
  );
  createOscillator(rig, "triangle", metrics.bodyHz, start, bodyEnd)
    .connect(bodyGain)
    .connect(rig.destination);
  return Math.max(gateEnd + metrics.cutSeconds, bodyEnd);
};
