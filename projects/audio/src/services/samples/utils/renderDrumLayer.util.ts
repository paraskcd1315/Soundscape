import type { DrumLayer } from "../../../types/DrumLayer";
import { DRUM_BANK_METRICS } from "../constants/drumKit.constants";

function envelope(
  context: BaseAudioContext,
  start: number,
  peak: number,
  attack: number,
  decay: number,
): GainNode {
  const gain = context.createGain();
  gain.gain.setValueAtTime(DRUM_BANK_METRICS.silence, start);
  gain.gain.linearRampToValueAtTime(peak, start + attack);
  gain.gain.exponentialRampToValueAtTime(
    DRUM_BANK_METRICS.silence,
    start + attack + decay,
  );
  return gain;
}

export function renderDrumLayer(
  context: BaseAudioContext,
  layer: DrumLayer,
  noise: AudioBuffer,
  output: AudioNode,
): void {
  if (layer.kind === "tone") {
    const oscillator = context.createOscillator();
    oscillator.type = layer.wave;
    oscillator.frequency.setValueAtTime(layer.startHz, 0);
    oscillator.frequency.exponentialRampToValueAtTime(
      layer.endHz,
      layer.sweepSeconds,
    );
    const gain = envelope(
      context,
      0,
      layer.gain,
      layer.attackSeconds,
      layer.decaySeconds,
    );
    oscillator.connect(gain).connect(output);
    oscillator.start(0);
    return;
  }
  if (layer.kind === "noise") {
    for (const offset of layer.burstOffsets) {
      const source = context.createBufferSource();
      source.buffer = noise;
      const filter = context.createBiquadFilter();
      filter.type = layer.filter;
      filter.frequency.value = layer.hz;
      filter.Q.value = layer.q;
      const gain = envelope(
        context,
        offset,
        layer.gain,
        layer.attackSeconds,
        layer.decaySeconds,
      );
      source.connect(filter).connect(gain).connect(output);
      source.start(offset);
    }
    return;
  }
  if (layer.kind === "metal") {
    const highPass = context.createBiquadFilter();
    highPass.type = "highpass";
    highPass.frequency.value = layer.highPassHz;
    const band = context.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = layer.bandHz;
    band.Q.value = DRUM_BANK_METRICS.metalBandQ;
    const gain = envelope(
      context,
      0,
      layer.gain,
      DRUM_BANK_METRICS.strikeAttackSeconds,
      layer.decaySeconds,
    );
    for (const ratio of layer.ratios) {
      const oscillator = context.createOscillator();
      oscillator.type = "square";
      oscillator.frequency.value = layer.baseHz * ratio;
      oscillator.connect(highPass);
      oscillator.start(0);
    }
    highPass.connect(band).connect(gain).connect(output);
    return;
  }
  const carrier = context.createOscillator();
  carrier.frequency.value = layer.carrierHz;
  const modulator = context.createOscillator();
  modulator.frequency.value = layer.carrierHz * layer.ratio;
  const depth = envelope(
    context,
    0,
    layer.carrierHz * layer.index,
    DRUM_BANK_METRICS.strikeAttackSeconds,
    layer.decaySeconds * DRUM_BANK_METRICS.fmIndexDecayRatio,
  );
  modulator.connect(depth).connect(carrier.frequency);
  const gain = envelope(
    context,
    0,
    layer.gain,
    DRUM_BANK_METRICS.strikeAttackSeconds,
    layer.decaySeconds,
  );
  carrier.connect(gain).connect(output);
  modulator.start(0);
  carrier.start(0);
}
