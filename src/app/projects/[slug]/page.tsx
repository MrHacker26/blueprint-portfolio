import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProjectBySlug,
  getProjectMeta,
  getProjectSlugs,
} from "@/lib/projects";
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

  return {
    title: project.title,
    description: project.tagline,
  };
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
      {meta.status === "private" ? (
        <p className="border-line mt-6 rounded-md border px-4 py-3 font-mono text-[12px] leading-relaxed text-text-faint">
          {site.projects.privateNote}
        </p>
      ) : null}
      <figure className="border-line bg-bg-elevated/40 mt-10 flex aspect-[16/9] items-center justify-center rounded-lg border">
        <figcaption className="font-mono text-[11px] tracking-[0.16em] text-text-faint uppercase">
          {site.projects.capturePending}
        </figcaption>
      </figure>
      <ul className="mt-6 flex flex-wrap gap-2">
        {meta.stack.map((item) => (
          <li
            key={item}
            className="border-line rounded-full border px-2.5 py-0.5 font-mono text-[10px] tracking-wide text-text-muted"
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-4">{content}</div>
    </article>
  );
}
