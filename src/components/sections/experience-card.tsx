"use client";

import { ChevronDownIcon } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import type { Experience } from "@/types/content";

type ExperienceCardProps = {
  item: Experience;
};

export function ExperienceCard({ item }: ExperienceCardProps) {
  const [open, setOpen] = useState(false);
  const notesId = useId();

  return (
    <article
      className={cn(
        "border-line bg-bg-elevated/60 rounded-lg border shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
        "transition-[transform,border-color] duration-base ease-out-premium motion-safe:hover:-translate-y-1",
        open ? "border-signal/35" : "hover:border-signal/25",
      )}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={notesId}
        onClick={() => setOpen((value) => !value)}
        className="w-full rounded-lg px-5 py-5 text-left sm:px-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] tracking-[0.16em] text-text-faint uppercase">
              {item.start}-{item.end}
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
              {item.company}
            </h3>
            <p className="mt-1 text-sm text-text-muted">{item.role}</p>
          </div>
          <ChevronDownIcon
            aria-hidden="true"
            className={cn(
              "text-text-faint mt-1 size-4 shrink-0 transition-transform duration-base ease-out-premium motion-reduce:transition-none",
              open && "rotate-180",
            )}
          />
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-muted">
          {item.summary}
        </p>
        <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {item.metrics.map((metric) => (
            <div key={metric.label}>
              <dt className="font-mono text-[10px] tracking-[0.14em] text-text-faint uppercase">
                {metric.label}
              </dt>
              <dd className="mt-1 font-mono text-sm text-foreground">
                {metric.value}
              </dd>
            </div>
          ))}
        </dl>
        <ul className="mt-5 flex flex-wrap gap-2">
          {item.stack.map((tech) => (
            <li
              key={tech}
              className="border-line rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-wide text-text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
        <p className="mt-5 font-mono text-[10px] tracking-[0.16em] text-text-faint uppercase">
          {site.a11y.experienceNotes}
        </p>
      </button>
      <div
        id={notesId}
        data-open={open}
        className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-base ease-out-premium motion-reduce:transition-none data-[open=true]:grid-rows-[1fr]"
      >
        <div className="overflow-hidden">
          <ul className="border-line space-y-2 border-t px-5 pt-4 pb-5 sm:px-6">
            {item.notes.map((note) => (
              <li
                key={note}
                className="text-sm leading-relaxed text-text-muted"
              >
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
