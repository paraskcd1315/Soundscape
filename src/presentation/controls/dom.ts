export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className = "",
  attributes: Record<string, string> = {},
  ...children: readonly (Node | string)[]
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  if (className) element.className = className;
  for (const [name, value] of Object.entries(attributes))
    element.setAttribute(name, value);
  element.append(...children);
  return element;
}
