import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { OgFrame } from "@/lib/og-frame";
import { getProjectMeta, getProjectSlugs } from "@/lib/projects";
import { site } from "@/lib/site";

export const alt = site.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export default async function ProjectOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectMeta(slug);

  if (!project) {
    notFound();
  }

  return new ImageResponse(
    <OgFrame
      kicker={project.role}
      title={project.title}
      description={project.tagline}
    />,
    { ...size },
  );
}
