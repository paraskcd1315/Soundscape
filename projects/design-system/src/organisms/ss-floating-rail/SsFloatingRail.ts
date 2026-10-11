import "./ss-floating-rail.scss";
import { createElement } from "../../foundation/utils/createElement.util";

export class SsFloatingRail {
  readonly element: HTMLElement;

  constructor(label: string) {
    this.element = createElement("nav", "ss-floating-rail", {
      "aria-label": label,
    });
  }

  append(...nodes: readonly Node[]): void {
    this.element.append(...nodes);
  }
}
