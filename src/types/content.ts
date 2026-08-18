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

export type PlaygroundSample = {
  id: string;
  label: string;
  value: string;
};

export type PlaygroundStepId =
  | "capture"
  | "ocr"
  | "parse"
  | "fallback"
  | "store";

export type PlaygroundStep = {
  id: PlaygroundStepId;
  label: string;
};

export type PlaygroundNoteId =
  | "idle"
  | "capture"
  | "ocrHigh"
  | "ocrLow"
  | "parseOk"
  | "parseNone"
  | "parseAmbiguous"
  | "fallbackSkip"
  | "fallbackRun"
  | "storeOk"
  | "storeRefuse";

export type Playground = {
  kicker: string;
  title: string;
  summary: string;
  hint: string;
  inputLabel: string;
  inputPlaceholder: string;
  samplesLabel: string;
  logLabel: string;
  resultIdle: string;
  resultStored: string;
  resultRefused: string;
  samples: PlaygroundSample[];
  steps: PlaygroundStep[];
  notes: Record<PlaygroundNoteId, string>;
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
