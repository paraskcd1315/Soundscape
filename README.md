# Soundscape

Endless generative music in the browser. Pick a style (Ambient, Lo-fi, Techno, Chiptune, Jazz), press play, and shape it with live settings and presets while a visualizer reacts to the notes and the audio.

Everything runs client-side: notes are composed by code from a seed and rendered by synthesizers on the Web Audio API. The same seed, style and settings always produce the same music.

## Run

```
npm install
npm run dev
npm run build
npm test
```

## Use

- **Space** play/pause, **F** fullscreen, **R** new seed, **← →** previous/next preset.
- **Surprise me** picks a style and settings inside that style's ranges. Lock the seed to keep it.
- Presets: built-in and your own (saved in the browser), import/export as JSON, and a share link that carries the whole sound in the URL.

## Layout

```
src/domain        notes, scales, chords, settings, presets, seeded random
src/application   composer, transport, settings store, preset service
src/data          Web Audio engine and voices, storage, share codec
src/presentation  app shell, controls, visualizer, i18n catalogue
src/styles        one data file per style
```
