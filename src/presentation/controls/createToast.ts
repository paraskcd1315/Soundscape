import { el } from "./dom";

const TOAST_MILLISECONDS = 2600;

export interface ToastControl {
  element: HTMLElement;
  show(message: string): void;
}

export function createToast(): ToastControl {
  const element = el("div", "toast", { role: "status", "aria-live": "polite" });
  let timer = 0;
  return {
    element,
    show(message) {
      element.textContent = message;
      element.classList.add("toast--visible");
      window.clearTimeout(timer);
      timer = window.setTimeout(
        () => element.classList.remove("toast--visible"),
        TOAST_MILLISECONDS,
      );
    },
  };
}
