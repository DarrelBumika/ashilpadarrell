"use client";

import { WordReveal, useWordReveal } from "@components/ui/WordReveal";
import { heroLines } from "@content/home";
import { site } from "@content/site";
import { toPlainText } from "@lib/text";

const Hero = () => {
  const headingRef = useWordReveal<HTMLParagraphElement>({ stagger: 0.07 });

  return (
    <div className="flex w-full flex-1 flex-col justify-center">
      {/* The visible line is a tagline; the page's real H1 names the person and role. */}
      <h1 className="sr-only">{site.metaTitle}</h1>
      <p
        ref={headingRef}
        aria-label={toPlainText(heroLines)}
        className="z-1 overflow-hidden py-2 pe-2 text-start text-hero font-light leading-flat tracking-tightest text-black sm:py-4 sm:pe-4"
      >
        <WordReveal lines={heroLines} nowrap={false} />
      </p>
    </div>
  );
};

export default Hero;
