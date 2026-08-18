import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import type { HistoryEntry } from "@/types/content";

type HistoryItemProps = {
  item: HistoryEntry;
};

export function HistoryItem({ item }: HistoryItemProps) {
  return (
    <article className="border-line border-b last:border-b-0">
      <details className="group">
        <summary className="flex w-full cursor-pointer items-start gap-6 py-5 text-left">
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
              "group-open:rotate-180",
            )}
          />
        </summary>
        <p className="max-w-2xl pb-5 pl-[5.5rem] text-sm leading-relaxed text-text-muted">
          {item.detail}
        </p>
      </details>
    </article>
  );
}
