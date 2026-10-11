# Soundscape

Vite + strict TypeScript, no UI framework, zero runtime dependencies. Design: `SDD.md` in the context repo (`PersonalProjects/Soundscape`).

- Projects: `projects/engine` (models, composer, transport, settings, presets; no DOM, no audio), `projects/audio` (Web Audio voices and player), `projects/visualizer` (canvas modes, themes), `projects/design-system` (`ss-*` atoms, molecules, organisms, layouts; SCSS tokens). App in `src/app`: `core` (services, storage, constants) and `modules/{stage,rail,player,advanced}`. Aliases: `@soundscape/<project>/*`, `@app/*`.
- One type per file in a `types/` folder next to its owner, no code comments, constants in `constants/*.constants.ts`, pure helpers in `utils/*.util.ts`, logic in services, user-facing copy in each module's `*.strings.ts`, `data-testid` on interactive controls.
- Dependencies point inward: app → design-system / visualizer / audio → engine. The composer and transport never touch `AudioContext`.
- Song forms loop forever: sections marked `introOnly` play once, then the body repeats. No outros.
- Determinism is a contract: per-layer, per-bar RNG streams (`createRng(seed, layer, bar)`). Never share one RNG across layers.
- Audio is scheduled ahead on the audio clock; continuous parameters change with `setTargetAtTime`.
- Verify: `npm run typecheck`, `npm test`, `npm run build`.
