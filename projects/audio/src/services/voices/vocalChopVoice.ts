import { pluckEnvelope } from "../../utils/envelopes.util";
import type { VoiceRenderer } from "../../types/VoiceRenderer";
import {
  createFilter,
  createGain,
  createOscillator,
} from "../../utils/voiceNodes.util";
import { VOCAL_CHOP_METRICS } from "./constants/vocalChopVoice.constants";

export const vocalChopVoice: VoiceRenderer = (rig, spec) => {
  const metrics = VOCAL_CHOP_METRICS;
  const decay = Math.min(
    Math.max(spec.duration, metrics.minimumDecaySeconds),
    metrics.maximumDecaySeconds,
  );
  const output = createGain(rig, 0);
  const end = pluckEnvelope(
    output.gain,
    spec.startTime,
    metrics.peak * spec.velocity,
    metrics.attackSeconds,
    decay,
  );
  const source = createOscillator(
    rig,
    "sawtooth",
    spec.frequency,
    spec.startTime,
    end,
  );
  source.detune.setValueAtTime(metrics.scoopCents, spec.startTime);
  source.detune.linearRampToValueAtTime(
    0,
    spec.startTime + metrics.scoopSeconds,
  );
  for (const formant of metrics.formants) {
    source
      .connect(createFilter(rig, "bandpass", formant.hz, formant.q))
      .connect(createGain(rig, formant.gain))
      .connect(output);
  }
  output.connect(rig.destination);
  return end;
};
