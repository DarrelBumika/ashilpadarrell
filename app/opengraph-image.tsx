import { ImageResponse } from "next/og";
import { site } from "@content/site";

export const alt = `${site.metaTitle} — ${site.url}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#0a0a0a",
        color: "#ffffff",
        padding: 72,
      }}
    >
      <div style={{ display: "flex", fontSize: 30, color: "#a3a3a3" }}>
        a. {site.firstName} {site.lastName}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 88,
          lineHeight: 1.08,
        }}
      >
        <span>digital designer,</span>
        <span>software developer</span>
        <span>& ai engineer</span>
      </div>

      <div style={{ display: "flex", fontSize: 28, color: "#a3a3a3" }}>
        {site.url.replace(/^https?:\/\//, "")}
      </div>
    </div>,
    size
  );
}
