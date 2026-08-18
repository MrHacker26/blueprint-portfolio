import { site } from "@/lib/site";

export const OPEN_COMMAND_EVENT = "blueprint:open-command";

export type CommandGroupId = keyof typeof site.command.groups;

export type CommandEntry = {
  id: string;
  group: CommandGroupId;
  label: string;
  href: string;
  hint?: string;
  disabled?: boolean;
};

export const commandGroups = Object.keys(
  site.command.groups,
) as CommandGroupId[];
