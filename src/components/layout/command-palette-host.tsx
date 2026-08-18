import { CommandPaletteLazy } from "@/components/layout/command-palette-lazy";
import { getCommandItems } from "@/lib/command-items";

export function CommandPaletteHost() {
  const items = getCommandItems();
  return <CommandPaletteLazy items={items} />;
}
