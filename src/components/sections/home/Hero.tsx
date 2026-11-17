import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { HeroSchematic } from "@/components/visuals/HeroSchematic";
import { divisions } from "@/content/divisions";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="grain relative bg-paper pt-28 md:pt-36">
      <div aria-hidden className="bg-blueprint absolute inset-0 [mask-image:radial-gradient(ellipse_at_70%_20%,black,transparent_75%)]" />

      <div className="container-x relative">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-5">
          <p className="eyebrow text-slate">
            <span className="mr-2 inline-block size-2 translate-y-[-1px] bg-brand-red align-middle" aria-hidden />
            {site.legalName}
          </p>
          <p className="eyebrow hidden text-slate sm:block">{site.tagline}</p>
        </div>

        <h1 id="hero-title" className="mt-10 text-display font-semibold md:mt-14">
          <span className="block">Technology that</span>
          <span className="block">
            moves businesses <span className="text-brand-blue">forward</span>
            <span className="text-brand-red">.</span>
          </span>
        </h1>

        <div className="mt-10 grid gap-10 pb-14 md:mt-14 md:grid-cols-12 md:pb-20">
          <p className="text-lead text-slate text-pretty md:col-span-6 lg:col-span-5">
            We design, develop and deliver technology solutions that help businesses operate smarter, connect better and
            grow with confidence.
          </p>
          <div className="flex flex-col gap-8 md:col-span-6 md:items-end lg:col-span-7">
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/services">Explore our solutions</ButtonLink>
              <ButtonLink href="/contact#enquiry" variant="secondary">
                Start a project
              </ButtonLink>
            </div>
          </div>
        </div>

        <nav aria-label="Our divisions" className="relative">
          <ul className="grid grid-cols-2 border-t border-line lg:grid-cols-4">
            {divisions.map((d, i) => (
              <li key={d.slug} className={`border-line ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b lg:border-b-0" : ""} ${i === 1 ? "lg:border-r" : ""}`}>
                <Link href={`/services/${d.slug}`} className={`group flex h-full flex-col gap-1.5 py-5 pr-4 transition-colors sm:py-6 ${["pl-0", "pl-4 lg:pl-5", "pl-0 lg:pl-5", "pl-4 lg:pl-5"][i]}`}>
                  <span className="eyebrow text-brand-red-700">
                    {d.index} · {d.kicker}
                  </span>
                  <span className="flex items-center justify-between gap-2 font-medium leading-snug">
                    {d.shortName}
                    <span aria-hidden className="text-slate transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand-blue-600">
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Schematic panel bridging into the dark section below */}
      <div className="relative bg-[linear-gradient(to_bottom,transparent_50%,var(--color-navy-950)_50%)]">
        <div className="container-x">
          <div className="on-dark relative overflow-hidden border border-line-dark bg-navy-950 p-4 sm:p-6 md:p-10">
            <div className="mb-4 flex items-center justify-between md:mb-6">
              <p className="eyebrow text-mist">One partner · Four disciplines</p>
              <p className="eyebrow hidden text-mist sm:block">Integrated delivery model</p>
            </div>
            <HeroSchematic />
          </div>
        </div>
      </div>
    </section>
  );
}
