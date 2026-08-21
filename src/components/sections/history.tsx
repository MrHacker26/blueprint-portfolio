import { HistoryItem } from "@/components/sections/history-item";
import { HomeSection } from "@/components/sections/home-section";
import { FrameMarks } from "@/components/ui/frame-marks";
import { history } from "@/content/history";
import { sectionLabel } from "@/lib/site";

export function HistorySection() {
  return (
    <HomeSection id="history" label={sectionLabel("history")}>
      <div className="border-line relative rounded-[2px] border px-5 sm:px-6">
        <FrameMarks />
        {history.map((item) => (
          <HistoryItem key={item.id} item={item} />
        ))}
      </div>
    </HomeSection>
  );
}
