"use client";

import { useWordReveal, WordReveal, type TextLine } from "./WordReveal";

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
    <div className="flex w-full flex-1 flex-col justify-center">
      <h1
        ref={headingRef}
        aria-label="i design and develop products that think."
        className="text-9xl font-light py-4 pe-4 text-black text-start leading-[0.8] tracking-[-0.06em] overflow-hidden z-1"
      >
        <WordReveal lines={lines} />
      </h1>
    </div>
  );
};

export default Hero;
