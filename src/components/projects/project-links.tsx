import { GlobeIcon, PackageIcon, SmartphoneIcon } from "lucide-react";
import type { ComponentType } from "react";
import { GitHubIcon } from "@/components/icons/social";
import { site } from "@/lib/site";
import type { ProjectLink } from "@/types/content";

type ProjectLinksProps = {
  links: ProjectLink[];
  showKicker?: boolean;
  className?: string;
};

type IconProps = {
  className?: string;
};

function iconForHref(href: string): ComponentType<IconProps> {
  try {
    const host = new URL(href).hostname;
    if (host.includes("github")) {
      return GitHubIcon;
    }
    if (host.includes("npmjs")) {
      return PackageIcon;
    }
    if (host.includes("play.google")) {
      return SmartphoneIcon;
    }
  } catch {
    return GlobeIcon;
  }

  return GlobeIcon;
}

export function ProjectLinks({
  links,
  showKicker = false,
  className,
}: ProjectLinksProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <ul
      className={
        className ??
        "flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] tracking-[0.14em] uppercase"
      }
    >
      {showKicker ? (
        <li className="text-text-faint">{site.projects.sourceLabel}</li>
      ) : null}
      {links.map((link) => {
        const Icon = iconForHref(link.href);

        return (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-signal inline-flex items-center gap-1.5 hover:underline"
              rel="noreferrer"
              target="_blank"
            >
              <Icon aria-hidden="true" className="size-3.5 shrink-0" />
              {link.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
