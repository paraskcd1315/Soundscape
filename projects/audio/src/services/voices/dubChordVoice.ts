import { pluckEnvelope } from "../../utils/envelopes.util";
import type { VoiceRenderer } from "../../types/VoiceRenderer";
import {
  createFilter,
  createGain,
  createOscillator,
} from "../../utils/voiceNodes.util";
import { DUB_CHORD_METRICS } from "./constants/dubChordVoice.constants";

export const dubChordVoice: VoiceRenderer = (rig, spec) => {
  const metrics = DUB_CHORD_METRICS;
  const output = createGain(rig, 0);
  const end = pluckEnvelope(
    output.gain,
    spec.startTime,
    metrics.peak * spec.velocity,
    metrics.attackSeconds,
    metrics.decaySeconds,
  );
  const highPass = createFilter(rig, "highpass", metrics.highPassHz);
  const scoop = createFilter(rig, "peaking", metrics.scoopHz, metrics.scoopQ);
  scoop.gain.value = metrics.scoopDb;
  const lowPass = createFilter(
    rig,
    "lowpass",
    metrics.lowPassBaseHz + spec.brightness * metrics.lowPassBrightnessHz,
    metrics.resonance,
  );
  createOscillator(
    rig,
    "sawtooth",
    spec.frequency,
    spec.startTime,
    end,
    -metrics.detuneCents,
  ).connect(highPass);
  createOscillator(
    rig,
    "square",
    spec.frequency,
    spec.startTime,
    end,
    metrics.detuneCents,
  )
    .connect(createGain(rig, metrics.squareGain))
    .connect(highPass);
  highPass
    .connect(scoop)
    .connect(lowPass)
    .connect(output)
    .connect(rig.destination);
  return end;
};
