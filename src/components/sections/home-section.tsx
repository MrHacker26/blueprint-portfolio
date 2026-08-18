import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type HomeSectionProps = {
  id: string;
  label: string;
  children?: ReactNode;
};

export function HomeSection({ id, label, children }: HomeSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        "scroll-mt-28 px-6 py-24 sm:px-10 lg:px-16",
        children ? undefined : "min-h-[70svh]",
      )}
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] tracking-[0.22em] text-text-faint uppercase">
          {label}
        </p>
        <h2
          id={`${id}-heading`}
          className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          {label}
        </h2>
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  );
}
