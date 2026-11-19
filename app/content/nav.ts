/**
 * Sections that actually exist on the page, in document order. Each entry must
 * resolve to an `id` rendered by a section component — a link here with no
 * target is a broken anchor.
 */
export const sections = [
  { label: "home", href: "#home" },
  { label: "about", href: "#about" },
  { label: "works", href: "#works" },
  { label: "experience", href: "#experience" },
] as const;
