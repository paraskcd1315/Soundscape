export interface SpectrumSource {
  readonly context: { readonly sampleRate: number };
  readonly frequencyBinCount: number;
  readonly fftSize: number;
  getByteFrequencyData(array: Uint8Array<ArrayBuffer>): void;
  getByteTimeDomainData(array: Uint8Array<ArrayBuffer>): void;
}
