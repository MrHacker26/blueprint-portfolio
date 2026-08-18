import { CommandPaletteGate } from "@/components/layout/command-palette-gate";
import { getCommandItems } from "@/lib/command-items";

export function CommandPaletteHost() {
  const items = getCommandItems();
  return <CommandPaletteGate items={items} />;
}
