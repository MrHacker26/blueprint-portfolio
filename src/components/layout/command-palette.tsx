"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import {
  type CommandEntry,
  commandGroups,
  OPEN_COMMAND_EVENT,
} from "@/lib/commands";
import { site } from "@/lib/site";

type CommandPaletteProps = {
  items: CommandEntry[];
};

export function CommandPalette({ items }: CommandPaletteProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    }

    function onOpen() {
      setOpen(true);
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(OPEN_COMMAND_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(OPEN_COMMAND_EVENT, onOpen);
    };
  }, []);

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title={site.a11y.commandPalette}
      description={site.command.placeholder}
      className="border-line bg-bg-elevated sm:max-w-lg"
    >
      <Command>
        <CommandInput placeholder={site.command.placeholder} />
        <CommandList>
          <CommandEmpty>{site.command.empty}</CommandEmpty>
          {commandGroups.map((group) => {
            const groupItems = items.filter((item) => item.group === group);
            if (groupItems.length === 0) {
              return null;
            }

            return (
              <CommandGroup key={group} heading={site.command.groups[group]}>
                {groupItems.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={`${item.label} ${item.hint ?? ""}`}
                    disabled={item.disabled}
                    onSelect={() => {
                      if (item.disabled) {
                        return;
                      }
                      setOpen(false);
                      router.push(item.href);
                    }}
                  >
                    <span className="truncate">{item.label}</span>
                    {item.hint ? (
                      <CommandShortcut className="max-w-[12rem] truncate font-mono text-[10px] tracking-normal normal-case">
                        {item.hint}
                      </CommandShortcut>
                    ) : null}
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
