import { MAX_SKILL_LEVEL } from "@/content/skills";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import type { Skill } from "@/types/content";

type SkillRowProps = {
  skill: Skill;
};

export function SkillRow({ skill }: SkillRowProps) {
  const ticks = Array.from({ length: MAX_SKILL_LEVEL }, (_, index) => index);

  return (
    <details className="group border-line border-b last:border-b-0">
      <summary
        className="w-full cursor-pointer rounded-sm py-4 text-left"
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
        </div>
      </summary>
      <p className="max-w-2xl pb-4 text-sm leading-relaxed text-text-muted">
        {skill.detail}
      </p>
    </details>
  );
}
