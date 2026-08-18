import { Hero } from "@/components/sections/hero";
import { HomeSection } from "@/components/sections/home-section";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Hero />
      {site.sections.map((section) => (
        <HomeSection key={section.id} id={section.id} label={section.label} />
      ))}
    </>
  );
}
