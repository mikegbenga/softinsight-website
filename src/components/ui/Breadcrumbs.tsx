import Link from "next/link";
import { site } from "@/content/site";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${site.url}${c.href === "/" ? "" : c.href}` } : {}),
    })),
  };
  return (
    <nav aria-label="Breadcrumb">
      <ol className="eyebrow flex flex-wrap items-center gap-2 text-slate">
        {all.map((c, i) => (
          <li key={c.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {c.href && i < all.length - 1 ? (
              <Link href={c.href} className="link-underline hover:text-ink">
                {c.label}
              </Link>
            ) : (
              <span aria-current={i === all.length - 1 ? "page" : undefined} className="text-ink">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </nav>
  );
}
