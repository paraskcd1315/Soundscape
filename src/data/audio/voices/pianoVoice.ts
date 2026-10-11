import { clamp } from "../../../domain/theory/clamp";
import { pluckEnvelope } from "./envelopes";
import type { VoiceRenderer } from "./VoiceRenderer";
import {
  createFilter,
  createGain,
  createNoise,
  createOscillator,
} from "./voiceNodes";

const PARTIALS = [
  { ratio: 1, gain: 1, decay: 1 },
  { ratio: 2.003, gain: 0.45, decay: 0.7 },
  { ratio: 3.01, gain: 0.22, decay: 0.5 },
  { ratio: 4.025, gain: 0.1, decay: 0.35 },
];
const HAMMER_SECONDS = 0.025;
const NYQUIST_GUARD = 0.45;

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
