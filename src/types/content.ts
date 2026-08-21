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

export type OcrStepId = "capture" | "ocr" | "parse" | "fallback" | "store";

export type OcrNoteId =
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

export type OcrBench = {
  kicker: string;
  title: string;
  summary: string;
  inputLabel: string;
  inputPlaceholder: string;
  samplesLabel: string;
  logLabel: string;
  resultIdle: string;
  resultStored: string;
  resultRefused: string;
  samples: PlaygroundSample[];
  steps: { id: OcrStepId; label: string }[];
  notes: Record<OcrNoteId, string>;
};

export type HapticKind = "light" | "medium" | "heavy" | "unknown" | "queued";

export type HapticHit = {
  id: string;
  label: string;
  kind: HapticKind;
};

export type HapticStepId = "phone" | "webview" | "bridge" | "haptics";

export type HapticNoteId =
  | "idle"
  | "phone"
  | "webview"
  | "bridgeOk"
  | "bridgeUnknown"
  | "bridgeQueued"
  | "hapticsPlay"
  | "hapticsSkip";

export type HapticBench = {
  kicker: string;
  title: string;
  summary: string;
  hitsLabel: string;
  logLabel: string;
  resultIdle: string;
  resultPlayed: string;
  resultSilent: string;
  resultDropped: string;
  hits: HapticHit[];
  steps: { id: HapticStepId; label: string }[];
  notes: Record<HapticNoteId, string>;
};

export type Playground = {
  hint: string;
  ocr: OcrBench;
  haptic: HapticBench;
};

export type ProjectStatus = "shipped" | "in-progress" | "private";

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectFrontmatter = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  status: ProjectStatus;
  stack: string[];
  role: string;
  heroImage?: string;
  heroAlt?: string;
  links?: ProjectLink[];
};
