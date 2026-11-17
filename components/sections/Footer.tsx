"use client";

import { useCallback, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextButton from "@components/ui/TextButton";
import { WordReveal } from "@components/ui/WordReveal";
import { sections } from "@content/nav";
import { site, wordmarkStacked } from "@content/site";
import { useSiteFooter } from "@hooks/useSiteFooter";
import { hideForReveal } from "@lib/motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Footer = ({ year }: { year: number }) => {
  const { setFooter } = useSiteFooter();
  const footerRef = useRef<HTMLElement>(null);

  // Publish the element to the provider so Header and FloatingSlogan can
  // measure it, and keep a local ref for the GSAP scope.
  const attachFooter = useCallback(
    (node: HTMLElement | null) => {
      footerRef.current = node;
      setFooter(node);
    },
    [setFooter]
  );

  useGSAP(
    () => {
      const footer = footerRef.current;
      if (!footer) return;

      const copy = footer.querySelector<HTMLElement>("[data-footer-copy]");
      const rows = Array.from(
        footer.querySelectorAll<HTMLElement>(
          "[data-footer-link], [data-reveal-word]"
        )
      );
      if (!copy || !rows.length) return;

      const motion = gsap.matchMedia();

      motion.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = [...rows, copy];
        hideForReveal(targets);

        // The footer is the last screen, so it never scrolls past: its whole
        // entrance is the final viewport of scroll. Progress 0 is its top edge
        // touching the bottom of the screen, progress 1 is it filling the
        // screen at the end of the page. A timed reveal played the wordmark
        // out while it was still below the fold; scrubbing keeps every row
        // moving exactly as long as it is on screen.
        const RISE = 0.3;

        let tweens: gsap.core.Tween[] = [];

        // A row starts rising when it crosses the bottom edge, which is its
        // offset inside the footer as a fraction of the viewport. One fixed
        // stagger cannot express that: the rows are spread over a full screen.
        // The rows near the bottom have little scroll left before the page
        // bottoms out, so their rise fills the remainder instead of being
        // clipped there.
        const SHORTEST = 0.12;
        const layout = () => {
          if (!tweens.length) return;
          const span = Math.min(footer.offsetHeight, window.innerHeight) || 1;
          tweens.forEach((tween, index) => {
            const start = gsap.utils.clamp(
              0,
              1 - SHORTEST,
              targets[index].offsetTop / span
            );
            tween
              .startTime(start)
              .duration(Math.max(SHORTEST, Math.min(RISE, 1 - start)));
          });
        };

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: footer,
            start: "top bottom",
            end: "top top",
            scrub: true,
            invalidateOnRefresh: true,
            onRefresh: layout,
          },
        });

        tweens = targets.map((target) => {
          const tween = gsap.to(target, {
            yPercent: 0,
            opacity: 1,
            duration: RISE,
            ease: "power2.out",
          });
          timeline.add(tween, 0);
          return tween;
        });

        layout();
      });

      return () => motion.revert();
    },
    { scope: footerRef }
  );

  return (
    <footer
      id="site-footer"
      ref={attachFooter}
      className="relative z-20 flex flex-col justify-between gap-12 min-h-dvh w-full overflow-hidden bg-black px-5 py-6 text-sm text-white sm:px-8 sm:py-8"
    >
      <div className="w-full flex justify-end gap-8 sm:gap-32">
        <div className="flex flex-col items-end gap-4 text-end text-2xl sm:text-4xl">
          {site.socials.map((social) => (
            <span
              key={social.href}
              data-footer-link
              className="inline-flex will-change-transform"
            >
              <TextButton href={social.href} external>
                {social.label}
              </TextButton>
            </span>
          ))}
        </div>
        <nav
          aria-label="footer"
          className="flex flex-col items-end gap-4 text-end text-2xl sm:text-4xl"
        >
          {sections.map((link) => (
            <span
              key={link.href}
              data-footer-link
              className="inline-flex will-change-transform"
            >
              <TextButton href={link.href}>{link.label}</TextButton>
            </span>
          ))}
        </nav>
      </div>

      <div className="w-full flex flex-col items-end gap-4 text-end text-2xl sm:text-4xl">
        <span
          data-footer-link
          className="inline-flex max-w-full break-all will-change-transform"
        >
          <TextButton href={`mailto:${site.email}`}>{site.email}</TextButton>
        </span>
        <span data-footer-link className="inline-flex will-change-transform">
          <TextButton href={site.phone.href}>{site.phone.display}</TextButton>
        </span>
      </div>

      <div className="w-full flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-end">
        {/* Fluid so the wordmark never runs past the viewport on phones. */}
        <p className="text-[clamp(3rem,17.8vw,16rem)] leading-flat tracking-tightest font-light">
          <WordReveal lines={wordmarkStacked} />
        </p>
        <p data-footer-copy className="text-sm text-white/50">
          &copy; {year} {site.fullName}. all rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
