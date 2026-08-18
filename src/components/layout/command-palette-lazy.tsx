"use client";

import dynamic from "next/dynamic";

export const CommandPaletteLazy = dynamic(
  () =>
    import("@/components/layout/command-palette").then(
      (mod) => mod.CommandPalette,
    ),
  { ssr: false },
);
