import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { divisions } from "@/content/divisions";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[85vh] items-center bg-paper pt-32 pb-20">
      <div aria-hidden className="bg-blueprint absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="container-x relative grid gap-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <p className="eyebrow text-brand-red-700">Error 404 — Route not found</p>
          <h1 className="mt-6 text-display font-semibold">
            Signal lost<span className="text-brand-red">.</span>
          </h1>
          <p className="mt-8 max-w-lg text-lead text-slate">
            The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved. Let&rsquo;s get you back on a working
            connection.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/">Back to home</ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact us
            </ButtonLink>
          </div>
        </div>
        <nav aria-label="Popular pages" className="lg:col-span-5">
          <p className="eyebrow text-slate">Popular destinations</p>
          <ul className="mt-4 border-t border-line">
            {divisions.map((d) => (
              <li key={d.slug} className="border-b border-line">
                <Link href={`/services/${d.slug}`} className="group flex items-center justify-between py-4 hover:text-brand-blue-600">
                  <span>
                    <span className="mr-3 font-mono text-xs text-slate">{d.index}</span>
                    {d.shortName}
                  </span>
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
