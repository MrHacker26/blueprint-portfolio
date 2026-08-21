import type { ComponentProps } from "react";
import { FrameMarks } from "@/components/ui/frame-marks";
import { cn } from "@/lib/cn";

const frameCtaClass =
  "relative inline-flex items-center justify-center gap-2 rounded-[2px] border border-line bg-bg/70 px-4 py-2.5 text-sm tracking-tight text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-[border-color,color,transform] duration-base ease-out-premium hover:border-signal/45 motion-safe:hover:-translate-y-px focus-visible:border-signal focus-visible:ring-3 focus-visible:ring-signal/50 focus-visible:outline-none";

export function FrameCta({
  className,
  children,
  ...props
}: ComponentProps<"a">) {
  return (
    <a className={cn(frameCtaClass, className)} {...props}>
      <FrameMarks />
      {children}
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
    <button type={type} className={cn(frameCtaClass, className)} {...props}>
      <FrameMarks />
      {children}
    </button>
  );
}
