import type { PlaygroundNoteId, PlaygroundStepId } from "@/types/content";

export type BenchStepState = "idle" | "ok" | "warn" | "fail" | "skip";

export type BenchTrace = {
  id: PlaygroundStepId;
  state: BenchStepState;
  note: PlaygroundNoteId;
};

export type BenchResult = {
  empty: boolean;
  stored: boolean;
  dateIso: string | null;
  traces: BenchTrace[];
};

const MONTHS: Record<string, number> = {
  jan: 1,
  january: 1,
  feb: 2,
  february: 2,
  mar: 3,
  march: 3,
  apr: 4,
  april: 4,
  may: 5,
  jun: 6,
  june: 6,
  jul: 7,
  july: 7,
  aug: 8,
  august: 8,
  sep: 9,
  sept: 9,
  september: 9,
  oct: 10,
  october: 10,
  nov: 11,
  november: 11,
  dec: 12,
  december: 12,
};

const idleTraces: BenchTrace[] = [
  { id: "capture", state: "idle", note: "idle" },
  { id: "ocr", state: "idle", note: "idle" },
  { id: "parse", state: "idle", note: "idle" },
  { id: "fallback", state: "idle", note: "idle" },
  { id: "store", state: "idle", note: "idle" },
];

function daysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

function toIso(year: number, month: number, day: number) {
  if (month < 1 || month > 12) {
    return null;
  }
  if (day < 1 || day > daysInMonth(year, month)) {
    return null;
  }
  const mm = String(month).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

function expandYear(year: number) {
  if (year >= 100) {
    return year;
  }
  return 2000 + year;
}

function repairOcr(text: string) {
  return text
    .replace(/(?<=\d)[Oo]|[Oo](?=\d)/g, "0")
    .replace(/(?<=\d)[Il]|[Il](?=\d)/g, "1")
    .replace(/\?/g, "");
}

function isLowConfidence(text: string) {
  if (/\?/.test(text)) {
    return true;
  }
  if (/(?:\d[OoIl]|[OoIl]\d)/.test(text)) {
    return true;
  }
  const digits = text.replace(/\D/g, "");
  return digits.length < 2;
}

type ParseHit = {
  iso: string;
  kind: "ok" | "ambiguous" | "none";
};

function parseIso(text: string): string | null {
  const match = text.match(/\b(20\d{2}|19\d{2})-(\d{2})-(\d{2})\b/);
  if (!match) {
    return null;
  }
  return toIso(Number(match[1]), Number(match[2]), Number(match[3]));
}

function parseMonthName(text: string): string | null {
  const match = text.match(
    /\b(\d{1,2})(?:st|nd|rd|th)?\s+([A-Za-z]{3,9})\.?\s+(\d{2}|\d{4})\b/,
  );
  if (!match) {
    return null;
  }
  const month = MONTHS[match[2].toLowerCase()];
  if (!month) {
    return null;
  }
  return toIso(expandYear(Number(match[3])), month, Number(match[1]));
}

function parseNumeric(text: string): ParseHit {
  const match = text.match(/\b(\d{1,2})[/.-](\d{1,2})[/.-](\d{2}|\d{4})\b/);
  if (!match) {
    return { iso: "", kind: "none" };
  }

  const first = Number(match[1]);
  const second = Number(match[2]);
  const year = expandYear(Number(match[3]));

  if (first > 12 && second <= 12) {
    const iso = toIso(year, second, first);
    return iso ? { iso, kind: "ok" } : { iso: "", kind: "none" };
  }
  if (second > 12 && first <= 12) {
    const iso = toIso(year, first, second);
    return iso ? { iso, kind: "ok" } : { iso: "", kind: "none" };
  }
  if (first > 12 && second > 12) {
    return { iso: "", kind: "none" };
  }

  return { iso: "", kind: "ambiguous" };
}

function parseDate(text: string): ParseHit {
  const iso = parseIso(text);
  if (iso) {
    return { iso, kind: "ok" };
  }

  const named = parseMonthName(text);
  if (named) {
    return { iso: named, kind: "ok" };
  }

  return parseNumeric(text);
}

export function parseLabel(raw: string): BenchResult {
  const input = raw.trim();
  if (!input) {
    return {
      empty: true,
      stored: false,
      dateIso: null,
      traces: idleTraces,
    };
  }

  const ocrLow = isLowConfidence(input);
  const first = parseDate(input);
  let hit = first;
  let usedFallback = false;

  if (first.kind !== "ok") {
    usedFallback = true;
    const repaired = parseDate(repairOcr(input));
    if (repaired.kind === "ok") {
      hit = repaired;
    } else if (first.kind === "none") {
      hit = repaired;
    }
  }

  const stored = hit.kind === "ok";
  let parseNote: PlaygroundNoteId = "parseNone";
  if (first.kind === "ok") {
    parseNote = "parseOk";
  } else if (first.kind === "ambiguous") {
    parseNote = "parseAmbiguous";
  }

  const parseState: BenchStepState = first.kind === "ok" ? "ok" : "fail";

  return {
    empty: false,
    stored,
    dateIso: stored ? hit.iso : null,
    traces: [
      { id: "capture", state: "ok", note: "capture" },
      {
        id: "ocr",
        state: ocrLow ? "warn" : "ok",
        note: ocrLow ? "ocrLow" : "ocrHigh",
      },
      { id: "parse", state: parseState, note: parseNote },
      {
        id: "fallback",
        state: usedFallback ? "warn" : "skip",
        note: usedFallback ? "fallbackRun" : "fallbackSkip",
      },
      {
        id: "store",
        state: stored ? "ok" : "fail",
        note: stored ? "storeOk" : "storeRefuse",
      },
    ],
  };
}
