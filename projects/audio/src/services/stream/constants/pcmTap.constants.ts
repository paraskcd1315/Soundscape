export const PCM_TAP_NAME = "soundscape-pcm-tap";

export const PCM_TAP_SOURCE = `
class PcmTap extends AudioWorkletProcessor {
  constructor(options) {
    super();
    this.size = options.processorOptions.batchFrames;
    this.allocate();
  }

  allocate() {
    this.left = new Float32Array(this.size);
    this.right = new Float32Array(this.size);
    this.filled = 0;
  }

  process(inputs) {
    const input = inputs[0];
    const left = input[0];
    if (left) {
      this.left.set(left, this.filled);
      this.right.set(input[1] ?? left, this.filled);
    }
    this.filled += 128;
    if (this.filled >= this.size) {
      this.port.postMessage([this.left, this.right], [this.left.buffer, this.right.buffer]);
      this.allocate();
    }
    return true;
  }
}
registerProcessor('${PCM_TAP_NAME}', PcmTap);
`;
