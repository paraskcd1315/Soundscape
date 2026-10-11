import type { FmLayer } from "./FmLayer";
import type { MetalLayer } from "./MetalLayer";
import type { NoiseLayer } from "./NoiseLayer";
import type { ToneLayer } from "./ToneLayer";

export type DrumLayer = ToneLayer | NoiseLayer | MetalLayer | FmLayer;
