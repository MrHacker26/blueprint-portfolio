"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import type { PlaygroundFlow } from "@/types/content";

type PlaygroundFlowCardProps = {
  flow: PlaygroundFlow;
};

export function PlaygroundFlowCard({ flow }: PlaygroundFlowCardProps) {
  const [activeId, setActiveId] = useState(flow.steps[0]?.id ?? "");
  const active =
    flow.steps.find((step) => step.id === activeId) ?? flow.steps[0];

  return (
    <article className="border-line bg-bg-elevated/50 flex flex-col rounded-lg border p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
      <h3 className="text-base font-semibold tracking-tight text-foreground">
        {flow.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">
        {flow.summary}
      </p>
      <ol className="mt-5 flex flex-col">
        {flow.steps.map((step, index) => {
          const isActive = step.id === active?.id;
          const isLast = index === flow.steps.length - 1;

          return (
            <li key={step.id} className="flex flex-col items-center">
              <button
                type="button"
                aria-current={isActive ? "step" : undefined}
                onClick={() => setActiveId(step.id)}
                onFocus={() => setActiveId(step.id)}
                className={cn(
                  "relative w-full rounded-md border px-3 py-2 text-left transition-colors duration-base ease-out-premium",
                  isActive
                    ? "border-signal/50 bg-signal-dim text-foreground"
                    : "border-line bg-bg/40 text-text-muted hover:border-signal/25 hover:text-foreground",
                )}
              >
                <span className="font-mono text-[10px] tracking-[0.14em] text-text-faint">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-0.5 block font-mono text-sm">
                  {step.label}
                </span>
              </button>
              {isLast ? null : (
                <span aria-hidden="true" className="bg-signal/35 h-4 w-px" />
              )}
            </li>
          );
        })}
      </ol>
      {active ? (
        <p className="mt-5 min-h-[4.5rem] text-sm leading-relaxed text-text-muted">
          {active.detail}
        </p>
      ) : null}
    </article>
  );
}
