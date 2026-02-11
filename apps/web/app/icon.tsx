import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon(): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0a",
        borderRadius: 6,
      }}
    >
      {/* Chadcn logo scaled for 32x32 */}
      <div
        style={{
          display: "flex",
          position: "relative",
          width: 18,
          height: 24,
        }}
      >
        {/* Back layer */}
        <div
          style={{
            position: "absolute",
            left: 7,
            top: 5,
            width: 11,
            height: 19,
            borderRadius: 6,
            background: "rgba(255, 255, 255, 0.15)",
          }}
        />
        {/* Middle layer */}
        <div
          style={{
            position: "absolute",
            left: 4,
            top: 3,
            width: 11,
            height: 19,
            borderRadius: 6,
            background: "rgba(255, 255, 255, 0.4)",
          }}
        />
        {/* Front layer */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 11,
            height: 19,
            borderRadius: 6,
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
