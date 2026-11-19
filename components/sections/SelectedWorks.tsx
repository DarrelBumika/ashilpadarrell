"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WordReveal } from "@components/ui/WordReveal";
import { works, worksHeading } from "@content/works";
import { hideForReveal } from "@lib/motion";
import { toPlainText } from "@lib/text";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const SelectedWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const viewport = section.querySelector<HTMLElement>(".works-viewport");
      const track = section.querySelector<HTMLElement>(".works-track");
      const panels = section.querySelectorAll<HTMLElement>(".works-panel");
      if (!viewport || !track || !panels.length) return;

      const headingWords =
        panels[0].querySelectorAll<HTMLElement>("[data-reveal-word]");
      if (!headingWords.length) return;

      const workPanels = Array.from(panels).slice(1);
      const workWords = workPanels.map((panel) =>
        panel.querySelectorAll<HTMLElement>("[data-reveal-word]")
      );

      const motion = gsap.matchMedia();

      // Phones keep the vertical stack. A pinned horizontal track fights touch
      // scrolling and long project names cannot hold a single 100vw panel at
      // 320px, so each group reveals on its own as it crosses the fold.
      motion.add(
        "(prefers-reduced-motion: no-preference) and (max-width: 767px)",
        () => {
          const groups = [headingWords, ...workWords];
          const triggers = [panels[0], ...workPanels];
          hideForReveal(groups.flatMap((group) => Array.from(group)));

          groups.forEach((words, index) => {
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: triggers[index],
                  start: "top 85%",
                  end: "top 55%",
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              })
              .to(
                words,
                {
                  yPercent: 0,
                  opacity: 1,
                  duration: 0.6,
                  ease: "power2.out",
                  stagger: 0.06,
                },
                0
              );
          });
        }
      );

      motion.add(
        "(prefers-reduced-motion: no-preference) and (min-width: 768px)",
        () => {
          // The DOM stacks vertically by default (reduced-motion fallback).
          // Turn it into a one-screen-tall horizontal track while animating.
          gsap.set(viewport, { height: "100dvh", overflow: "hidden" });
          gsap.set(track, {
            display: "flex",
            width: "max-content",
            height: "100%",
          });
          gsap.set(panels, {
            width: "100vw",
            height: "100%",
            flex: "0 0 auto",
          });

          hideForReveal(headingWords);

          // Timeline units, where 1 unit ≈ one screen of scroll.
          const INTRO = 1; // title reveal
          const MOVE = 0.6; // horizontal transition between slides
          const HOLD = 0.6; // pinned pause with each slide centered

          hideForReveal(workWords.flatMap((list) => Array.from(list)));

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
            headingWords,
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
        }
      );

      return () => motion.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="works"
      aria-labelledby="works-title"
      className="relative z-10 w-full bg-white text-black md:scroll-mt-[-100dvh]"
    >
      <div className="works-viewport relative w-full">
        <div className="works-track relative w-full will-change-transform">
          <div className="works-panel flex min-h-[50dvh] w-full shrink-0 flex-col items-center justify-center px-5 py-16 md:h-dvh md:px-8 md:pt-24 md:pb-40">
            <div className="flex w-fit max-w-full flex-col items-center justify-center gap-2 text-center">
              <h2
                id="works-title"
                aria-label={toPlainText(worksHeading)}
                className="max-w-full font-light text-display leading-flat tracking-tightest"
              >
                <WordReveal lines={worksHeading} nowrap={false} />
              </h2>
            </div>
          </div>

          {works.map((work, workIndex) => {
            const parts = work.split(" ");

            return (
              <article
                key={work}
                aria-labelledby={`work-${workIndex + 1}-title`}
                className="works-panel flex min-h-[50dvh] w-full shrink-0 flex-col items-center justify-center px-5 py-16 md:h-dvh md:px-8 md:py-24"
              >
                <div className="flex w-fit max-w-full flex-col items-center justify-center gap-4 text-center">
                  <h3
                    id={`work-${workIndex + 1}-title`}
                    aria-label={work}
                    className="max-w-full font-light text-display-xl leading-flat tracking-tightest"
                  >
                    <WordReveal
                      lines={[
                        parts.map((text, index) => ({
                          text,
                          bold: index === parts.length - 1,
                        })),
                      ]}
                      nowrap={false}
                    />
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
