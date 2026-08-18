import type { PlaygroundFlow } from "@/types/content";

export const playground: PlaygroundFlow[] = [
  {
    id: "ocr",
    title: "OCR flow",
    summary: "Capture a label, parse a date, keep the kitchen offline-first.",
    steps: [
      {
        id: "ocr-capture",
        label: "Capture",
        detail: "Frame the label. Bad light and half-cuts are normal input.",
      },
      {
        id: "ocr-read",
        label: "OCR",
        detail: "Read characters on device first. Confidence is not truth.",
      },
      {
        id: "ocr-parse",
        label: "Parse",
        detail: "Turn text into a date, or refuse. Never invent an expiry.",
      },
      {
        id: "ocr-fallback",
        label: "AI fallback",
        detail:
          "Only if OCR is junk. Still fail closed if the model is unsure.",
      },
      {
        id: "ocr-store",
        label: "Local store",
        detail: "Source of truth stays on the phone. Sync is optional.",
      },
    ],
  },
  {
    id: "api",
    title: "API flow",
    summary: "A request should fail loud at the edge, not deep in a handler.",
    steps: [
      {
        id: "api-request",
        label: "Request",
        detail:
          "A typed payload hits the edge. Unknown fields do not sneak in.",
      },
      {
        id: "api-validate",
        label: "Validate",
        detail: "Schema first. Invalid work never reaches the service.",
      },
      {
        id: "api-authz",
        label: "Authorize",
        detail: "Identity and scope on every call, not a hidden flag.",
      },
      {
        id: "api-execute",
        label: "Execute",
        detail: "One job, one timeout. Side effects stay explicit.",
      },
      {
        id: "api-respond",
        label: "Respond",
        detail:
          "Status the client can handle. Errors are part of the contract.",
      },
    ],
  },
  {
    id: "worker",
    title: "Worker execution",
    summary: "An isolate should do one thing and forget it.",
    steps: [
      {
        id: "worker-event",
        label: "Event",
        detail: "HTTP or queue enters the isolate. No leftover request state.",
      },
      {
        id: "worker-start",
        label: "Start",
        detail:
          "Cold start is a cost. Keep the handler small enough to pay it.",
      },
      {
        id: "worker-run",
        label: "Execute",
        detail: "CPU time is the budget. Work that can wait should wait.",
      },
      {
        id: "worker-bind",
        label: "Bindings",
        detail:
          "KV, R2, secrets as declared. Not globals hiding in the module.",
      },
      {
        id: "worker-respond",
        label: "Respond",
        detail: "Return and release. Leaking the isolate is a product bug.",
      },
    ],
  },
  {
    id: "auth",
    title: "Auth flow",
    summary: "A session is a policy, not a query parameter.",
    steps: [
      {
        id: "auth-identity",
        label: "Identity",
        detail: "Who is calling. Anonymous is a choice, not a default leak.",
      },
      {
        id: "auth-challenge",
        label: "Challenge",
        detail: "Prove it. The login page is not the only gate.",
      },
      {
        id: "auth-token",
        label: "Token",
        detail:
          "Short-lived and scoped. Long-lived secrets stay off the client.",
      },
      {
        id: "auth-edge",
        label: "Edge check",
        detail: "Every request. A valid cookie on /login is not enough.",
      },
      {
        id: "auth-expire",
        label: "Expire",
        detail:
          "Policy ends the session. The UI follows, it does not negotiate.",
      },
    ],
  },
];
