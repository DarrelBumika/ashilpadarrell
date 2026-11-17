"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@components/sections/Hero";
import portrait from "@assets/img/me.webp";
import { site } from "@content/site";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HomeStage = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const stage = section?.querySelector<HTMLElement>("[data-hero-stage]");
      if (!section || !stage) return;

      const motion = gsap.matchMedia();

      motion.add("(prefers-reduced-motion: no-preference)", () => {
        // Hold the hero in place while the about section slides up over it.
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        });

        gsap.to(stage, {
          scale: 0.94,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      return () => motion.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative h-screen w-full overflow-hidden"
    >
      <div
        data-hero-stage
        className="relative h-full w-full will-change-transform"
      >
        <div className="flex h-full w-full flex-col items-center justify-center p-8">
          <Hero />
        </div>
        <Image
          src={portrait}
          alt={`portrait of ${site.fullName}`}
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="pointer-events-none absolute top-0 right-0 h-screen w-auto object-cover mask-[linear-gradient(to_bottom,black_20%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black_20%,transparent)]"
        />
      </div>
    </section>
  );
};

export default HomeStage;
