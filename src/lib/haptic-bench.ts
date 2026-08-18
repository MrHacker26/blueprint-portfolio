import type { BenchStepState } from "@/lib/bench";
import type { HapticKind, HapticNoteId, HapticStepId } from "@/types/content";

export type HapticTrace = {
  id: HapticStepId;
  state: BenchStepState;
  note: HapticNoteId;
};

export type HapticResult = {
  empty: boolean;
  outcome: "idle" | "played" | "silent" | "dropped";
  kind: HapticKind | null;
  intensity: number | null;
  sharpness: number | null;
  dropped: number;
  vibrateMs: number;
  traces: HapticTrace[];
};

const idleTraces: HapticTrace[] = [
  { id: "phone", state: "idle", note: "idle" },
  { id: "webview", state: "idle", note: "idle" },
  { id: "bridge", state: "idle", note: "idle" },
  { id: "haptics", state: "idle", note: "idle" },
];

const patterns: Record<
  "light" | "medium" | "heavy",
  { intensity: number; sharpness: number; vibrateMs: number }
> = {
  light: { intensity: 0.4, sharpness: 0.3, vibrateMs: 12 },
  medium: { intensity: 0.7, sharpness: 0.5, vibrateMs: 22 },
  heavy: { intensity: 1, sharpness: 0.85, vibrateMs: 36 },
};

function path(
  bridge: { state: BenchStepState; note: HapticNoteId },
  haptics: { state: BenchStepState; note: HapticNoteId },
): HapticTrace[] {
  return [
    { id: "phone", state: "ok", note: "phone" },
    { id: "webview", state: "ok", note: "webview" },
    { id: "bridge", ...bridge },
    { id: "haptics", ...haptics },
  ];
}

export function playHaptic(kind: HapticKind | null): HapticResult {
  if (!kind) {
    return {
      empty: true,
      outcome: "idle",
      kind: null,
      intensity: null,
      sharpness: null,
      dropped: 0,
      vibrateMs: 0,
      traces: idleTraces,
    };
  }

  if (kind === "unknown") {
    return {
      empty: false,
      outcome: "silent",
      kind,
      intensity: null,
      sharpness: null,
      dropped: 0,
      vibrateMs: 0,
      traces: path(
        { state: "fail", note: "bridgeUnknown" },
        { state: "skip", note: "hapticsSkip" },
      ),
    };
  }

  if (kind === "queued") {
    const last = patterns.heavy;
    return {
      empty: false,
      outcome: "dropped",
      kind: "heavy",
      intensity: last.intensity,
      sharpness: last.sharpness,
      dropped: 2,
      vibrateMs: last.vibrateMs,
      traces: path(
        { state: "warn", note: "bridgeQueued" },
        { state: "ok", note: "hapticsPlay" },
      ),
    };
  }

  const pattern = patterns[kind];
  return {
    empty: false,
    outcome: "played",
    kind,
    intensity: pattern.intensity,
    sharpness: pattern.sharpness,
    dropped: 0,
    vibrateMs: pattern.vibrateMs,
    traces: path(
      { state: "ok", note: "bridgeOk" },
      { state: "ok", note: "hapticsPlay" },
    ),
  };
}
