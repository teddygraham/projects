// Plugin sandbox entry point (runs in Figma's main thread, has `figma.*`).
//
// Flow: the UI panel sends a message; we run the analysis pipeline and write
// Motion keyframe tracks onto the selected node via applyManualKeyframeTrack.
//
// For a real build the UI would do MediaPipe/TF.js face detection on a video
// and post the per-frame FrameSample[] here. This scaffold ships a synthetic
// "demo performance" so the plugin does something visible end-to-end without
// the detection bridge — proving smoothing, gap-fill, keyframe reduction, and
// the radians→degrees rotation fix against the live Motion API.

import { analyzeToKeyframes, PipelineConfig } from "./src/pipeline";
import { FrameSample } from "./src/types";

figma.showUI(__html__, { width: 340, height: 460, themeColors: true });

const DEMO_CONFIG: PipelineConfig = {
  mappings: [
    { measurement: "mouthOpen", property: "TRANSLATION_Y", gain: 60 },
    { measurement: "headRoll", property: "ROTATION", gain: 1, isRotation: true },
  ],
};

/** Deterministic synthetic performance (mirrors src/smoke.ts). */
function demoSamples(): FrameSample[] {
  const FPS = 30;
  const DURATION = 5;
  const N = FPS * DURATION;
  const jitter = (i: number, amp: number) =>
    amp * (((Math.sin(i * 12.9898) * 43758.5453) % 1) || 0);

  const samples: FrameSample[] = [];
  for (let i = 0; i < N; i++) {
    const t = i / FPS;
    const mouthOpen =
      0.18 + 0.32 * Math.max(0, Math.sin((t / DURATION) * Math.PI)) + jitter(i, 0.02);
    const headRoll = 0.15 * Math.sin(t * 2) + jitter(i, 0.01); // radians, as atan2 gives
    // Simulate a brief detection dropout to exercise the gap-fill fallback.
    if (i >= 60 && i <= 66) samples.push({ t, values: null });
    else samples.push({ t, values: { mouthOpen, headRoll } });
  }
  return samples;
}

type MotionNode = SceneNode & {
  applyManualKeyframeTrack: (field: unknown, track: unknown) => void;
};

function hasMotionApi(node: SceneNode): node is MotionNode {
  return typeof (node as { applyManualKeyframeTrack?: unknown }).applyManualKeyframeTrack === "function";
}

function applyToSelection(samples: FrameSample[], config: PipelineConfig) {
  const selection = figma.currentPage.selection;
  if (selection.length === 0) {
    figma.ui.postMessage({ type: "error", message: "Select a layer to drive first." });
    return;
  }
  const node = selection[0];
  if (!hasMotionApi(node)) {
    figma.ui.postMessage({
      type: "error",
      message:
        "This node/Figma build has no Motion API (applyManualKeyframeTrack). Update the desktop app and select a frame with a timeline.",
    });
    return;
  }

  const { tracks, reduction, neutral } = analyzeToKeyframes(samples, config);
  let applied = 0;
  for (const key of Object.keys(tracks)) {
    const { field, track } = tracks[key];
    node.applyManualKeyframeTrack(field, track);
    applied++;
  }

  figma.notify(`Applied ${applied} Motion track(s) to "${node.name}".`);
  figma.ui.postMessage({ type: "done", node: node.name, reduction, neutral });
}

figma.ui.onmessage = (msg: { type: string; samples?: FrameSample[]; config?: PipelineConfig }) => {
  switch (msg.type) {
    case "generate-demo":
      applyToSelection(demoSamples(), DEMO_CONFIG);
      break;
    case "apply-samples":
      // Real path: UI-side face detection posts FrameSample[] here.
      if (msg.samples) applyToSelection(msg.samples, msg.config ?? DEMO_CONFIG);
      break;
    case "close":
      figma.closePlugin();
      break;
  }
};
