import { foldIntoRange } from "./foldIntoRange";

const LOW_MIDI = 48;
const HIGH_MIDI = 76;
const OCTAVE = 12;

function circularDistance(first: number, second: number): number {
  const difference = Math.abs(first - second) % OCTAVE;
  return Math.min(difference, OCTAVE - difference);
}

function nearestPlacement(pitchClass: number, target: number): number {
  let best = foldIntoRange(pitchClass, LOW_MIDI, HIGH_MIDI);
  for (let candidate = best; candidate <= HIGH_MIDI; candidate += OCTAVE) {
    if (Math.abs(candidate - target) < Math.abs(best - target))
      best = candidate;
  }
  for (let candidate = best; candidate >= LOW_MIDI; candidate -= OCTAVE) {
    if (Math.abs(candidate - target) < Math.abs(best - target))
      best = candidate;
  }
  return best;
}

export function rootPositionVoicing(
  pitchClasses: readonly number[],
  centerMidi: number,
): number[] {
  return pitchClasses
    .map((pitchClass) => nearestPlacement(pitchClass, centerMidi))
    .sort((a, b) => a - b);
}

export function voiceLead(
  previous: readonly number[],
  pitchClasses: readonly number[],
): number[] {
  const placed = pitchClasses.map((pitchClass) => {
    const target = previous.reduce(
      (best, note) =>
        circularDistance(note, pitchClass) < circularDistance(best, pitchClass)
          ? note
          : best,
      previous[0] as number,
    );
    return nearestPlacement(pitchClass, target);
  });
  return Array.from(new Set(placed)).sort((a, b) => a - b);
}
