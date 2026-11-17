import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import SiteFooterProvider from "@components/SiteFooterProvider";
import SmoothScroll from "@components/SmoothScroll";
import Intro from "@components/intro/Intro";
import StructuredData from "@components/StructuredData";
import { site } from "@content/site";
import { isDev, isPreview, isProd } from "@lib/env";
import "@app/globals.css";

const nohemi = localFont({
  src: "../assets/fonts/nohemi.ttf",
  variable: "--font-nohemi",
  weight: "100 900",
  display: "swap",
});

const environmentSuffix = isDev ? " [Dev]" : isPreview ? " [Preview]" : "";
const title = `${site.metaTitle}${environmentSuffix}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.description,
  applicationName: `${site.firstName} ${site.lastName}`,
  authors: [{ name: site.fullName, url: site.url }],
  creator: site.fullName,
  category: "Portfolio",
  keywords: [
    site.fullName,
    "digital designer",
    "software developer",
    "ai engineer",
    "portfolio",
  ],
  robots: isProd
    ? { index: true, follow: true }
    : { index: false, follow: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title,
    description: site.description,
    siteName: `${site.firstName} ${site.lastName}`,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
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
        <StructuredData />
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
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          skip to content
        </a>
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
