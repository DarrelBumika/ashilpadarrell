"use client";

import { useSyncExternalStore } from "react";

const INTRO_KEY = "portfolio-intro-seen";
const EVENT = "portfolio:intro-revealed";

let revealed = false;

export const isIntroRevealed = () =>
  revealed ||
  (typeof document !== "undefined" &&
    document.documentElement.dataset.intro === "done");

/** Fires as the panel starts sliding away, so the page can animate in behind it. */
export const markIntroRevealed = () => {
  revealed = true;
  window.dispatchEvent(new Event(EVENT));
};

/** Fires once the panel is gone, so repeat visits can skip it before paint. */
export const markIntroComplete = () => {
  try {
    sessionStorage.setItem(INTRO_KEY, "1");
  } catch {
    // Private mode can block storage; the intro should still finish.
  }
  document.documentElement.dataset.intro = "done";
};

const subscribe = (onStoreChange: () => void) => {
  window.addEventListener(EVENT, onStoreChange);
  return () => window.removeEventListener(EVENT, onStoreChange);
};

export const useIntroRevealed = () =>
  useSyncExternalStore(subscribe, isIntroRevealed, () => false);
