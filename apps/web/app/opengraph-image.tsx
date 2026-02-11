import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "chadcn - Production-Ready SaaS Blocks";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

function ChadcnLogo({ size = 100 }: { size?: number }): React.ReactElement {
  const scale = size / 140;
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        width: size * 0.85,
        height: size,
      }}
    >
      {/* Back layer */}
      <div
        style={{
          position: "absolute",
          left: 50 * scale,
          top: 40 * scale,
          width: 70 * scale,
          height: 140 * scale,
          borderRadius: 35 * scale,
          background: "rgba(255, 255, 255, 0.15)",
        }}
      />
      {/* Middle layer */}
      <div
        style={{
          position: "absolute",
          left: 25 * scale,
          top: 20 * scale,
          width: 70 * scale,
          height: 140 * scale,
          borderRadius: 35 * scale,
          background: "rgba(255, 255, 255, 0.4)",
        }}
      />
      {/* Front layer */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 70 * scale,
          height: 140 * scale,
          borderRadius: 35 * scale,
          background: "#ffffff",
        }}
      />
    </div>
  );
}

export default function OpenGraphImage(): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0a",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 40,
        }}
      >
        <ChadcnLogo size={120} />
      </div>

      {/* Title */}
      <div
        style={{
          display: "flex",
          fontSize: 72,
          fontWeight: 700,
          color: "#fafafa",
          marginBottom: 16,
          letterSpacing: "-0.02em",
        }}
      >
        chadcn
      </div>

      {/* Subtitle */}
      <div
        style={{
          display: "flex",
          fontSize: 32,
          color: "#a1a1aa",
        }}
      >
        Production-Ready SaaS Blocks
      </div>

      {/* Tags */}
      <div
        style={{
          display: "flex",
          gap: 16,
          marginTop: 48,
        }}
      >
        {["React", "Next.js", "Tailwind", "shadcn"].map((tag) => (
          <div
            key={tag}
            style={{
              padding: "12px 24px",
              background: "#27272a",
              borderRadius: 9999,
              color: "#a1a1aa",
              fontSize: 20,
            }}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>,
    {
      ...size,
    }
  );
}
