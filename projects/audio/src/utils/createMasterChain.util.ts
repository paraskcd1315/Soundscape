import { AUDIO_METRICS } from "../constants/audio.constants";
import type { CompressorSettings } from "../types/CompressorSettings";
import type { MasterChain } from "../types/MasterChain";

function filter(
  context: BaseAudioContext,
  type: BiquadFilterType,
  frequency: number,
): BiquadFilterNode {
  const node = context.createBiquadFilter();
  node.type = type;
  node.frequency.value = frequency;
  return node;
}

function compressor(
  context: BaseAudioContext,
  settings: CompressorSettings,
): DynamicsCompressorNode {
  const node = context.createDynamicsCompressor();
  node.threshold.value = settings.threshold;
  node.ratio.value = settings.ratio;
  node.attack.value = settings.attack;
  node.release.value = settings.release;
  node.knee.value = settings.knee ?? 0;
  return node;
}

function band(
  context: BaseAudioContext,
  input: AudioNode,
  output: AudioNode,
  stages: readonly BiquadFilterNode[],
): void {
  const settings = AUDIO_METRICS.multiband;
  const squeeze = compressor(context, settings);
  const makeup = context.createGain();
  makeup.gain.value = settings.makeup;
  let node: AudioNode = input;
  for (const stage of stages) node = node.connect(stage);
  node.connect(squeeze).connect(makeup).connect(output);
}

export function createMasterChain(context: BaseAudioContext): MasterChain {
  const settings = AUDIO_METRICS.multiband;
  const input = context.createGain();
  const glue = compressor(context, AUDIO_METRICS.compressor);
  const sum = context.createGain();
  const wet = context.createGain();
  wet.gain.value = settings.depth;
  const low = settings.lowCrossoverHz;
  const high = settings.highCrossoverHz;
  input.connect(glue);
  glue.connect(sum);
  band(context, glue, wet, [
    filter(context, "lowpass", low),
    filter(context, "lowpass", low),
  ]);
  band(context, glue, wet, [
    filter(context, "highpass", low),
    filter(context, "highpass", low),
    filter(context, "lowpass", high),
    filter(context, "lowpass", high),
  ]);
  band(context, glue, wet, [
    filter(context, "highpass", high),
    filter(context, "highpass", high),
  ]);
  wet.connect(sum);
  const air = filter(context, "highshelf", AUDIO_METRICS.airShelf.hz);
  air.gain.value = AUDIO_METRICS.airShelf.gainDb;
  const drive = context.createGain();
  drive.gain.value = AUDIO_METRICS.limiterDrive;
  const limiter = compressor(context, AUDIO_METRICS.limiter);
  sum.connect(air).connect(drive).connect(limiter);
  return { input, output: limiter };
}
