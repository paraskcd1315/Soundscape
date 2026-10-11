import type { VoiceRig } from "../types/VoiceRig";
import type { VoiceSpec } from "../types/VoiceSpec";
import { STRIKE_FILTER_METRICS } from "../constants/strikeFilter.constants";
import { createFilter } from "./voiceNodes.util";

export function strikeFilter(rig: VoiceRig, spec: VoiceSpec): BiquadFilterNode {
  return createFilter(
    rig,
    "lowpass",
    STRIKE_FILTER_METRICS.baseHz +
      spec.brightness * STRIKE_FILTER_METRICS.brightnessHz +
      spec.velocity * STRIKE_FILTER_METRICS.velocityHz,
    STRIKE_FILTER_METRICS.q,
  );
}
