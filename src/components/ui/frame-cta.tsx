import { ChevronRightIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { FrameMarks } from "@/components/ui/frame-marks";
import { cn } from "@/lib/cn";

const frameCtaClass =
  "relative inline-flex items-center justify-center rounded-[2px] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-[border-color,color,transform,background-color] duration-base ease-out-premium motion-safe:hover:-translate-y-px focus-visible:border-signal focus-visible:ring-3 focus-visible:ring-signal/50 focus-visible:outline-none";

const frameCtaPrimaryClass =
  "gap-3 border border-signal/40 bg-signal-dim px-4 py-2.5 text-sm tracking-tight text-foreground hover:border-signal";

const frameCtaQuietClass =
  "gap-2 border border-line bg-bg/70 px-4 py-2.5 text-sm tracking-tight text-foreground hover:border-signal/45";

export function FrameCta({
  className,
  children,
  ...props
}: ComponentProps<"a">) {
  return (
    <a
      className={cn(frameCtaClass, frameCtaPrimaryClass, className)}
      {...props}
    >
      <FrameMarks />
      {children}
      <ChevronRightIcon aria-hidden="true" className="text-signal size-3.5" />
    </a>
  );
}

export function FrameButton({
  className,
  children,
  type = "button",
  ...props
}: ComponentProps<"button">) {
  return (
    <button
      type={type}
      className={cn(frameCtaClass, frameCtaQuietClass, className)}
      {...props}
    >
      <FrameMarks />
      {children}
    </button>
  );
}
