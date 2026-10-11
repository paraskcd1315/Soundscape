import "./ss-button.scss";
import { createElement } from "../../foundation/utils/createElement.util";
import { SsIcon } from "../ss-icon/SsIcon";
import type { SsButtonOptions } from "./types/SsButtonOptions";

export class SsButton {
  readonly element: HTMLButtonElement;
  private readonly text: HTMLSpanElement;

  constructor(options: SsButtonOptions) {
    const modifiers = [
      `ss-button--${options.variant ?? "secondary"}`,
      options.small ? "ss-button--sm" : "",
    ].join(" ");
    this.text = createElement("span", "ss-button__label", {}, options.label);
    this.element = createElement("button", `ss-button ${modifiers}`.trim(), {
      type: "button",
    });
    if (options.testId) this.element.dataset.testid = options.testId;
    if (options.icon) this.element.append(new SsIcon(options.icon).element);
    this.element.append(this.text);
    this.element.addEventListener("click", options.onClick);
  }

  setLabel(label: string): void {
    this.text.textContent = label;
  }

  setDisabled(disabled: boolean): void {
    this.element.disabled = disabled;
  }
}
