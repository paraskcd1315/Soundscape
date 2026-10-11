import { sustainEnvelope } from "../../utils/envelopes.util";
import type { VoiceRenderer } from "../../types/VoiceRenderer";
import {
  createFilter,
  createGain,
  createNoise,
  createOscillator,
} from "../../utils/voiceNodes.util";
import { SQUARE_MIX, FORMANT_HZ, VIBRATO_HZ, VIBRATO_CENTS, VIBRATO_DELAY_SECONDS, BREATH_HZ, SCOOP_CENTS, SCOOP_SECONDS } from "./constants/hornVoice.constants";

export const hornVoice: VoiceRenderer = (rig, spec) => {
  const output = createGain(rig, 0);
  const end = sustainEnvelope(
    output.gain,
    spec.startTime,
    spec.duration,
    0.14 * spec.velocity,
    0.045,
    0.12,
  );
  const openCutoff = 900 + spec.velocity * 2400 + spec.brightness * 1500;
  const tone = createFilter(rig, "lowpass", openCutoff, 1.2);
  tone.frequency.setValueAtTime(openCutoff * 0.45, spec.startTime);
  tone.frequency.linearRampToValueAtTime(openCutoff, spec.startTime + 0.06);
  const formant = createFilter(rig, "peaking", FORMANT_HZ, 1.4);
  formant.gain.value = 6;

  const depth = createGain(rig, 0);
  depth.gain.setValueAtTime(0, spec.startTime);
  depth.gain.linearRampToValueAtTime(
    VIBRATO_CENTS,
    spec.startTime + VIBRATO_DELAY_SECONDS + 0.25,
  );
  createOscillator(rig, "sine", VIBRATO_HZ, spec.startTime, end).connect(depth);

  const saw = createOscillator(
    rig,
    "sawtooth",
    spec.frequency,
    spec.startTime,
    end,
  );
  const square = createOscillator(
    rig,
    "square",
    spec.frequency,
    spec.startTime,
    end,
  );
  for (const oscillator of [saw, square]) {
    depth.connect(oscillator.detune);
    oscillator.detune.setValueAtTime(-SCOOP_CENTS, spec.startTime);
    oscillator.detune.linearRampToValueAtTime(
      0,
      spec.startTime + SCOOP_SECONDS,
    );
  }
  saw.connect(tone);
  square.connect(createGain(rig, SQUARE_MIX)).connect(tone);

  const breath = createGain(rig, 0.018 * spec.velocity);
  createNoise(rig, spec.startTime, end)
    .connect(createFilter(rig, "bandpass", BREATH_HZ, 1))
    .connect(breath)
    .connect(output);

  tone.connect(formant).connect(output).connect(rig.destination);
  return end;
};
