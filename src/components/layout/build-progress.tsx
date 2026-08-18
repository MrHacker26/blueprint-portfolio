"use client";

import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { cn } from "@/lib/cn";
import { getBuildStage, site } from "@/lib/site";

export function BuildProgress() {
  const progress = useScrollProgress();
  const stage = getBuildStage(progress);

  return (
    <div
      className="pointer-events-none fixed top-0 right-0 left-0 z-40 h-px"
      role="progressbar"
      aria-label={site.a11y.buildProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      aria-valuetext={stage.label}
    >
      <div
        className={cn(
          "bg-signal h-full origin-left",
          "transition-transform duration-fast ease-out-premium motion-reduce:transition-none",
        )}
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
