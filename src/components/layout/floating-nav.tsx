"use client";

import { MenuIcon, SearchIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useActiveSection } from "@/hooks/use-active-section";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { cn } from "@/lib/cn";
import { OPEN_COMMAND_EVENT } from "@/lib/commands";
import { getBuildStage, navIds, navItems, sectionHref, site } from "@/lib/site";

export function FloatingNav() {
  const [open, setOpen] = useState(false);
  const activeId = useActiveSection(navIds);
  const progress = useScrollProgress();
  const stage = getBuildStage(progress);

  return (
    <header className="pointer-events-none fixed top-4 right-0 left-0 z-40 flex justify-center px-4">
      <div className="border-line bg-bg/70 pointer-events-auto flex h-12 w-full max-w-5xl items-center gap-3 rounded-full border px-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md sm:px-4">
        <a
          href="/"
          className="shrink-0 truncate font-sans text-sm font-medium tracking-tight text-foreground"
        >
          {site.name}
        </a>

        <nav
          aria-label={site.a11y.primaryNav}
          className="hidden flex-1 items-center justify-center gap-1 md:flex"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              href={sectionHref(item.id)}
              label={item.label}
              active={activeId === item.id}
            />
          ))}
        </nav>

        <p
          className="hidden font-mono text-[10px] tracking-[0.16em] text-text-faint uppercase md:block"
          aria-hidden="true"
        >
          {stage.label}
        </p>

        <div className="ml-auto flex items-center gap-0.5 md:ml-0">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="text-text-faint hover:text-foreground sm:w-auto sm:px-2"
            aria-label={site.a11y.openCommand}
            onClick={() => {
              window.dispatchEvent(new Event(OPEN_COMMAND_EVENT));
            }}
          >
            <SearchIcon className="sm:hidden" />
            <kbd className="hidden font-mono text-[10px] font-normal tracking-widest sm:inline">
              {site.command.hotkey}
            </kbd>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="md:hidden"
                aria-label={site.a11y.openMenu}
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              showCloseButton={false}
              className="bg-bg-elevated border-line w-[min(100%,20rem)] gap-0 p-0"
            >
              <SheetHeader className="border-line flex-row items-center justify-between border-b px-5 py-4">
                <SheetTitle className="font-sans text-sm font-medium">
                  {site.a11y.menuTitle}
                </SheetTitle>
                <SheetClose asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label={site.a11y.closeMenu}
                  >
                    <XIcon />
                  </Button>
                </SheetClose>
              </SheetHeader>
              <nav
                aria-label={site.a11y.primaryNav}
                className="flex flex-col gap-1 px-3 py-4"
              >
                {navItems.map((item) => (
                  <NavLink
                    key={item.id}
                    href={sectionHref(item.id)}
                    label={item.label}
                    active={activeId === item.id}
                    stacked
                    onClick={() => setOpen(false)}
                  />
                ))}
              </nav>
              <p className="mt-auto px-5 pb-6 font-mono text-[10px] tracking-[0.16em] text-text-faint uppercase">
                {stage.label}
              </p>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

type NavLinkProps = {
  href: string;
  label: string;
  active: boolean;
  stacked?: boolean;
  onClick?: () => void;
};

function NavLink({ href, label, active, stacked, onClick }: NavLinkProps) {
  return (
    <a
      href={href}
      aria-current={active ? "location" : undefined}
      onClick={onClick}
      className={cn(
        "relative text-sm transition-colors duration-base ease-out-premium",
        stacked ? "rounded-md px-3 py-3 text-left" : "px-2.5 py-1",
        active ? "text-foreground" : "text-text-muted hover:text-foreground",
      )}
    >
      {label}
      <span
        aria-hidden="true"
        className={cn(
          "bg-signal absolute h-px transition-opacity duration-base ease-out-premium",
          stacked
            ? "top-1/2 left-0 w-px -translate-y-1/2"
            : "inset-x-2.5 -bottom-0.5",
          active ? "opacity-100" : "opacity-0",
        )}
      />
    </a>
  );
}
