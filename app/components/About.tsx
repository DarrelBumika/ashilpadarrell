"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const motion = gsap.matchMedia();

      motion.add("(prefers-reduced-motion: no-preference)", () => {
        const heading = section.querySelectorAll<HTMLElement>(".about-heading");
        const paragraphs = section.querySelectorAll<HTMLElement>(".about-fade");

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            once: true,
          },
        });

        timeline
          .from(heading, {
            yPercent: 110,
            duration: 1,
            ease: "power4.out",
          })
          .from(
            paragraphs,
            {
              y: 40,
              opacity: 0,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.15,
            },
            "-=0.55"
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
      className="relative z-10 flex w-full h-dvh justify-center bg-white px-8 pt-24 pb-40 sm:pt-32 sm:pb-48 text-black"
    >
      <div className="flex w-fit flex-col justify-center items-start gap-2 text-start">
        <span className="text-5xl tracking-[-0.06em]">I am a</span><br />
        <h2 className="font-light">
          <span className="text-9xl leading-[0.8] tracking-[-0.06em]">digital <span className="font-bold">designer</span></span><br /> 
          <span className="text-9xl leading-[0.8] tracking-[-0.06em]"><span className="font-bold">software</span> developer</span><br />
          <span className="text-9xl leading-[0.8] tracking-[-0.06em]"><span className="font-bold">ai</span> engineer</span><br />
        </h2>
      </div>
    </section>
  );
};

export default About;
