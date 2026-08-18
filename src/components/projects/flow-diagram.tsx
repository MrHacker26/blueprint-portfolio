import { site } from "@/lib/site";

type FlowDiagramProps = {
  nodes: string[];
  label?: string;
};

export function FlowDiagram({ nodes, label }: FlowDiagramProps) {
  if (nodes.length === 0) {
    return null;
  }

  return (
    <ol
      aria-label={label ?? site.a11y.architectureFlow}
      className="mx-auto flex w-full max-w-xs flex-col items-center"
    >
      {nodes.map((node, index) => {
        const isLast = index === nodes.length - 1;
        const step = String(index + 1).padStart(2, "0");

        return (
          <li key={node} className="flex w-full flex-col items-center">
            <div className="border-signal/35 bg-bg/60 relative w-full rounded-md border px-4 py-3">
              <span
                aria-hidden="true"
                className="border-signal/40 absolute top-1 left-1 size-1 border"
              />
              <span
                aria-hidden="true"
                className="border-signal/40 absolute top-1 right-1 size-1 border"
              />
              <p className="font-mono text-[10px] tracking-[0.16em] text-text-faint">
                {step}
              </p>
              <p className="mt-1 font-mono text-sm tracking-wide text-foreground">
                {node}
              </p>
            </div>
            {isLast ? null : (
              <span aria-hidden="true" className="bg-signal/45 my-1 h-7 w-px" />
            )}
          </li>
        );
      })}
    </ol>
  );
}

export function parseFlowSteps(steps?: string) {
  if (!steps) {
    return [];
  }

  return steps
    .split("|")
    .map((step) => step.trim())
    .filter(Boolean);
}
