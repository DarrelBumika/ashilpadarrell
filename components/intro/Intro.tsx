"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { site } from "@content/site";
import {
  isIntroRevealed,
  markIntroComplete,
  markIntroRevealed,
} from "@lib/introState";
import { prefersReducedMotion } from "@lib/motion";

gsap.registerPlugin(useGSAP);

const HOLD_S = 0.5;

const Intro = () => {
  const [visible, setVisible] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      // Repeat visits are hidden before paint via the inline script in the layout.
      if (isIntroRevealed()) return;

      const panel = panelRef.current;
      const backdrop = backdropRef.current;
      const name = nameRef.current;
      if (!panel || !backdrop || !name) return;

      const timeline = gsap.timeline({
        onComplete: () => {
          markIntroComplete();
          setVisible(false);
        },
      });

      if (prefersReducedMotion()) {
        timeline
          .set(name, { yPercent: 0, visibility: "visible" })
          .call(markIntroRevealed, undefined, "+=0.6")
          .to(panel, { opacity: 0, duration: 0.3, ease: "power1.out" })
          .to(
            backdrop,
            { opacity: 0, duration: 0.3, ease: "power1.out" },
            "<0.1"
          );
        return;
      }

      timeline
        .set(name, { yPercent: 110, visibility: "visible" })
        .to(name, { yPercent: 0, duration: 0.9, ease: "power4.out" })
        .call(markIntroRevealed, undefined, `+=${HOLD_S}`)
        .to(name, { yPercent: -35, duration: 0.9, ease: "power2.in" }, "<")
        .to(panel, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "<")
        .to(
          backdrop,
          { yPercent: -100, duration: 0.9, ease: "power4.inOut" },
          "<0.12"
        );
    },
    { scope: panelRef }
  );

  if (!visible) return null;

  return (
    <>
      <div
        ref={backdropRef}
        data-intro-screen
        aria-hidden
        className="fixed inset-0 z-[59] bg-black will-change-transform"
      />

      <div
        ref={panelRef}
        data-intro-screen
        aria-hidden
        className="fixed inset-0 z-[60] flex items-center justify-center bg-white px-6 text-black will-change-transform"
      >
        <p className="text-[clamp(2.5rem,6vw,8rem)] font-light leading-flat tracking-tightest">
          <span className="block overflow-hidden pt-4 pb-[0.06em]">
            <span
              ref={nameRef}
              style={{ visibility: "hidden" }}
              className="block will-change-transform"
            >
              a. <span className="font-bold">{site.firstName}</span>{" "}
              {site.lastName}
            </span>
          </span>
        </p>
      </div>
    </>
  );
};

export default Intro;
