import { ImageResponse } from "next/og";
import { listSkills } from "@/lib/catalog";
import { loadGoogleFont, OG_MONO } from "@/lib/og";

export const alt = "skills";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const skills = await listSkills();
  const names = skills.slice(0, 6).map((skill) => skill.name);
  const mono = await loadGoogleFont(OG_MONO, 500);

  return new ImageResponse(
    (
      <div
        style={{
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
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="34" height="34" viewBox="0 0 32 32">
            <path d="M16 3.5 18.9 13.1 28.5 16 18.9 18.9 16 28.5 13.1 18.9 3.5 16 13.1 13.1Z" fill="#c1e6a4" />
          </svg>
          <span style={{ fontSize: 26, color: "#ecece8" }}>skills</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <span style={{ fontSize: 68, lineHeight: 1.08, letterSpacing: "-0.02em" }}>Skills for coding agents</span>
          <span style={{ fontSize: 28, color: "#92938e" }}>
            {names.length ? names.join("  ·  ") : "Installable instruction sets"}
          </span>
        </div>
        <span style={{ fontSize: 22, color: "#6b6b66" }}>skills.sam1.space</span>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: OG_MONO, data: mono, weight: 500, style: "normal" }],
      headers: { "cache-control": "public, max-age=31536000, immutable" },
    }
  );
}
