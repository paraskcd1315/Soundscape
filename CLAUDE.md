# Soundscape

Vite + strict TypeScript, no UI framework, zero runtime dependencies. Design: `SDD.md` in the context repo (`PersonalProjects/Soundscape`).

- One type per file, no code comments, constants in co-located metrics files, user-facing copy in `src/presentation/i18n`.
- Layers point inward: `domain` ← `application` ← `data` / `presentation`. The composer and transport never touch `AudioContext`.
- Determinism is a contract: per-layer, per-bar RNG streams (`createRng(seed, layer, bar)`). Never share one RNG across layers.
- Audio is scheduled ahead on the audio clock; continuous parameters change with `setTargetAtTime`.
- Verify: `npm run typecheck`, `npm test`, `npm run build`.
