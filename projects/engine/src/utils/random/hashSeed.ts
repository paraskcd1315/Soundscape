import { FNV_OFFSET, FNV_PRIME, SEPARATOR } from "./constants/hashSeed.constants";


export function hashSeed(...parts: readonly (number | string)[]): number {
  let hash = FNV_OFFSET;
  for (const part of parts) {
    const text = String(part);
    for (let index = 0; index < text.length; index++) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, FNV_PRIME);
    }
    hash ^= SEPARATOR;
    hash = Math.imul(hash, FNV_PRIME);
  }
  return hash >>> 0;
}
