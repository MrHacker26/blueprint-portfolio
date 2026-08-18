import { skills } from "@/content/skills";
import type { CommandEntry } from "@/lib/commands";
import { getProjects } from "@/lib/projects";
import { sectionHref, site } from "@/lib/site";

export function getCommandItems(): CommandEntry[] {
  const navigate: CommandEntry[] = site.sections.map((section) => ({
    id: `section-${section.id}`,
    group: "navigate",
    label: section.label,
    href: sectionHref(section.id),
  }));

  const projects: CommandEntry[] = getProjects().map((project) => ({
    id: `project-${project.slug}`,
    group: "projects",
    label: project.title,
    hint: project.tagline,
    href: `/projects/${project.slug}`,
  }));

  const skillItems: CommandEntry[] = skills.map((skill) => ({
    id: `skill-${skill.name}`,
    group: "skills",
    label: skill.name,
    hint: skill.detail,
    href: sectionHref("skills"),
  }));

  const resume: CommandEntry[] = [
    {
      id: "resume",
      group: "resume",
      label: site.resume.label,
      href: site.resume.href,
      hint: site.resume.available ? undefined : site.resume.pendingLabel,
      disabled: !site.resume.available,
    },
  ];

  return [...navigate, ...projects, ...skillItems, ...resume];
}
