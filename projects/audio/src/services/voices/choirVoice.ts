import { sustainEnvelope } from "../../utils/envelopes.util";
import type { VoiceRenderer } from "../../types/VoiceRenderer";
import { createFilter, createGain, createOscillator } from "../../utils/voiceNodes.util";
import { DETUNE_CENTS, FORMANTS, VIBRATO_HZ, VIBRATO_CENTS, ATTACK_SECONDS, RELEASE_SECONDS } from "./constants/choirVoice.constants";

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
