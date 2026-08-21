"use client";

import { ChevronDownIcon } from "lucide-react";
import { useId, useState } from "react";
import { MAX_SKILL_LEVEL } from "@/content/skills";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import type { Skill } from "@/types/content";

type SkillRowProps = {
  skill: Skill;
};

export function SkillRow({ skill }: SkillRowProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const ticks = Array.from({ length: MAX_SKILL_LEVEL }, (_, index) => index);

  return (
    <div className="border-line border-b last:border-b-0">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
        className="w-full cursor-pointer rounded-[2px] py-4 text-left"
        aria-label={`${skill.name}, ${site.a11y.skillLevel} ${skill.level} / ${MAX_SKILL_LEVEL}`}
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
          <ChevronDownIcon
            aria-hidden="true"
            className={cn(
              "text-text-faint size-4 shrink-0 transition-transform duration-slow ease-out-premium motion-reduce:transition-none",
              open && "rotate-180",
            )}
          />
        </div>
      </button>
      <section
        id={panelId}
        inert={!open}
        className={cn(
          "grid transition-[grid-template-rows] duration-slow ease-out-premium motion-reduce:transition-none",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <p
            className={cn(
              "max-w-2xl pb-4 text-sm leading-relaxed text-text-muted transition-opacity duration-slow ease-out-premium motion-reduce:transition-none",
              open ? "opacity-100" : "opacity-0",
            )}
          >
            {skill.detail}
          </p>
        </div>
      </section>
    </div>
  );
}
