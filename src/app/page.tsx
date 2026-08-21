import { ContactSection } from "@/components/sections/contact";
import { ExperienceSection } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { PlaygroundSection } from "@/components/sections/playground";
import { ProjectsSection } from "@/components/sections/projects";
import { SkillsSection } from "@/components/sections/skills";

export default function Home() {
  return (
    <>
      <Hero />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <PlaygroundSection />
      <ContactSection />
    </>
  );
}
