const A4_MIDI = 69;
const A4_FREQUENCY = 440;

export function midiToFrequency(midi: number): number {
  return A4_FREQUENCY * Math.pow(2, (midi - A4_MIDI) / 12);
}
