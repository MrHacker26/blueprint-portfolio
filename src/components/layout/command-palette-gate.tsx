"use client";

import { useEffect, useState } from "react";
import { CommandPaletteLazy } from "@/components/layout/command-palette-lazy";
import { type CommandEntry, OPEN_COMMAND_EVENT } from "@/lib/commands";

type CommandPaletteGateProps = {
  items: CommandEntry[];
};

export function CommandPaletteGate({ items }: CommandPaletteGateProps) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setLoaded(true);
        setOpen((value) => !value);
      }
    }

    function onOpen() {
      setLoaded(true);
      setOpen(true);
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(OPEN_COMMAND_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(OPEN_COMMAND_EVENT, onOpen);
    };
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <CommandPaletteLazy items={items} open={open} onOpenChange={setOpen} />
  );
}
