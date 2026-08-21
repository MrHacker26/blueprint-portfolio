import { FrameMarks } from "@/components/ui/frame-marks";
import type { BenchStepState } from "@/lib/bench";
import { cn } from "@/lib/cn";

export type PipelineTraceItem = {
  id: string;
  state: BenchStepState;
  note: string;
};

type PipelineTraceProps = {
  logLabel: string;
  traces: PipelineTraceItem[];
  steps: { id: string; label: string }[];
  notes: Record<string, string>;
  result: string;
  tone: "idle" | "ok" | "warn";
};

export function PipelineTrace({
  logLabel,
  traces,
  steps,
  notes,
  result,
  tone,
}: PipelineTraceProps) {
  return (
    <div className="border-line bg-bg-elevated/50 relative rounded-[2px] border p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] sm:p-6">
      <FrameMarks />
      <p className="mb-4 font-mono text-[10px] tracking-[0.16em] text-text-faint uppercase">
        {logLabel}
      </p>
      <ol className="flex flex-col">
        {traces.map((trace, index) => {
          const step = steps.find((item) => item.id === trace.id);
          const isLast = index === traces.length - 1;

          return (
            <li key={trace.id} className="flex flex-col items-center">
              <div
                data-state={trace.state}
                className={cn(
                  "w-full rounded-[2px] border px-3 py-2 transition-colors duration-base ease-out-premium motion-reduce:transition-none",
                  nodeClass(trace.state),
                )}
              >
                <p className="font-mono text-[10px] tracking-[0.14em] text-text-faint">
                  {String(index + 1).padStart(2, "0")}
                  <span aria-hidden="true"> · </span>
                  {step?.label ?? trace.id}
                </p>
                <p className="mt-1 text-sm leading-relaxed">
                  {notes[trace.note]}
                </p>
              </div>
              {isLast ? null : (
                <span aria-hidden="true" className="bg-signal/35 h-4 w-px" />
              )}
            </li>
          );
        })}
      </ol>
      <p
        aria-live="polite"
        className={cn(
          "mt-6 font-mono text-sm tracking-wide",
          tone === "idle" && "text-text-faint",
          tone === "ok" && "text-success",
          tone === "warn" && "text-signal",
        )}
      >
        {result}
      </p>
    </div>
  );
}

function nodeClass(state: BenchStepState) {
  switch (state) {
    case "ok":
      return "border-success/40 bg-success/10 text-foreground";
    case "warn":
      return "border-signal/50 bg-signal-dim text-foreground";
    case "fail":
      return "border-line bg-bg/60 text-text-muted";
    case "skip":
      return "border-line/70 bg-transparent text-text-faint";
    default:
      return "border-line bg-bg/40 text-text-muted";
  }
}
