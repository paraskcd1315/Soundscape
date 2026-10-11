import { sustainEnvelope } from "../../utils/envelopes.util";
import { pulseWave } from "../../utils/pulseWave.util";
import type { VoiceRenderer } from "../../types/VoiceRenderer";
import { createFilter, createGain, createOscillator } from "../../utils/voiceNodes.util";
import { CUTOFF_HZ, DUTIES, VIBRATO_HZ, VIBRATO_CENTS, VIBRATO_DELAY_SECONDS, LONG_NOTE_SECONDS, DETUNE_CENTS } from "./constants/pulseVoice.constants";

export const pulseVoice: VoiceRenderer = (rig, spec) => {
  const output = createGain(rig, 0);
  const filter = createFilter(
    rig,
    "lowpass",
    CUTOFF_HZ * (0.45 + spec.brightness * 0.55),
  );
  const end = sustainEnvelope(
    output.gain,
    spec.startTime,
    spec.duration,
    0.075 * spec.velocity,
    0.003,
    0.04,
  );
  const duty = DUTIES[Math.round(spec.frequency) % DUTIES.length] as number;

  const vibrato = createGain(rig, 0);
  if (spec.duration > LONG_NOTE_SECONDS) {
    vibrato.gain.setValueAtTime(0, spec.startTime + VIBRATO_DELAY_SECONDS);
    vibrato.gain.linearRampToValueAtTime(
      VIBRATO_CENTS,
      spec.startTime + VIBRATO_DELAY_SECONDS + 0.15,
    );
    createOscillator(rig, "sine", VIBRATO_HZ, spec.startTime, end).connect(
      vibrato,
    );
  }

  for (const cents of [0, DETUNE_CENTS]) {
    const oscillator = createOscillator(
      rig,
      "square",
      spec.frequency,
      spec.startTime,
      end,
      cents,
    );
    oscillator.setPeriodicWave(pulseWave(rig.context, duty));
    vibrato.connect(oscillator.detune);
    oscillator.connect(createGain(rig, cents === 0 ? 1 : 0.45)).connect(filter);
  }
  filter.connect(output).connect(rig.destination);
  return end;
};
