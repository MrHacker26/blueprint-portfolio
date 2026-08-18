import { ExperienceCard } from "@/components/sections/experience-card";
import { HomeSection } from "@/components/sections/home-section";
import { experience } from "@/content/experience";
import { sectionLabel } from "@/lib/site";

export function ExperienceSection() {
  return (
    <HomeSection id="experience" label={sectionLabel("experience")}>
      <div className="flex flex-col gap-4">
        {experience.map((item) => (
          <ExperienceCard key={item.id} item={item} />
        ))}
      </div>
    </HomeSection>
  );
}
