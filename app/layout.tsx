import type { Metadata } from "next";
import localFont from "next/font/local";
import Intro from "@components/Intro";
import "@app/globals.css";

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
      </head>
      <body className="min-h-full flex flex-col">
        <Intro />
        {children}
      </body>
    </html>
  );
}
