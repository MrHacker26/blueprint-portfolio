import Link from "next/link";
import { CaptureFrame } from "@/components/projects/capture-frame";
import { FrameMarks } from "@/components/ui/frame-marks";
import { site } from "@/lib/site";
import type { ProjectFrontmatter } from "@/types/content";

type ProjectCardProps = {
  project: ProjectFrontmatter;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="border-line bg-bg-elevated/40 relative flex flex-col rounded-[2px] border shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-[border-color,transform] duration-base ease-out-premium motion-safe:hover:-translate-y-1 hover:border-signal/30">
      <FrameMarks />
      <CaptureFrame
        locked={project.status === "private"}
        className="aspect-[16/10] w-full rounded-none rounded-t-[2px] border-0 border-b"
      />
      <div className="flex flex-1 flex-col px-5 py-5">
        <p className="font-mono text-[11px] tracking-[0.16em] text-text-faint uppercase">
          {project.year}
          <span aria-hidden="true"> · </span>
          {site.projectStatus[project.status]}
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">
          {project.tagline}
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <li
              key={item}
              className="border-line rounded-[2px] border px-2.5 py-0.5 font-mono text-[10px] tracking-wide text-text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
        <p className="text-signal mt-5 font-mono text-[11px] tracking-[0.14em] uppercase">
          {site.cta.readCaseStudy}
        </p>
      </div>
    </article>
  );
}
