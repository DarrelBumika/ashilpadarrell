import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
      className={`${nohemi.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
