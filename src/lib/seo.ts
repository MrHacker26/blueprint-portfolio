import type { Metadata, MetadataRoute } from "next";
import { getProjects } from "@/lib/projects";
import { site } from "@/lib/site";
import type { ProjectFrontmatter } from "@/types/content";

function origin() {
  return site.url?.replace(/\/$/, "") ?? null;
}

export function rootMetadata(): Metadata {
  const url = origin();

  return {
    title: {
      default: site.seo.title,
      template: `%s · ${site.name}`,
    },
    description: site.seo.description,
    applicationName: site.name,
    authors: [{ name: site.name }],
    creator: site.name,
    ...(url
      ? {
          metadataBase: new URL(url),
          alternates: { canonical: "/" },
        }
      : {}),
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: site.name,
      title: site.seo.title,
      description: site.seo.description,
      ...(url ? { url } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: site.seo.title,
      description: site.seo.description,
    },
  };
}

export function projectMetadata(project: ProjectFrontmatter): Metadata {
  const url = origin();

  return {
    title: project.title,
    description: project.tagline,
    ...(url ? { alternates: { canonical: `/projects/${project.slug}` } } : {}),
    openGraph: {
      type: "article",
      locale: "en_IN",
      siteName: site.name,
      title: project.title,
      description: project.tagline,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.tagline,
    },
  };
}

export function personJsonLd() {
  const sameAs = [site.socials.github, site.socials.linkedin].filter(
    (href) => href.length > 0,
  );
  const url = origin();

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    description: site.seo.description,
    ...(site.email ? { email: `mailto:${site.email}` } : {}),
    ...(url ? { url } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location,
    },
  };
}

export function sitemapEntries(): MetadataRoute.Sitemap {
  const url = origin();
  if (!url) {
    return [];
  }

  return [
    {
      url,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...getProjects().map((project) => ({
      url: `${url}/projects/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

export function robotsConfig(): MetadataRoute.Robots {
  const url = origin();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/lab"],
    },
    ...(url ? { sitemap: `${url}/sitemap.xml` } : {}),
  };
}
