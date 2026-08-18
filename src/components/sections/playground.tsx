import { HapticBench } from "@/components/sections/haptic-bench";
import { HomeSection } from "@/components/sections/home-section";
import { OcrBench } from "@/components/sections/ocr-bench";
import { playground } from "@/content/playground";
import { sectionLabel } from "@/lib/site";

export function PlaygroundSection() {
  return (
    <HomeSection id="playground" label={sectionLabel("playground")}>
      <p className="mb-10 max-w-2xl font-mono text-[12px] tracking-wide text-text-faint">
        {playground.hint}
      </p>
      <div className="flex flex-col gap-16">
        <HapticBench />
        <OcrBench />
      </div>
    </HomeSection>
  );
}
