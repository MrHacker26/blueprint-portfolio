export const site = {
  name: "Tarun Joshi",
  role: "Senior Full Stack Engineer",
  location: "Dehradun, Uttarakhand, India",
  tagline:
    "Building scalable products with TypeScript, React Native, Cloudflare, and modern web infrastructure.",
  about:
    "I design and ship full-stack products across TypeScript systems, React Native clients, and Cloudflare infrastructure. This site is a working notebook of architecture, tradeoffs, and craft — not a template.",
  url: null as string | null,
  email: null as string | null,
  socials: {
    github: null as string | null,
    linkedin: null as string | null,
  },
  resume: {
    available: false,
    href: "/resume.pdf",
    label: "Download Resume",
    pendingLabel: "Coming Soon",
  },
  statusPills: ["Shipping Products", "Next.js 16", "Bun", "Cloudflare"],
  nav: [
    { id: "about", href: "#about", label: "About" },
    { id: "experience", href: "#experience", label: "Experience" },
    { id: "projects", href: "#projects", label: "Projects" },
    { id: "skills", href: "#skills", label: "Skills" },
    { id: "contact", href: "#contact", label: "Contact" },
  ],
  seo: {
    title: "Tarun Joshi — Senior Full Stack Engineer",
    description:
      "Building scalable products with TypeScript, React Native, Cloudflare, and modern web infrastructure.",
    ogImage: "/og.png",
  },
  a11y: {
    skipToContent: "Skip to content",
  },
} as const;
