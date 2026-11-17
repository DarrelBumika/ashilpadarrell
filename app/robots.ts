import type { MetadataRoute } from "next";
import { site } from "@content/site";
import { isProd } from "@lib/env";

export default function robots(): MetadataRoute.Robots {
  // Preview and development builds must never compete with the live site.
  if (!isProd) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
