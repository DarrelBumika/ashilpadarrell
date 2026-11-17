"use client";

import { createContext, useContext } from "react";

type SiteFooterValue = {
  /** The mounted footer element, or null while it is still streaming in. */
  footer: HTMLElement | null;
  /** Ref callback for the footer to publish itself. */
  setFooter: (node: HTMLElement | null) => void;
};

/**
 * Lets the header and floating slogan measure the footer without reaching for
 * `document.querySelector("#site-footer")`. The element is exposed as state
 * because the page streams: consumers mount before the footer commits, so a
 * plain ref would still be null when their effects first run.
 */
export const SiteFooterContext = createContext<SiteFooterValue | null>(null);

export const useSiteFooter = () => {
  const value = useContext(SiteFooterContext);
  if (!value) {
    throw new Error("useSiteFooter must be used inside <SiteFooterProvider>");
  }
  return value;
};
