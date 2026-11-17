"use client";

import gsap from "gsap";

/** Matches the distance reveal words travel from below their mask. */
export const REVEAL_DISTANCE = 120;

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Parks reveal targets below their container so a timeline can slide them in.
 * Reduced-motion branches should skip the distance and only fade.
 */
export const hideForReveal = (
  targets: gsap.TweenTarget,
  distance = REVEAL_DISTANCE
) => gsap.set(targets, { yPercent: distance, opacity: 0 });
