"use client";

import { useMemo, useState } from "react";
import { playground } from "@/content/playground";
import { cn } from "@/lib/cn";
import type { BenchStepState } from "@/lib/ocr-bench";
import { parseLabel } from "@/lib/ocr-bench";

export function PlaygroundBench() {
  const [value, setValue] = useState("");
  const result = useMemo(() => parseLabel(value), [value]);

  const resultText = result.empty
    ? playground.resultIdle
    : result.stored && result.dateIso
      ? playground.resultStored.replace("{date}", result.dateIso)
      : playground.resultRefused;

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
      <div>
        <p className="font-mono text-[11px] tracking-[0.18em] text-text-faint uppercase">
          {playground.kicker}
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
          {playground.title}
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-muted">
          {playground.summary}
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
          <label
            htmlFor="ocr-bench-input"
            className="font-mono text-[10px] tracking-[0.16em] text-text-faint uppercase"
          >
            {playground.inputLabel}
          </label>
          <textarea
            id="ocr-bench-input"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={playground.inputPlaceholder}
            rows={3}
            spellCheck={false}
            className="border-line bg-bg/50 mt-3 w-full resize-none rounded-md border px-3 py-2 font-mono text-sm text-foreground outline-none placeholder:text-text-faint focus-visible:border-signal focus-visible:ring-3 focus-visible:ring-signal/40"
          />
        </div>

        <p className="mt-5 font-mono text-[10px] tracking-[0.16em] text-text-faint uppercase">
          {playground.samplesLabel}
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {playground.samples.map((sample) => {
            const active = value === sample.value;
            return (
              <li key={sample.id}>
                <button
                  type="button"
                  onClick={() => setValue(sample.value)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-full border px-3 py-1 font-mono text-[11px] tracking-wide transition-colors duration-base ease-out-premium motion-reduce:transition-none",
                    active
                      ? "border-signal/50 bg-signal-dim text-foreground"
                      : "border-line text-text-muted hover:border-signal/30 hover:text-foreground",
                  )}
                >
                  {sample.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="border-line bg-bg-elevated/50 rounded-lg border p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-6">
        <p className="mb-4 font-mono text-[10px] tracking-[0.16em] text-text-faint uppercase">
          {playground.logLabel}
        </p>
        <ol className="flex flex-col">
          {result.traces.map((trace, index) => {
            const step = playground.steps[index];
            const isLast = index === result.traces.length - 1;

            return (
              <li key={trace.id} className="flex flex-col items-center">
                <div
                  data-state={trace.state}
                  className={cn(
                    "w-full rounded-md border px-3 py-2 transition-colors duration-base ease-out-premium motion-reduce:transition-none",
                    nodeClass(trace.state),
                  )}
                >
                  <p className="font-mono text-[10px] tracking-[0.14em] text-text-faint">
                    {String(index + 1).padStart(2, "0")}
                    <span aria-hidden="true"> · </span>
                    {step.label}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed">
                    {playground.notes[trace.note]}
                  </p>
                </div>
                {isLast ? null : (
                  <span aria-hidden="true" className="bg-signal/35 h-4 w-px" />
                )}
              </li>
            );
          })}
        </ol>

        <p
          aria-live="polite"
          className={cn(
            "mt-6 font-mono text-sm tracking-wide",
            result.empty
              ? "text-text-faint"
              : result.stored
                ? "text-success"
                : "text-signal",
          )}
        >
          {resultText}
        </p>
      </div>
    </div>
  );
}

function nodeClass(state: BenchStepState) {
  switch (state) {
    case "ok":
      return "border-success/40 bg-success/10 text-foreground";
    case "warn":
      return "border-signal/50 bg-signal-dim text-foreground";
    case "fail":
      return "border-line bg-bg/60 text-text-muted";
    case "skip":
      return "border-line/70 bg-transparent text-text-faint";
    default:
      return "border-line bg-bg/40 text-text-muted";
  }
}
