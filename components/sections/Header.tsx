"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Slogan from "@components/ui/Slogan";
import { WordReveal, useWordReveal } from "@components/ui/WordReveal";
import { sections } from "@content/nav";
import { site, wordmarkInline } from "@content/site";
import { useSiteFooter } from "@hooks/useSiteFooter";
import { prefersReducedMotion } from "@lib/motion";
import { pauseScroll, resumeScroll } from "@lib/scrollLock";
import type { TextBlock } from "@lib/text";

gsap.registerPlugin(useGSAP);

const menuLine: TextBlock = [[{ text: "menu" }]];

const Header = () => {
  const titleRef = useWordReveal<HTMLParagraphElement>({ stagger: 0.07 });
  const menuRef = useWordReveal<HTMLSpanElement>({ stagger: 0.07 });

  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const menuFooterRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const { footer } = useSiteFooter();

  const close = () => setOpen(false);

  useGSAP(
    () => {
      const header = headerRef.current;
      if (!header || !footer) return;

      const duration = prefersReducedMotion() ? 0 : 0.5;

      const setHidden = (hidden: boolean) => {
        header.inert = hidden;
        if (hidden) header.setAttribute("aria-hidden", "true");
        else header.removeAttribute("aria-hidden");
      };

      // The footer rises over the page, so the header steps aside instead of
      // riding along on top of it. Start the slide before the footer reaches
      // the header so the two never overlap on screen.
      const hide = () =>
        gsap.to(header, {
          yPercent: -100,
          opacity: 0,
          duration,
          ease: "power3.in",
          overwrite: true,
        });

      const show = () =>
        gsap.to(header, {
          yPercent: 0,
          opacity: 1,
          duration,
          ease: "power3.out",
          overwrite: true,
        });

      let hidden = false;

      // Measure the footer directly on scroll instead of using a cached
      // ScrollTrigger boundary: the pinned sections above add height after
      // mount, which can leave those boundaries stale.
      const sync = () => {
        const shouldHide =
          footer.getBoundingClientRect().top <= header.offsetHeight + 64;
        if (shouldHide === hidden) return;
        hidden = shouldHide;
        // Focusability flips immediately; the tween is only the visual part.
        // Tying this to an animation callback leaks a focusable header when
        // reduced motion collapses the duration to zero.
        setHidden(shouldHide);
        if (shouldHide) hide();
        else show();
      };

      sync();
      window.addEventListener("scroll", sync, { passive: true });
      window.addEventListener("resize", sync);

      return () => {
        window.removeEventListener("scroll", sync);
        window.removeEventListener("resize", sync);
        gsap.killTweensOf(header);
        gsap.set(header, { clearProps: "transform,opacity" });
        setHidden(false);
      };
    },
    { dependencies: [footer] }
  );

  useGSAP(
    () => {
      const words =
        menuFooterRef.current?.querySelectorAll<HTMLElement>(
          "[data-reveal-word]"
        );
      const email = emailRef.current;
      if (!words?.length || !email) return;

      const reduced = prefersReducedMotion();
      const distance = reduced ? 0 : 110;

      if (open) {
        gsap.fromTo(
          words,
          { yPercent: distance, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: reduced ? 0.4 : 0.9,
            delay: 0.25,
            ease: "power4.out",
            stagger: reduced ? 0 : 0.12,
            overwrite: true,
          }
        );

        gsap.fromTo(
          email,
          { yPercent: distance, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: reduced ? 0.4 : 0.8,
            delay: 0.5,
            ease: "power3.out",
            overwrite: true,
          }
        );
      } else {
        gsap.to([...words, email], {
          yPercent: distance,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          stagger: 0.02,
          overwrite: true,
        });
      }
    },
    { dependencies: [open] }
  );

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusable = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    document.body.style.overflow = "hidden";
    // Lenis owns the scroll position, so body overflow alone does not lock it.
    pauseScroll();
    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      resumeScroll();
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-40 flex w-full items-center justify-between p-5 text-black will-change-transform sm:p-8"
      >
        <p
          ref={titleRef}
          className="text-xl font-light tracking-tightest pe-2 overflow-hidden"
        >
          <WordReveal lines={wordmarkInline} />
        </p>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-label="open menu"
          aria-expanded={open}
          aria-controls="site-menu"
          className="-my-3 cursor-pointer py-3"
        >
          <span
            ref={menuRef}
            className="block text-xl font-light tracking-tightest pe-2 overflow-hidden"
          >
            <WordReveal lines={menuLine} />
          </span>
        </button>
      </header>

      <div
        ref={dialogRef}
        aria-hidden={open ? undefined : true}
        inert={!open}
        className={`fixed inset-0 z-50 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          onClick={close}
          className={`absolute inset-0 bg-black/75 transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        <aside
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="menu"
          className={`absolute top-0 right-0 flex h-dvh w-full flex-col justify-between overflow-y-auto overscroll-contain bg-white px-5 py-6 text-black transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] sm:w-1/2 sm:px-8 sm:py-8 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-start justify-end">
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="close menu"
              className="-my-3 cursor-pointer py-3 pe-2 text-xl font-light tracking-tightest"
            >
              close
            </button>
          </div>

          <nav aria-label="main">
            <ul className="flex flex-col gap-3 sm:gap-0">
              {sections.map((link, index) => (
                <li
                  key={link.href}
                  className={`flex justify-end transition-all duration-500 ease-out ${
                    open
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  }`}
                  style={{
                    transitionDelay: open ? `${150 + index * 70}ms` : "0ms",
                  }}
                >
                  <a
                    href={link.href}
                    onClick={close}
                    className="flex items-baseline gap-2 py-2 text-4xl font-light leading-flat tracking-tightest sm:gap-3 sm:py-0 sm:text-5xl lg:text-9xl"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div
            ref={menuFooterRef}
            className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between"
          >
            <Slogan animateOnMount={false} />
            <a
              ref={emailRef}
              href={`mailto:${site.email}`}
              className="inline-flex min-h-11 items-center break-all py-2 leading-flat text-sm sm:min-h-0 sm:py-0 sm:text-base"
            >
              {site.email}
            </a>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Header;
