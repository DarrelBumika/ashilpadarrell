import type { TextBlock } from "@lib/text";

export const worksHeading: TextBlock = [
  [{ text: "selected" }, { text: "works", bold: true }],
];

/** Dummy projects — replace with real case-study entries. */
export const works = [
  "ai assistant",
  "multi-agent system",
  "automation tools",
] as const;
