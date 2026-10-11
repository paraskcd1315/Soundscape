import { pluckEnvelope } from "../../utils/envelopes.util";
import type { VoiceRenderer } from "../../types/VoiceRenderer";
import type { MalletPartial } from "../../types/MalletPartial";
import { createGain, createOscillator } from "../../utils/voiceNodes.util";
import { strikeFilter } from "../../utils/strikeFilter.util";
import { MALLET_LIMIT_HZ } from "./constants/malletVoice.constants";

export function malletVoice(
  partials: readonly MalletPartial[],
  peak: number,
  decaySeconds: number,
): VoiceRenderer {
  return (rig, spec) => {
    const output = createGain(rig, 1);
    let end = spec.startTime;
    for (const partial of partials) {
      const frequency = spec.frequency * partial.ratio;
      if (frequency > MALLET_LIMIT_HZ) continue;
      const gain = createGain(rig, 0);
      const partialEnd = pluckEnvelope(
        gain.gain,
        spec.startTime,
        peak * partial.gain * spec.velocity,
        partial.attackSeconds,
        decaySeconds * partial.decayScale,
      );
      end = Math.max(end, partialEnd);
      createOscillator(rig, "sine", frequency, spec.startTime, partialEnd)
        .connect(gain)
        .connect(output);
    }
    output.connect(strikeFilter(rig, spec)).connect(rig.destination);
    return end;
  };
}
