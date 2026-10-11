import { clamp } from "@soundscape/engine/utils/theory/clamp";
import { pluckEnvelope } from "../../utils/envelopes.util";
import type { VoiceRenderer } from "../../types/VoiceRenderer";
import {
  createFilter,
  createGain,
  createNoise,
  createOscillator,
} from "../../utils/voiceNodes.util";
import { PARTIALS, HAMMER_SECONDS, NYQUIST_GUARD } from "./constants/pianoVoice.constants";

export const pianoVoice: VoiceRenderer = (rig, spec) => {
  const decay = clamp(spec.duration * 1.2 + 0.6, 0.6, 2.8);
  const filter = createFilter(
    rig,
    "lowpass",
    1800 + spec.brightness * 4500 + spec.velocity * 2000,
    0.6,
  );
  const output = createGain(rig, 1);
  filter.connect(output).connect(rig.destination);

  let end = spec.startTime;
  for (const partial of PARTIALS) {
    const frequency = spec.frequency * partial.ratio;
    if (frequency > rig.context.sampleRate * NYQUIST_GUARD) continue;
    const gain = createGain(rig, 0);
    const partialEnd = pluckEnvelope(
      gain.gain,
      spec.startTime,
      0.13 * spec.velocity * partial.gain,
      0.002,
      decay * partial.decay,
    );
    createOscillator(rig, "sine", frequency, spec.startTime, partialEnd)
      .connect(gain)
      .connect(filter);
    end = Math.max(end, partialEnd);
  }

  const hammer = createGain(rig, 0);
  const hammerEnd = pluckEnvelope(
    hammer.gain,
    spec.startTime,
    0.03 * spec.velocity,
    0.001,
    HAMMER_SECONDS,
  );
  createNoise(rig, spec.startTime, hammerEnd)
    .connect(createFilter(rig, "bandpass", spec.frequency * 4, 1.2))
    .connect(hammer)
    .connect(output);
  return end;
};
