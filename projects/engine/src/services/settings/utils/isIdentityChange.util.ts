import type { Settings } from "../../../models/Settings";
import { IDENTITY_KEYS } from "../constants/identityKeys.constants";

export function isIdentityChange(previous: Settings, next: Settings): boolean {
  return IDENTITY_KEYS.some((key) => previous[key] !== next[key]);
}
