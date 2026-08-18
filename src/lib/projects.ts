import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/projects/mdx-components";
import type { ProjectFrontmatter, ProjectStatus } from "@/types/content";

const PROJECTS_DIR = path.join(process.cwd(), "src/content/projects");

function isStatus(value: unknown): value is ProjectStatus {
  return value === "shipped" || value === "in-progress" || value === "private";
}

function toFrontmatter(
  data: Record<string, unknown>,
  slug: string,
): ProjectFrontmatter {
  if (
    typeof data.title !== "string" ||
    typeof data.tagline !== "string" ||
    typeof data.year !== "string" ||
    typeof data.role !== "string" ||
    !isStatus(data.status) ||
    !Array.isArray(data.stack) ||
    !data.stack.every((item) => typeof item === "string")
  ) {
    throw new Error(`Invalid frontmatter in ${slug}.mdx`);
  }

  return {
    slug,
    title: data.title,
    tagline: data.tagline,
    year: data.year,
    status: data.status,
    stack: data.stack,
    role: data.role,
    heroImage: typeof data.heroImage === "string" ? data.heroImage : undefined,
  };
}

function readSource(slug: string) {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return fs.readFileSync(filePath, "utf8");
}

export function getProjectSlugs() {
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getProjects(): ProjectFrontmatter[] {
  return getProjectSlugs()
    .map((slug) => {
      const source = readSource(slug);
      if (!source) {
        throw new Error(`Missing project file for ${slug}`);
      }
      const { data } = matter(source);
      return toFrontmatter(data as Record<string, unknown>, slug);
    })
    .sort((a, b) => b.year.localeCompare(a.year));
}

export function getProjectMeta(slug: string) {
  const source = readSource(slug);
  if (!source) {
    return null;
  }
  const { data } = matter(source);
  return toFrontmatter(data as Record<string, unknown>, slug);
}

export async function getProjectBySlug(slug: string) {
  const source = readSource(slug);
  if (!source) {
    return null;
  }

  const { content, frontmatter } = await compileMDX<Record<string, unknown>>({
    source,
    components: mdxComponents,
    options: { parseFrontmatter: true },
  });

  return {
    content,
    meta: toFrontmatter(frontmatter, slug),
  };
}
