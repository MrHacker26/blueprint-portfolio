import { site } from "@/lib/site";

export function BlueprintCard() {
  const { frame, widthMark, heightMark, origin, nodes } = site.hero;

  return (
    <figure
      aria-label={site.a11y.blueprintCard}
      className="relative mx-auto w-full max-w-lg"
    >
      <p className="mb-2 font-mono text-[10px] tracking-[0.18em] text-text-faint uppercase">
        {frame}
      </p>
      <div className="relative aspect-[4/3] w-full">
        <div
          aria-hidden="true"
          className="absolute top-0 right-5 left-5 h-4 bg-[repeating-linear-gradient(to_right,var(--line)_0_1px,transparent_1px_8px)]"
        />
        <div
          aria-hidden="true"
          className="absolute top-5 bottom-5 left-0 w-4 bg-[repeating-linear-gradient(to_bottom,var(--line)_0_1px,transparent_1px_8px)]"
        />
        <p className="absolute top-0 left-6 font-mono text-[9px] text-text-faint">
          {origin}
        </p>
        <p className="absolute top-0 right-6 font-mono text-[9px] text-text-faint">
          {widthMark}
        </p>
        <p className="absolute top-1/2 left-0 origin-center -translate-y-1/2 -rotate-90 font-mono text-[9px] text-text-faint">
          {heightMark}
        </p>

        <div className="border-signal/35 absolute inset-5 rounded-[2px] border bg-bg-elevated/40">
          <span
            aria-hidden="true"
            className="border-signal bg-bg absolute top-0 left-0 size-1.5 border"
          />
          <span
            aria-hidden="true"
            className="border-signal bg-bg absolute top-0 right-0 size-1.5 border"
          />
          <span
            aria-hidden="true"
            className="border-signal bg-bg absolute bottom-0 left-0 size-1.5 border"
          />
          <span
            aria-hidden="true"
            className="border-signal bg-bg absolute right-0 bottom-0 size-1.5 border"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage: `
                linear-gradient(to right, var(--grid) 1px, transparent 1px),
                linear-gradient(to bottom, var(--grid) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />

          <svg
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 400 300"
            fill="none"
          >
            <path
              className="blueprint-path"
              d="M70 80 H 160 V 150 H 250"
              stroke="var(--signal)"
              strokeOpacity="0.7"
              strokeWidth="1.2"
            />
            <path
              className="blueprint-path"
              d="M250 150 C 290 150, 310 190, 330 210"
              stroke="var(--signal)"
              strokeOpacity="0.7"
              strokeWidth="1.2"
              style={{ animationDuration: "22s" }}
            />
            <circle cx="70" cy="80" r="3" fill="var(--signal)" />
            <circle cx="160" cy="150" r="3" fill="var(--signal)" />
            <circle cx="250" cy="150" r="3" fill="var(--signal)" />
            <circle cx="330" cy="210" r="3" fill="var(--signal)" />
            <path
              d="M48 68 h12 m-6 -6 v12"
              stroke="var(--text-faint)"
              strokeWidth="1"
            />
            <path
              d="M318 198 h12 m-6 -6 v12"
              stroke="var(--text-faint)"
              strokeWidth="1"
            />
          </svg>

          <span className="absolute top-[18%] left-[6%] font-mono text-[10px] tracking-wide text-text-muted">
            {nodes.client}
          </span>
          <span className="absolute top-[46%] left-[38%] font-mono text-[10px] tracking-wide text-text-muted">
            {nodes.edge}
          </span>
          <span className="absolute top-[68%] right-[8%] font-mono text-[10px] tracking-wide text-text-muted">
            {nodes.core}
          </span>
        </div>
      </div>
    </figure>
  );
}
