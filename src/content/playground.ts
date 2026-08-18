import type { HapticBench, OcrBench, Playground } from "@/types/content";

const ocr: OcrBench = {
  kicker: "refridz.bench",
  title: "OCR bench",
  summary:
    "Capture a label, parse a date, keep the kitchen honest. If the read is junk, refuse. Never invent an expiry.",
  inputLabel: "Label",
  inputPlaceholder: "EXP 12 APR 2026",
  samplesLabel: "Samples",
  logLabel: "Trace",
  resultIdle: "Waiting for a label.",
  resultStored: "Stored {date}",
  resultRefused: "Refused. No date written.",
  samples: [
    { id: "clean", label: "Clean", value: "EXP 12 APR 2026" },
    { id: "iso", label: "ISO", value: "PACKED 2026-04-12" },
    { id: "unambiguous", label: "Day 31", value: "USE BY 31/12/2026" },
    { id: "ambiguous", label: "Ambiguous", value: "BEST BY 04/12/26" },
    { id: "ocr-glitch", label: "OCR glitch", value: "EXP 12 APR 2O26" },
    { id: "junk", label: "Junk light", value: "MILK 2% LOT#A19 KEEP COLD" },
  ],
  steps: [
    { id: "capture", label: "Capture" },
    { id: "ocr", label: "OCR" },
    { id: "parse", label: "Parse" },
    { id: "fallback", label: "AI fallback" },
    { id: "store", label: "Local store" },
  ],
  notes: {
    idle: "Idle.",
    capture: "Frame locked. Bad light is still input.",
    ocrHigh: "On-device read. Confidence is not truth.",
    ocrLow: "Junk characters. Handing off.",
    parseOk: "Turned text into a date.",
    parseNone: "No date in the read.",
    parseAmbiguous: "Two valid months. Will not guess.",
    fallbackSkip: "Skipped. The on-device read was enough.",
    fallbackRun: "Fallback ran. It still has to parse, not invent.",
    storeOk: "Wrote to local store.",
    storeRefuse: "Stopped. Ask the human.",
  },
};

const haptic: HapticBench = {
  kicker: "rumblex.bench",
  title: "Haptic bridge",
  summary:
    "The web view owns the stream. Native code owns the hands. Unknown patterns fail silent. A queued rumble is a late rumble, so the backlog dies.",
  hitsLabel: "Hits",
  logLabel: "Trace",
  resultIdle: "Waiting for a hit.",
  resultPlayed: "Played {kind} · intensity {intensity}",
  resultSilent: "Silent. Unknown pattern dropped.",
  resultDropped: "Played last hit. Dropped {count} queued.",
  hits: [
    { id: "light", label: "Light", kind: "light" },
    { id: "medium", label: "Medium", kind: "medium" },
    { id: "heavy", label: "Heavy", kind: "heavy" },
    { id: "unknown", label: "Unknown", kind: "unknown" },
    { id: "queued", label: "Queued", kind: "queued" },
  ],
  steps: [
    { id: "phone", label: "iPhone" },
    { id: "webview", label: "WKWebView" },
    { id: "bridge", label: "JS Bridge" },
    { id: "haptics", label: "Core Haptics" },
  ],
  notes: {
    idle: "Idle.",
    phone: "Touch owned by the shell.",
    webview: "Stream keeps running. This is not the game loop.",
    bridgeOk: "Typed event. kind, intensity, sharpness.",
    bridgeUnknown: "Unknown pattern. Fail silent.",
    bridgeQueued: "Queue would arrive after the punch. Dropped.",
    hapticsPlay: "Pattern played. Round-trip never left the device.",
    hapticsSkip: "No buzz. The hand already moved on.",
  },
};

export const playground: Playground = {
  hint: "Two live benches. Fail closed on dates. Fail silent on unknown rumble.",
  ocr,
  haptic,
};
