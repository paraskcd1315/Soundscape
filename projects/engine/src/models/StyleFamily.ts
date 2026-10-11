import type { StyleDefinition } from "./StyleDefinition";

export type StyleFamily = Omit<StyleDefinition, "id" | "palette">;
