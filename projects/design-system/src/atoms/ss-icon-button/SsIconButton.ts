import "./ss-icon-button.scss";
import { createElement } from "../../foundation/utils/createElement.util";
import { SsIcon } from "../ss-icon/SsIcon";
import type { SsIconName } from "../ss-icon/types/SsIconName";
import type { SsIconButtonOptions } from "./types/SsIconButtonOptions";

export class SsIconButton {
  readonly element: HTMLButtonElement;
  private readonly icon: SsIcon;

  constructor(options: SsIconButtonOptions) {
    const classes = [
      "ss-icon-button",
      `ss-icon-button--${options.size ?? "md"}`,
      options.accent ? "ss-icon-button--accent" : "",
    ];
    this.icon = new SsIcon(options.icon);
    this.element = createElement(
      "button",
      classes.join(" ").trim(),
      { type: "button", "aria-label": options.label, title: options.label },
      this.icon.element,
    );
    if (options.testId) this.element.dataset.testid = options.testId;
    this.element.addEventListener("click", options.onClick);
  }

  setIcon(icon: SsIconName): void {
    this.icon.set(icon);
  }

  setLabel(label: string): void {
    this.element.setAttribute("aria-label", label);
    this.element.title = label;
  }

  setPressed(pressed: boolean): void {
    this.element.setAttribute("aria-pressed", String(pressed));
  }
}
