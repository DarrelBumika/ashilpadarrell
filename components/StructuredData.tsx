import { site } from "@content/site";

const person = {
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: site.fullName,
  url: site.url,
  email: `mailto:${site.email}`,
  telephone: site.phone.href.replace(/^tel:/, ""),
  jobTitle: site.jobTitle,
  description: site.description,
  sameAs: site.socials.map((social) => social.href),
};

const website = {
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: `${site.firstName} ${site.lastName}`,
  description: site.description,
  inLanguage: "en",
  publisher: { "@id": `${site.url}/#person` },
};

// Escaping "<" keeps content fields from being able to close the script tag.
const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [person, website],
}).replace(/</g, "\\u003c");

/** Person/WebSite structured data so search engines can resolve identity. */
export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
    />
  );
}
