"use client";

import { useWordReveal, WordReveal, type TextLine } from "@components/WordReveal";

const lines: TextLine[] = [
  [{ text: "design." }],
  [{ text: "develop." }],
  [{ text: "orchestrate." }],
];

const Slogan = ({ animateOnMount = true }: { animateOnMount?: boolean }) => {
  const sloganRef = useWordReveal<HTMLDivElement>({
    delay: 0.5,
    stagger: 0.14,
    duration: 1,
    enabled: animateOnMount,
  });

  return (
    <div
      ref={sloganRef}
      aria-label="design. develop. orchestrate."
      className="font-bold text-xl leading-[0.8] tracking-[-0.06em] text-start"
    >
      <WordReveal lines={lines} />
    </div>
  );
};

export default Slogan;
