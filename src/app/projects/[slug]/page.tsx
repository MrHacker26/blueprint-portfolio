import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CaptureFrame,
  PrivateRecord,
} from "@/components/projects/capture-frame";
import { ProjectLinks } from "@/components/projects/project-links";
import {
  getProjectBySlug,
  getProjectMeta,
  getProjectSlugs,
} from "@/lib/projects";
import { projectMetadata } from "@/lib/seo";
import { sectionHref, site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectMeta(slug);

  if (!project) {
    return {};
  }

  return projectMetadata(project);
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { meta, content } = project;

  return (
    <article className="mx-auto w-full max-w-3xl px-6 pt-28 pb-24 sm:px-10">
      <p className="font-mono text-[11px] tracking-[0.16em] text-text-faint uppercase">
        <Link href={sectionHref("projects")} className="hover:text-foreground">
          {site.cta.backToProjects}
        </Link>
      </p>
      <p className="mt-8 font-mono text-[11px] tracking-[0.16em] text-text-faint uppercase">
        {meta.year}
        <span aria-hidden="true"> · </span>
        {site.projectStatus[meta.status]}
        <span aria-hidden="true"> · </span>
        {meta.role}
      </p>
      <h1 className="mt-4 font-sans text-[clamp(2.25rem,6vw,3.75rem)] leading-[1.05] font-semibold tracking-tight text-foreground">
        {meta.title}
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-text-muted">
        {meta.tagline}
      </p>
      {meta.links && meta.links.length > 0 ? (
        <div className="mt-4">
          <ProjectLinks links={meta.links} showKicker />
        </div>
      ) : null}
      {meta.status === "private" ? <PrivateRecord /> : null}
      <CaptureFrame
        locked={meta.status === "private"}
        src={meta.heroImage}
        alt={meta.heroAlt}
        caption={
          meta.status === "private" && meta.heroImage
            ? site.projects.schematicCaption
            : undefined
        }
        sizes="(min-width: 768px) 48rem, 100vw"
        className="mt-10 aspect-[16/9] w-full"
      />
      <ul className="mt-6 flex flex-wrap gap-2">
        {meta.stack.map((item) => (
          <li
            key={item}
            className="border-line rounded-[2px] border px-2.5 py-0.5 font-mono text-[10px] tracking-wide text-text-muted"
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-4">{content}</div>
    </article>
  );
}
