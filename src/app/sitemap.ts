import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { divisions } from "@/content/divisions";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = [
    { path: "", priority: 1 },
    { path: "/about", priority: 0.8 },
    { path: "/services", priority: 0.9 },
    { path: "/industries", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
    ...divisions.map((d) => ({ path: `/services/${d.slug}`, priority: 0.8 })),
  ];
  return pages.map((p) => ({
    url: `${site.url}${p.path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: p.priority,
  }));
}
