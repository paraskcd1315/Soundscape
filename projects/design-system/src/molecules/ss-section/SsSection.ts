import "./ss-section.scss";
import { createElement } from "../../foundation/utils/createElement.util";

export class SsSection {
  readonly element: HTMLElement;
  readonly body: HTMLDivElement;

  constructor(title: string) {
    this.body = createElement("div", "ss-section__body");
    this.element = createElement(
      "section",
      "ss-section",
      {},
      createElement("h3", "ss-section__title", {}, title),
      this.body,
    );
  }

  append(...nodes: readonly Node[]): void {
    this.body.append(...nodes);
  }
}
