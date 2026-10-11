export function createNoiseBuffer(
  context: BaseAudioContext,
  seconds: number,
): AudioBuffer {
  const length = Math.floor(context.sampleRate * seconds);
  const buffer = context.createBuffer(1, length, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let index = 0; index < length; index++)
    data[index] = Math.random() * 2 - 1;
  return buffer;
}
