const HARMONICS = 48;
const cache = new WeakMap<BaseAudioContext, Map<number, PeriodicWave>>();

export function pulseWave(
  context: BaseAudioContext,
  duty: number,
): PeriodicWave {
  let waves = cache.get(context);
  if (!waves) {
    waves = new Map();
    cache.set(context, waves);
  }
  const existing = waves.get(duty);
  if (existing) return existing;
  const real = new Float32Array(HARMONICS + 1);
  const imaginary = new Float32Array(HARMONICS + 1);
  for (let harmonic = 1; harmonic <= HARMONICS; harmonic++) {
    real[harmonic] =
      (2 / (harmonic * Math.PI)) * Math.sin(harmonic * Math.PI * duty);
  }
  const wave = context.createPeriodicWave(real, imaginary);
  waves.set(duty, wave);
  return wave;
}
