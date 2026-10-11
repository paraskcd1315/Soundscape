import { t } from "../i18n/t";
import { el } from "./dom";

const NAME_MAX_LENGTH = 60;

export interface NameDialogControl {
  element: HTMLDialogElement;
  ask(initial: string): Promise<string | null>;
}

export function createNameDialog(): NameDialogControl {
  const input = el("input", "dialog__input", {
    id: "preset-name",
    type: "text",
    maxlength: String(NAME_MAX_LENGTH),
    autocomplete: "off",
    required: "true",
  });
  const label = el(
    "label",
    "dialog__label",
    { for: "preset-name" },
    t("presetNameLabel"),
  );
  const cancel = el("button", "button", { type: "button" }, t("cancel"));
  const save = el(
    "button",
    "button button--primary",
    { type: "submit" },
    t("save"),
  );
  const form = el(
    "form",
    "dialog__form",
    { method: "dialog" },
    el("h2", "dialog__title", {}, t("presetNameTitle")),
    label,
    input,
    el("div", "dialog__actions", {}, cancel, save),
  );
  const element = el("dialog", "dialog", {}, form);

  let resolver: ((value: string | null) => void) | null = null;
  const finish = (value: string | null): void => {
    resolver?.(value);
    resolver = null;
    if (element.open) element.close();
  };

  cancel.addEventListener("click", () => finish(null));
  element.addEventListener("cancel", () => finish(null));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = input.value.trim();
    finish(name.length > 0 ? name : null);
  });

  return {
    element,
    ask(initial) {
      input.value = initial;
      element.showModal();
      input.select();
      return new Promise((resolve) => {
        resolver = resolve;
      });
    },
  };
}
