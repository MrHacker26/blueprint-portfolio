import { site } from "@/lib/site";

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 pt-28 pb-24">
      <p className="flex items-center gap-3 font-mono text-sm tracking-wide text-text-faint">
        <span
          aria-hidden="true"
          className="loader-pulse bg-signal size-1.5 rounded-full"
        />
        {site.chrome.loading}
      </p>
    </div>
  );
}
