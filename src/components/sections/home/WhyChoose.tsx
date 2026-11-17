import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const reasons = [
  {
    title: "One partner across the whole stack",
    text: "Software, infrastructure, training and procurement under one roof means fewer hand-offs, clearer accountability and solutions that fit together.",
  },
  {
    title: "Requirements before recommendations",
    text: "We take time to understand how your organisation works before proposing technology — so you invest in what you actually need.",
  },
  {
    title: "Built for local operating realities",
    text: "As a Nigerian company we design with local conditions in mind: connectivity, power, budgets, procurement timelines and user needs.",
  },
  {
    title: "Clear, honest communication",
    text: "Defined scope, regular progress updates and straightforward advice — including when a simpler option is the better one.",
  },
  {
    title: "Support beyond delivery",
    text: "Documentation, training and maintenance help your technology keep performing long after the project is handed over.",
  },
];

export function WhyChoose() {
  return (
    <section aria-labelledby="why-title" className="relative bg-paper-2 py-24 md:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionLabel index="04">Why choose SoftInsight</SectionLabel>
            <h2 id="why-title" className="mt-6 text-h2 font-semibold text-balance">
              Technology decisions deserve a partner who sees the whole picture.
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-slate">
              What clients can expect from working with us — principles that guide every engagement, regardless of size.
            </p>
          </div>
        </div>
        <ol className="lg:col-span-7">
          {reasons.map((r, i) => (
            <Reveal as="li" key={r.title} className="group grid grid-cols-[3.5rem_1fr] gap-4 border-t border-ink/15 py-8 last:border-b md:grid-cols-[5rem_1fr] md:py-10">
              <span className="font-mono text-sm text-slate transition-colors group-hover:text-brand-red-700">0{i + 1}</span>
              <div>
                <h3 className="text-h3 font-medium">{r.title}</h3>
                <p className="mt-3 max-w-xl leading-relaxed text-slate">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
