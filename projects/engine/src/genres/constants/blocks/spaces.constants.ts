import type { SpaceRecipe } from "../../../models/SpaceRecipe";

export const TRANCE_SPACE: SpaceRecipe = {
  reverbSeconds: 3,
  reverbDecay: 2.8,
  delayBeats: 0.75,
  delayFeedback: 0.38,
  delayMix: 0.32,
  delaySends: {
    drums: 0,
    bass: 0,
    chords: 0.3,
    pad: 0.15,
    melody: 0.55,
    counter: 0.6,
    texture: 0.4,
  },
  wobbleDepthSeconds: 0,
  wobbleHz: 0.4,
  drive: 1.4,
  rumble: 0,
  toneCeilingHz: 18000,
};

export const EPIC_SPACE: SpaceRecipe = {
  ...TRANCE_SPACE,
  reverbSeconds: 5,
  reverbDecay: 2.4,
  delayFeedback: 0.42,
};

export const PROGRESSIVE_SPACE: SpaceRecipe = {
  reverbSeconds: 3.5,
  reverbDecay: 2.6,
  delayBeats: 0.75,
  delayFeedback: 0.4,
  delayMix: 0.28,
  delaySends: {
    drums: 0.05,
    bass: 0,
    chords: 0.25,
    pad: 0.15,
    melody: 0.5,
    counter: 0.6,
    texture: 0.5,
  },
  wobbleDepthSeconds: 0,
  wobbleHz: 0.4,
  drive: 1.3,
  rumble: 0.08,
  toneCeilingHz: 16000,
};

export const DEEP_HOUSE_SPACE: SpaceRecipe = {
  reverbSeconds: 1.8,
  reverbDecay: 3,
  delayBeats: 0.75,
  delayFeedback: 0.32,
  delayMix: 0.24,
  delaySends: {
    drums: 0,
    bass: 0,
    chords: 0.35,
    pad: 0.1,
    melody: 0.4,
    counter: 0.5,
    texture: 0.3,
  },
  wobbleDepthSeconds: 0.0003,
  wobbleHz: 0.4,
  drive: 1.8,
  rumble: 0,
  toneCeilingHz: 12000,
};

export const TECH_HOUSE_SPACE: SpaceRecipe = {
  ...DEEP_HOUSE_SPACE,
  reverbSeconds: 1,
  delayMix: 0.15,
  drive: 1.6,
  toneCeilingHz: 16000,
};

export const TROPICAL_SPACE: SpaceRecipe = {
  reverbSeconds: 2.4,
  reverbDecay: 2.8,
  delayBeats: 0.75,
  delayFeedback: 0.3,
  delayMix: 0.25,
  delaySends: {
    drums: 0,
    bass: 0,
    chords: 0.2,
    pad: 0.1,
    melody: 0.45,
    counter: 0.5,
    texture: 0.3,
  },
  wobbleDepthSeconds: 0,
  wobbleHz: 0.4,
  drive: 1.2,
  rumble: 0,
  toneCeilingHz: 15000,
};

export const MELODIC_TECHNO_SPACE: SpaceRecipe = {
  reverbSeconds: 4,
  reverbDecay: 2.6,
  delayBeats: 0.75,
  delayFeedback: 0.45,
  delayMix: 0.34,
  delaySends: {
    drums: 0.05,
    bass: 0,
    chords: 0.35,
    pad: 0.15,
    melody: 0.6,
    counter: 0.7,
    texture: 0.5,
  },
  wobbleDepthSeconds: 0,
  wobbleHz: 0.4,
  drive: 1.6,
  rumble: 0.12,
  toneCeilingHz: 17000,
};

export const DUB_SPACE: SpaceRecipe = {
  reverbSeconds: 4.5,
  reverbDecay: 2.2,
  delayBeats: 0.75,
  delayFeedback: 0.68,
  delayMix: 0.55,
  delaySends: {
    drums: 0.08,
    bass: 0,
    chords: 0.95,
    pad: 0.2,
    melody: 0.5,
    counter: 0.6,
    texture: 0.6,
  },
  wobbleDepthSeconds: 0.0005,
  wobbleHz: 0.25,
  drive: 1.5,
  rumble: 0.18,
  toneCeilingHz: 6000,
};

export const CHILLOUT_SPACE: SpaceRecipe = {
  reverbSeconds: 3.2,
  reverbDecay: 2.6,
  delayBeats: 0.75,
  delayFeedback: 0.3,
  delayMix: 0.3,
  delaySends: {
    drums: 0,
    bass: 0,
    chords: 0.2,
    pad: 0.2,
    melody: 0.45,
    counter: 0.5,
    texture: 0.4,
  },
  wobbleDepthSeconds: 0.0002,
  wobbleHz: 0.4,
  drive: 1.2,
  rumble: 0,
  toneCeilingHz: 12000,
};

export const LOUNGE_SPACE: SpaceRecipe = {
  reverbSeconds: 1.6,
  reverbDecay: 3,
  delayBeats: 0.5,
  delayFeedback: 0.18,
  delayMix: 0.12,
  delaySends: {
    drums: 0,
    bass: 0,
    chords: 0,
    pad: 0,
    melody: 0.25,
    counter: 0.2,
    texture: 0,
  },
  wobbleDepthSeconds: 0.0002,
  wobbleHz: 0.4,
  drive: 1.4,
  rumble: 0,
  toneCeilingHz: 13000,
};

export const DOWNTEMPO_SPACE: SpaceRecipe = {
  ...CHILLOUT_SPACE,
  reverbSeconds: 2.5,
  toneCeilingHz: 14000,
  drive: 1.5,
};

export const DUSTY_SPACE: SpaceRecipe = {
  reverbSeconds: 1.6,
  reverbDecay: 3,
  delayBeats: 0.75,
  delayFeedback: 0.3,
  delayMix: 0.25,
  delaySends: {
    drums: 0,
    bass: 0,
    chords: 0.15,
    pad: 0.1,
    melody: 0.4,
    counter: 0.45,
    texture: 0,
  },
  wobbleDepthSeconds: 0.0012,
  wobbleHz: 0.6,
  drive: 2.2,
  rumble: 0,
  toneCeilingHz: 8000,
};

export const FUTURE_SPACE: SpaceRecipe = {
  reverbSeconds: 4,
  reverbDecay: 2.4,
  delayBeats: 0.75,
  delayFeedback: 0.36,
  delayMix: 0.3,
  delaySends: {
    drums: 0.1,
    bass: 0,
    chords: 0.3,
    pad: 0.2,
    melody: 0.55,
    counter: 0.6,
    texture: 0.4,
  },
  wobbleDepthSeconds: 0,
  wobbleHz: 0.4,
  drive: 1.4,
  rumble: 0,
  toneCeilingHz: 15000,
};

export const SPACE_DREAMS_SPACE: SpaceRecipe = {
  reverbSeconds: 9,
  reverbDecay: 2,
  delayBeats: 0.75,
  delayFeedback: 0.5,
  delayMix: 0.42,
  delaySends: {
    drums: 0,
    bass: 0,
    chords: 0.25,
    pad: 0.3,
    melody: 0.55,
    counter: 0.7,
    texture: 0.7,
  },
  wobbleDepthSeconds: 0.0003,
  wobbleHz: 0.2,
  drive: 1.1,
  rumble: 0,
  toneCeilingHz: 10000,
};

export const DREAMWAVE_SPACE: SpaceRecipe = {
  reverbSeconds: 5,
  reverbDecay: 2.2,
  delayBeats: 0.75,
  delayFeedback: 0.35,
  delayMix: 0.3,
  delaySends: {
    drums: 0.05,
    bass: 0,
    chords: 0.25,
    pad: 0.15,
    melody: 0.45,
    counter: 0.5,
    texture: 0.4,
  },
  wobbleDepthSeconds: 0.0009,
  wobbleHz: 0.5,
  drive: 1.8,
  rumble: 0,
  toneCeilingHz: 11000,
};

export const SYNTHWAVE_SPACE: SpaceRecipe = {
  reverbSeconds: 2.5,
  reverbDecay: 2.8,
  delayBeats: 0.75,
  delayFeedback: 0.35,
  delayMix: 0.28,
  delaySends: {
    drums: 0,
    bass: 0,
    chords: 0.2,
    pad: 0.15,
    melody: 0.45,
    counter: 0.5,
    texture: 0.3,
  },
  wobbleDepthSeconds: 0.0003,
  wobbleHz: 0.5,
  drive: 1.6,
  rumble: 0,
  toneCeilingHz: 15000,
};

export const DARKSYNTH_SPACE: SpaceRecipe = {
  ...SYNTHWAVE_SPACE,
  reverbSeconds: 3,
  drive: 2.6,
  rumble: 0.1,
  toneCeilingHz: 16000,
};

export const EDM_SPACE: SpaceRecipe = {
  reverbSeconds: 2.2,
  reverbDecay: 2.8,
  delayBeats: 0.75,
  delayFeedback: 0.25,
  delayMix: 0.22,
  delaySends: {
    drums: 0,
    bass: 0,
    chords: 0.2,
    pad: 0.1,
    melody: 0.4,
    counter: 0.4,
    texture: 0.3,
  },
  wobbleDepthSeconds: 0,
  wobbleHz: 0.4,
  drive: 1.5,
  rumble: 0,
  toneCeilingHz: 18000,
};
