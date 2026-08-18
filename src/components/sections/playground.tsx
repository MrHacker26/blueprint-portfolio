import { HomeSection } from "@/components/sections/home-section";
import { PlaygroundFlowCard } from "@/components/sections/playground-flow-card";
import { playground } from "@/content/playground";
import { sectionLabel, site } from "@/lib/site";

export function PlaygroundSection() {
  return (
    <HomeSection id="playground" label={sectionLabel("playground")}>
      <p className="mb-8 max-w-2xl font-mono text-[12px] tracking-wide text-text-faint">
        {site.playground.hint}
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {playground.map((flow) => (
          <PlaygroundFlowCard key={flow.id} flow={flow} />
        ))}
      </div>
    </HomeSection>
  );
}
