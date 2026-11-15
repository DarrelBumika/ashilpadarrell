"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export type TextWord = { text: string; bold?: boolean };
export type TextLine = TextWord[];

type WordRevealOptions = {
  delay?: number;
  duration?: number;
  stagger?: number;
  distance?: number;
  enabled?: boolean;
};

export const useWordReveal = <T extends HTMLElement>({
  delay = 0,
  duration = 1,
  stagger = 0.06,
  distance = 110,
  enabled = true,
}: WordRevealOptions = {}) => {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      if (!enabled) return;

      const words = ref.current?.querySelectorAll<HTMLElement>(".reveal-word");
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
    { scope: ref, dependencies: [enabled] }
  );

  return ref;
};

export const WordReveal = ({ lines }: { lines: TextLine[] }) => {
  return (
    <>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.map((word, wi) => (
            <span key={wi} className="inline-block align-top">
              <span
                className={`reveal-word inline-block will-change-transform ${
                  word.bold ? "font-bold" : ""
                }`}
              >
                {word.text}
                {wi < line.length - 1 ? "\u00A0" : ""}
              </span>
            </span>
          ))}
        </span>
      ))}
    </>
  );
};
