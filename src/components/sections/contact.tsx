import { ContactCard } from "@/components/sections/contact-card";
import { HomeSection } from "@/components/sections/home-section";
import { sectionLabel } from "@/lib/site";

export function ContactSection() {
  return (
    <HomeSection id="contact" label={sectionLabel("contact")}>
      <ContactCard />
    </HomeSection>
  );
}
