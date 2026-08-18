export const site = {
  name: "Tarun Joshi",
  role: "Senior Full Stack Engineer",
  location: "Dehradun, Uttarakhand, India",
  tagline:
    "Building scalable products with TypeScript, React Native, Cloudflare, and modern web infrastructure.",
  about:
    "I design and ship full-stack products across TypeScript systems, React Native clients, and Cloudflare infrastructure. This site is a working notebook of architecture, tradeoffs, and craft. Not a template.",
  url: null as string | null,
  email: "tjocz26@gmail.com",
  socials: {
    github: "https://github.com/MrHacker26",
    linkedin: "https://linkedin.com/in/tarun-joshi26",
  },
  resume: {
    available: false,
    href: "/resume.pdf",
    label: "Download Resume",
    pendingLabel: "Coming Soon",
  },
  statusPills: ["Shipping Products", "Next.js 16", "Bun", "Cloudflare"],
  cta: {
    viewProjects: "View Projects",
    readCaseStudy: "Case study",
    backToProjects: "All projects",
  },
  hero: {
    frame: "hero.blueprint",
    widthMark: "1440",
    heightMark: "900",
    origin: "0,0",
    nodes: {
      client: "client",
      edge: "edge",
      core: "core",
    },
  },
  sections: [
    { id: "about", label: "About", inNav: true },
    { id: "experience", label: "Experience", inNav: true },
    { id: "projects", label: "Projects", inNav: true },
    { id: "skills", label: "Skills", inNav: true },
    { id: "playground", label: "Playground", inNav: false },
    { id: "history", label: "History", inNav: false },
    { id: "contact", label: "Contact", inNav: true },
  ],
  chrome: {
    buildStages: [
      { threshold: 0.2, label: "Compiling..." },
      { threshold: 0.5, label: "Linking..." },
      { threshold: 0.8, label: "Optimizing..." },
      { threshold: 1, label: "Build Complete." },
    ],
    loading: "Compiling...",
    notFound: {
      code: "404",
      title: "Route not found",
      body: "This path is not in the build.",
      action: "Back to index",
    },
  },
  seo: {
    title: "Tarun Joshi, Senior Full Stack Engineer",
    description:
      "Building scalable products with TypeScript, React Native, Cloudflare, and modern web infrastructure.",
    ogImage: "/og.png",
  },
  a11y: {
    skipToContent: "Skip to content",
    primaryNav: "Primary",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menuTitle: "Navigate",
    buildProgress: "Build progress",
    liveStatus: "Live status",
    blueprintCard: "Blueprint frame",
    experienceNotes: "Engineering notes",
    skillLevel: "Proficiency",
    projectHero: "Project capture",
    architectureFlow: "Architecture flow",
    copyEmail: "Copy email",
    commandPalette: "Command palette",
    openCommand: "Open command palette",
  },
  projectStatus: {
    shipped: "Shipped",
    "in-progress": "In progress",
    private: "Private",
  },
  projects: {
    capturePending: "Capture pending",
    privateCapture: "Not pictured",
    privateGallery: "Captures stay off the record.",
    architectureLabel: "Architecture",
    architecturePending: "Diagram in the next pass.",
    privateNote:
      "Sanitized write-up. Internal systems, datasets, and credentials stay off this page.",
    galleryLabel: "Gallery",
  },
  contact: {
    github: "GitHub",
    linkedin: "LinkedIn",
    email: "Email",
    copy: "Copy",
    copied: "Copied",
    copyFailed: "Copy failed",
    pending: "Coming Soon",
  },
  playground: {
    hint: "Type a label or pick a sample. The pipeline should fail closed.",
  },
  command: {
    placeholder: "Search the system...",
    empty: "No match.",
    hotkey: "⌘K",
    groups: {
      navigate: "Navigate",
      projects: "Projects",
      skills: "Skills",
      resume: "Resume",
    },
  },
} as const;

export const navItems = site.sections.filter((section) => section.inNav);

export const navIds = navItems.map((item) => item.id);

export function sectionHref(id: string) {
  return `/#${id}`;
}

export function sectionLabel(id: (typeof site.sections)[number]["id"]) {
  const section = site.sections.find((item) => item.id === id);
  return section?.label ?? id;
}

export function getBuildStage(progress: number) {
  const p = Math.min(1, Math.max(0, progress));
  return (
    site.chrome.buildStages.find((stage) => p < stage.threshold) ??
    site.chrome.buildStages[site.chrome.buildStages.length - 1]
  );
}
