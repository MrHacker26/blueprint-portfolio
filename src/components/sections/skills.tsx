import { HomeSection } from "@/components/sections/home-section";
import { SkillRow } from "@/components/sections/skill-row";
import { FrameMarks } from "@/components/ui/frame-marks";
import { skills } from "@/content/skills";
import { sectionLabel } from "@/lib/site";

export function SkillsSection() {
  return (
    <HomeSection id="skills" label={sectionLabel("skills")}>
      <div className="border-line relative rounded-[2px] border px-4 sm:px-5">
        <FrameMarks />
        {skills.map((skill) => (
          <SkillRow key={skill.name} skill={skill} />
        ))}
      </div>
    </HomeSection>
  );
}
