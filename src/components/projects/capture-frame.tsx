import type { ReactNode } from "react";
import { FrameMarks } from "@/components/ui/frame-marks";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

type CaptureFrameProps = {
  locked?: boolean;
  className?: string;
  caption?: string;
};

export function CaptureFrame({
  locked = false,
  className,
  caption,
}: CaptureFrameProps) {
  const label =
    caption ??
    (locked ? site.projects.privateCapture : site.projects.capturePending);

  return (
    <figure
      className={cn(
        "border-line bg-bg-elevated/40 relative flex items-center justify-center overflow-hidden rounded-[2px] border",
        locked ? "border-dashed" : undefined,
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="border-signal/50 bg-bg absolute top-2 left-2 size-1.5 border"
      />
      <span
        aria-hidden="true"
        className="border-signal/50 bg-bg absolute top-2 right-2 size-1.5 border"
      />
      <span
        aria-hidden="true"
        className="border-signal/50 bg-bg absolute bottom-2 left-2 size-1.5 border"
      />
      <span
        aria-hidden="true"
        className="border-signal/50 bg-bg absolute right-2 bottom-2 size-1.5 border"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-3 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--grid) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid) 1px, transparent 1px)
          `,
          backgroundSize: "16px 16px",
        }}
      />
      <figcaption className="relative px-4 text-center font-mono text-[11px] tracking-[0.16em] text-text-faint uppercase">
        {label}
      </figcaption>
    </figure>
  );
}

export function PrivateRecord({ children }: { children?: ReactNode }) {
  return (
    <aside className="border-line relative mt-6 rounded-[2px] border border-dashed px-5 py-5">
      <FrameMarks />
      <p className="font-mono text-[10px] tracking-[0.2em] text-text-faint uppercase">
        {site.projectStatus.private}
      </p>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-text-muted">
        {children ?? site.projects.privateNote}
      </p>
    </aside>
  );
}
