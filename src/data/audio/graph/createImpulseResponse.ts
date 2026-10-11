export function createImpulseResponse(
  context: BaseAudioContext,
  seconds: number,
  decay: number,
): AudioBuffer {
  const length = Math.floor(context.sampleRate * seconds);
  const buffer = context.createBuffer(2, length, context.sampleRate);
  for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
    const data = buffer.getChannelData(channel);
    let smoothed = 0;
    for (let index = 0; index < length; index++) {
      const envelope = Math.pow(1 - index / length, decay);
      smoothed = smoothed * 0.35 + (Math.random() * 2 - 1) * 0.65;
      data[index] = smoothed * envelope;
    }
  }
  return buffer;
}
