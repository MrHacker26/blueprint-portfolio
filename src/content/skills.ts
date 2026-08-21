import type { Skill } from "@/types/content";

export const MAX_SKILL_LEVEL = 10;

export const skills: Skill[] = [
  {
    name: "TypeScript",
    level: 10,
    detail: "Default language for product work. Types as design, not ceremony.",
  },
  {
    name: "Node / APIs",
    level: 9,
    detail:
      "HTTP boundaries, Postgres and Redis, job queues, and services that fail loud and recover cleanly.",
  },
  {
    name: "Next.js",
    level: 8,
    detail:
      "App Router, server-first rendering, and static generation where the page can be a document.",
  },
  {
    name: "AI / RAG",
    level: 8,
    detail:
      "Retrieval pipelines and vector search. If the retrieve is junk, refuse. Do not invent an answer.",
  },
  {
    name: "React Native",
    level: 7,
    detail:
      "Native-feeling clients with a shared TypeScript core, including bridge work when the OS has to speak.",
  },
  {
    name: "UI engineering",
    level: 8,
    detail:
      "Spacing, hierarchy, and motion with a job. Interfaces that feel designed, not decorated.",
  },
];
