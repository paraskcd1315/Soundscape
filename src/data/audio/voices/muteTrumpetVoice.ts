import { sustainEnvelope } from "./envelopes";
import type { VoiceRenderer } from "./VoiceRenderer";
import { createFilter, createGain, createOscillator } from "./voiceNodes";

const MUTE_HZ = 1600;
const MUTE_Q = 3.5;
const LOW_CUT_HZ = 420;
const VIBRATO_HZ = 5.6;
const VIBRATO_CENTS = 8;

export const muteTrumpetVoice: VoiceRenderer = (rig, spec) => {
  const output = createGain(rig, 0);
  const end = sustainEnvelope(
    output.gain,
    spec.startTime,
    spec.duration,
    0.16 * spec.velocity,
    0.025,
    0.09,
  );
  const depth = createGain(rig, VIBRATO_CENTS);
  createOscillator(rig, "sine", VIBRATO_HZ, spec.startTime, end).connect(depth);
  const saw = createOscillator(
    rig,
    "sawtooth",
    spec.frequency,
    spec.startTime,
    end,
  );
  depth.connect(saw.detune);
  saw
    .connect(createFilter(rig, "highpass", LOW_CUT_HZ))
    .connect(
      createFilter(rig, "bandpass", MUTE_HZ + spec.brightness * 600, MUTE_Q),
    )
    .connect(output)
    .connect(rig.destination);
  return end;
};
