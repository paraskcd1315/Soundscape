import { TRANSITION_METRICS } from "../constants/transition.constants";

export function barSeconds(tempo: number): number {
  return (
    (TRANSITION_METRICS.beatsPerBar * TRANSITION_METRICS.secondsPerMinute) /
    tempo
  );
}
