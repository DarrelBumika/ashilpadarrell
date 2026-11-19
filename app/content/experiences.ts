import type { TextBlock } from "@lib/text";

export const experiencesHeading: TextBlock = [
  [{ text: "work" }, { text: "experience", bold: true }],
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  summary: string;
};

/** Dummy roles — replace with real experience entries. */
export const experiences: Experience[] = [
  {
    role: "founder",
    company: "eunoia studio",
    period: "2020 — present",
    summary: "freelance design and development for early-stage teams.",
  },
  {
    role: "software engineer",
    company: "RUN System",
    period: "nov 2025 — feb 2026",
    summary: "SDLC, Git, Next.js, React, Docker",
  },
  {
    role: "full-stack developer",
    company: "padukuan pondok",
    period: "2025 — present",
    summary: "SDLC, Git, Next.js, React, Docker",
  },
  {
    role: "machine learning engineer",
    company: "bangkit academy",
    period: "aug 2024 — jan 2025",
    summary: "developing and deploying machine learning models for various applications.",
  }
];
