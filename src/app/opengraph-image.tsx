import { ImageResponse } from "next/og";

export const alt = "Tong Milz — Software Developer Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: "#f4f7f2",
          backgroundColor: "#070a0f",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 18,
              background: "#b8ff5a",
              color: "#070a0f",
              fontSize: 22,
              fontWeight: 900,
            }}
          >
            TM
          </div>
          <div style={{ fontSize: 26, color: "#929caa" }}>Software Developer · Munich</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 82, fontWeight: 900, letterSpacing: "-4px" }}>Tong Milz</div>
          <div style={{ fontSize: 40, color: "#b8ff5a", fontWeight: 700 }}>
            Backend systems with product thinking.
          </div>
          <div style={{ display: "flex", gap: 18, marginTop: 18, fontSize: 24, color: "#c8ced7" }}>
            <span>Java 21</span><span>·</span><span>Spring Boot</span><span>·</span><span>Kafka</span><span>·</span><span>React</span><span>·</span><span>AI</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
