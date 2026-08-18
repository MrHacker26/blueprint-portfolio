import { site } from "@/lib/site";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col justify-end px-6 pb-20 sm:px-10 sm:pb-24 lg:px-16">
      <p className="font-mono text-[11px] tracking-[0.22em] text-text-faint uppercase">
        {site.role}
      </p>
      <h1 className="mt-4 max-w-4xl font-sans text-[clamp(2.5rem,8vw,4.5rem)] leading-[1.05] font-semibold tracking-tight text-foreground">
        {site.name}
      </h1>
    </div>
  );
}
