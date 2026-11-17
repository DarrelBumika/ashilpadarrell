import type { TextBlock } from "@lib/text";

/**
 * Every fact about the person behind the site lives here. Components import
 * from this module instead of repeating names, links, or contact details.
 */
export const site = {
  firstName: "darrel",
  lastName: "bumika",
  fullName: "ashilpa darrel bumika",
  email: "hello@ashilpadarrell.site",
  url: "https://ashilpadarrell.site",
  description:
    "Portfolio of ashilpa darrell bumika — digital designer, software developer, and ai engineer.",
  phone: {
    display: "(+62) 897-5939-968",
    href: "tel:+628975939968",
  },
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ashilpadarrel/" },
    { label: "GitHub", href: "https://github.com/DarrelBumika" },
    { label: "Fiverr", href: "https://www.fiverr.com/ashilpadarrel" },
  ],
  analytics: {
    src: "https://analytics.ashilpadarrell.site/script.js",
    websiteId: "17a27bbf-201f-4560-afbb-ae8943c4b114",
  },
} as const;

const nameWord = { text: site.firstName, bold: true };

/** One-line wordmark used by the header. */
export const wordmarkInline: TextBlock = [
  [{ text: "a." }, { ...nameWord }, { text: site.lastName }],
];

/** Stacked wordmark used by the footer. */
export const wordmarkStacked: TextBlock = [
  [{ text: "a." }, { ...nameWord }],
  [{ text: site.lastName }],
];
