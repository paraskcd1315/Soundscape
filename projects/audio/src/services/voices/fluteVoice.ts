import { sustainEnvelope } from "../../utils/envelopes.util";
import type { VoiceRenderer } from "../../types/VoiceRenderer";
import {
  createFilter,
  createGain,
  createNoise,
  createOscillator,
} from "../../utils/voiceNodes.util";
import { FLUTE_METRICS } from "./constants/fluteVoice.constants";

export const fluteVoice: VoiceRenderer = (rig, spec) => {
  const metrics = FLUTE_METRICS;
  const output = createGain(rig, 0);
  const end = sustainEnvelope(
    output.gain,
    spec.startTime,
    spec.duration,
    metrics.peak * spec.velocity,
    metrics.attackSeconds,
    metrics.releaseSeconds,
  );
  const tone = createOscillator(
    rig,
    "sine",
    spec.frequency,
    spec.startTime,
    end,
  );
  const vibrato = createGain(rig, 0);
  vibrato.gain.setValueAtTime(0, spec.startTime);
  vibrato.gain.linearRampToValueAtTime(
    metrics.vibratoCents,
    spec.startTime + metrics.vibratoDelaySeconds,
  );
  createOscillator(rig, "sine", metrics.vibratoHz, spec.startTime, end)
    .connect(vibrato)
    .connect(tone.detune);
  tone.connect(output);
  createOscillator(rig, "triangle", spec.frequency * 2, spec.startTime, end)
    .connect(createGain(rig, metrics.overtoneGain))
    .connect(output);
  createNoise(rig, spec.startTime, end)
    .connect(createFilter(rig, "bandpass", spec.frequency * 2, metrics.breathQ))
    .connect(createGain(rig, metrics.breathGain))
    .connect(output);
  output.connect(rig.destination);
  return end;
};
