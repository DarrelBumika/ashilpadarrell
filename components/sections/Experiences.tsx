"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WordReveal } from "@components/ui/WordReveal";
import { experiences, experiencesHeading } from "@content/experiences";
import { hideForReveal } from "@lib/motion";
import { toPlainText } from "@lib/text";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Experiences = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const headingWords =
        section.querySelectorAll<HTMLElement>("[data-reveal-word]");
      const rows =
        section.querySelectorAll<HTMLElement>("[data-experience-row]");
      if (!headingWords.length || !rows.length) return;

      const motion = gsap.matchMedia();

      motion.add("(prefers-reduced-motion: no-preference)", () => {
        hideForReveal(headingWords);
        hideForReveal(rows);

        // The heading leads, then every row slides up out of its own clipped
        // line. Scrubbing ties the ride to the section crossing the viewport,
        // so nothing finishes while it is still below the fold.
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "bottom 75%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(
            headingWords,
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.08,
            },
            0
          )
          .to(
            rows,
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power2.out",
              stagger: 0.12,
            },
            0.35
          );
      });

      return () => motion.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-labelledby="experiences-title"
      className="relative z-10 flex min-h-dvh w-full scroll-mt-24 flex-col justify-center items-center bg-white px-8 py-24 text-black sm:py-32"
    >
      <div className="flex w-fit flex-col gap-10 sm:gap-14">
        <h2
          id="experiences-title"
          aria-label={toPlainText(experiencesHeading)}
          className="max-w-full font-light text-[clamp(2rem,9vw,8rem)] leading-flat tracking-tightest"
        >
          <WordReveal lines={experiencesHeading} />
        </h2>

        <ol className="flex w-full flex-col">
          {experiences.map((experience) => (
            <li
              key={`${experience.company}-${experience.period}`}
              className="overflow-hidden"
            >
              <div
                data-experience-row
                className="grid gap-2 py-6 will-change-transform sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8 sm:py-8"
              >
                <div className="flex flex-col gap-1">
                  <h3 className="text-2xl font-light leading-flat tracking-tightest sm:text-4xl">
                    {experience.role}{" "}
                    <span className="font-bold">{experience.company}</span>
                  </h3>
                </div>
                <p className="text-sm text-black/60 sm:text-base">
                  {experience.period}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Experiences;
