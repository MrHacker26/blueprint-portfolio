"use client";

import { useRouter } from "next/navigation";
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
import { type CommandEntry, commandGroups } from "@/lib/commands";
import { site } from "@/lib/site";

type CommandPaletteProps = {
  items: CommandEntry[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CommandPalette({
  items,
  open,
  onOpenChange,
}: CommandPaletteProps) {
  const router = useRouter();

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
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
                      onOpenChange(false);
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
