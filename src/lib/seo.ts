import type { Metadata } from "next";
import { site } from "@/content/site";

/** Build page-specific metadata with canonical URL, Open Graph and X cards. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url,
      siteName: site.legalName,
      title: `${title} | ${site.name}`,
      description,
      locale: "en_NG",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
    },
  };
}
