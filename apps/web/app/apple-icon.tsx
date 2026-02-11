import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon(): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0a",
        borderRadius: 40,
      }}
    >
      {/* Chadcn logo scaled for 180x180 */}
      <div
        style={{
          display: "flex",
          position: "relative",
          width: 75,
          height: 100,
        }}
      >
        {/* Back layer */}
        <div
          style={{
            position: "absolute",
            left: 36,
            top: 29,
            width: 50,
            height: 100,
            borderRadius: 25,
            background: "rgba(255, 255, 255, 0.15)",
          }}
        />
        {/* Middle layer */}
        <div
          style={{
            position: "absolute",
            left: 18,
            top: 14,
            width: 50,
            height: 100,
            borderRadius: 25,
            background: "rgba(255, 255, 255, 0.4)",
          }}
        />
        {/* Front layer */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 50,
            height: 100,
            borderRadius: 25,
            background: "#ffffff",
          }}
        />
      </div>
    </div>,
    {
      ...size,
    }
  );
}
