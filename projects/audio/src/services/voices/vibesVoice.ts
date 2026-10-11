import { pluckEnvelope } from "../../utils/envelopes.util";
import type { VoiceRenderer } from "../../types/VoiceRenderer";
import { createGain, createOscillator } from "../../utils/voiceNodes.util";
import { OVERTONE_RATIO, OVERTONE_LIMIT_HZ, TREMOLO_HZ, TREMOLO_DEPTH, DECAY_SECONDS } from "./constants/vibesVoice.constants";

export const vibesVoice: VoiceRenderer = (rig, spec) => {
  const tremolo = createGain(rig, 1 - TREMOLO_DEPTH);
  const output = createGain(rig, 0);
  const end = pluckEnvelope(
    output.gain,
    spec.startTime,
    0.2 * spec.velocity,
    0.003,
    DECAY_SECONDS,
  );
  createOscillator(rig, "sine", TREMOLO_HZ, spec.startTime, end)
    .connect(createGain(rig, TREMOLO_DEPTH))
    .connect(tremolo.gain);
  createOscillator(rig, "sine", spec.frequency, spec.startTime, end).connect(
    output,
  );
  if (spec.frequency * OVERTONE_RATIO < OVERTONE_LIMIT_HZ) {
    const overtone = createGain(rig, 0);
    pluckEnvelope(
      overtone.gain,
      spec.startTime,
      0.07 * spec.velocity,
      0.002,
      0.6,
    );
    createOscillator(
      rig,
      "sine",
      spec.frequency * OVERTONE_RATIO,
      spec.startTime,
      end,
    )
      .connect(overtone)
      .connect(output);
  }
  output.connect(tremolo).connect(rig.destination);
  return end;
};
