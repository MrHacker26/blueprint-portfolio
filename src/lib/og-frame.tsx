type OgFrameProps = {
  kicker: string;
  title: string;
  description: string;
};

export function OgFrame({ kicker, title, description }: OgFrameProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#070b14",
        backgroundImage:
          "linear-gradient(to right, rgba(96,165,250,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(96,165,250,0.08) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        color: "#f1f5f9",
        padding: "72px 80px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            color: "#64748b",
            fontSize: 22,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          {kicker}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 72,
            fontWeight: 600,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
          }}
        >
          {title}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div
          style={{
            maxWidth: 920,
            color: "#94a3b8",
            fontSize: 28,
            lineHeight: 1.4,
          }}
        >
          {description}
        </div>
        <div
          style={{
            width: 72,
            height: 2,
            backgroundColor: "#38bdf8",
          }}
        />
      </div>
    </div>
  );
}
