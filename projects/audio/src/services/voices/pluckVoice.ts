import { pluckEnvelope } from "../../utils/envelopes.util";
import type { VoiceRenderer } from "../../types/VoiceRenderer";
import {
  createFilter,
  createGain,
  createOscillator,
} from "../../utils/voiceNodes.util";
import { PLUCK_METRICS } from "./constants/pluckVoice.constants";

export const pluckVoice: VoiceRenderer = (rig, spec) => {
  const metrics = PLUCK_METRICS;
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
  const open =
    metrics.openBaseHz +
    spec.brightness * metrics.openBrightnessHz +
    spec.velocity * metrics.openVelocityHz;
  const filter = createFilter(rig, "lowpass", open, metrics.resonance);
  filter.frequency.setValueAtTime(open, spec.startTime);
  filter.frequency.exponentialRampToValueAtTime(
    metrics.closedHz,
    spec.startTime + metrics.closeSeconds,
  );
  createOscillator(
    rig,
    "sawtooth",
    spec.frequency,
    spec.startTime,
    end,
  ).connect(filter);
  createOscillator(
    rig,
    "square",
    spec.frequency,
    spec.startTime,
    end,
    metrics.squareDetuneCents,
  )
    .connect(createGain(rig, metrics.squareGain))
    .connect(filter);
  filter.connect(output).connect(rig.destination);
  return end;
};
