"use client";

import { type ReactNode, useState } from "react";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/icons/social";
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
    <div className="border-line bg-bg/70 relative max-w-xl rounded-[2px] border p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md sm:p-8">
      <FrameMarks />
      <p className="font-mono text-[11px] tracking-[0.18em] text-text-faint uppercase">
        {site.location}
      </p>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
        {site.name}
      </p>
      <p className="mt-1 text-sm text-text-muted">{site.role}</p>
      <ul className="mt-8 flex flex-col gap-3">
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
        <li className="flex flex-wrap items-center gap-2">
          <ContactChip
            icon={<MailIcon className="size-4" />}
            label={email ?? site.contact.email}
            href={email ? `mailto:${email}` : null}
          />
          {email ? (
            <FrameButton
              className="px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] uppercase"
              aria-label={site.a11y.copyEmail}
              onClick={() => {
                void copyEmail();
              }}
            >
              {site.contact.copy}
            </FrameButton>
          ) : null}
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
