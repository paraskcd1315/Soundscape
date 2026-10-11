import { LAYER_KINDS } from "../../../domain/model/LayerKind";
import type { LayerKind } from "../../../domain/model/LayerKind";
import type { NoteEvent } from "../../../domain/model/NoteEvent";
import type { Settings } from "../../../domain/model/Settings";
import { midiToFrequency } from "../../../domain/theory/midiToFrequency";
import { STYLES } from "../../../styles/styleCatalog";
import type { NoteSink } from "../../../application/transport/NoteSink";
import { AUDIO_METRICS } from "../audioMetrics";
import type { VoiceRig } from "../voices/VoiceRig";
import { VOICES } from "../voices/voiceRegistry";
import { createImpulseResponse } from "./createImpulseResponse";
import { createNoiseBuffer } from "./createNoiseBuffer";
import { createSaturationCurve } from "./createSaturationCurve";

export class AudioEngine implements NoteSink {
  readonly analyser: AnalyserNode;
  private readonly rig: VoiceRig;
  private readonly layerGains = {} as Record<LayerKind, GainNode>;
  private readonly duckGains: GainNode[] = [];
  private readonly toneFilter: BiquadFilterNode;
  private readonly reverbReturn: GainNode;
  private readonly masterGain: GainNode;
  private readonly voiceEnds: number[] = [];
  private brightness = 0.5;
  private ducking = false;

  constructor(readonly context: BaseAudioContext) {
    this.masterGain = context.createGain();
    this.toneFilter = context.createBiquadFilter();
    this.toneFilter.type = "lowpass";
    this.toneFilter.Q.value = 0.5;

    const shaper = context.createWaveShaper();
    shaper.curve = createSaturationCurve(AUDIO_METRICS.saturationDrive);
    shaper.oversample = "2x";

    const compressor = context.createDynamicsCompressor();
    compressor.threshold.value = AUDIO_METRICS.compressor.threshold;
    compressor.knee.value = AUDIO_METRICS.compressor.knee;
    compressor.ratio.value = AUDIO_METRICS.compressor.ratio;
    compressor.attack.value = AUDIO_METRICS.compressor.attack;
    compressor.release.value = AUDIO_METRICS.compressor.release;

    this.analyser = context.createAnalyser();
    this.analyser.fftSize = AUDIO_METRICS.analyserFftSize;
    this.analyser.smoothingTimeConstant = AUDIO_METRICS.analyserSmoothing;

    this.toneFilter
      .connect(shaper)
      .connect(compressor)
      .connect(this.masterGain);
    this.masterGain.connect(context.destination);
    this.masterGain.connect(this.analyser);

    const convolver = context.createConvolver();
    convolver.buffer = createImpulseResponse(
      context,
      AUDIO_METRICS.reverbSeconds,
      AUDIO_METRICS.reverbDecay,
    );
    this.reverbReturn = context.createGain();
    convolver.connect(this.reverbReturn).connect(this.toneFilter);

    for (const kind of LAYER_KINDS) {
      const layerGain = context.createGain();
      const send = context.createGain();
      send.gain.value = AUDIO_METRICS.layerReverbSend[kind];
      layerGain.connect(send).connect(convolver);
      if ((AUDIO_METRICS.duckedLayers as readonly LayerKind[]).includes(kind)) {
        const duck = context.createGain();
        layerGain.connect(duck).connect(this.toneFilter);
        this.duckGains.push(duck);
      } else {
        layerGain.connect(this.toneFilter);
      }
      this.layerGains[kind] = layerGain;
    }

    this.rig = {
      context,
      destination: this.masterGain,
      noise: createNoiseBuffer(context, AUDIO_METRICS.noiseSeconds),
    };
  }

  applySettings(settings: Settings): void {
    const now = this.context.currentTime;
    const constant = AUDIO_METRICS.parameterTimeConstant;
    this.brightness = settings.brightness;
    this.ducking = STYLES[settings.styleId].ducking;
    const cutoff =
      AUDIO_METRICS.toneFilterMinHz *
      Math.pow(AUDIO_METRICS.toneFilterRatio, settings.brightness);
    this.toneFilter.frequency.setTargetAtTime(
      Math.min(cutoff, this.context.sampleRate / 2 - 200),
      now,
      constant,
    );
    this.reverbReturn.gain.setTargetAtTime(settings.reverb, now, constant);
    this.masterGain.gain.setTargetAtTime(
      Math.pow(settings.masterVolume, 1.6) * AUDIO_METRICS.masterCeiling,
      now,
      constant,
    );
    for (const kind of LAYER_KINDS) {
      const mix = settings.layers[kind];
      this.layerGains[kind].gain.setTargetAtTime(
        mix.muted ? 0 : mix.level,
        now,
        constant,
      );
    }
  }

  schedule(event: NoteEvent, startTime: number, durationSeconds: number): void {
    const now = this.context.currentTime;
    const time = Math.max(startTime, now);
    const active = this.countActiveVoices(now);
    if (active >= AUDIO_METRICS.maxVoices && event.layer !== "drums") return;

    const end = VOICES[event.voice](
      { ...this.rig, destination: this.layerGains[event.layer] },
      {
        startTime: time,
        duration: durationSeconds,
        frequency: midiToFrequency(event.midi),
        velocity: event.velocity,
        brightness: this.brightness,
      },
    );
    this.voiceEnds.push(end);

    if (this.ducking && event.voice === "kick") this.duck(time);
  }

  private duck(time: number): void {
    for (const duck of this.duckGains) {
      duck.gain.setValueAtTime(1, time);
      duck.gain.linearRampToValueAtTime(
        AUDIO_METRICS.duckDepth,
        time + AUDIO_METRICS.duckAttack,
      );
      duck.gain.linearRampToValueAtTime(
        1,
        time + AUDIO_METRICS.duckAttack + AUDIO_METRICS.duckRelease,
      );
    }
  }

  private countActiveVoices(now: number): number {
    let write = 0;
    for (const end of this.voiceEnds) {
      if (end > now) this.voiceEnds[write++] = end;
    }
    this.voiceEnds.length = write;
    return write;
  }
}
