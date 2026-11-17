import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { DivisionGlyph } from "@/components/visuals/DivisionGlyph";
import { pageMetadata } from "@/lib/seo";
import { divisions } from "@/content/divisions";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Software development, IT infrastructure, IT training and procurement services from SoftInsight Technologies Nigeria Limited — four divisions, one integrated partner.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Services" }]}
        label="Services"
        title={
          <>
            Four business divisions, engineered to work as <span className="text-brand-blue">one</span>
            <span className="text-brand-red">.</span>
          </>
        }
        intro="Choose a division to explore its services in detail, or talk to us about a requirement that spans several."
      />

      {/* Index */}
      <nav aria-label="Divisions on this page" className="sticky top-18 z-30 border-b border-line bg-paper/95 backdrop-blur md:top-20">
        <ul className="container-x flex gap-6 overflow-x-auto py-4 [scrollbar-width:none]">
          {divisions.map((d) => (
            <li key={d.slug} className="shrink-0">
              <a href={`#${d.slug}`} className="eyebrow inline-flex items-center gap-2 text-slate hover:text-ink">
                <span className="text-brand-red-700">{d.index}</span> {d.shortName}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {divisions.map((d, i) => {
        const dark = i % 2 === 1;
        return (
          <section
            key={d.slug}
            id={d.slug}
            aria-labelledby={`${d.slug}-title`}
            className={`relative scroll-mt-36 py-24 md:py-32 ${dark ? "on-dark bg-navy-950 text-white" : "bg-paper"}`}
          >
            {dark && <div aria-hidden className="bg-blueprint-dark absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />}
            <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:items-start">
              <div className={`lg:col-span-5 ${i % 2 ? "lg:order-2 lg:col-start-8" : ""}`}>
                <Reveal>
                  <div className={`relative border p-6 md:p-10 ${dark ? "border-line-dark bg-navy" : "border-line bg-white"}`}>
                    <span className="eyebrow absolute top-4 left-4 text-brand-red">{d.index}</span>
                    <DivisionGlyph slug={d.slug} tone={dark ? "dark" : "light"} />
                  </div>
                </Reveal>
              </div>
              <div className={`lg:col-span-7 ${i % 2 ? "lg:order-1" : "lg:pl-6"}`}>
                <p className={`eyebrow ${dark ? "text-mist" : "text-slate"}`}>
                  {d.index} — {d.kicker}
                </p>
                <h2 id={`${d.slug}-title`} className="mt-5 text-h2 font-semibold text-balance">
                  {d.name}
                </h2>
                <p className={`mt-5 max-w-xl text-lead text-pretty ${dark ? "text-mist" : "text-slate"}`}>{d.summary}</p>
                <ul className={`mt-10 grid border-t sm:grid-cols-2 ${dark ? "border-line-dark" : "border-line"}`}>
                  {d.services.map((s, j) => (
                    <li
                      key={s.title}
                      className={`flex gap-3 border-b py-4 text-[0.95rem] ${dark ? "border-line-dark" : "border-line"} ${j % 2 === 0 ? "sm:pr-6" : "sm:border-l sm:pl-6"} ${dark ? "sm:border-l-line-dark" : ""}`}
                    >
                      <span className={`font-mono text-xs ${dark ? "text-mist" : "text-slate"} pt-1`}>{String(j + 1).padStart(2, "0")}</span>
                      {s.title}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex flex-wrap gap-3">
                  <ButtonLink href={`/services/${d.slug}`} variant={dark ? "red" : "primary"}>
                    Explore {d.shortName}
                  </ButtonLink>
                  <ButtonLink href={`/contact?service=${encodeURIComponent(d.name)}#enquiry`} variant={dark ? "light" : "secondary"}>
                    Enquire
                  </ButtonLink>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section aria-label="Combined projects" className="border-t border-line bg-paper py-20">
        <div className="container-x flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-2xl text-h3 font-medium text-balance">
            Many projects draw on more than one division — for example, a new office with network, hardware, software and
            staff training.
          </p>
          <Link href="/industries" className="group inline-flex items-center gap-2 font-medium text-brand-blue-600">
            <span className="link-underline">See solutions by industry</span>
            <ArrowUpRight aria-hidden className="size-4" />
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
