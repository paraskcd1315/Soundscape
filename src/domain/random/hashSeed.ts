const FNV_OFFSET = 2166136261;
const FNV_PRIME = 16777619;
const SEPARATOR = 0x9e;

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
