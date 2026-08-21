"use client";

import { type ReactNode, useState } from "react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/social";
import { FrameButton } from "@/components/ui/frame-cta";
import { FrameMarks } from "@/components/ui/frame-marks";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

type CopyStatus = "idle" | "copied" | "failed";

export function ContactCard() {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const email = site.email;
  const statusMessage =
    status === "copied"
      ? site.contact.copied
      : status === "failed"
        ? site.contact.copyFailed
        : "";

  async function copyEmail() {
    if (!email) {
      return;
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
        setStatus("copied");
      } else {
        throw new Error("clipboard unavailable");
      }
    } catch {
      setStatus("failed");
    }

    window.setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <div className="border-line bg-bg/70 relative max-w-2xl rounded-[2px] border p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md sm:p-8">
      <FrameMarks />
      <p className="font-mono text-[11px] tracking-[0.18em] text-text-faint uppercase">
        {site.location}
      </p>
      <p className="mt-4 max-w-lg text-base leading-relaxed text-text-muted">
        {site.contact.intro}
      </p>
      {email ? (
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${email}`}
            className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
          >
            {email}
          </a>
          <FrameButton
            className="px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] uppercase"
            aria-label={site.a11y.copyEmail}
            onClick={() => {
              void copyEmail();
            }}
          >
            {site.contact.copy}
          </FrameButton>
        </div>
      ) : (
        <p className="mt-8 font-mono text-sm tracking-wide text-text-faint uppercase">
          {site.contact.email}
          <span aria-hidden="true"> · </span>
          {site.contact.pending}
        </p>
      )}
      <ul className="mt-8 flex flex-wrap gap-2">
        <li>
          <ContactChip
            icon={<GitHubIcon className="size-4" />}
            label={site.contact.github}
            href={site.socials.github}
            external
          />
        </li>
        <li>
          <ContactChip
            icon={<LinkedInIcon className="size-4" />}
            label={site.contact.linkedin}
            href={site.socials.linkedin}
            external
          />
        </li>
      </ul>
      <p
        aria-live="polite"
        className="mt-4 min-h-5 font-mono text-[11px] text-signal"
      >
        {statusMessage}
      </p>
    </div>
  );
}

type ContactChipProps = {
  icon: ReactNode;
  label: string;
  href: string | null;
  external?: boolean;
};

function ContactChip({ icon, label, href, external }: ContactChipProps) {
  const className = cn(
    "inline-flex items-center gap-2 rounded-[2px] border px-3 py-2 text-sm",
    href
      ? "border-line text-foreground hover:border-signal/40"
      : "border-line text-text-faint",
  );

  if (!href) {
    return (
      <span className={className}>
        {icon}
        {label}
        <span className="font-mono text-[10px] tracking-[0.12em] uppercase">
          {site.contact.pending}
        </span>
      </span>
    );
  }

  return (
    <a
      href={href}
      className={className}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
    >
      {icon}
      {label}
    </a>
  );
}
