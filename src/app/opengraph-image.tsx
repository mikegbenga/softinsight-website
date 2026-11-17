import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "SoftInsight Technologies Nigeria Limited — Technology that moves businesses forward";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/softinsight-lockup-dark.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#050d22",
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          color: "white",
        }}
      >
        <img src={logoSrc} width={385} height={105} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1, letterSpacing: -3 }}>Technology that moves</div>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -3 }}>
            businesses forward<span style={{ color: "#e3161b" }}>.</span>
          </div>
          <div style={{ display: "flex", marginTop: 36, fontSize: 24, color: "#a7b0c4", gap: 28 }}>
            <span>Software</span>
            <span>·</span>
            <span>Infrastructure</span>
            <span>·</span>
            <span>Training</span>
            <span>·</span>
            <span>Procurement</span>
          </div>
        </div>
        <div style={{ position: "absolute", top: 0, left: 0, width: 400, height: 8, background: "#e3161b" }} />
      </div>
    ),
    size,
  );
}
