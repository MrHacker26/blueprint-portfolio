import type { Metadata } from "next";
import { FrameMarks } from "@/components/ui/frame-marks";
import { lab } from "@/content/lab";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: lab.title,
  robots: {
    index: false,
    follow: false,
  },
};

export default function LabPage() {
  return (
    <article className="mx-auto w-full max-w-2xl px-6 pt-28 pb-24 sm:px-10">
      <p className="font-mono text-[11px] tracking-[0.2em] text-text-faint uppercase">
        {lab.title}
      </p>
      <h1 className="mt-3 font-mono text-2xl tracking-tight text-foreground">
        {lab.prompt}
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-text-muted">
        {lab.intro}
      </p>
      <div className="border-line bg-bg-elevated/50 relative mt-10 rounded-[2px] border p-5 font-mono text-[13px] leading-relaxed">
        <FrameMarks />
        <p className="text-text-faint">
          <span className="text-signal">$</span> {lab.boot}
        </p>
        <ol className="mt-4 space-y-2">
          {lab.lines.map((line) => (
            <li key={line.text} className="flex gap-3">
              <span className="text-success shrink-0">{line.status}</span>
              <span className="text-text-muted">{line.text}</span>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-text-faint">
          <span className="text-signal">$</span> {lab.build}
        </p>
        <ol className="mt-3 space-y-1.5 text-text-faint">
          {site.chrome.buildStages.map((stage) => (
            <li key={stage.label}>{stage.label}</li>
          ))}
        </ol>
      </div>
    </article>
  );
}
