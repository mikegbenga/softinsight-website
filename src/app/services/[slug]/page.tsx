import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/ui/CtaBand";
import { DivisionGlyph } from "@/components/visuals/DivisionGlyph";
import { pageMetadata } from "@/lib/seo";
import { divisions, getDivision } from "@/content/divisions";
import { industries } from "@/content/industries";
import { site } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return divisions.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = getDivision(slug);
  if (!d) return {};
  return pageMetadata({ title: d.name, description: d.summary, path: `/services/${d.slug}` });
}

export default async function DivisionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = getDivision(slug);
  if (!d) notFound();

  const idx = divisions.findIndex((x) => x.slug === d.slug);
  const prev = divisions[(idx - 1 + divisions.length) % divisions.length];
  const next = divisions[(idx + 1) % divisions.length];
  const relevant = industries.filter((i) => i.divisions.includes(d.slug));

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: d.name,
    description: d.summary,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "Country", name: "Nigeria" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: d.name,
      itemListElement: d.services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, description: s.description } })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      {/* Hero */}
      <section className="on-dark relative overflow-hidden bg-navy-950 pt-32 pb-20 text-white md:pt-40 md:pb-28">
        <div aria-hidden className="bg-blueprint-dark absolute inset-0" />
        <div aria-hidden className="absolute top-0 left-0 h-1 w-1/4 bg-brand-red" />
        <div className="container-x relative">
          <div className="[&_ol]:text-mist [&_span[aria-current]]:text-white">
            <Breadcrumbs items={[{ label: "Services", href: "/services" }, { label: d.shortName }]} />
          </div>
          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow text-mist">
                Division {d.index} — {d.kicker}
              </p>
              <h1 className="mt-6 text-h1 font-semibold text-balance">{d.name}</h1>
              <p className="mt-8 max-w-2xl text-lead text-mist text-pretty">{d.headline}</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href={`/contact?service=${encodeURIComponent(d.name)}#enquiry`} variant="red">
                  Discuss your requirements
                </ButtonLink>
                <ButtonLink href="#offerings" variant="light" arrow={false}>
                  View services
                </ButtonLink>
              </div>
            </div>
            <div className="hidden lg:col-span-4 lg:block">
              <div className="border border-line-dark bg-navy p-6">
                <DivisionGlyph slug={d.slug} tone="dark" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section aria-labelledby="overview" className="bg-paper py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel index="01">Overview</SectionLabel>
          </div>
          <div className="lg:col-span-8">
            <h2 id="overview" className="sr-only">
              Overview
            </h2>
            {d.intro.map((p, i) => (
              <Reveal key={i} delay={i * 80}>
                <p className={i === 0 ? "text-h3 font-medium text-pretty" : "mt-8 max-w-2xl leading-relaxed text-slate"}>{p}</p>
              </Reveal>
            ))}
            <p className="mt-10 border-l-[3px] border-brand-blue pl-5 text-slate">
              <span className="eyebrow block text-ink">Who it&rsquo;s for</span>
              <span className="mt-2 block leading-relaxed">{d.forWho}</span>
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="offerings" aria-labelledby="offerings-title" className="scroll-mt-24 border-t border-line bg-white py-24 md:py-32">
        <div className="container-x">
          <SectionLabel index="02">Services</SectionLabel>
          <h2 id="offerings-title" className="mt-6 max-w-3xl text-h2 font-semibold text-balance">
            What this division delivers.
          </h2>
          <ol className="mt-14 border-t border-ink/80">
            {d.services.map((s, i) => (
              <Reveal
                as="li"
                key={s.title}
                className="group grid gap-3 border-b border-line py-7 transition-colors hover:bg-paper md:grid-cols-[5rem_1fr_1.3fr] md:gap-8 md:py-9 md:hover:px-4"
              >
                <span className="font-mono text-sm text-slate group-hover:text-brand-red-700">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-xl font-medium tracking-tight md:text-2xl">{s.title}</h3>
                <p className="leading-relaxed text-slate">{s.description}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Benefits */}
      <section aria-labelledby="benefits-title" className="bg-paper-2 py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel index="03">Business benefits</SectionLabel>
            <h2 id="benefits-title" className="mt-6 text-h2 font-semibold text-balance">
              Why it matters.
            </h2>
          </div>
          <ul className="grid gap-px bg-line sm:grid-cols-3 lg:col-span-8">
            {d.benefits.map((b, i) => (
              <Reveal as="li" key={b.title} delay={i * 80} className="bg-paper-2 p-6 md:p-8">
                <Check className="size-6 text-brand-blue" aria-hidden />
                <h3 className="mt-8 text-xl font-medium">{b.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-slate">{b.description}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Relevant industries */}
      <section aria-labelledby="industries-rel" className="bg-paper py-24">
        <div className="container-x">
          <SectionLabel index="04">Relevant industries</SectionLabel>
          <h2 id="industries-rel" className="mt-6 text-h3 font-medium">
            Sectors where this division is often applied
          </h2>
          <ul className="mt-8 flex flex-wrap gap-2">
            {relevant.map((ind) => (
              <li key={ind.id}>
                <Link href={`/industries#${ind.id}`} className="inline-block border border-line bg-white px-4 py-2.5 text-sm transition-colors hover:border-ink">
                  {ind.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Prev / next */}
      <nav aria-label="Other divisions" className="grid border-t border-line bg-white sm:grid-cols-2">
        <Link href={`/services/${prev.slug}`} className="group flex flex-col gap-2 border-line p-8 hover:bg-paper sm:border-r md:p-12">
          <span className="eyebrow inline-flex items-center gap-2 text-slate">
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden /> Previous division
          </span>
          <span className="text-h3 font-medium">{prev.shortName}</span>
        </Link>
        <Link href={`/services/${next.slug}`} className="group flex flex-col items-end gap-2 border-t border-line p-8 text-right hover:bg-paper sm:border-t-0 md:p-12">
          <span className="eyebrow inline-flex items-center gap-2 text-slate">
            Next division <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </span>
          <span className="text-h3 font-medium">{next.shortName}</span>
        </Link>
      </nav>

      <CtaBand title={`Ready to discuss ${d.shortName.toLowerCase()}?`} subtitle="We’ll respond with next steps." />
    </>
  );
}
