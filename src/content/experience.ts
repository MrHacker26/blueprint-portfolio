import type { Experience } from "@/types/content";

export const experience: Experience[] = [
  {
    id: "government-systems",
    company: "Government Systems",
    role: "Senior Full Stack Engineer",
    start: "2024",
    end: "2025",
    metrics: [
      { label: "Delivery", value: "Production scale" },
      { label: "Surface", value: "Multi-system" },
      { label: "Boundary", value: "Strict isolation" },
      { label: "Mode", value: "Constraint-led" },
    ],
    stack: ["TypeScript", "Next.js", "Cloudflare"],
    summary:
      "Large-system work under tight constraints: architecture first, explicit data boundaries, and delivery at production scale.",
    notes: [
      "Constraints shaped the architecture more than feature lists.",
      "Integrations crossed systems without sharing confidential internals.",
      "Scale meant availability, auditability, and clear ownership. Not dashboards of secrets.",
    ],
  },
  {
    id: "startup",
    company: "Startup",
    role: "Full Stack Engineer",
    start: "2023",
    end: "2024",
    metrics: [
      { label: "Output", value: "Shipped surfaces" },
      { label: "Scope", value: "Web + API" },
      { label: "Tempo", value: "Product speed" },
      { label: "Input", value: "Incomplete specs" },
    ],
    stack: ["TypeScript", "React Native", "Node"],
    summary:
      "Product-speed chapter: shipping interfaces and APIs while the spec was still moving.",
    notes: [
      "Owned vertical slices across client and API instead of waiting on perfect requirements.",
      "Traded polish for learning speed, then tightened the surfaces that survived contact with users.",
    ],
  },
];
