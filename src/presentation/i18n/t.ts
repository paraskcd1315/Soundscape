import { en } from "./en";
import type { StringKey } from "./en";

export function t(
  key: StringKey,
  ...args: readonly (string | number)[]
): string {
  return args.reduce<string>(
    (text, value, index) => text.replace(`{${index}}`, String(value)),
    en[key],
  );
}
