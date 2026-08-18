import { AboutSection } from "@/components/sections/about";
import { ExperienceSection } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { HomeSection } from "@/components/sections/home-section";
import { SkillsSection } from "@/components/sections/skills";
import { sectionLabel } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ExperienceSection />
      <HomeSection id="projects" label={sectionLabel("projects")} />
      <SkillsSection />
      <HomeSection id="playground" label={sectionLabel("playground")} />
      <HomeSection id="history" label={sectionLabel("history")} />
      <HomeSection id="contact" label={sectionLabel("contact")} />
    </>
  );
}
