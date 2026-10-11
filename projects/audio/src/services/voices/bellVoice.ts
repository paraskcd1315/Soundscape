import { pluckEnvelope } from "../../utils/envelopes.util";
import type { VoiceRenderer } from "../../types/VoiceRenderer";
import { createGain, createOscillator } from "../../utils/voiceNodes.util";
import { strikeFilter } from "../../utils/strikeFilter.util";
import {
  MOD_RATIO,
  MOD_DECAY_SECONDS,
  DECAY_SECONDS,
  PEAK,
  ATTACK_SECONDS,
  MOD_INDEX,
  MOD_INDEX_FLOOR,
} from "./constants/bellVoice.constants";

export const bellVoice: VoiceRenderer = (rig, spec) => {
  const output = createGain(rig, 0);
  const end = pluckEnvelope(
    output.gain,
    spec.startTime,
    PEAK * spec.velocity,
    ATTACK_SECONDS,
    DECAY_SECONDS,
  );
  const modulatorGain = createGain(rig, 0);
  modulatorGain.gain.setValueAtTime(spec.frequency * MOD_INDEX, spec.startTime);
  modulatorGain.gain.exponentialRampToValueAtTime(
    spec.frequency * MOD_INDEX_FLOOR,
    spec.startTime + MOD_DECAY_SECONDS,
  );
  const modulator = createOscillator(
    rig,
    "sine",
    spec.frequency * MOD_RATIO,
    spec.startTime,
    end,
  );
  const carrier = createOscillator(
    rig,
    "sine",
    spec.frequency,
    spec.startTime,
    end,
  );
  modulator.connect(modulatorGain).connect(carrier.frequency);
  carrier
    .connect(strikeFilter(rig, spec))
    .connect(output)
    .connect(rig.destination);
  return end;
};
