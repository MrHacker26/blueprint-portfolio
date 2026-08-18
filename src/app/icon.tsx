import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#070b14",
      }}
    >
      <div
        style={{
          width: 14,
          height: 14,
          border: "2px solid #38bdf8",
        }}
      />
    </div>,
    { ...size },
  );
}
