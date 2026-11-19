import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col justify-between bg-black p-5 text-white sm:p-8">
      <p className="text-xl font-light tracking-tightest">404</p>

      <div>
        <h1 className="font-light text-display leading-flat tracking-tightest">
          nothing <span className="font-bold">here.</span>
        </h1>
        <p className="mt-6 text-sm text-white/50">
          the page you are looking for does not exist.
        </p>
      </div>

      <Link
        href="/"
        className="text-xl font-light tracking-tightest underline-offset-4 hover:underline"
      >
        back home
      </Link>
    </main>
  );
}
