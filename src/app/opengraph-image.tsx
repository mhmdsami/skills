import { ImageResponse } from "next/og";
import { loadGoogleFont, OG_MONO } from "@/lib/og";

export const alt = "skills — Skills for coding agents";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const mono = await loadGoogleFont(OG_MONO, 500);

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: 72,
          backgroundColor: "#111210",
          color: "#ecece8",
          fontFamily: OG_MONO,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            backgroundImage: "radial-gradient(60% 60% at 18% 12%, rgba(193,230,164,0.12), transparent 70%)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 16, position: "relative", zIndex: 1 }}>
          <svg width="30" height="30" viewBox="0 0 32 32">
            <path d="M16 3.5 18.9 13.1 28.5 16 18.9 18.9 16 28.5 13.1 18.9 3.5 16 13.1 13.1Z" fill="#c1e6a4" />
          </svg>
          <span style={{ fontSize: 40, lineHeight: 1, letterSpacing: "-0.03em" }}>skills</span>
        </div>
        <span style={{ fontSize: 64, lineHeight: 1.1, letterSpacing: "-0.03em", position: "relative", zIndex: 1 }}>Skills for coding agents</span>
        <div style={{ display: "flex", justifyContent: "flex-end", position: "relative", zIndex: 1 }}>
          <span style={{ fontSize: 18, color: "#6b6b66" }}>skills.sam1.space</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: OG_MONO, data: mono, weight: 500, style: "normal" }],
      headers: { "cache-control": "public, max-age=31536000, immutable" },
    }
  );
}
