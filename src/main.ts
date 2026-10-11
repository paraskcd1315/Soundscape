import "./presentation/theme/app.css";
import { App } from "./presentation/app/App";

const root = document.getElementById("app");
if (!root) throw new Error("Missing #app element");
new App(root);
