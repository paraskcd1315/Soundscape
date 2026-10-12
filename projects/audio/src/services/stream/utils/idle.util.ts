export function idle(buffer: SourceBuffer): Promise<void> {
  if (!buffer.updating) return Promise.resolve();
  return new Promise((resolve) =>
    buffer.addEventListener("updateend", () => resolve(), { once: true }),
  );
}
