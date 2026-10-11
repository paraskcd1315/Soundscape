import { pluckEnvelope } from "../../utils/envelopes.util";
import type { VoiceRenderer } from "../../types/VoiceRenderer";
import {
  createFilter,
  createGain,
  createOscillator,
} from "../../utils/voiceNodes.util";
import { FELT_PIANO_METRICS } from "./constants/feltPianoVoice.constants";

export const feltPianoVoice: VoiceRenderer = (rig, spec) => {
  const metrics = FELT_PIANO_METRICS;
  const output = createGain(rig, 0);
  const end = pluckEnvelope(
    output.gain,
    spec.startTime,
    metrics.peak * spec.velocity,
    metrics.attackSeconds,
    metrics.decaySeconds,
  );
  const filter = createFilter(
    rig,
    "lowpass",
    metrics.cutoffBaseHz +
      spec.brightness * metrics.cutoffBrightnessHz +
      spec.velocity * metrics.cutoffVelocityHz,
    metrics.filterQ,
  );
  filter.frequency.setTargetAtTime(
    metrics.cutoffFloorHz,
    spec.startTime + metrics.attackSeconds,
    metrics.cutoffCloseSeconds,
  );
  createOscillator(
    rig,
    "triangle",
    spec.frequency,
    spec.startTime,
    end,
  ).connect(filter);
  const body = createGain(rig, metrics.bodyGain);
  createOscillator(
    rig,
    "sine",
    spec.frequency,
    spec.startTime,
    end,
    metrics.bodyDetuneCents,
  )
    .connect(body)
    .connect(filter);
  filter.connect(output).connect(rig.destination);
  return end;
};
