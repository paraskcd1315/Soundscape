import { el } from "./dom";

export interface ButtonOptions {
  label: string;
  text?: string;
  className?: string;
  onClick: () => void;
}

export function createButton(options: ButtonOptions): HTMLButtonElement {
  const button = el("button", `button ${options.className ?? ""}`.trim(), {
    type: "button",
    "aria-label": options.label,
    title: options.label,
  });
  button.textContent = options.text ?? options.label;
  button.addEventListener("click", options.onClick);
  return button;
}
