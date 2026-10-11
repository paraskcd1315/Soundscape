import { sustainEnvelope } from "./envelopes";
import type { VoiceRenderer } from "./VoiceRenderer";
import { createFilter, createGain, createOscillator } from "./voiceNodes";

const DETUNE_CENTS = [-11, 0, 11];
const FORMANTS = [
  { hertz: 650, q: 7, gain: 1 },
  { hertz: 1080, q: 8, gain: 0.7 },
  { hertz: 2600, q: 9, gain: 0.25 },
];
const VIBRATO_HZ = 5.2;
const VIBRATO_CENTS = 7;
const ATTACK_SECONDS = 1.3;
const RELEASE_SECONDS = 2;

export const choirVoice: VoiceRenderer = (rig, spec) => {
  const output = createGain(rig, 0);
  const end = sustainEnvelope(
    output.gain,
    spec.startTime,
    spec.duration,
    0.11 * spec.velocity,
    ATTACK_SECONDS,
    RELEASE_SECONDS,
  );
  const source = createGain(rig, 1);
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
    voice.connect(source);
  }
  for (const formant of FORMANTS) {
    const band = createFilter(rig, "bandpass", formant.hertz, formant.q);
    source.connect(band).connect(createGain(rig, formant.gain)).connect(output);
  }
  output.connect(rig.destination);
  return end;
};
