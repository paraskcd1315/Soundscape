import type { SsSelectChoice } from "../../../atoms/ss-select/types/SsSelectChoice";

export interface SsMenuGroup {
  label: string;
  choices: readonly SsSelectChoice[];
}
