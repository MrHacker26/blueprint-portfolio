export type Metric = {
  label: string;
  value: string;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  start: string;
  end: string;
  metrics: Metric[];
  stack: string[];
  summary: string;
  notes: string[];
};

export type Skill = {
  name: string;
  level: number;
  detail: string;
};

export type HistoryEntry = {
  id: string;
  year: string;
  title: string;
  detail: string;
};

export type PlaygroundStep = {
  id: string;
  label: string;
  detail: string;
};

export type PlaygroundFlow = {
  id: string;
  title: string;
  summary: string;
  steps: PlaygroundStep[];
};

export type ProjectStatus = "shipped" | "in-progress" | "private";

export type ProjectFrontmatter = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  status: ProjectStatus;
  stack: string[];
  role: string;
  heroImage?: string;
};
