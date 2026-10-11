import { hashSeed } from './hashSeed';
import { SeededRng } from './SeededRng';

export function createRng(...parts: readonly (number | string)[]): SeededRng {
  return new SeededRng(hashSeed(...parts));
}
