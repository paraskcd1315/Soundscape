import "./ss-select.scss";
import { createElement } from "../../foundation/utils/createElement.util";
import type { SsSelectChoice } from "./types/SsSelectChoice";
import type { SsSelectOptions } from "./types/SsSelectOptions";

export class SsSelect {
  readonly element: HTMLDivElement;
  private readonly select: HTMLSelectElement;

  constructor(options: SsSelectOptions) {
    this.select = createElement("select", "ss-select__input", {
      id: options.id,
    });
    this.setChoices(options.choices, options.value);
    this.select.addEventListener("change", () =>
      options.onChange(this.select.value),
    );
    const label = createElement(
      "label",
      "ss-select__label",
      { for: options.id },
      options.label,
    );
    this.element = createElement("div", "ss-select", {}, label, this.select);
  }

  set(value: string): void {
    this.select.value = value;
  }

  setChoices(choices: readonly SsSelectChoice[], value: string): void {
    this.select.replaceChildren(
      ...choices.map((choice) => {
        const option = createElement(
          "option",
          "",
          { value: choice.value },
          choice.label,
        );
        option.selected = choice.value === value;
        return option;
      }),
    );
  }
}
