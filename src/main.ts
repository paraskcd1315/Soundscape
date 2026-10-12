import "@soundscape/design-system/foundation/styles.scss";
import { App } from "./app/App";
import { secureUrl } from "./app/core/utils/secureUrl.util";

const secure = import.meta.env.PROD ? secureUrl(location) : null;
if (secure) {
  location.replace(secure);
} else {
  const root = document.getElementById("app");
  if (!root) throw new Error("Missing #app element");
  new App(root);
}
