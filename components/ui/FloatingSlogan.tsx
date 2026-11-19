"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Slogan from "@components/ui/Slogan";
import { useSiteFooter } from "@hooks/useSiteFooter";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// The gutter is read from the layer itself so mobile and desktop padding
// cannot drift apart from the header and footer.
const FloatingSlogan = () => {
  const layerRef = useRef<HTMLDivElement>(null);
  const sloganRef = useRef<HTMLDivElement>(null);
  const { footer } = useSiteFooter();

  useGSAP(
    () => {
      const layer = layerRef.current;
      const slogan = sloganRef.current;
      if (!layer || !slogan || !footer) return;

      const setY = gsap.quickSetter(layer, "y", "px");

      const place = () => {
        const height = slogan.offsetHeight;
        const viewport = window.innerHeight;
        const footerTop = footer.getBoundingClientRect().top;
        const pad = parseFloat(getComputedStyle(layer).paddingTop) || 0;

        // The layer sits at the top-left by default; the offset parks it at
        // the bottom-left until the footer's top edge reaches it.
        const restY = Math.max(0, viewport - pad * 2 - height);
        const restTop = viewport - pad - height;

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
    { scope: layerRef, dependencies: [footer] }
  );

  return (
    <div
      ref={layerRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-30 hidden p-5 will-change-transform sm:p-8 lg:block"
    >
      <div ref={sloganRef} className="w-fit">
        <Slogan />
      </div>
    </div>
  );
};

export default FloatingSlogan;
