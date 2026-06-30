import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Girmachew (Gimmy) Samson — CS @ Georgia Tech · Founder of Bantr";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadClashDisplay(): Promise<ArrayBuffer | null> {
  try {
    const base = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";
    const res = await fetch(`${base}/fonts/clash-display-bold.ttf`);
    if (!res.ok) return null;
    return res.arrayBuffer();
  } catch {
    return null;
  }
}

export default async function Image() {
  const clashDisplay = await loadClashDisplay();

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          overflow: "hidden",
          position: "relative",
          fontFamily: "Clash Display, sans-serif",
        }}
      >
        {/* Amber radial glow — mirrors the hero section */}
        <div
          style={{
            position: "absolute",
            top: -180,
            left: -140,
            width: 780,
            height: 780,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(245,166,35,0.22) 0%, rgba(245,166,35,0.06) 40%, transparent 68%)",
            display: "flex",
          }}
        />

        {/* Top — URL badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 32, height: 2, background: "#F5A623", display: "flex" }} />
          <span
            style={{
              color: "#555555",
              fontSize: 15,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            gimmy-samson.com
          </span>
        </div>

        {/* Middle — name + subtitle */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 106,
              fontWeight: 800,
              color: "#F0F0F0",
              lineHeight: 0.88,
              letterSpacing: "-0.035em",
              display: "flex",
            }}
          >
            Girmachew
          </span>
          <span
            style={{
              fontSize: 106,
              fontWeight: 800,
              color: "#F0F0F0",
              lineHeight: 0.88,
              letterSpacing: "-0.035em",
              display: "flex",
            }}
          >
            Samson
          </span>

          <div
            style={{
              width: 56,
              height: 3,
              background: "#F5A623",
              marginTop: 32,
              marginBottom: 26,
              display: "flex",
            }}
          />

          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <span style={{ color: "#AAAAAA", fontSize: 27, fontWeight: 400 }}>CS @ Georgia Tech</span>
            <span style={{ color: "#F5A623", fontSize: 27, fontWeight: 700 }}>·</span>
            <span style={{ color: "#AAAAAA", fontSize: 27, fontWeight: 400 }}>Founder, Bantr</span>
            <span style={{ color: "#F5A623", fontSize: 27, fontWeight: 700 }}>·</span>
            <span style={{ color: "#AAAAAA", fontSize: 27, fontWeight: 400 }}>AI Enthusiast</span>
          </div>
        </div>

        {/* Bottom — tech chips + award note */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 10 }}>
            {["React", "Next.js", "TypeScript", "Python"].map((t) => (
              <div
                key={t}
                style={{
                  padding: "7px 16px",
                  border: "1px solid #1D1D1D",
                  borderRadius: 4,
                  color: "#444444",
                  fontSize: 15,
                  display: "flex",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: clashDisplay
        ? [{ name: "Clash Display", data: clashDisplay, weight: 700 as const, style: "normal" as const }]
        : [],
    }
  );
}
