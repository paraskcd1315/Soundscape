import { COMPOSER_METRICS } from "./composerMetrics";

export function stepToBeat(step: number, swingBeats: number): number {
  const swung = Number.isInteger(step) && step % 2 === 1 ? swingBeats : 0;
  return step * COMPOSER_METRICS.beatsPerStep + swung;
}

export function stepsToBeats(steps: number): number {
  return steps * COMPOSER_METRICS.beatsPerStep * COMPOSER_METRICS.noteGate;
}
