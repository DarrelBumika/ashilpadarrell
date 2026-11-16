"use client";

import { Fragment, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const line = [{ text: "selected" }, { text: "works", bold: true }];

const selectedWorksText = "selected works";

const SelectedWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const motion = gsap.matchMedia();

      motion.add("(prefers-reduced-motion: no-preference)", () => {
        const words = section.querySelectorAll<HTMLElement>(".works-word");
        if (!words.length) return;

        gsap.set(words, { yPercent: 120, opacity: 0 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            // Keep in sync with the section's -100dvh scroll margin.
            end: "+=100%",
            pin: true,
            // ScrollTrigger skips pin spacing by default inside a flex parent.
            pinSpacing: true,
            scrub: true,
            anticipatePin: 1,
          },
        });

        timeline.to(
          words,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power2.out",
            stagger: 0.1,
          },
          0
        );
      });

      return () => motion.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="works"
      aria-labelledby="works-title"
      className="relative z-10 flex h-dvh w-full justify-center bg-white px-8 pt-24 pb-40 text-black sm:pt-32 sm:pb-48 scroll-mt-[-100dvh]"
    >
      <div className="flex w-fit max-w-full flex-col justify-center items-start gap-2 text-start">
        <h2
          id="works-title"
          aria-label={selectedWorksText}
          className="max-w-full whitespace-nowrap font-light text-[clamp(2rem,9vw,8rem)] leading-[0.8] tracking-[-0.06em]"
        >
          <span className="works-line block">
            {line.map((word, wordIndex) => (
              <Fragment key={wordIndex}>
                <span
                  className={`works-word inline-block will-change-transform ${
                    word.bold ? "font-bold" : ""
                  }`}
                >
                  {word.text}
                </span>
                {wordIndex < line.length - 1 ? " " : null}
              </Fragment>
            ))}
          </span>
        </h2>
      </div>
    </section>
  );
};

export default SelectedWorks;
