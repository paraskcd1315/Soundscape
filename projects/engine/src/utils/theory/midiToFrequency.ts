import { A4_MIDI, A4_FREQUENCY } from "./constants/midiToFrequency.constants";


export function midiToFrequency(midi: number): number {
  return A4_FREQUENCY * Math.pow(2, (midi - A4_MIDI) / 12);
}
