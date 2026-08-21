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
      overlayClassName="bg-bg/80 backdrop-blur-md"
      className="border-line bg-bg-elevated top-[18%] overflow-hidden rounded-[2px] p-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ring-0 sm:max-w-xl"
    >
      <div className="relative">
        <span
          aria-hidden="true"
          className="border-signal/50 bg-bg absolute top-2 left-2 z-10 size-1.5 border"
        />
        <span
          aria-hidden="true"
          className="border-signal/50 bg-bg absolute top-2 right-2 z-10 size-1.5 border"
        />
        <span
          aria-hidden="true"
          className="border-signal/50 bg-bg absolute bottom-2 left-2 z-10 size-1.5 border"
        />
        <span
          aria-hidden="true"
          className="border-signal/50 bg-bg absolute right-2 bottom-2 z-10 size-1.5 border"
        />

        <div className="border-line flex items-center justify-between border-b px-4 py-2.5">
          <p className="font-mono text-[10px] tracking-[0.18em] text-text-faint uppercase">
            {site.command.kicker}
          </p>
          <kbd className="font-mono text-[10px] tracking-widest text-text-faint">
            {site.command.hotkey}
          </kbd>
        </div>

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
                        <CommandShortcut>{item.hint}</CommandShortcut>
                      ) : null}
                    </CommandItem>
                  ))}
                </CommandGroup>
              );
            })}
          </CommandList>
        </Command>

        <div className="border-line flex items-center justify-end gap-3 border-t px-4 py-2">
          <p className="font-mono text-[10px] tracking-widest text-text-faint">
            <kbd>{site.command.footerEsc}</kbd>
          </p>
        </div>
      </div>
    </CommandDialog>
  );
}
