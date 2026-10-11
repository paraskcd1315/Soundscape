import type { SsIconName } from "../../ss-icon/types/SsIconName";
import type { SsIconButtonSize } from "./SsIconButtonSize";

export interface SsIconButtonOptions {
  icon: SsIconName;
  label: string;
  size?: SsIconButtonSize;
  accent?: boolean;
  testId?: string;
  onClick: () => void;
}
