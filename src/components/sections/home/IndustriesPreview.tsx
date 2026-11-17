import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { industries } from "@/content/industries";

export function IndustriesPreview() {
  return (
    <section aria-labelledby="industries-title" className="relative bg-paper py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="07">Industry sectors</SectionLabel>
            <h2 id="industries-title" className="mt-6 text-h2 font-semibold text-balance">
              Solutions adapted to the realities of each sector.
            </h2>
          </div>
          <p className="leading-relaxed text-slate lg:col-span-5">
            Different industries face different pressures. We tailor software, infrastructure, training and sourcing to the
            way each one operates.
          </p>
        </div>

        <ul className="mt-14 border-t border-ink/80">
          {industries.map((ind, i) => (
            <li key={ind.id} className="border-b border-line">
              <Link
                href={`/industries#${ind.id}`}
                className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-6 transition-[padding,background-color] duration-500 ease-out-quint hover:bg-white md:grid-cols-[4rem_1.1fr_1.6fr_auto] md:py-7 md:hover:px-4"
              >
                <span className="font-mono text-sm text-slate">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-xl font-medium tracking-tight md:text-2xl">{ind.name}</span>
                <span className="hidden text-sm leading-relaxed text-slate md:block">{ind.solutions.slice(0, 2).join(" · ")}</span>
                <span className="grid size-10 place-items-center border border-transparent text-slate transition-colors group-hover:border-brand-red group-hover:bg-brand-red group-hover:text-white">
                  <ArrowUpRight aria-hidden className="size-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
