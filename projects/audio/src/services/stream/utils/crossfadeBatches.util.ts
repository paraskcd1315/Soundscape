export function crossfadeBatches(
  outgoing: Float32Array[][],
  incoming: Float32Array[][],
): Float32Array[][] {
  const total = outgoing.reduce(
    (sum, batch) => sum + (batch[0]?.length ?? 0),
    0,
  );
  let position = 0;
  return outgoing.map((batch, index) => {
    const next = incoming[index] ?? batch;
    const frames = batch[0]?.length ?? 0;
    const mixed = batch.map((channel, channelIndex) => {
      const other = next[channelIndex] ?? channel;
      const out = new Float32Array(frames);
      for (let frame = 0; frame < frames; frame++) {
        const progress = (position + frame) / total;
        const fadeIn = Math.sin((progress * Math.PI) / 2);
        const fadeOut = Math.cos((progress * Math.PI) / 2);
        out[frame] =
          (channel[frame] ?? 0) * fadeOut + (other[frame] ?? 0) * fadeIn;
      }
      return out;
    });
    position += frames;
    return mixed;
  });
}
