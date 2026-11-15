"use client";

import { useWordReveal, WordReveal, type TextLine } from "./WordReveal";

const lines: TextLine[] = [
  [{ text: "design." }],
  [{ text: "develop." }],
  [{ text: "orchestrate." }],
];

const Slogan = () => {
  const sloganRef = useWordReveal<HTMLDivElement>({
    delay: 0.5,
    stagger: 0.14,
    duration: 1,
  });

  return (
    <div
      ref={sloganRef}
      aria-label="design. develop. orchestrate."
      className="font-bold text-black text-[32px] leading-[0.8] tracking-[-0.06em] text-start"
    >
      <WordReveal lines={lines} />
    </div>
  );
};

export default Slogan;
