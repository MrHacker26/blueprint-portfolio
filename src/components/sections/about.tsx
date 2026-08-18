import { HomeSection } from "@/components/sections/home-section";
import { sectionLabel, site } from "@/lib/site";

export function AboutSection() {
  return (
    <HomeSection id="about" label={sectionLabel("about")}>
      <div className="max-w-2xl">
        <p className="font-mono text-[11px] tracking-[0.18em] text-text-faint uppercase">
          {site.location}
        </p>
        <p className="mt-5 text-lg leading-relaxed text-text-muted">
          {site.about}
        </p>
      </div>
    </HomeSection>
  );
}
