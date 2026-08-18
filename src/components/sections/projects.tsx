import { ProjectCard } from "@/components/projects/project-card";
import { HomeSection } from "@/components/sections/home-section";
import { getProjects } from "@/lib/projects";
import { sectionLabel } from "@/lib/site";

export function ProjectsSection() {
  const projects = getProjects();

  return (
    <HomeSection id="projects" label={sectionLabel("projects")}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </HomeSection>
  );
}
