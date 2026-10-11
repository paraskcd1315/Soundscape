import "./ss-drawer.scss";
import { SsIconButton } from "../../atoms/ss-icon-button/SsIconButton";
import { createElement } from "../../foundation/utils/createElement.util";
import type { SsDrawerOptions } from "./types/SsDrawerOptions";

export class SsDrawer {
  readonly element: HTMLDivElement;
  readonly body: HTMLDivElement;
  private readonly panel: HTMLElement;
  private returnFocus: HTMLElement | null = null;

  constructor(private readonly options: SsDrawerOptions) {
    const scrim = createElement("div", "ss-drawer__scrim");
    scrim.addEventListener("click", () => this.close());
    const close = new SsIconButton({
      icon: "close",
      label: options.closeLabel,
      size: "sm",
      onClick: () => this.close(),
    });
    const header = createElement(
      "header",
      "ss-drawer__header",
      {},
      createElement("span", "ss-drawer__grip"),
      createElement("h2", "ss-drawer__title", {}, options.title),
      close.element,
    );
    this.body = createElement("div", "ss-drawer__body");
    this.panel = createElement(
      "aside",
      "ss-drawer__panel",
      {
        role: "dialog",
        "aria-modal": "true",
        "aria-label": options.title,
        tabindex: "-1",
      },
      header,
      this.body,
    );
    this.element = createElement(
      "div",
      "ss-drawer",
      { "aria-hidden": "true" },
      scrim,
      this.panel,
    );
    this.element.addEventListener("keydown", (event) => {
      if (event.key === "Escape") this.close();
    });
  }

  get isOpen(): boolean {
    return this.element.classList.contains("ss-drawer--open");
  }

  open(): void {
    this.returnFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    this.element.classList.add("ss-drawer--open");
    this.element.setAttribute("aria-hidden", "false");
    this.panel.focus();
  }

  close(): void {
    if (!this.isOpen) return;
    this.element.classList.remove("ss-drawer--open");
    this.element.setAttribute("aria-hidden", "true");
    this.returnFocus?.focus();
    this.options.onClose?.();
  }

  toggle(): void {
    if (this.isOpen) this.close();
    else this.open();
  }
}
