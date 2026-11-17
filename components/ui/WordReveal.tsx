"use client";

import { Fragment, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useIntroRevealed } from "@lib/introState";
import type { TextBlock } from "@lib/text";

gsap.registerPlugin(useGSAP);

type WordRevealOptions = {
  delay?: number;
  duration?: number;
  stagger?: number;
  distance?: number;
  enabled?: boolean;
};

/**
 * Reveals every `[data-reveal-word]` inside the returned ref once per mount.
 * Scrubbed or per-group timelines should query `[data-reveal-word]` directly
 * and drive the timeline themselves — the markup still comes from <WordReveal />.
 */
export const useWordReveal = <T extends HTMLElement>({
  delay = 0,
  duration = 1,
  stagger = 0.06,
  distance = 110,
  enabled = true,
}: WordRevealOptions = {}) => {
  const ref = useRef<T>(null);
  const introRevealed = useIntroRevealed();
  const shouldAnimate = enabled && introRevealed;

  useGSAP(
    () => {
      if (!shouldAnimate) return;

      const words =
        ref.current?.querySelectorAll<HTMLElement>("[data-reveal-word]");
      if (!words?.length) return;

      const motion = gsap.matchMedia();

      motion.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(words, {
          yPercent: distance,
          opacity: 0,
          duration,
          delay,
          ease: "power4.out",
          stagger,
        });
      });

      motion.add("(prefers-reduced-motion: reduce)", () => {
        gsap.from(words, {
          opacity: 0,
          duration: 0.4,
          delay,
          stagger: stagger / 3,
        });
      });

      return () => motion.revert();
    },
    { scope: ref, dependencies: [shouldAnimate] }
  );

  return ref;
};

/**
 * Renders display text as per-word spans so any parent can stagger them.
 * Words carry `data-reveal-word`; the animation belongs to the consumer.
 * `nowrap` keeps words on one line (non-breaking), and can be turned off for
 * headings that should wrap on narrow screens.
 */
export const WordReveal = ({
  lines,
  nowrap = true,
}: {
  lines: TextBlock;
  nowrap?: boolean;
}) => (
  <>
    {lines.map((line, lineIndex) => (
      <span key={lineIndex} className="block">
        {line.map((word, wordIndex) => (
          <Fragment key={wordIndex}>
            <span
              data-reveal-word
              className={`inline-block align-top will-change-transform ${
                word.bold ? "font-bold" : ""
              }`}
            >
              {word.text}
            </span>
            {wordIndex < line.length - 1 ? (nowrap ? "\u00A0" : " ") : null}
          </Fragment>
        ))}
      </span>
    ))}
  </>
);
