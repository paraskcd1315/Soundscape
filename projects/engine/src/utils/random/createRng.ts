import { hashSeed } from './hashSeed';
import { SeededRng } from '../../services/random/SeededRng';

export function createRng(...parts: readonly (number | string)[]): SeededRng {
  return new SeededRng(hashSeed(...parts));
}
