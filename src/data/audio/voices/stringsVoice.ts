import { sustainEnvelope } from "./envelopes";
import type { VoiceRenderer } from "./VoiceRenderer";
import { createFilter, createGain, createOscillator } from "./voiceNodes";

const DETUNE_CENTS = [-12, 0, 12];
const VIBRATO_HZ = 5.4;
const VIBRATO_CENTS = 7;
const ATTACK_SECONDS = 0.55;
const RELEASE_SECONDS = 0.8;

export const stringsVoice: VoiceRenderer = (rig, spec) => {
  const output = createGain(rig, 0);
  const filter = createFilter(
    rig,
    "lowpass",
    1100 + spec.brightness * 2600,
    0.6,
  );
  const end = sustainEnvelope(
    output.gain,
    spec.startTime,
    spec.duration,
    0.075 * spec.velocity,
    ATTACK_SECONDS,
    RELEASE_SECONDS,
  );
  const vibrato = createOscillator(
    rig,
    "sine",
    VIBRATO_HZ,
    spec.startTime,
    end,
  );
  const vibratoDepth = createGain(rig, VIBRATO_CENTS);
  vibrato.connect(vibratoDepth);
  for (const cents of DETUNE_CENTS) {
    const voice = createOscillator(
      rig,
      "sawtooth",
      spec.frequency,
      spec.startTime,
      end,
      cents,
    );
    vibratoDepth.connect(voice.detune);
    voice.connect(filter);
  }
  filter.connect(output).connect(rig.destination);
  return end;
};
