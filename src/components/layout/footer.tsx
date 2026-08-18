import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-line mt-auto border-t px-6 py-8 sm:px-10 lg:px-16">
      <p className="font-mono text-[11px] tracking-wide text-text-faint">
        <time dateTime={String(year)}>{year}</time>
        <span aria-hidden="true"> · </span>
        {site.name}
      </p>
    </footer>
  );
}
