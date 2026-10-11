import "./ss-text-input.scss";
import { createElement } from "../../foundation/utils/createElement.util";
import type { SsTextInputOptions } from "./types/SsTextInputOptions";

export class SsTextInput {
  readonly element: HTMLDivElement;
  private readonly input: HTMLInputElement;

  constructor(options: SsTextInputOptions) {
    this.input = createElement("input", "ss-text-input__field", {
      id: options.id,
      type: "text",
      autocomplete: "off",
      spellcheck: "false",
      placeholder: options.placeholder ?? "",
      maxlength: String(options.maxLength ?? 120),
    });
    this.input.value = options.value;
    this.input.addEventListener("change", () =>
      options.onCommit(this.input.value),
    );
    this.input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") options.onCommit(this.input.value);
    });
    const label = createElement(
      "label",
      "ss-text-input__label",
      { for: options.id },
      options.label,
    );
    this.element = createElement("div", "ss-text-input", {}, label, this.input);
  }

  get value(): string {
    return this.input.value;
  }

  set(value: string): void {
    if (document.activeElement !== this.input) this.input.value = value;
  }

  clear(): void {
    this.input.value = "";
  }
}
