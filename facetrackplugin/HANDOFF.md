# HANDOFF — facetrackplugin

Read this first, then pick a task from **[What to do next](#what-to-do-next)**
and tell me to do it. Everything you need to continue is here.

---

## What this project is

A **Figma Motion plugin** that retargets a facial performance onto a Figma rig.
The framing that matters: this is *not* "face detection in Figma," it's
*retargeting a performance onto a rig* — the value is the authoring layer
between tracking and keyframes (smoothing, calibration, keyframe reduction).

## Current state (working)

- ✅ **Loadable plugin**: `manifest.json` + `ui.html` + `code.ts` (compiled to
  `dist/code.js`, which is committed so it imports with no build step).
- ✅ **Analysis pipeline** (`src/`): gap-fill → calibrate → smooth → simplify →
  build keyframes. Pure TS, typechecked, smoke-tested.
- ✅ **End-to-end demo**: the plugin writes Motion keyframes onto a selected
  layer from a *synthetic* performance (no face detection yet).
- ✅ Verified against the live Motion API (Beta, shipped 2026-06-23). The one
  real bug it caught — `ROTATION` is in **degrees**, `atan2` is radians — is
  fixed.

## What's NOT done yet

- ❌ Real video face detection (MediaPipe/TF.js). The demo is synthetic.
- ❌ Calibration UI (neutral-capture button), per-track sliders.
- ❌ Node-id persistence (store target at analyze time, re-resolve at generate).
- ❌ Standalone `facetrackerplugin` repo (see constraints below).

Full backlog with priorities: [`docs/ROADMAP.md`](docs/ROADMAP.md).
Why these are the priorities: [`docs/CRITIQUE_ASSESSMENT.md`](docs/CRITIQUE_ASSESSMENT.md).

---

## Where the code lives

- **Repo**: `github.com/teddygraham/projects`
- **Branch**: `claude/facetrackplugin-critique-3xtwbs`
- **Folder**: `facetrackplugin/`

Get it locally:
```bash
git clone --branch claude/facetrackplugin-critique-3xtwbs \
  https://github.com/teddygraham/projects.git
cd projects/facetrackplugin
npm install
npm run typecheck && npm run build && npm run smoke
```

## How to load it in Figma

1. **Figma desktop app** (dev plugins don't load in the browser).
2. **Menu → Plugins → Development → Import plugin from manifest…**
3. Select `facetrackplugin/manifest.json`.
4. Select a layer → **Plugins → Development → FaceTrack — Performance
   Retargeting** → **Generate demo animation**. Open the **Motion** panel to
   see the keyframes.

## File map

```
manifest.json     Figma manifest (import this)
ui.html           plugin panel (vanilla JS, themeable)
code.ts           sandbox entry: runs pipeline, calls applyManualKeyframeTrack
dist/code.js      committed esbuild bundle
src/
  types.ts        FrameSample / Track types
  oneEuro.ts      adaptive smoothing
  simplify.ts     RDP keyframe reduction
  calibration.ts  neutral capture + deviation
  gapFill.ts      detection-loss fallback
  applyTrack.ts   Track → Motion keyframe args (radians→degrees)
  pipeline.ts     analyzeToKeyframes() — orchestrates the 5 stages
  smoke.ts        synthetic-clip test
docs/             ROADMAP, CRITIQUE_ASSESSMENT, MOTION_API_FINDINGS
```

---

## ⚠️ Environment constraints (read before pushing)

This repo is usually edited from **Claude Code on the web**, whose GitHub
access is quirky. A previous session burned a lot of time on this — don't
repeat it:

- **REST API is read-only.** Any GitHub *REST* call (create repo, create
  branch, MCP `push_files`/`create_repository`) returns
  `403 Resource not accessible by integration`. The egress proxy injects a
  read-only app identity and **strips any token you pass** — even an invalid
  token returns 200 as `teddygraham`. So you **cannot create a new repo** or use
  the GitHub MCP write tools from inside the web container.
- **git push DOES work** — but only by embedding a real PAT in the remote URL
  so it bypasses the `insteadOf` rewrite that routes `https://github.com/` to
  the read-only relay:
  ```bash
  git push "https://x-access-token:<PAT>@github.com/teddygraham/projects.git" \
    claude/facetrackplugin-critique-3xtwbs:claude/facetrackplugin-critique-3xtwbs
  ```
  Get a fresh fine-grained PAT with **Contents: write** on the repo. Don't
  paste it in chat — set it as an environment secret, or run the push yourself.
- **A standalone `facetrackerplugin` repo** can't be created from the web
  container (needs the blocked REST API). Create the empty repo yourself at
  github.com/new, then a session can `git push` to it with a PAT.
- **Running locally** (Claude Code in your terminal) has none of these limits —
  normal `git push` and `gh repo create` just work.
- **Commit identity**: a stop-hook wants `git config user.email
  noreply@anthropic.com && git config user.name Claude`. Commits will still
  show "Unverified" (no GPG key in the environment) — that's cosmetic.

---

## What to do next

Pick one and tell me "do task N" (or paste the prompt). Ordered by leverage.

### Task 1 — Real video face detection (biggest gap)
Replace the synthetic demo with MediaPipe Face Landmarker in `ui.html`:
extract per-frame landmarks from an uploaded video, compute the measurements
(`mouthOpen`, `headRoll`, etc.), build `FrameSample[]`, and post
`{ type: "apply-samples", samples }` to `code.ts` (already handled there). Add
the model CDN to `manifest.json → networkAccess.allowedDomains`. Prefer
`requestVideoFrameCallback` over per-frame seeking.
> Prompt: *"Read HANDOFF.md. Implement Task 1: wire MediaPipe Face Landmarker
> video detection into ui.html and feed FrameSample[] to the pipeline."*

### Task 2 — Calibration + sliders UI
Add a "Capture neutral" button (uses `computeNeutral`) and per-track
exaggeration + smoothing-strength sliders (drive `gain` and One Euro
`minCutoff`/`beta`), plus Accurate/Balanced/Editable simplification presets.
> Prompt: *"Read HANDOFF.md. Implement Task 2: calibration button + per-track
> sliders + simplification presets in the plugin UI."*

### Task 3 — Robust targeting
Store root + child node IDs at analyze time; re-resolve and verify existence at
generate (don't trust the live selection). Add a "locked target" affordance.
Persist the layer mapping per component via `setPluginData`.
> Prompt: *"Read HANDOFF.md. Implement Task 3: node-id capture at analyze time,
> re-resolve at generate, and setPluginData persistence."*

### Task 4 — Publish as its own repo
Move `facetrackplugin/` to the root of a new `facetrackerplugin` repo.
> Prompt: *"Read HANDOFF.md, 'Environment constraints'. I've created an empty
> facetrackerplugin repo and set a PAT env var. Push the plugin to it as its
> own repo."*

### Task 5 — Verify in a real Figma file
Use the Figma MCP tools to confirm timeline ownership for `setTimelineDuration`
and that the keyframes land as expected on a real rig (the one item
`MOTION_API_FINDINGS.md` lists as "verify in-editor").
> Prompt: *"Read HANDOFF.md. Do Task 5: verify the Motion timeline wiring
> against a real Figma file using the Figma MCP."*
