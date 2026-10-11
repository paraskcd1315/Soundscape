import type { SsMenuGroup } from "./SsMenuGroup";

export interface SsMenuOptions {
  label: string;
  groups: readonly SsMenuGroup[];
  value: string;
  onSelect: (value: string) => void;
}
