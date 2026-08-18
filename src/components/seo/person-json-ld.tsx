import { personJsonLd } from "@/lib/seo";

export function PersonJsonLd() {
  return (
    <script type="application/ld+json">{JSON.stringify(personJsonLd())}</script>
  );
}
