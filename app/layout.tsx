import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import SiteFooterProvider from "@components/SiteFooterProvider";
import SmoothScroll from "@components/SmoothScroll";
import Intro from "@components/intro/Intro";
import { site } from "@content/site";
import { isDev, isPreview, isProd } from "@lib/env";
import "@app/globals.css";

const nohemi = localFont({
  src: "../assets/fonts/nohemi.ttf",
  variable: "--font-nohemi",
  weight: "100 900",
  display: "swap",
});

const title = isDev
  ? `${site.firstName} [Dev]`
  : isPreview
    ? `${site.firstName} [Preview]`
    : site.firstName;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title,
    description: site.description,
    siteName: `${site.firstName} ${site.lastName}`,
  },
  twitter: {
    card: "summary",
    title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
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
            src={site.analytics.src}
            data-website-id={site.analytics.websiteId}
          />
        )}
      </head>
      <body className="min-h-full flex flex-col">
        <SiteFooterProvider>
          <SmoothScroll>
            <Intro />
            {children}
          </SmoothScroll>
        </SiteFooterProvider>
      </body>
    </html>
  );
}
