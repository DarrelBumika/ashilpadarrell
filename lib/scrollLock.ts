"use client";

import type Lenis from "lenis";

/**
 * Lenis scrolls the window itself, so hiding the body overflow does not lock
 * it. Overlays (the menu) need the instance to stop and start the scroll.
 *
 * The scroller is a page-level singleton, so a module handle is simpler than a
 * provider and is always available by the time an overlay can be opened.
 */
let instance: Lenis | null = null;

export const registerScrollController = (lenis: Lenis | null) => {
  instance = lenis;
};

export const pauseScroll = () => instance?.stop();

export const resumeScroll = () => instance?.start();
