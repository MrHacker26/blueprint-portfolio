type HomeSectionProps = {
  id: string;
  label: string;
};

export function HomeSection({ id, label }: HomeSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-28 min-h-[70svh] px-6 py-24 sm:px-10 lg:px-16"
    >
      <p className="font-mono text-[11px] tracking-[0.22em] text-text-faint uppercase">
        {label}
      </p>
      <h2
        id={`${id}-heading`}
        className="mt-3 text-2xl font-semibold tracking-tight text-foreground"
      >
        {label}
      </h2>
    </section>
  );
}
