import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

export const approachSteps = [
  { title: "Discover", text: "We listen, review your current setup and clarify goals, constraints and priorities.", output: "Needs assessment" },
  { title: "Define", text: "We agree scope, specifications, timelines and responsibilities before work begins.", output: "Proposal & plan" },
  { title: "Build or source", text: "We develop, configure or procure — sharing progress and checking against the agreed scope.", output: "Working solution" },
  { title: "Deploy", text: "We install, test and launch carefully, with training and handover documentation for your team.", output: "Go-live & handover" },
  { title: "Support", text: "We remain available for maintenance, improvements and the next stage of your growth.", output: "Ongoing support" },
];

export function Approach() {
  return (
    <section aria-labelledby="approach-title" className="relative overflow-hidden bg-paper py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="05">Our approach</SectionLabel>
            <h2 id="approach-title" className="mt-6 text-h2 font-semibold text-balance">
              A clear, disciplined path from first conversation to long-term support.
            </h2>
          </div>
          <p className="leading-relaxed text-slate lg:col-span-5">
            Whether we are building an application, wiring an office or sourcing equipment, every project follows the same
            accountable sequence.
          </p>
        </div>

        <ol className="relative mt-16 grid gap-0 md:mt-20 lg:grid-cols-5">
          <span aria-hidden className="absolute top-[11px] right-0 left-0 hidden h-px bg-ink/20 lg:block" />
          {approachSteps.map((s, i) => (
            <Reveal
              as="li"
              key={s.title}
              delay={i * 90}
              className="relative border-l border-ink/15 pb-10 pl-6 last:pb-0 lg:border-l-0 lg:pr-8 lg:pb-0 lg:pl-0"
            >
              <span
                aria-hidden
                className={`absolute top-0 -left-[6px] size-[11px] border-2 border-paper lg:static lg:mb-8 lg:block lg:size-[23px] lg:border-4 ${
                  i === 0 ? "bg-brand-red" : "bg-ink"
                }`}
              />
              <span className="eyebrow block text-slate">Step 0{i + 1}</span>
              <div className="mt-3">
                <h3 className="text-h3 font-medium">{s.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-slate">{s.text}</p>
                <p className="eyebrow mt-5 inline-block border border-ink/15 px-2.5 py-1.5 text-ink">{s.output}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
