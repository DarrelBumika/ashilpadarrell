"use client";

import { useWordReveal, WordReveal, type TextLine } from "./WordReveal";
import Slogan from "@components/Slogan";

const lines: TextLine[] = [
  [
    { text: "i" },
    { text: "design", bold: true },
    { text: "and" },
    { text: "develop", bold: true },
  ],
  [
    { text: "products" },
    { text: "that" },
    { text: "think.", bold: true },
  ],
];

const Hero = () => {
  const headingRef = useWordReveal<HTMLHeadingElement>({ stagger: 0.07 });

  return (
    <div className="flex flex-1 w-full flex-col justify-between text-center">
      <div className="flex flex-1 flex-col items-start justify-center w-full">
        <h1
          ref={headingRef}
          aria-label="i design and develop products that think."
          className="text-9xl font-light py-4 pe-4 text-black text-start leading-[0.8] tracking-[-0.06em] overflow-hidden z-1"
        >
          <WordReveal lines={lines} />
        </h1>
      </div>
      <Slogan />
    </div>
  );
};

export default Hero;
