import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { DivisionExplorer } from "./DivisionExplorer";

export function Solutions() {
  return (
    <section aria-labelledby="solutions-title" className="relative bg-paper py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="02">Technology & business solutions</SectionLabel>
            <Reveal>
              <h2 id="solutions-title" className="mt-6 text-h2 font-semibold text-balance">
                Four divisions. One integrated partner.
              </h2>
            </Reveal>
          </div>
          <p className="leading-relaxed text-slate lg:col-span-5">
            Each division stands on its own — and together they cover the full journey of a technology investment, from
            the equipment and network to the software, the skills and the supply chain.
          </p>
        </div>
        <Reveal className="mt-14">
          <DivisionExplorer />
        </Reveal>
      </div>
    </section>
  );
}
