import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { DivisionGlyph } from "@/components/visuals/DivisionGlyph";

export function Featured() {
  return (
    <section aria-labelledby="featured-title" className="relative border-t border-line bg-paper pb-24 md:pb-32">
      <div className="container-x">
        <div className="flex flex-col gap-6 py-16 md:flex-row md:items-end md:justify-between md:py-20">
          <div>
            <SectionLabel index="03">Featured services</SectionLabel>
            <h2 id="featured-title" className="mt-6 max-w-2xl text-h2 font-semibold text-balance">
              Where most engagements begin.
            </h2>
          </div>
          <Link href="/services" className="group inline-flex items-center gap-2 font-medium text-brand-blue-600">
            <span className="link-underline">View all services</span>
            <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid border-t border-l border-line lg:grid-cols-12">
          {/* Lead feature */}
          <Reveal className="on-dark relative overflow-hidden border-r border-b border-line bg-navy-950 text-white lg:col-span-7 lg:row-span-2">
            <Link href="/services/software-development" className="group flex h-full flex-col p-8 md:p-12">
              <div aria-hidden className="bg-blueprint-dark absolute inset-0" />
              <p className="eyebrow relative text-mist">Software development</p>
              <h3 className="relative mt-5 max-w-lg text-h2 font-semibold text-balance">
                Custom business software & web applications
              </h3>
              <p className="relative mt-5 max-w-md leading-relaxed text-mist">
                Systems built around your operations — from customer-facing websites to internal platforms that automate
                approvals, records and reporting.
              </p>
              <div className="relative mt-10 grid grid-cols-[1fr_auto] items-end gap-6 md:mt-auto md:pt-12">
                <ul className="eyebrow grid gap-2 text-white/80">
                  <li>Web applications</li>
                  <li>Enterprise systems</li>
                  <li>APIs & integration</li>
                  <li>CRM / ERP</li>
                </ul>
                <div className="w-36 md:w-52">
                  <DivisionGlyph slug="software-development" tone="dark" />
                </div>
              </div>
              <span className="eyebrow relative mt-8 inline-flex items-center gap-2 text-white">
                Explore <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>

          <FeatureTile
            href="/services/it-infrastructure"
            label="Infrastructure"
            title="Networking & infrastructure deployment"
            text="Structured cabling, switching, wireless coverage and server installation — designed, documented and supported."
            accent="bg-brand-blue"
          />
          <FeatureTile
            href="/services/it-training"
            label="Training"
            title="Corporate IT training"
            text="Practical programmes that help staff get real value from the systems and tools your organisation depends on."
            accent="bg-brand-green"
          />

          <Reveal className="border-r border-b border-line bg-white lg:col-span-12">
            <Link href="/services/procurement-logistics" className="group grid items-center gap-8 p-8 md:grid-cols-12 md:p-12">
              <div className="md:col-span-7">
                <p className="eyebrow text-brand-red-700">Procurement</p>
                <h3 className="mt-4 text-h3 font-medium text-balance">Oil and gas tools, industrial and safety equipment sourcing</h3>
                <p className="mt-4 max-w-xl leading-relaxed text-slate">
                  Sourcing to specification, with import, export and logistics coordinated end to end — so the right items
                  reach site when the project needs them.
                </p>
              </div>
              <div className="flex items-center justify-between gap-6 md:col-span-5 md:justify-end">
                <div className="w-40 md:w-48">
                  <DivisionGlyph slug="procurement-logistics" />
                </div>
                <span className="grid size-14 shrink-0 place-items-center border border-ink/20 transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                  <ArrowUpRight aria-hidden className="size-5" />
                  <span className="sr-only">Explore procurement</span>
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FeatureTile({ href, label, title, text, accent }: { href: string; label: string; title: string; text: string; accent: string }) {
  return (
    <Reveal className="border-r border-b border-line bg-white lg:col-span-5">
      <Link href={href} className="group relative flex h-full flex-col p-8 md:p-10">
        <span aria-hidden className={`absolute top-0 left-0 h-[3px] w-12 ${accent} transition-all duration-500 ease-out-quint group-hover:w-full`} />
        <p className="eyebrow text-slate">{label}</p>
        <h3 className="mt-4 text-h3 font-medium text-balance group-hover:text-brand-blue-600">{title}</h3>
        <p className="mt-4 leading-relaxed text-slate">{text}</p>
        <span className="eyebrow mt-8 inline-flex items-center gap-2 text-ink md:mt-auto md:pt-8">
          Explore <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </Link>
    </Reveal>
  );
}
