import { pluckEnvelope } from "./envelopes";
import type { VoiceRenderer } from "./VoiceRenderer";
import { createGain, createOscillator } from "./voiceNodes";

const OVERTONE_RATIO = 4;
const OVERTONE_LIMIT_HZ = 9000;
const TREMOLO_HZ = 4;
const TREMOLO_DEPTH = 0.3;
const DECAY_SECONDS = 2.6;

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
