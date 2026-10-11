import { pluckEnvelope } from "../../utils/envelopes.util";
import type { VoiceRenderer } from "../../types/VoiceRenderer";
import { createGain, createOscillator } from "../../utils/voiceNodes.util";
import { START_HZ, END_HZ, SWEEP_SECONDS, DECAY_SECONDS } from "./constants/percVoice.constants";

export const percVoice: VoiceRenderer = (rig, spec) => {
  const output = createGain(rig, 0);
  const end = pluckEnvelope(
    output.gain,
    spec.startTime,
    0.28 * spec.velocity,
    0.001,
    DECAY_SECONDS,
  );
  const tone = createOscillator(rig, "sine", START_HZ, spec.startTime, end);
  tone.frequency.setValueAtTime(START_HZ, spec.startTime);
  tone.frequency.exponentialRampToValueAtTime(
    END_HZ,
    spec.startTime + SWEEP_SECONDS,
  );
  tone.connect(output).connect(rig.destination);
  return end;
};
