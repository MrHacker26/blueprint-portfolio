export function FrameMarks() {
  return (
    <>
      <span
        aria-hidden="true"
        className="border-signal/50 bg-bg absolute -top-px -left-px size-1.5 border"
      />
      <span
        aria-hidden="true"
        className="border-signal/50 bg-bg absolute -top-px -right-px size-1.5 border"
      />
      <span
        aria-hidden="true"
        className="border-signal/50 bg-bg absolute -bottom-px -left-px size-1.5 border"
      />
      <span
        aria-hidden="true"
        className="border-signal/50 bg-bg absolute -right-px -bottom-px size-1.5 border"
      />
    </>
  );
}
