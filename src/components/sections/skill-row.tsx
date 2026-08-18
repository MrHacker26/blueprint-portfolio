"use client";

import { useState } from "react";
import { MAX_SKILL_LEVEL } from "@/content/skills";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import type { Skill } from "@/types/content";

type SkillRowProps = {
  skill: Skill;
};

export function SkillRow({ skill }: SkillRowProps) {
  const [open, setOpen] = useState(false);
  const ticks = Array.from({ length: MAX_SKILL_LEVEL }, (_, index) => index);

  return (
    <div
      className="group border-line border-b last:border-b-0"
      data-open={open}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-label={`${skill.name}, ${site.a11y.skillLevel} ${skill.level} / ${MAX_SKILL_LEVEL}`}
        onClick={() => setOpen((value) => !value)}
        className="w-full rounded-sm py-4 text-left"
      >
        <div className="flex items-center gap-4">
          <span className="w-32 shrink-0 text-sm font-medium text-foreground sm:w-40">
            {skill.name}
          </span>
          <div className="flex min-w-0 flex-1 gap-0.5" aria-hidden="true">
            {ticks.map((tick) => (
              <span
                key={tick}
                className={cn(
                  "h-1.5 flex-1 rounded-[1px]",
                  tick < skill.level ? "bg-signal" : "bg-line",
                )}
              />
            ))}
          </div>
          <span className="hidden font-mono text-[11px] text-text-faint sm:inline">
            {skill.level}/{MAX_SKILL_LEVEL}
          </span>
        </div>
        <div
          data-open={open}
          className={cn(
            "grid transition-[grid-template-rows] duration-base ease-out-premium motion-reduce:transition-none",
            "grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] data-[open=true]:grid-rows-[1fr]",
          )}
        >
          <p className="overflow-hidden">
            <span className="mt-3 block max-w-2xl text-sm leading-relaxed text-text-muted">
              {skill.detail}
            </span>
          </p>
        </div>
      </button>
    </div>
  );
}
