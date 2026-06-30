# facetrackplugin

**Retarget a facial performance onto a Figma rig.**

A Figma Motion plugin that analyzes a facial performance and drives a Figma
node's Motion keyframe tracks from it. This repo is a **loadable plugin**
(manifest + UI + sandbox code) wrapped around an **analysis pipeline** — the
part that turns a noisy, gappy stream of per-frame measurements into a small
set of clean, editable Motion keyframes — plus a worked critique of the design.

> **Load it in 30 seconds — see [Load into Figma](#load-into-figma) below.**

> The reframe that drives everything here: this is *not* "face detection in
> Figma," it's *retargeting a performance onto a rig*. That's why the leverage
> is in the authoring layer between tracking and keyframes, not in more
> detectors.

## Why this exists

Raw per-frame tracking produces output that is technically correct and looks
amateur: jittery, one keyframe per frame, un-editable, and biased by whoever's
resting face it captured. Two independent critiques (see
[`docs/CRITIQUE_ASSESSMENT.md`](docs/CRITIQUE_ASSESSMENT.md)) converged on the
same two highest-leverage fixes. This pipeline implements them.

## The pipeline

```
raw frame samples
   │  (may contain detection-loss gaps)
   ▼
1. gap-fill      hold short gaps → interpolate → ease to neutral on long gaps
   ▼             — no detected→neutral→detected snap
2. calibrate     express every measurement as deviation from a captured neutral
   ▼             — fixes per-person baseline bias; rest becomes 0
3. smooth        One Euro filter: kills micro-jitter, keeps fast motion crisp
   ▼
4. simplify      RDP keyframe reduction: ~150 frames → ~20 editable keyframes
   ▼
5. build         emit Figma applyManualKeyframeTrack args (degrees-correct)
```

Entry point: [`analyzeToKeyframes`](src/pipeline.ts).

| Module | Responsibility |
|---|---|
| `src/oneEuro.ts` | Adaptive One Euro low-pass smoothing |
| `src/simplify.ts` | Ramer–Douglas–Peucker keyframe reduction (vertical-distance) |
| `src/calibration.ts` | Neutral capture + deviation |
| `src/gapFill.ts` | Graded detection-loss fallback |
| `src/applyTrack.ts` | Map a track → `applyManualKeyframeTrack` args (radians→degrees) |
| `src/pipeline.ts` | Orchestrates the five stages |

## Load into Figma

The plugin shell is here: `manifest.json`, `ui.html`, and `code.ts` (compiled to
`dist/code.js`, which **is committed** so you can import without building).

1. Open the **Figma desktop app** (dev plugins don't load in the browser).
2. **Menu → Plugins → Development → Import plugin from manifest…**
3. Select this folder's **`manifest.json`**.
4. Select any layer, then run **Plugins → Development → FaceTrack — Performance
   Retargeting**.
5. Click **Generate demo animation**. It writes smoothed, reduced Motion
   keyframes (mouth → `TRANSLATION_Y`, head roll → `ROTATION` in degrees) onto
   the selected layer. Open the **Motion** panel to see and hand-edit them.

> The demo uses a *synthetic* performance so it runs offline with no face
> detection. To drive it from real video, do MediaPipe/TF.js detection in
> `ui.html`, post `FrameSample[]` to `code.ts` (`{ type: "apply-samples" }`),
> and add the model CDN to `manifest.json` → `networkAccess`. The analysis
> pipeline is already wired — see `code.ts`.

If you edit `code.ts`, rebuild with `npm run build` and re-run the plugin.

## Run it (pipeline tests)

```bash
npm install
npm run typecheck          # tsc --noEmit, clean
npm run build              # esbuild → dist/code.js (the plugin bundle)
npm run smoke              # runs the synthetic-clip pipeline test
```

The smoke test (`src/smoke.ts`) runs a synthetic 5s/30fps clip with injected
jitter and a detection dropout. Expected output: ~150 raw frames reduced to ~20
keyframes per track, and a rotation peak in the ~10° range (degrees) rather than
~0.15 (radians) — proof the conversion is applied.

## Wiring into the plugin

`analyzeToKeyframes` returns, per mapping, the exact argument object for
Figma's `node.applyManualKeyframeTrack(field, track)`. In `code.ts`:

```ts
const { tracks } = analyzeToKeyframes(samples, config);
for (const { field, track } of Object.values(tracks)) {
  node.applyManualKeyframeTrack(field, track);
}
```

See [`docs/MOTION_API_FINDINGS.md`](docs/MOTION_API_FINDINGS.md) for the
verified Motion API facts (the API is Beta, shipped 2026-06-23) — most
importantly that `ROTATION` is in **degrees** and timeline positions are in
**seconds**.

## Docs

- [`docs/CRITIQUE_ASSESSMENT.md`](docs/CRITIQUE_ASSESSMENT.md) — assessment of
  the critique and the collapsed worklist.
- [`docs/MOTION_API_FINDINGS.md`](docs/MOTION_API_FINDINGS.md) — verified Motion
  API surface; what was confirmed vs. what to check in-editor.
- [`docs/ROADMAP.md`](docs/ROADMAP.md) — v1 / v1.5 / v2, ordered by leverage.

## Project layout

```
manifest.json     Figma plugin manifest (import this)
ui.html           plugin panel (vanilla, themeable)
code.ts           sandbox entry: pipeline → applyManualKeyframeTrack
dist/code.js      committed build output (so it loads without building)
src/              the analysis pipeline (see table above)
docs/             critique assessment, Motion API findings, roadmap
```

## Status

v1 analysis pipeline implemented, typechecked, and wrapped in a loadable plugin
(synthetic-demo path working end-to-end against the Motion API). Next:
UI-side face detection (MediaPipe/TF.js), node-id persistence, and per-track
sliders — see [`docs/ROADMAP.md`](docs/ROADMAP.md).
