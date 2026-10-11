import { pluckEnvelope } from "../../utils/envelopes.util";
import type { VoiceRenderer } from "../../types/VoiceRenderer";
import { createGain, createOscillator } from "../../utils/voiceNodes.util";
import { TOM_METRICS } from "./constants/tomVoice.constants";

export const tomVoice: VoiceRenderer = (rig, spec) => {
  const metrics = TOM_METRICS;
  const output = createGain(rig, 0);
  const end = pluckEnvelope(
    output.gain,
    spec.startTime,
    metrics.peak * spec.velocity,
    metrics.attackSeconds,
    metrics.decaySeconds,
  );
  const pitch = metrics.lowHz + spec.velocity * metrics.velocitySpreadHz;
  const body = createOscillator(rig, "sine", pitch, spec.startTime, end);
  body.frequency.setValueAtTime(pitch * metrics.startRatio, spec.startTime);
  body.frequency.exponentialRampToValueAtTime(
    pitch,
    spec.startTime + metrics.sweepSeconds,
  );
  body.connect(output).connect(rig.destination);
  return end;
};
