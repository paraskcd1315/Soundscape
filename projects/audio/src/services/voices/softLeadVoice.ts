import { sustainEnvelope } from "../../utils/envelopes.util";
import type { VoiceRenderer } from "../../types/VoiceRenderer";
import { createFilter, createGain, createOscillator } from "../../utils/voiceNodes.util";
import { TRIANGLE_MIX, VIBRATO_HZ, VIBRATO_CENTS, VIBRATO_DELAY_SECONDS } from "./constants/softLeadVoice.constants";

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
