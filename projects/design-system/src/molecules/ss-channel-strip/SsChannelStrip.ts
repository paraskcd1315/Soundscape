import "./ss-channel-strip.scss";
import { SsIconButton } from "../../atoms/ss-icon-button/SsIconButton";
import { SsSlider } from "../../atoms/ss-slider/SsSlider";
import { createElement } from "../../foundation/utils/createElement.util";
import type { SsChannelStripOptions } from "./types/SsChannelStripOptions";

export class SsChannelStrip {
  readonly element: HTMLDivElement;
  private readonly slider: SsSlider;
  private readonly mute: SsIconButton;
  private readonly bar: HTMLSpanElement;
  private muted: boolean;

  constructor(options: SsChannelStripOptions) {
    this.muted = options.muted;
    this.bar = createElement("span", "ss-channel-strip__color");
    this.slider = new SsSlider({
      id: options.id,
      label: options.label,
      min: 0,
      max: 1,
      step: 0.01,
      value: options.level,
      format: options.format,
      onInput: options.onLevel,
    });
    this.mute = new SsIconButton({
      icon: "volume",
      label: options.muteLabel,
      size: "sm",
      onClick: () => options.onMute(!this.muted),
    });
    this.element = createElement(
      "div",
      "ss-channel-strip",
      {},
      this.bar,
      this.slider.element,
      this.mute.element,
    );
    this.setColor(options.color);
    this.set(options.level, options.muted);
  }

  set(level: number, muted: boolean): void {
    this.muted = muted;
    this.slider.set(level);
    this.mute.setPressed(muted);
    this.mute.setIcon(muted ? "mute" : "volume");
    this.element.classList.toggle("ss-channel-strip--muted", muted);
  }

  setColor(color: string): void {
    this.bar.style.background = color;
  }
}
