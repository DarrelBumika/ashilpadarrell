import type { Metadata } from "next";
import localFont from "next/font/local";
import Intro from "@components/Intro";
import SmoothScroll from "@components/SmoothScroll";
import "@app/globals.css";
import { isProd } from "@lib/env";

const nohemi = localFont({
  src: "./src/fonts/nohemi.ttf",
  variable: "--font-nohemi",
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.svg",
  },
  title: "darrell",
  description: "darrell's portfolio",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${nohemi.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("portfolio-intro-seen")){document.documentElement.dataset.intro="done"}}catch(e){}`,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `html[data-intro="done"] [data-intro-screen]{display:none!important}`,
          }}
        />
        <noscript>
          <style>{`[data-intro-screen]{display:none}`}</style>
        </noscript>
        {isProd && (
          <script
            defer
            src="https://analytics.ashilpadarrell.site/script.js"
            data-website-id="17a27bbf-201f-4560-afbb-ae8943c4b114"
          />
        )}
      </head>
      <body className="min-h-full flex flex-col">
        <SmoothScroll>
          <Intro />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
