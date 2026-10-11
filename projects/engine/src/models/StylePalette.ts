import type { LayerKind } from './LayerKind';

export interface StylePalette {
  backgroundTop: string;
  backgroundBottom: string;
  accents: Record<LayerKind, string>;
}
