import {
  INSECURE_PROTOCOL,
  LOCAL_HOSTS,
  SECURE_PROTOCOL,
} from "../constants/app.constants";
import type { PageLocation } from "../types/PageLocation";

export function secureUrl(location: PageLocation): string | null {
  if (location.protocol !== INSECURE_PROTOCOL) return null;
  if (LOCAL_HOSTS.includes(location.hostname)) return null;
  return SECURE_PROTOCOL + location.href.slice(INSECURE_PROTOCOL.length);
}
