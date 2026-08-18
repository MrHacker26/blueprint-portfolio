import type { ComponentProps, ReactNode } from "react";
import { CaptureFrame } from "@/components/projects/capture-frame";
import {
  FlowDiagram,
  parseFlowSteps,
} from "@/components/projects/flow-diagram";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

function Heading2({ className, ...props }: ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "scroll-mt-28 mt-12 text-xl font-semibold tracking-tight text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function Heading3({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "scroll-mt-28 mt-8 text-lg font-semibold tracking-tight text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function Paragraph({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "mt-4 text-base leading-relaxed text-text-muted",
        className,
      )}
      {...props}
    />
  );
}

function UnorderedList({ className, ...props }: ComponentProps<"ul">) {
  return (
    <ul
      className={cn(
        "mt-4 list-disc space-y-2 pl-5 text-base text-text-muted",
        className,
      )}
      {...props}
    />
  );
}

function OrderedList({ className, ...props }: ComponentProps<"ol">) {
  return (
    <ol
      className={cn(
        "mt-4 list-decimal space-y-2 pl-5 text-base text-text-muted",
        className,
      )}
      {...props}
    />
  );
}

function ListItem({ className, ...props }: ComponentProps<"li">) {
  return <li className={cn("leading-relaxed", className)} {...props} />;
}

function Anchor({ className, ...props }: ComponentProps<"a">) {
  return (
    <a
      className={cn(
        "text-signal underline-offset-4 hover:underline",
        className,
      )}
      {...props}
    />
  );
}

function InlineCode({ className, ...props }: ComponentProps<"code">) {
  return (
    <code
      className={cn("font-mono text-[0.9em] text-signal", className)}
      {...props}
    />
  );
}

export function Callout({ children }: { children: ReactNode }) {
  return (
    <aside className="border-signal/40 mt-6 border-l-2 pl-4 text-sm leading-relaxed text-text-muted">
      {children}
    </aside>
  );
}

export function Architecture({
  steps,
  children,
}: {
  steps?: string;
  children?: ReactNode;
}) {
  const nodes = parseFlowSteps(steps);

  return (
    <section className="border-line bg-bg-elevated/40 mt-10 rounded-lg border p-5">
      <p className="font-mono text-[10px] tracking-[0.18em] text-text-faint uppercase">
        {site.projects.architectureLabel}
      </p>
      <div className="mt-5">
        {nodes.length > 0 ? (
          <FlowDiagram nodes={nodes} />
        ) : (
          <p className="font-mono text-sm text-text-muted">
            {children ?? site.projects.architecturePending}
          </p>
        )}
      </div>
    </section>
  );
}

export function Gallery({
  count = 3,
  locked = false,
}: {
  count?: number;
  locked?: boolean;
}) {
  if (locked) {
    return (
      <section className="mt-12">
        <p className="font-mono text-[10px] tracking-[0.18em] text-text-faint uppercase">
          {site.projects.galleryLabel}
        </p>
        <CaptureFrame locked className="mt-4 aspect-[21/9] w-full" />
        <p className="mt-3 font-mono text-[11px] tracking-wide text-text-faint">
          {site.projects.privateGallery}
        </p>
      </section>
    );
  }

  const frames = Array.from({ length: count }, (_, index) => index);

  return (
    <section className="mt-12">
      <p className="font-mono text-[10px] tracking-[0.18em] text-text-faint uppercase">
        {site.projects.galleryLabel}
      </p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {frames.map((frame) => (
          <CaptureFrame key={frame} className="aspect-video w-full" />
        ))}
      </div>
    </section>
  );
}

export const mdxComponents = {
  h2: Heading2,
  h3: Heading3,
  p: Paragraph,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  a: Anchor,
  code: InlineCode,
  Callout,
  Architecture,
  Gallery,
};
