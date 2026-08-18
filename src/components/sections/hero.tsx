import { BlueprintCard } from "@/components/animations/blueprint-card";
import { HeroField } from "@/components/animations/hero-field";
import { Button } from "@/components/ui/button";
import { sectionHref, site } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pt-28 pb-16 sm:px-10 lg:px-16"
    >
      <HeroField />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
        <div className="hero-enter">
          <p className="font-mono text-[11px] tracking-[0.22em] text-text-faint uppercase">
            {site.role}
          </p>
          <h1 className="mt-4 max-w-xl font-sans text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.05] font-semibold tracking-tight text-foreground">
            {site.name}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-text-muted sm:text-lg">
            {site.tagline}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="h-10 rounded-full px-5">
              <a href={sectionHref("projects")}>{site.cta.viewProjects}</a>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              disabled
              aria-disabled="true"
              aria-describedby="resume-pending"
              className="h-10 rounded-full px-5 disabled:opacity-70"
            >
              <span>{site.resume.label}</span>
              <span
                id="resume-pending"
                className="font-mono text-[10px] tracking-[0.12em] text-text-faint uppercase"
              >
                {site.resume.pendingLabel}
              </span>
            </Button>
          </div>
          <ul
            aria-label={site.a11y.liveStatus}
            className="mt-8 flex flex-wrap gap-2"
          >
            {site.statusPills.map((pill, index) => (
              <li
                key={pill}
                className="pill-drift border-line bg-bg/50 flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] tracking-wide text-text-muted"
                style={{ animationDelay: `${index * 1.1}s` }}
              >
                {index === 0 ? (
                  <span className="bg-success size-1.5 rounded-full" />
                ) : null}
                {pill}
              </li>
            ))}
          </ul>
        </div>
        <div className="hero-enter" style={{ animationDelay: "120ms" }}>
          <BlueprintCard />
        </div>
      </div>
    </section>
  );
}
