import { HomeSection } from "@/components/sections/home-section";
import { PlaygroundBench } from "@/components/sections/playground-bench";
import { playground } from "@/content/playground";
import { sectionLabel } from "@/lib/site";

export function PlaygroundSection() {
  return (
    <HomeSection id="playground" label={sectionLabel("playground")}>
      <p className="mb-8 max-w-2xl font-mono text-[12px] tracking-wide text-text-faint">
        {playground.hint}
      </p>
      <PlaygroundBench />
    </HomeSection>
  );
}
