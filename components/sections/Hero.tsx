"use client";

import { WordReveal, useWordReveal } from "@components/ui/WordReveal";
import { heroLines } from "@content/home";
import { toPlainText } from "@lib/text";

const Hero = () => {
  const headingRef = useWordReveal<HTMLHeadingElement>({ stagger: 0.07 });

  return (
    <div className="flex w-full flex-1 flex-col justify-center">
      <h1
        ref={headingRef}
        aria-label={toPlainText(heroLines)}
        className="text-9xl font-light py-4 pe-4 text-black text-start leading-flat tracking-tightest overflow-hidden z-1"
      >
        <WordReveal lines={heroLines} />
      </h1>
    </div>
  );
};

export default Hero;
