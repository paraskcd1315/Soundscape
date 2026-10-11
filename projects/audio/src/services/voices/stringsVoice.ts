import { sustainEnvelope } from "../../utils/envelopes.util";
import type { VoiceRenderer } from "../../types/VoiceRenderer";
import { createFilter, createGain, createOscillator } from "../../utils/voiceNodes.util";
import { DETUNE_CENTS, VIBRATO_HZ, VIBRATO_CENTS, ATTACK_SECONDS, RELEASE_SECONDS } from "./constants/stringsVoice.constants";

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
