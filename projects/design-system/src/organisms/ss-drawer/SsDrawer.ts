import "./ss-drawer.scss";
import { SsIconButton } from "../../atoms/ss-icon-button/SsIconButton";
import { SheetDrag } from "../../foundation/behaviours/SheetDrag";
import { COMPACT_MEDIA_QUERY } from "../../foundation/constants/breakpoints.constants";
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
    const scroller = createElement(
      "div",
      "ss-drawer__scroll",
      {},
      header,
      this.body,
    );
    this.panel = createElement(
      "aside",
      "ss-drawer__panel",
      {
        role: "dialog",
        "aria-modal": "true",
        "aria-label": options.title,
        tabindex: "-1",
      },
      scroller,
    );
    new SheetDrag({
      panel: this.panel,
      handle: header,
      scroller,
      enabled: () => window.matchMedia(COMPACT_MEDIA_QUERY).matches,
      onDismiss: () => this.close(),
    });
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
