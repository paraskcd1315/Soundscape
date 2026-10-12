export function fftMagnitudes(
  samples: Float32Array,
  magnitudes: Float32Array,
): void {
  const size = samples.length;
  const real = new Float32Array(size);
  const imaginary = new Float32Array(size);
  for (let index = 0; index < size; index++) {
    const window = 0.5 - 0.5 * Math.cos((2 * Math.PI * index) / (size - 1));
    real[reverseBits(index, size)] = (samples[index] ?? 0) * window;
  }
  for (let span = 2; span <= size; span *= 2) {
    const half = span / 2;
    const step = (-2 * Math.PI) / span;
    for (let start = 0; start < size; start += span) {
      for (let offset = 0; offset < half; offset++) {
        const cos = Math.cos(step * offset);
        const sin = Math.sin(step * offset);
        const even = start + offset;
        const odd = even + half;
        const oddReal = (real[odd] ?? 0) * cos - (imaginary[odd] ?? 0) * sin;
        const oddImaginary =
          (real[odd] ?? 0) * sin + (imaginary[odd] ?? 0) * cos;
        real[odd] = (real[even] ?? 0) - oddReal;
        imaginary[odd] = (imaginary[even] ?? 0) - oddImaginary;
        real[even] = (real[even] ?? 0) + oddReal;
        imaginary[even] = (imaginary[even] ?? 0) + oddImaginary;
      }
    }
  }
  for (let bin = 0; bin < magnitudes.length; bin++)
    magnitudes[bin] = Math.hypot(real[bin] ?? 0, imaginary[bin] ?? 0) / size;
}

function reverseBits(value: number, size: number): number {
  let reversed = 0;
  for (let bit = 1; bit < size; bit *= 2) {
    reversed = (reversed << 1) | (value & 1);
    value >>= 1;
  }
  return reversed;
}
