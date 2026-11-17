"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Slogan from "@components/Slogan";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Matches the p-8 gutter used by the header and footer.
const PAD = 32;

const FloatingSlogan = () => {
  const layerRef = useRef<HTMLDivElement>(null);
  const sloganRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const layer = layerRef.current;
      const slogan = sloganRef.current;
      const footer = document.querySelector<HTMLElement>("#site-footer");
      if (!layer || !slogan || !footer) return;

      const setY = gsap.quickSetter(layer, "y", "px");

      const place = () => {
        const height = slogan.offsetHeight;
        const viewport = window.innerHeight;
        const footerTop = footer.getBoundingClientRect().top;

        // The layer sits at the top-left by default; the offset parks it at
        // the bottom-left until the footer's top edge reaches it.
        const restY = Math.max(0, viewport - PAD * 2 - height);
        const restTop = viewport - PAD - height;

        setY(
          footerTop >= restTop
            ? restY
            : Math.max(0, restY * (footerTop / restTop))
        );

        // Flip to white while the black footer sweeps underneath it.
        const covered = gsap.utils.clamp(
          0,
          1,
          (restTop + height - footerTop) / height
        );
        const level = Math.round(covered * 255);
        slogan.style.color = `rgb(${level}, ${level}, ${level})`;
      };

      const trigger = ScrollTrigger.create({
        trigger: footer,
        start: "top bottom",
        end: "top top",
        onUpdate: place,
      });

      // Reposition once ScrollTrigger has settled the pinned sections; its
      // transient layout during refresh would give wrong measurements.
      ScrollTrigger.addEventListener("refresh", place);

      place();

      return () => {
        ScrollTrigger.removeEventListener("refresh", place);
        trigger.kill();
      };
    },
    { scope: layerRef }
  );

  return (
    <div
      ref={layerRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-30 p-8 will-change-transform"
    >
      <div ref={sloganRef} className="w-fit">
        <Slogan />
      </div>
    </div>
  );
};

export default FloatingSlogan;
