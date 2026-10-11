import { pluckEnvelope } from "../../utils/envelopes.util";
import type { VoiceRenderer } from "../../types/VoiceRenderer";
import {
  createFilter,
  createGain,
  createOscillator,
} from "../../utils/voiceNodes.util";
import { NYLON_GUITAR_METRICS } from "./constants/nylonGuitarVoice.constants";

export const nylonGuitarVoice: VoiceRenderer = (rig, spec) => {
  const metrics = NYLON_GUITAR_METRICS;
  const output = createGain(rig, 0);
  const end = pluckEnvelope(
    output.gain,
    spec.startTime,
    metrics.peak * spec.velocity,
    metrics.attackSeconds,
    metrics.decaySeconds,
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
    "triangle",
    spec.frequency,
    spec.startTime,
    end,
  ).connect(filter);
  createOscillator(
    rig,
    "sawtooth",
    spec.frequency,
    spec.startTime,
    end,
    metrics.bodyCents,
  )
    .connect(createGain(rig, metrics.bodyGain))
    .connect(filter);
  filter.connect(output).connect(rig.destination);
  return end;
};
