export function HeroField() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 800"
        fill="none"
      >
        <path
          className="blueprint-path"
          d="M120 180 C 280 160, 340 320, 520 300 S 780 220, 980 260"
          stroke="var(--signal)"
          strokeOpacity="0.22"
          strokeWidth="1"
        />
        <path
          className="blueprint-path"
          d="M80 520 C 240 480, 360 640, 580 600 S 860 540, 1100 620"
          stroke="var(--signal)"
          strokeOpacity="0.16"
          strokeWidth="1"
          style={{ animationDuration: "24s" }}
        />
      </svg>
      <span className="node-pulse bg-signal/80 absolute top-[18%] left-[8%] size-1 rounded-full" />
      <span
        className="node-pulse bg-signal/70 absolute top-[38%] right-[16%] size-1 rounded-full"
        style={{ animationDelay: "1.4s" }}
      />
      <span
        className="node-pulse bg-signal/60 absolute bottom-[22%] left-[28%] size-1.5 rounded-full"
        style={{ animationDelay: "2.8s" }}
      />
      <span
        className="node-pulse bg-signal/50 absolute top-[58%] right-[8%] size-1 rounded-full"
        style={{ animationDelay: "4s" }}
      />
    </div>
  );
}
