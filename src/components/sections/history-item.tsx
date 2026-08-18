"use client";

import { ChevronDownIcon } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import type { HistoryEntry } from "@/types/content";

type HistoryItemProps = {
  item: HistoryEntry;
};

export function HistoryItem({ item }: HistoryItemProps) {
  const [open, setOpen] = useState(false);
  const detailId = useId();

  return (
    <article className="border-line border-b last:border-b-0">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={detailId}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-start gap-6 py-5 text-left"
      >
        <span className="w-16 shrink-0 font-mono text-sm text-signal">
          {item.year}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-base font-medium text-foreground">
            {item.title}
          </span>
        </span>
        <ChevronDownIcon
          aria-hidden="true"
          className={cn(
            "text-text-faint mt-1 size-4 shrink-0 transition-transform duration-base ease-out-premium motion-reduce:transition-none",
            open && "rotate-180",
          )}
        />
      </button>
      <div
        id={detailId}
        data-open={open}
        className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-base ease-out-premium motion-reduce:transition-none data-[open=true]:grid-rows-[1fr]"
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-5 pl-[5.5rem] text-sm leading-relaxed text-text-muted">
            {item.detail}
          </p>
        </div>
      </div>
    </article>
  );
}
