import Link from "next/link";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <article className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-6 pt-28 pb-24 sm:px-10">
      <p className="font-mono text-[11px] tracking-[0.2em] text-text-faint uppercase">
        {site.chrome.notFound.code}
      </p>
      <h1 className="mt-3 font-sans text-3xl font-semibold tracking-tight text-foreground">
        {site.chrome.notFound.title}
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-text-muted">
        {site.chrome.notFound.body}
      </p>
      <p className="mt-8">
        <Link
          href="/"
          className="font-mono text-[12px] tracking-wide text-signal hover:text-foreground"
        >
          {site.chrome.notFound.action}
        </Link>
      </p>
    </article>
  );
}
