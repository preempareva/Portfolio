import { ImageResponse } from "next/og";

export const alt = "Preem Pareva — Turning data, tech & ideas into business impact.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0b",
          color: "#f3f0e8",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28, letterSpacing: 2 }}>
          PREEM PAREVA
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#c8ff3d" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 700, lineHeight: 1, letterSpacing: -3 }}>
          <div>TURNING DATA,</div>
          <div>TECH & IDEAS INTO</div>
          <div style={{ display: "flex", gap: 24 }}>
            BUSINESS <span style={{ color: "#c8ff3d", fontStyle: "italic", fontWeight: 400 }}>impact.</span>
          </div>
        </div>
        <div style={{ fontSize: 26, color: "#9a9aa2", letterSpacing: 3 }}>PRODUCT ANALYST · BUSINESS × TECHNOLOGY × ANALYTICS · MUMBAI</div>
      </div>
    ),
    size
  );
}
