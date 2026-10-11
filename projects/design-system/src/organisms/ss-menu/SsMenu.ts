import "./ss-menu.scss";
import { createElement } from "../../foundation/utils/createElement.util";
import type { SsMenuOptions } from "./types/SsMenuOptions";
import { menuPosition } from "./utils/menuPosition.util";

export class SsMenu {
  readonly element: HTMLDivElement;
  private readonly items = new Map<string, HTMLButtonElement>();
  private anchor: HTMLElement | null = null;
  private readonly dismiss = (event: PointerEvent): void => {
    const target = event.target as Node;
    if (!this.element.contains(target) && !this.anchor?.contains(target))
      this.close();
  };

  constructor(options: SsMenuOptions) {
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
    this.element.classList.add("ss-menu--open");
    this.element.setAttribute("aria-hidden", "false");
    const position = menuPosition(
      anchor.getBoundingClientRect(),
      this.element.getBoundingClientRect(),
      window.innerWidth,
      window.innerHeight,
    );
    this.element.style.left = `${position.left}px`;
    this.element.style.top = `${position.top}px`;
    document.addEventListener("pointerdown", this.dismiss);
    this.element
      .querySelector<HTMLButtonElement>('[aria-checked="true"]')
      ?.focus();
  }

  close(): void {
    this.element.classList.remove("ss-menu--open");
    this.element.setAttribute("aria-hidden", "true");
    document.removeEventListener("pointerdown", this.dismiss);
    this.anchor?.focus();
  }
}
