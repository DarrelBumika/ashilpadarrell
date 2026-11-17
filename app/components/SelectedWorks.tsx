"use client";

import { Fragment, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const line = [{ text: "selected" }, { text: "works", bold: true }];

const works = ["ai assistant", "multi-agent system", "automation tools"];

const selectedWorksText = "selected works";

const SelectedWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const viewport = section.querySelector<HTMLElement>(".works-viewport");
      const track = section.querySelector<HTMLElement>(".works-track");
      const words = section.querySelectorAll<HTMLElement>(".works-word");
      const panels = section.querySelectorAll<HTMLElement>(".works-panel");
      if (!viewport || !track || !words.length || !panels.length) return;

      const motion = gsap.matchMedia();

      motion.add("(prefers-reduced-motion: no-preference)", () => {
        // The DOM stacks vertically by default (reduced-motion fallback).
        // Turn it into a one-screen-tall horizontal track while animating.
        gsap.set(viewport, { height: "100dvh", overflow: "hidden" });
        gsap.set(track, {
          display: "flex",
          width: "max-content",
          height: "100%",
        });
        gsap.set(panels, { width: "100vw", height: "100%", flex: "0 0 auto" });

        gsap.set(words, { yPercent: 120, opacity: 0 });

        // Timeline units, where 1 unit ≈ one screen of scroll.
        const INTRO = 1; // title reveal
        const MOVE = 0.6; // horizontal transition between slides
        const HOLD = 0.6; // pinned pause with each slide centered

        const workPanels = Array.from(panels).slice(1);
        const workWords = workPanels.map((panel) =>
          panel.querySelectorAll<HTMLElement>(".work-reveal")
        );
        gsap.set(workWords.flatMap((list) => Array.from(list)), {
          yPercent: 120,
          opacity: 0,
        });

        const total = INTRO + workPanels.length * (MOVE + HOLD);

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${total * 100}%`,
            pin: true,
            // ScrollTrigger skips pin spacing by default inside a flex parent.
            pinSpacing: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline.to(
          words,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
          },
          0
        );

        workPanels.forEach((panel, index) => {
          const at = INTRO + index * (MOVE + HOLD);

          timeline
            .to(
              track,
              {
                x: () => -window.innerWidth * (index + 1),
                duration: MOVE,
                ease: "power2.inOut",
              },
              at
            )
            .to(
              workWords[index],
              {
                yPercent: 0,
                opacity: 1,
                duration: MOVE * 0.8,
                ease: "power2.out",
                stagger: 0.06,
              },
              at + MOVE * 0.3
            )
            // Empty tween widens the timeline so the slide stays centered.
            .to({}, { duration: HOLD }, at + MOVE);
        });
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
      className="relative z-10 w-full bg-white text-black scroll-mt-[-100dvh]"
    >
      <div className="works-viewport relative w-full">
        <div className="works-track relative w-full will-change-transform">
          <div className="works-panel flex h-dvh w-full shrink-0 flex-col items-center justify-center px-8 pt-24 pb-40 sm:pt-32 sm:pb-48">
            <div className="flex w-fit max-w-full flex-col items-center justify-center gap-2 text-center">
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
          </div>

          {works.map((work, workIndex) => {
            const workWords = work.split(" ");

            return (
              <article
                key={work}
                aria-labelledby={`work-${workIndex + 1}-title`}
                className="works-panel flex h-dvh w-full shrink-0 flex-col items-center justify-center px-8 py-24 sm:py-32"
              >
                <div className="flex w-fit max-w-full flex-col items-center justify-center gap-4 text-center">
                  <h3
                    id={`work-${workIndex + 1}-title`}
                    aria-label={work}
                    className="max-w-full font-light text-[clamp(2rem,9vw,16rem)] leading-[0.8] tracking-[-0.06em]"
                  >
                    {workWords.map((word, wordIndex) => (
                      <Fragment key={wordIndex}>
                        <span
                          className={`work-reveal inline-block will-change-transform ${
                            wordIndex === workWords.length - 1
                              ? "font-bold"
                              : ""
                          }`}
                        >
                          {word}
                        </span>
                        {wordIndex < workWords.length - 1 ? " " : null}
                      </Fragment>
                    ))}
                  </h3>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SelectedWorks;
