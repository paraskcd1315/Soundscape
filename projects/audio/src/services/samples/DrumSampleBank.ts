import type { DrumVoiceId } from "@soundscape/engine/models/DrumVoiceId";
import type { DrumSampleSpec } from "../../types/DrumSampleSpec";
import { createNoiseBuffer } from "../../utils/createNoiseBuffer";
import { createSaturationCurve } from "../../utils/createSaturationCurve";
import {
  DRUM_BANK_METRICS,
  MODERN_DRUM_KIT,
} from "./constants/drumKit.constants";
import { renderDrumLayer } from "./utils/renderDrumLayer.util";

export class DrumSampleBank {
  private readonly buffers = new Map<DrumVoiceId, AudioBuffer>();

  constructor(private readonly sampleRate: number) {}

  get(voice: DrumVoiceId): AudioBuffer | undefined {
    return this.buffers.get(voice);
  }

  async render(): Promise<void> {
    const entries = Object.entries(MODERN_DRUM_KIT) as [
      DrumVoiceId,
      DrumSampleSpec,
    ][];
    const rendered = await Promise.all(
      entries.map(
        async ([voice, spec]) => [voice, await this.renderOne(spec)] as const,
      ),
    );
    for (const [voice, buffer] of rendered) this.buffers.set(voice, buffer);
  }

  private async renderOne(spec: DrumSampleSpec): Promise<AudioBuffer> {
    const context = new OfflineAudioContext(
      DRUM_BANK_METRICS.channels,
      Math.ceil(spec.lengthSeconds * this.sampleRate),
      this.sampleRate,
    );
    const noise = createNoiseBuffer(context, spec.lengthSeconds);
    const sum = context.createGain();
    const shaper = context.createWaveShaper();
    shaper.curve = createSaturationCurve(spec.drive);
    shaper.oversample = "4x";
    const output = context.createGain();
    output.gain.value = spec.outputGain;
    if (spec.gateSeconds !== undefined) {
      output.gain.setValueAtTime(spec.outputGain, spec.gateSeconds);
      output.gain.linearRampToValueAtTime(
        0,
        spec.gateSeconds + DRUM_BANK_METRICS.gateFadeSeconds,
      );
    }
    sum.connect(shaper).connect(output).connect(context.destination);
    for (const layer of spec.layers)
      renderDrumLayer(context, layer, noise, sum);
    return context.startRendering();
  }
}
