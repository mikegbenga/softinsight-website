import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/ui/CtaBand";
import { pageMetadata } from "@/lib/seo";
import { industries } from "@/content/industries";
import { divisions } from "@/content/divisions";

export const metadata = pageMetadata({
  title: "Industries",
  description:
    "Technology and operational solutions for financial services, education, healthcare, retail, government, oil and gas, real estate and SMEs in Nigeria.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Industries" }]}
        label="Industries"
        title={
          <>
            Technology that fits the way your <span className="text-brand-blue">sector</span> works
            <span className="text-brand-red">.</span>
          </>
        }
        intro="Below are the kinds of solutions SoftInsight can deliver in each sector — adapted to its regulations, operations and people."
      />

      <section aria-label="Industries we serve" className="bg-paper py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <nav aria-label="Industry index" className="sticky top-32">
              <p className="eyebrow text-slate">Index</p>
              <ol className="mt-5 grid gap-1 border-l border-line">
                {industries.map((ind, i) => (
                  <li key={ind.id}>
                    <a href={`#${ind.id}`} className="-ml-px flex gap-3 border-l border-transparent py-1.5 pl-4 text-sm text-slate hover:border-brand-red hover:text-ink">
                      <span className="font-mono text-xs">{String(i + 1).padStart(2, "0")}</span>
                      {ind.name}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="lg:col-span-9">
            {industries.map((ind, i) => (
              <article key={ind.id} id={ind.id} aria-labelledby={`${ind.id}-title`} className="scroll-mt-28 border-t border-ink/80 pt-8 pb-16 md:pb-20">
                <div className="grid gap-8 md:grid-cols-[5rem_1fr]">
                  <span className="font-mono text-sm text-slate">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <Reveal>
                      <h2 id={`${ind.id}-title`} className="text-h2 font-semibold">
                        {ind.name}
                      </h2>
                      <p className="mt-5 max-w-2xl text-lead text-slate text-pretty">{ind.context}</p>
                    </Reveal>
                    <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr]">
                      <div>
                        <h3 className="eyebrow text-ink">Relevant solutions</h3>
                        <ul className="mt-4 border-t border-line">
                          {ind.solutions.map((s) => (
                            <li key={s} className="flex gap-3 border-b border-line py-3.5">
                              <span aria-hidden className="mt-2.5 size-1.5 shrink-0 bg-brand-red" />
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="eyebrow text-ink">Divisions involved</h3>
                        <ul className="mt-4 grid gap-2">
                          {ind.divisions.map((slug) => {
                            const d = divisions.find((x) => x.slug === slug)!;
                            return (
                              <li key={slug}>
                                <Link
                                  href={`/services/${slug}`}
                                  className="group flex items-center justify-between border border-line bg-white px-4 py-3 text-sm transition-colors hover:border-ink"
                                >
                                  <span>
                                    <span className="mr-2 font-mono text-xs text-brand-red-700">{d.index}</span>
                                    {d.shortName}
                                  </span>
                                  <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
            <p className="border-t border-line pt-6 text-sm text-slate">
              Sector descriptions illustrate the types of solutions SoftInsight can provide and do not refer to specific
              clients.
            </p>
          </div>
        </div>
      </section>

      <CtaBand title="Don’t see your sector?" subtitle="Our solutions adapt — let’s talk." />
    </>
  );
}
