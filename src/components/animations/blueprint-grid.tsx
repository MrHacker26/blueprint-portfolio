export function BlueprintGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="blueprint-grid absolute inset-0" />
      <div className="blueprint-grid-major absolute inset-0" />
      <div className="blueprint-glow absolute inset-0" />
    </div>
  );
}
