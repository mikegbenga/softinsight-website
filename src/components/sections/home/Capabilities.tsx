import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";

const marquee = [
  "Web applications",
  "Business automation",
  "Databases",
  "API integration",
  "Networking",
  "Servers",
  "IT support",
  "Data analytics",
  "Digital skills",
  "Procurement",
  "Logistics",
];

const groups = [
  {
    title: "Applications",
    items: ["Responsive websites", "Web & enterprise applications", "Role-based access & audit trails", "Dashboards & reporting"],
  },
  {
    title: "Data & integration",
    items: ["Relational database design", "REST API development", "Third-party & payment integrations", "Data migration & backup"],
  },
  {
    title: "Infrastructure",
    items: ["Structured cabling & switching", "Wireless network coverage", "Server & storage setup", "Preventive maintenance"],
  },
  {
    title: "People & supply",
    items: ["Instructor-led training", "Custom corporate curricula", "Specification-led sourcing", "Delivery coordination"],
  },
];

export function Capabilities() {
  const row = [...marquee, ...marquee];
  return (
    <section aria-labelledby="capabilities-title" className="on-dark relative overflow-hidden bg-navy-950 py-24 text-white md:py-32">
      <div aria-hidden className="bg-blueprint-dark absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="container-x relative">
        <SectionLabel index="06" tone="dark">
          Selected capabilities
        </SectionLabel>
        <h2 id="capabilities-title" className="mt-6 max-w-3xl text-h2 font-semibold text-balance">
          Practical expertise across the layers that keep an organisation running.
        </h2>
      </div>

      <div aria-hidden className="relative mt-16 flex overflow-hidden border-y border-line-dark py-6 md:py-8">
        <div className="flex w-max shrink-0 motion-safe:animate-marquee">
          {row.map((m, i) => (
            <span key={i} className="flex items-center gap-8 pr-8 text-[clamp(1.75rem,4vw,3.5rem)] font-medium tracking-tight whitespace-nowrap">
              <span className={i % 2 ? "text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.6)]" : "text-white"}>{m}</span>
              <span className="size-2.5 bg-brand-red" />
            </span>
          ))}
        </div>
      </div>

      <div className="container-x relative mt-16">
        <div className="grid gap-px border border-line-dark bg-line-dark sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((g, i) => (
          <Reveal key={g.title} delay={i * 80} className="bg-navy-950 p-6 md:p-8">
            <p className="eyebrow text-mist">0{i + 1}</p>
            <h3 className="mt-4 text-xl font-medium">{g.title}</h3>
            <ul className="mt-6 grid gap-3 text-sm text-mist">
              {g.items.map((it) => (
                <li key={it} className="flex gap-3">
                  <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-white/40" />
                  {it}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
        </div>
      </div>
    </section>
  );
}
