"use client";

import { MenuIcon, SearchIcon, XIcon } from "lucide-react";
import type { ReactNode } from "react";
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

function indexLabel(index: number) {
  return String(index + 1).padStart(2, "0");
}

function FrameMarks() {
  return (
    <>
      <span
        aria-hidden="true"
        className="border-signal/50 bg-bg absolute -top-px -left-px size-1.5 border"
      />
      <span
        aria-hidden="true"
        className="border-signal/50 bg-bg absolute -top-px -right-px size-1.5 border"
      />
      <span
        aria-hidden="true"
        className="border-signal/50 bg-bg absolute -bottom-px -left-px size-1.5 border"
      />
      <span
        aria-hidden="true"
        className="border-signal/50 bg-bg absolute -right-px -bottom-px size-1.5 border"
      />
    </>
  );
}

function NavFrame({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "border-line bg-bg/70 relative rounded-[2px] border shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md",
        className,
      )}
    >
      <FrameMarks />
      {children}
    </div>
  );
}

export function FloatingNav() {
  const [open, setOpen] = useState(false);
  const activeId = useActiveSection(navIds);
  const progress = useScrollProgress();
  const stage = getBuildStage(progress);

  return (
    <header className="pointer-events-none fixed top-4 right-0 left-0 z-40 px-4 sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl items-start justify-between gap-4">
        <NavFrame className="pointer-events-auto">
          <a href="/" className="block px-3 py-2">
            <p className="font-mono text-[10px] tracking-[0.18em] text-text-faint uppercase">
              {site.chrome.navKicker}
            </p>
            <p className="mt-0.5 font-sans text-sm font-medium tracking-tight text-foreground">
              {site.name}
            </p>
          </a>
        </NavFrame>

        <NavFrame className="pointer-events-auto hidden items-center gap-1 px-1.5 py-1.5 md:flex">
          <nav aria-label={site.a11y.primaryNav} className="flex items-center">
            {navItems.map((item, index) => (
              <NavLink
                key={item.id}
                href={sectionHref(item.id)}
                index={index}
                label={item.label}
                active={activeId === item.id}
              />
            ))}
          </nav>
          <p
            className="border-line hidden border-l px-3 font-mono text-[10px] tracking-[0.16em] text-text-faint uppercase xl:block"
            aria-hidden="true"
          >
            {stage.label}
          </p>
          <CommandTrigger />
        </NavFrame>

        <NavFrame className="pointer-events-auto flex items-center gap-0.5 px-1 py-1 md:hidden">
          <CommandTrigger />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={site.a11y.openMenu}
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              showCloseButton={false}
              className="bg-bg-elevated border-line w-[min(100%,20rem)] gap-0 overflow-visible p-0"
            >
              <span
                aria-hidden="true"
                className="border-signal/50 bg-bg absolute top-3 left-3 z-10 size-1.5 border"
              />
              <span
                aria-hidden="true"
                className="border-signal/50 bg-bg absolute top-3 right-3 z-10 size-1.5 border"
              />
              <span
                aria-hidden="true"
                className="border-signal/50 bg-bg absolute bottom-3 left-3 z-10 size-1.5 border"
              />
              <span
                aria-hidden="true"
                className="border-signal/50 bg-bg absolute right-3 bottom-3 z-10 size-1.5 border"
              />
              <SheetHeader className="border-line flex-row items-center justify-between border-b px-5 py-4">
                <SheetTitle className="font-mono text-[10px] font-normal tracking-[0.18em] text-text-faint uppercase">
                  {site.chrome.navKicker}
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
                {navItems.map((item, index) => (
                  <NavLink
                    key={item.id}
                    href={sectionHref(item.id)}
                    index={index}
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
        </NavFrame>
      </div>
    </header>
  );
}

function CommandTrigger() {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      className="text-text-faint hover:text-foreground sm:w-auto sm:px-2"
      aria-label={site.a11y.openCommand}
      aria-keyshortcuts="Meta+K Control+K"
      onClick={() => {
        window.dispatchEvent(new Event(OPEN_COMMAND_EVENT));
      }}
    >
      <SearchIcon className="sm:hidden" />
      <kbd className="hidden font-mono text-[10px] font-normal tracking-widest sm:inline">
        {site.command.hotkey}
      </kbd>
    </Button>
  );
}

type NavLinkProps = {
  href: string;
  index: number;
  label: string;
  active: boolean;
  stacked?: boolean;
  onClick?: () => void;
};

function NavLink({
  href,
  index,
  label,
  active,
  stacked,
  onClick,
}: NavLinkProps) {
  return (
    <a
      href={href}
      aria-current={active ? "location" : undefined}
      onClick={onClick}
      className={cn(
        "relative flex items-baseline gap-2 transition-colors duration-base ease-out-premium",
        stacked ? "rounded-md px-3 py-3" : "px-2.5 py-1.5",
        active ? "text-foreground" : "text-text-muted hover:text-foreground",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "font-mono text-[10px] tracking-[0.14em]",
          active ? "text-signal" : "text-text-faint",
        )}
      >
        {indexLabel(index)}
      </span>
      <span className="text-[13px] tracking-tight">{label}</span>
      {stacked ? (
        <span
          aria-hidden="true"
          className={cn(
            "bg-signal absolute top-1/2 left-0 h-3 w-px -translate-y-1/2 transition-opacity duration-base ease-out-premium",
            active ? "opacity-100" : "opacity-0",
          )}
        />
      ) : null}
    </a>
  );
}
