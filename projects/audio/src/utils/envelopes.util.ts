import { AUDIO_METRICS } from "../constants/audio.constants";

export function pluckEnvelope(
  gain: AudioParam,
  startTime: number,
  peak: number,
  attack: number,
  decay: number,
): number {
  const end = startTime + attack + decay;
  gain.setValueAtTime(AUDIO_METRICS.silence, startTime);
  gain.linearRampToValueAtTime(
    Math.max(peak, AUDIO_METRICS.silence),
    startTime + attack,
  );
  gain.exponentialRampToValueAtTime(AUDIO_METRICS.silence, end);
  return end;
}

export function sustainEnvelope(
  gain: AudioParam,
  startTime: number,
  duration: number,
  peak: number,
  attack: number,
  release: number,
): number {
  const attackEnd = startTime + Math.min(attack, duration);
  const holdEnd = Math.max(attackEnd, startTime + duration);
  const end = holdEnd + release;
  gain.setValueAtTime(AUDIO_METRICS.silence, startTime);
  gain.linearRampToValueAtTime(
    Math.max(peak, AUDIO_METRICS.silence),
    attackEnd,
  );
  gain.setValueAtTime(Math.max(peak, AUDIO_METRICS.silence), holdEnd);
  gain.exponentialRampToValueAtTime(AUDIO_METRICS.silence, end);
  return end;
}
