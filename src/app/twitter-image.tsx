import { ImageResponse } from "next/og";
import { OgFrame } from "@/lib/og-frame";
import { site } from "@/lib/site";

export const alt = site.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    <OgFrame kicker={site.role} title={site.name} description={site.tagline} />,
    { ...size },
  );
}
