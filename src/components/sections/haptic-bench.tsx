"use client";

import { useEffect, useMemo, useState } from "react";
import { PipelineTrace } from "@/components/sections/pipeline-trace";
import { playground } from "@/content/playground";
import { cn } from "@/lib/cn";
import { playHaptic } from "@/lib/haptic-bench";
import type { HapticKind } from "@/types/content";

const bench = playground.haptic;

export function HapticBench() {
  const [kind, setKind] = useState<HapticKind | null>(null);
  const [nonce, setNonce] = useState(0);
  const result = useMemo(() => playHaptic(kind), [kind]);

  useEffect(() => {
    if (!result.vibrateMs || result.empty) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    if (typeof navigator.vibrate === "function") {
      navigator.vibrate(result.vibrateMs);
    }
  }, [result.vibrateMs, result.empty]);

  const resultText = result.empty
    ? bench.resultIdle
    : result.outcome === "silent"
      ? bench.resultSilent
      : result.outcome === "dropped"
        ? bench.resultDropped.replace("{count}", String(result.dropped))
        : bench.resultPlayed
            .replace("{kind}", result.kind ?? "")
            .replace("{intensity}", result.intensity?.toFixed(2) ?? "");

  const pulse = result.outcome === "played" || result.outcome === "dropped";

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
      <div>
        <p className="font-mono text-[11px] tracking-[0.18em] text-text-faint uppercase">
          {bench.kicker}
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
          {bench.title}
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-muted">
          {bench.summary}
        </p>

        <div className="border-line bg-bg-elevated/40 relative mt-8 rounded-md border p-4 sm:p-5">
          <span
            aria-hidden="true"
            className="border-signal/50 bg-bg absolute top-2 left-2 size-1.5 border"
          />
          <span
            aria-hidden="true"
            className="border-signal/50 bg-bg absolute top-2 right-2 size-1.5 border"
          />
          <span
            aria-hidden="true"
            className="border-signal/50 bg-bg absolute bottom-2 left-2 size-1.5 border"
          />
          <span
            aria-hidden="true"
            className="border-signal/50 bg-bg absolute right-2 bottom-2 size-1.5 border"
          />
          <div
            key={nonce}
            aria-hidden="true"
            className={cn(
              "border-signal/40 mx-auto mb-5 flex size-16 items-center justify-center rounded-md border",
              pulse && "haptic-pulse",
            )}
            style={
              pulse && result.intensity
                ? { ["--haptic-scale" as string]: 1 + result.intensity * 0.12 }
                : undefined
            }
          >
            <span
              className={cn(
                "size-2 rounded-full",
                result.outcome === "silent"
                  ? "bg-line"
                  : pulse
                    ? "bg-signal"
                    : "bg-text-faint/40",
              )}
            />
          </div>
          <p className="font-mono text-[10px] tracking-[0.16em] text-text-faint uppercase">
            {bench.hitsLabel}
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {bench.hits.map((hit) => {
              const active = kind === hit.kind;
              return (
                <li key={hit.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setKind(hit.kind);
                      setNonce((value) => value + 1);
                    }}
                    aria-pressed={active}
                    className={cn(
                      "rounded-full border px-3 py-1 font-mono text-[11px] tracking-wide transition-colors duration-base ease-out-premium motion-reduce:transition-none",
                      active
                        ? "border-signal/50 bg-signal-dim text-foreground"
                        : "border-line text-text-muted hover:border-signal/30 hover:text-foreground",
                    )}
                  >
                    {hit.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <PipelineTrace
        logLabel={bench.logLabel}
        traces={result.traces}
        steps={bench.steps}
        notes={bench.notes}
        result={resultText}
        tone={
          result.empty ? "idle" : result.outcome === "played" ? "ok" : "warn"
        }
      />
    </div>
  );
}
