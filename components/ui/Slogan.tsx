"use client";

import { WordReveal, useWordReveal } from "@components/ui/WordReveal";
import { sloganLines } from "@content/home";
import { toPlainText } from "@lib/text";

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
      aria-label={toPlainText(sloganLines)}
      className="font-bold text-xl leading-flat tracking-tightest text-start"
    >
      <WordReveal lines={sloganLines} />
    </div>
  );
};

export default Slogan;
