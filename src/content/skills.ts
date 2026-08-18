import type { Skill } from "@/types/content";

export const MAX_SKILL_LEVEL = 10;

export const skills: Skill[] = [
  {
    name: "TypeScript",
    level: 10,
    detail:
      "Default language for product work — types as design, not ceremony.",
  },
  {
    name: "Next.js",
    level: 9,
    detail:
      "App Router, server-first rendering, and static generation where the page can be a document.",
  },
  {
    name: "Cloudflare",
    level: 8,
    detail:
      "Workers, edge routing, and infrastructure that stays close to the request.",
  },
  {
    name: "React Native",
    level: 7,
    detail:
      "Native-feeling clients with a shared TypeScript core, including bridge work when the OS has to speak.",
  },
  {
    name: "Node / APIs",
    level: 8,
    detail:
      "HTTP boundaries, auth flows, and services that fail loud and recover cleanly.",
  },
  {
    name: "UI engineering",
    level: 8,
    detail:
      "Spacing, hierarchy, and motion with a job — interfaces that feel designed, not decorated.",
  },
];
