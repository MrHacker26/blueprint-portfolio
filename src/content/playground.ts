import type { Playground } from "@/types/content";

export const playground: Playground = {
  kicker: "refridz.bench",
  title: "OCR bench",
  summary:
    "Capture a label, parse a date, keep the kitchen honest. If the read is junk, refuse. Never invent an expiry.",
  hint: "Type a label or pick a sample. The pipeline should fail closed.",
  inputLabel: "Label",
  inputPlaceholder: "EXP 12 APR 2026",
  samplesLabel: "Samples",
  logLabel: "Trace",
  resultIdle: "Waiting for a label.",
  resultStored: "Stored {date}",
  resultRefused: "Refused. No date written.",
  samples: [
    {
      id: "clean",
      label: "Clean",
      value: "EXP 12 APR 2026",
    },
    {
      id: "iso",
      label: "ISO",
      value: "PACKED 2026-04-12",
    },
    {
      id: "unambiguous",
      label: "Day 31",
      value: "USE BY 31/12/2026",
    },
    {
      id: "ambiguous",
      label: "Ambiguous",
      value: "BEST BY 04/12/26",
    },
    {
      id: "ocr-glitch",
      label: "OCR glitch",
      value: "EXP 12 APR 2O26",
    },
    {
      id: "junk",
      label: "Junk light",
      value: "MILK 2% LOT#A19 KEEP COLD",
    },
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
