import "./ss-menu.scss";
import { COMPACT_MEDIA_QUERY } from "../../foundation/constants/breakpoints.constants";
import { createElement } from "../../foundation/utils/createElement.util";
import type { SsMenuOptions } from "./types/SsMenuOptions";
import { menuPosition } from "./utils/menuPosition.util";

export class SsMenu {
  readonly element: HTMLDivElement;
  private readonly scrim: HTMLDivElement;
  private readonly items = new Map<string, HTMLButtonElement>();
  private anchor: HTMLElement | null = null;
  private readonly dismiss = (event: PointerEvent): void => {
    const target = event.target as Node;
    if (
      !this.element.contains(target) &&
      !this.anchor?.contains(target) &&
      target !== this.scrim
    )
      this.close();
  };
  private readonly closeOnResize = (): void => this.close();

  constructor(options: SsMenuOptions) {
    this.scrim = createElement("div", "ss-menu__scrim");
    this.scrim.addEventListener("click", () => this.close());
    const list = createElement("div", "ss-menu__list", {
      role: "menu",
      "aria-label": options.label,
    });
    for (const group of options.groups) {
      if (group.label)
        list.append(
          createElement(
            "span",
            "ss-menu__group",
            { role: "presentation" },
            group.label,
          ),
        );
      for (const choice of group.choices) {
        const item = createElement(
          "button",
          "ss-menu__item",
          { type: "button", role: "menuitemradio" },
          choice.label,
        );
        item.addEventListener("click", () => {
          options.onSelect(choice.value);
          this.close();
        });
        this.items.set(choice.value, item);
        list.append(item);
      }
    }
    this.element = createElement(
      "div",
      "ss-menu",
      { "aria-hidden": "true" },
      list,
    );
    this.element.addEventListener("keydown", (event) => {
      if (event.key === "Escape") this.close();
    });
    this.set(options.value);
  }

  get isOpen(): boolean {
    return this.element.classList.contains("ss-menu--open");
  }

  set(value: string): void {
    this.items.forEach((item, key) =>
      item.setAttribute("aria-checked", String(key === value)),
    );
  }

  toggle(anchor: HTMLElement): void {
    if (this.isOpen) this.close();
    else this.open(anchor);
  }

  open(anchor: HTMLElement): void {
    this.anchor = anchor;
    const sheet = window.matchMedia(COMPACT_MEDIA_QUERY).matches;
    if (!this.scrim.isConnected) this.element.before(this.scrim);
    this.element.classList.toggle("ss-menu--sheet", sheet);
    this.scrim.classList.toggle("ss-menu__scrim--visible", sheet);
    this.element.classList.add("ss-menu--open");
    this.element.setAttribute("aria-hidden", "false");
    if (sheet) this.placeAsSheet();
    else this.placeBeside(anchor);
    document.addEventListener("pointerdown", this.dismiss);
    window.addEventListener("resize", this.closeOnResize);
    this.element
      .querySelector<HTMLButtonElement>('[aria-checked="true"]')
      ?.focus();
  }

  close(): void {
    this.element.classList.remove("ss-menu--open");
    this.element.setAttribute("aria-hidden", "true");
    this.scrim.classList.remove("ss-menu__scrim--visible");
    document.removeEventListener("pointerdown", this.dismiss);
    window.removeEventListener("resize", this.closeOnResize);
    this.anchor?.focus();
  }

  private placeAsSheet(): void {
    this.element.style.left = "";
    this.element.style.top = "";
  }

  private placeBeside(anchor: HTMLElement): void {
    const position = menuPosition(
      anchor.getBoundingClientRect(),
      this.element.getBoundingClientRect(),
      window.innerWidth,
      window.innerHeight,
    );
    this.element.style.left = `${position.left}px`;
    this.element.style.top = `${position.top}px`;
  }
}
