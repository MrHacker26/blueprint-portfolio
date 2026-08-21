"use client";

import { useMemo, useState } from "react";
import { PipelineTrace } from "@/components/sections/pipeline-trace";
import { FrameMarks } from "@/components/ui/frame-marks";
import { playground } from "@/content/playground";
import { cn } from "@/lib/cn";
import { parseLabel } from "@/lib/ocr-bench";

const bench = playground.ocr;

export function OcrBench() {
  const [value, setValue] = useState("");
  const result = useMemo(() => parseLabel(value), [value]);

  const resultText = result.empty
    ? bench.resultIdle
    : result.stored && result.dateIso
      ? bench.resultStored.replace("{date}", result.dateIso)
      : bench.resultRefused;

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

        <div className="border-line bg-bg-elevated/40 relative mt-8 rounded-[2px] border p-4 sm:p-5">
          <FrameMarks />
          <label
            htmlFor="ocr-bench-input"
            className="font-mono text-[10px] tracking-[0.16em] text-text-faint uppercase"
          >
            {bench.inputLabel}
          </label>
          <textarea
            id="ocr-bench-input"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={bench.inputPlaceholder}
            rows={3}
            spellCheck={false}
            className="border-line bg-bg/50 mt-3 w-full resize-none rounded-[2px] border px-3 py-2 font-mono text-sm text-foreground outline-none placeholder:text-text-faint focus-visible:border-signal focus-visible:ring-3 focus-visible:ring-signal/40"
          />
        </div>

        <p className="mt-5 font-mono text-[10px] tracking-[0.16em] text-text-faint uppercase">
          {bench.samplesLabel}
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {bench.samples.map((sample) => {
            const active = value === sample.value;
            return (
              <li key={sample.id}>
                <button
                  type="button"
                  onClick={() => setValue(sample.value)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-[2px] border px-3 py-1 font-mono text-[11px] tracking-wide transition-colors duration-base ease-out-premium motion-reduce:transition-none",
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

      <PipelineTrace
        logLabel={bench.logLabel}
        traces={result.traces}
        steps={bench.steps}
        notes={bench.notes}
        result={resultText}
        tone={result.empty ? "idle" : result.stored ? "ok" : "warn"}
      />
    </div>
  );
}
