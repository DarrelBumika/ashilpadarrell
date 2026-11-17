"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WordReveal } from "@components/ui/WordReveal";
import { aboutKicker, aboutLines } from "@content/about";
import { hideForReveal } from "@lib/motion";
import { toPlainText } from "@lib/text";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const motion = gsap.matchMedia();

      motion.add("(prefers-reduced-motion: no-preference)", () => {
        const kicker = section.querySelector<HTMLElement>(".about-kicker");
        const words =
          section.querySelectorAll<HTMLElement>("[data-reveal-word]");
        if (!kicker || !words.length) return;

        hideForReveal([kicker, ...words]);

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

        timeline
          .to(
            kicker,
            { yPercent: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
            0
          )
          .to(
            words,
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power2.out",
              stagger: 0.1,
            },
            0.15
          );
      });

      return () => motion.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-title"
      className="relative z-10 flex h-dvh w-full justify-center bg-white px-8 pt-24 pb-40 text-black sm:pt-32 sm:pb-48 scroll-mt-[-100dvh]"
    >
      <div className="flex w-fit max-w-full flex-col justify-center items-start gap-2 text-start">
        <h2
          id="about-title"
          aria-label={`${aboutKicker} ${toPlainText(aboutLines)}`}
          className="max-w-full font-light text-[clamp(2rem,9vw,8rem)] leading-flat tracking-tightest"
        >
          <span className="about-kicker mb-2 block text-[clamp(1.25rem,3vw,3rem)] leading-none tracking-tightest">
            {aboutKicker}
          </span>

          <WordReveal lines={aboutLines} nowrap={false} />
        </h2>
      </div>
    </section>
  );
};

export default About;
