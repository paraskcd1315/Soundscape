import { pluckEnvelope } from "../../utils/envelopes.util";
import type { VoiceRenderer } from "../../types/VoiceRenderer";
import { createGain, createOscillator } from "../../utils/voiceNodes.util";
import { TINE_RATIO, TINE_LIMIT_HZ, TREMOLO_HZ, TREMOLO_DEPTH, MOD_DECAY_SECONDS } from "./constants/rhodesVoice.constants";

export const rhodesVoice: VoiceRenderer = (rig, spec) => {
  const decay = Math.min(2.6, Math.max(0.6, spec.duration + 0.5));
  const tremolo = createGain(rig, 1 - TREMOLO_DEPTH);
  const output = createGain(rig, 0);
  const end = pluckEnvelope(
    output.gain,
    spec.startTime,
    0.2 * spec.velocity,
    0.003,
    decay,
  );

  const lfo = createOscillator(rig, "sine", TREMOLO_HZ, spec.startTime, end);
  lfo.connect(createGain(rig, TREMOLO_DEPTH)).connect(tremolo.gain);

  const modulatorGain = createGain(rig, 0);
  modulatorGain.gain.setValueAtTime(
    spec.frequency * (0.8 + 2 * spec.velocity),
    spec.startTime,
  );
  modulatorGain.gain.exponentialRampToValueAtTime(
    spec.frequency * 0.04,
    spec.startTime + MOD_DECAY_SECONDS,
  );
  const modulator = createOscillator(
    rig,
    "sine",
    spec.frequency,
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
  carrier.connect(output);

  if (spec.frequency * TINE_RATIO < TINE_LIMIT_HZ) {
    const tineGain = createGain(rig, 0);
    pluckEnvelope(
      tineGain.gain,
      spec.startTime,
      0.05 * spec.velocity,
      0.001,
      0.18,
    );
    createOscillator(
      rig,
      "sine",
      spec.frequency * TINE_RATIO,
      spec.startTime,
      end,
    )
      .connect(tineGain)
      .connect(output);
  }

  output.connect(tremolo).connect(rig.destination);
  return end;
};
