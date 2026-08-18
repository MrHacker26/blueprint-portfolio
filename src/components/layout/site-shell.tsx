import type { ReactNode } from "react";
import { BlueprintGrid } from "@/components/animations/blueprint-grid";
import { site } from "@/lib/site";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <>
      <a
        href="#main"
        className="bg-bg-elevated text-signal sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-3 focus:py-2 focus:font-sans focus:text-sm"
      >
        {site.a11y.skipToContent}
      </a>
      <BlueprintGrid />
      <div className="relative z-10 flex min-h-full flex-col">
        <main id="main" className="flex flex-1 flex-col">
          {children}
        </main>
      </div>
    </>
  );
}
