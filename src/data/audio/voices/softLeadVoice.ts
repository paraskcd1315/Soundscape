import { sustainEnvelope } from "./envelopes";
import type { VoiceRenderer } from "./VoiceRenderer";
import { createFilter, createGain, createOscillator } from "./voiceNodes";

const TRIANGLE_MIX = 0.4;
const VIBRATO_HZ = 5.2;
const VIBRATO_CENTS = 9;
const VIBRATO_DELAY_SECONDS = 0.18;

export const softLeadVoice: VoiceRenderer = (rig, spec) => {
  const output = createGain(rig, 0);
  const filter = createFilter(rig, "lowpass", 1800 + spec.brightness * 3200);
  const end = sustainEnvelope(
    output.gain,
    spec.startTime,
    spec.duration,
    0.17 * spec.velocity,
    0.03,
    0.14,
  );
  const vibrato = createOscillator(
    rig,
    "sine",
    VIBRATO_HZ,
    spec.startTime,
    end,
  );
  const depth = createGain(rig, 0);
  depth.gain.setValueAtTime(0, spec.startTime);
  depth.gain.linearRampToValueAtTime(
    VIBRATO_CENTS,
    spec.startTime + VIBRATO_DELAY_SECONDS + 0.2,
  );
  vibrato.connect(depth);
  const sine = createOscillator(
    rig,
    "sine",
    spec.frequency,
    spec.startTime,
    end,
  );
  const triangle = createOscillator(
    rig,
    "triangle",
    spec.frequency,
    spec.startTime,
    end,
  );
  depth.connect(sine.detune);
  depth.connect(triangle.detune);
  sine.connect(filter);
  triangle.connect(createGain(rig, TRIANGLE_MIX)).connect(filter);
  filter.connect(output).connect(rig.destination);
  return end;
};
