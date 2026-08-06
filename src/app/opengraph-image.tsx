import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFFDF7",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 140,
            height: 140,
            borderRadius: 32,
            backgroundColor: "#0B5FFF",
            color: "#FFFFFF",
            fontSize: 84,
            fontWeight: 700,
            marginBottom: 32,
          }}
        >
          A
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            color: "#14171A",
            marginBottom: 16,
          }}
        >
          Aprende Conmigo
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#3F4448",
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          Lecciones gratuitas de lectura, escritura y tecnología básica
        </div>
      </div>
    ),
    { ...size },
  );
}
