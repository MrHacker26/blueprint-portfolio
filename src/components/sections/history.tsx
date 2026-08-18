import { HistoryItem } from "@/components/sections/history-item";
import { HomeSection } from "@/components/sections/home-section";
import { history } from "@/content/history";
import { sectionLabel } from "@/lib/site";

export function HistorySection() {
  return (
    <HomeSection id="history" label={sectionLabel("history")}>
      <div className="border-line rounded-lg border px-5 sm:px-6">
        {history.map((item) => (
          <HistoryItem key={item.id} item={item} />
        ))}
      </div>
    </HomeSection>
  );
}
