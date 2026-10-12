import { LAYER_KINDS } from "@soundscape/engine/constants/layerKinds.constants";
import type { LayerKind } from "@soundscape/engine/models/LayerKind";
import type { NoteEvent } from "@soundscape/engine/models/NoteEvent";
import type { Settings } from "@soundscape/engine/models/Settings";
import type { StyleId } from "@soundscape/engine/models/StyleId";
import { midiToFrequency } from "@soundscape/engine/utils/theory/midiToFrequency";
import { STYLES } from "@soundscape/engine/genres/constants/styleCatalog.constants";
import type { NoteSink } from "@soundscape/engine/services/transport/types/NoteSink";
import { AUDIO_METRICS } from "../../constants/audio.constants";
import type { ReverbTail } from "../../types/ReverbTail";
import type { VoiceRig } from "../../types/VoiceRig";
import { VOICES } from "../../constants/voiceRegistry.constants";
import { createImpulseResponse } from "../../utils/createImpulseResponse";
import { createNoiseBuffer } from "../../utils/createNoiseBuffer";
import { createSaturationCurve } from "../../utils/createSaturationCurve";
import { playSample } from "../../utils/playSample.util";
import { createMasterChain } from "../../utils/createMasterChain.util";
import { isDrumVoice } from "../../utils/isDrumVoice.util";
import type { VoiceSpec } from "../../types/VoiceSpec";
import type { VoiceId } from "@soundscape/engine/models/VoiceId";
import type { DrumSampleBank } from "../samples/DrumSampleBank";

export class AudioEngine implements NoteSink {
  private readonly rig: VoiceRig;
  private readonly layerGains = {} as Record<LayerKind, GainNode>;
  private readonly transitionGains = {} as Record<LayerKind, GainNode>;
  private readonly delaySends = {} as Record<LayerKind, GainNode>;
  private readonly duckGains: GainNode[] = [];
  private readonly toneFilter: BiquadFilterNode;
  private readonly reverbBus: GainNode;
  private readonly reverbReturn: GainNode;
  private readonly reverbTails = new Map<StyleId, ReverbTail>();
  private readonly delayNode: DelayNode;
  private readonly delayFeedback: GainNode;
  private readonly delayReturn: GainNode;
  private readonly wobbleDepth: GainNode;
  private readonly wobbleOscillator: OscillatorNode;
  private readonly shaper: WaveShaperNode;
  private readonly curves = new Map<number, Float32Array<ArrayBuffer>>();
  private readonly masterGain: GainNode;
  private readonly rumbleBus: GainNode;
  private readonly rumbleDuck: GainNode;
  private readonly rumbleReturn: GainNode;
  private rumbleAmount = 0;
  private readonly voiceEnds: number[] = [];
  private brightness = 0.5;
  private ducking = false;
  private currentStyle: StyleId | null = null;

  constructor(
    readonly context: BaseAudioContext,
    output: AudioNode = context.destination,
    private readonly drumBank: DrumSampleBank | null = null,
  ) {
    this.masterGain = context.createGain();
    this.toneFilter = context.createBiquadFilter();
    this.toneFilter.type = "lowpass";
    this.toneFilter.Q.value = 0.5;

    const wobbleDelay = context.createDelay(
      AUDIO_METRICS.wobbleBaseSeconds * 4,
    );
    wobbleDelay.delayTime.value = AUDIO_METRICS.wobbleBaseSeconds;
    this.wobbleDepth = context.createGain();
    this.wobbleDepth.gain.value = 0;
    this.wobbleOscillator = context.createOscillator();
    this.wobbleOscillator.frequency.value = 0.4;
    this.wobbleOscillator
      .connect(this.wobbleDepth)
      .connect(wobbleDelay.delayTime);
    this.wobbleOscillator.start();

    this.shaper = context.createWaveShaper();
    this.shaper.curve = this.curveFor(AUDIO_METRICS.saturationDrive);
    this.shaper.oversample = "4x";

    const master = createMasterChain(context);

    this.toneFilter
      .connect(wobbleDelay)
      .connect(this.shaper)
      .connect(master.input);
    master.output.connect(this.masterGain);
    this.masterGain.connect(output);

    this.reverbBus = context.createGain();
    this.reverbReturn = context.createGain();
    const returnHighPass = context.createBiquadFilter();
    returnHighPass.type = "highpass";
    returnHighPass.frequency.value =
      AUDIO_METRICS.reverbReturnFilter.highPassHz;
    const returnLowPass = context.createBiquadFilter();
    returnLowPass.type = "lowpass";
    returnLowPass.frequency.value = AUDIO_METRICS.reverbReturnFilter.lowPassHz;
    this.reverbReturn
      .connect(returnHighPass)
      .connect(returnLowPass)
      .connect(this.toneFilter);

    const delayBus = context.createGain();
    this.delayNode = context.createDelay(AUDIO_METRICS.delayMaxSeconds);
    const delayTone = context.createBiquadFilter();
    delayTone.type = "lowpass";
    delayTone.frequency.value = AUDIO_METRICS.delayToneHz;
    this.delayFeedback = context.createGain();
    this.delayFeedback.gain.value = 0;
    this.delayReturn = context.createGain();
    this.delayReturn.gain.value = 0;
    delayBus.connect(this.delayNode);
    this.delayNode.connect(delayTone);
    delayTone.connect(this.delayFeedback).connect(this.delayNode);
    delayTone.connect(this.delayReturn).connect(this.toneFilter);

    this.rumbleBus = context.createGain();
    this.rumbleDuck = context.createGain();
    this.rumbleReturn = context.createGain();
    this.rumbleReturn.gain.value = 0;
    const rumbleSpace = context.createConvolver();
    rumbleSpace.buffer = createImpulseResponse(
      context,
      AUDIO_METRICS.rumble.reverbSeconds,
      AUDIO_METRICS.rumble.reverbDecay,
    );
    const rumbleDrive = context.createWaveShaper();
    rumbleDrive.curve = this.curveFor(AUDIO_METRICS.rumble.drive);
    rumbleDrive.oversample = "4x";
    const rumbleLowPass = context.createBiquadFilter();
    rumbleLowPass.type = "lowpass";
    rumbleLowPass.frequency.value = AUDIO_METRICS.rumble.lowPassHz;
    const rumbleHighPass = context.createBiquadFilter();
    rumbleHighPass.type = "highpass";
    rumbleHighPass.frequency.value = AUDIO_METRICS.rumble.highPassHz;
    this.rumbleBus
      .connect(rumbleSpace)
      .connect(rumbleDrive)
      .connect(rumbleLowPass)
      .connect(rumbleHighPass)
      .connect(this.rumbleDuck)
      .connect(this.rumbleReturn)
      .connect(this.toneFilter);

    for (const kind of LAYER_KINDS) {
      const layerGain = context.createGain();
      const send = context.createGain();
      send.gain.value = AUDIO_METRICS.layerReverbSend[kind];
      const delaySend = context.createGain();
      delaySend.gain.value = 0;
      const panner = context.createStereoPanner();
      panner.pan.value = AUDIO_METRICS.layerPan[kind];
      const transitionGain = context.createGain();
      layerGain.connect(transitionGain).connect(panner);
      this.transitionGains[kind] = transitionGain;
      panner.connect(send).connect(this.reverbBus);
      panner.connect(delaySend).connect(delayBus);
      if ((AUDIO_METRICS.duckedLayers as readonly LayerKind[]).includes(kind)) {
        const duck = context.createGain();
        panner.connect(duck).connect(this.toneFilter);
        this.duckGains.push(duck);
      } else {
        panner.connect(this.toneFilter);
      }
      this.layerGains[kind] = layerGain;
      this.delaySends[kind] = delaySend;
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
    const style = STYLES[settings.styleId];
    this.brightness = settings.brightness;
    this.ducking = style.ducking;
    if (this.currentStyle !== style.id) this.applyStyle(style.id, now);

    const cutoff =
      AUDIO_METRICS.toneFilterMinHz *
      Math.pow(AUDIO_METRICS.toneFilterRatio, settings.brightness);
    this.toneFilter.frequency.setTargetAtTime(
      Math.min(
        cutoff,
        style.space.toneCeilingHz,
        this.context.sampleRate / 2 - 200,
      ),
      now,
      constant,
    );
    this.reverbReturn.gain.setTargetAtTime(settings.reverb, now, constant);
    this.delayNode.delayTime.setTargetAtTime(
      Math.min(
        AUDIO_METRICS.delayMaxSeconds,
        (style.space.delayBeats * 60) / settings.tempo,
      ),
      now,
      AUDIO_METRICS.delayTimeConstant,
    );
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

    const end = this.play(event.voice, this.layerGains[event.layer], {
      startTime: time,
      duration: durationSeconds,
      frequency: midiToFrequency(event.midi),
      velocity: event.velocity,
      brightness: this.brightness,
    });
    this.voiceEnds.push(end);

    if (event.voice === "kick" && this.rumbleAmount > 0) {
      this.play("kick", this.rumbleBus, {
        startTime: time,
        duration: durationSeconds,
        frequency: 0,
        velocity: event.velocity,
        brightness: this.brightness,
      });
      this.rumbleDuck.gain.setValueAtTime(0, time);
      this.rumbleDuck.gain.linearRampToValueAtTime(
        1,
        time + AUDIO_METRICS.rumble.duckRelease,
      );
    }
    if (this.ducking && event.voice === "kick") this.duck(time);
  }

  private play(
    voice: VoiceId,
    destination: AudioNode,
    spec: VoiceSpec,
  ): number {
    const sample = isDrumVoice(voice) ? this.drumBank?.get(voice) : undefined;
    if (sample)
      return playSample(
        this.context,
        sample,
        destination,
        spec.startTime,
        spec.velocity,
      );
    return VOICES[voice]({ ...this.rig, destination }, spec);
  }

  rampLayers(
    kinds: readonly LayerKind[],
    target: number,
    startTime: number,
    seconds: number,
  ): void {
    for (const kind of kinds) {
      const gain = this.transitionGains[kind].gain;
      gain.cancelScheduledValues(startTime);
      gain.setValueAtTime(gain.value, startTime);
      gain.linearRampToValueAtTime(target, startTime + seconds);
    }
  }

  setLayersSilent(kinds: readonly LayerKind[]): void {
    for (const kind of kinds) this.transitionGains[kind].gain.value = 0;
  }

  dispose(): void {
    this.wobbleOscillator.stop();
    this.masterGain.disconnect();
  }

  private applyStyle(styleId: StyleId, now: number): void {
    const space = STYLES[styleId].space;
    const constant = AUDIO_METRICS.styleTimeConstant;
    this.currentStyle = styleId;
    this.tailFor(styleId, space.reverbSeconds, space.reverbDecay);
    this.reverbTails.forEach((tail, id) =>
      tail.return.gain.setTargetAtTime(id === styleId ? 1 : 0, now, constant),
    );
    this.shaper.curve = this.curveFor(space.drive);
    this.delayFeedback.gain.setTargetAtTime(space.delayFeedback, now, constant);
    this.delayReturn.gain.setTargetAtTime(space.delayMix, now, constant);
    this.wobbleDepth.gain.setTargetAtTime(
      space.wobbleDepthSeconds,
      now,
      constant,
    );
    this.wobbleOscillator.frequency.setTargetAtTime(
      space.wobbleHz,
      now,
      constant,
    );
    this.rumbleAmount = space.rumble;
    this.rumbleReturn.gain.setTargetAtTime(space.rumble, now, constant);
    for (const kind of LAYER_KINDS)
      this.delaySends[kind].gain.setTargetAtTime(
        space.delaySends[kind],
        now,
        constant,
      );
  }

  private tailFor(
    styleId: StyleId,
    seconds: number,
    decay: number,
  ): ReverbTail {
    const existing = this.reverbTails.get(styleId);
    if (existing) {
      this.reverbTails.delete(styleId);
      this.reverbTails.set(styleId, existing);
      return existing;
    }
    const convolver = this.context.createConvolver();
    convolver.buffer = createImpulseResponse(this.context, seconds, decay);
    const tailReturn = this.context.createGain();
    tailReturn.gain.value = 0;
    this.reverbBus
      .connect(convolver)
      .connect(tailReturn)
      .connect(this.reverbReturn);
    const tail = { convolver, return: tailReturn };
    this.reverbTails.set(styleId, tail);
    this.retireOldTails();
    return tail;
  }

  private retireOldTails(): void {
    for (const [styleId, tail] of this.reverbTails) {
      if (this.reverbTails.size <= AUDIO_METRICS.maxReverbTails) return;
      this.reverbBus.disconnect(tail.convolver);
      tail.return.disconnect();
      this.reverbTails.delete(styleId);
    }
  }

  private curveFor(drive: number): Float32Array<ArrayBuffer> {
    const cached = this.curves.get(drive);
    if (cached) return cached;
    const curve = createSaturationCurve(drive);
    this.curves.set(drive, curve);
    return curve;
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
