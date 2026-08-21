import type { Experience } from "@/types/content";

export const experience: Experience[] = [
  {
    id: "prodios-labs",
    company: "Prodios Labs",
    role: "Senior Full Stack Engineer",
    start: "2023",
    end: "Present",
    metrics: [
      { label: "Delivery", value: "Production scale" },
      { label: "Surface", value: "Multi-system" },
      { label: "Work", value: "APIs + RAG" },
      { label: "Mode", value: "Constraint-led" },
    ],
    stack: ["TypeScript", "Node", "PostgreSQL", "RAG"],
    summary:
      "One chapter since 2023: public-sector platforms under tight constraints. Compose existing systems, keep data where it already lives, and ship AI only where it can fail closed.",
    notes: [
      "Unified operational windows across several platforms behind identity, not a copied warehouse.",
      "Citizen-facing services at daily production load. Query and index work in Postgres and document stores.",
      "Config-driven forms so a new service did not mean a new frontend.",
      "RAG for status and FAQs. If the retrieve is junk, refuse. Do not invent an answer.",
      "Async notification pipelines and CI for builds. API surfaces with cache, treated as unreliable peers.",
    ],
  },
];
