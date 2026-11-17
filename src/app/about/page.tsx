import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/ui/CtaBand";
import { LogoMark } from "@/components/brand/Logo";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";
import { divisions } from "@/content/divisions";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Learn about SoftInsight Technologies Nigeria Limited — our vision, mission, values, leadership and approach to delivering dependable technology solutions.",
  path: "/about",
});

const values = [
  { title: "Integrity", text: "We give honest advice, keep our commitments and are transparent about scope, cost and progress." },
  { title: "Excellence", text: "We hold our work to professional standards — in code, in installation and in every interaction." },
  { title: "Innovation", text: "We apply modern, appropriate technology thoughtfully, choosing what genuinely serves the client." },
  { title: "Partnership", text: "We treat client goals as our own and build relationships that outlast individual projects." },
  { title: "Accountability", text: "We take ownership of outcomes and respond quickly when something needs attention." },
  { title: "Empowerment", text: "We share knowledge so that people and organisations grow more capable with technology." },
];

const quality = [
  "Requirements are confirmed in writing before work begins.",
  "Progress is reported at agreed intervals, with clear points of contact.",
  "Solutions are tested before handover and documented for your team.",
  "Equipment is sourced to agreed specifications through reliable channels.",
  "Feedback is welcomed and acted on — during and after delivery.",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "About" }]}
        label="About SoftInsight"
        title={
          <>
            A technology partner built on <span className="text-brand-blue">insight</span>, discipline and service
            <span className="text-brand-red">.</span>
          </>
        }
        intro={`${site.legalName} helps individuals, businesses, institutions and organisations use technology with confidence.`}
      />

      {/* Overview */}
      <section aria-labelledby="overview-title" className="bg-paper py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <SectionLabel index="01">Company overview</SectionLabel>
          </div>
          <div className="lg:col-span-9">
            <Reveal>
              <h2 id="overview-title" className="text-h2 font-medium text-balance">
                We combine software engineering, infrastructure, training and procurement so that technology investments
                deliver lasting value.
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-8 text-slate md:grid-cols-2">
              <p className="leading-relaxed">
                SoftInsight Technologies Nigeria Limited is a Nigerian technology company registered with the Corporate
                Affairs Commission ({site.rcNumber}). We provide custom software and digital solutions, IT infrastructure
                and technical services, IT training and professional development, and procurement, logistics and project
                support.
              </p>
              <p className="leading-relaxed">
                Our model is simple: understand the client&rsquo;s objectives first, then bring together the right mix of
                systems, equipment and skills to achieve them. By working across disciplines, we help clients avoid the
                gaps that appear when separate vendors handle separate pieces.
              </p>
            </div>
            <dl className="mt-14 grid border-t border-line sm:grid-cols-3">
              {[
                ["Registered name", site.legalName],
                ["CAC registration", site.rcNumber],
                ["Headquarters", site.country],
              ].map(([k, v], i) => (
                <div key={k} className={`border-b border-line py-6 sm:border-b-0 ${i > 0 ? "sm:border-l sm:pl-6" : ""} sm:pr-6`}>
                  <dt className="eyebrow text-slate">{k}</dt>
                  <dd className="mt-2 font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Vision & mission */}
      <section aria-label="Vision and mission" className="on-dark grid bg-navy-950 text-white md:grid-cols-2">
        <div className="border-line-dark p-8 py-20 sm:p-12 md:border-r md:py-28 lg:p-20">
          <p className="eyebrow text-mist">02 — Vision</p>
          <h2 className="mt-8 text-h2 font-medium text-balance">
            To be a trusted Nigerian technology partner, recognised for solutions that help organisations operate smarter
            and grow with confidence.
          </h2>
        </div>
        <div className="border-t border-line-dark bg-navy p-8 py-20 sm:p-12 md:border-t-0 md:py-28 lg:p-20">
          <p className="eyebrow text-mist">03 — Mission</p>
          <h2 className="mt-8 text-h2 font-medium text-balance">
            To design, develop and deliver dependable technology — and the skills to use it — that solve real problems for
            the people and organisations we serve.
          </h2>
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values-title" className="bg-paper py-24 md:py-32">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionLabel index="04">Core values</SectionLabel>
              <h2 id="values-title" className="mt-6 text-h2 font-semibold text-balance">
                The principles behind how we work.
              </h2>
            </div>
          </div>
          <ul className="mt-14 grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={(i % 3) * 80} className="group border-r border-b border-line p-8 transition-colors hover:bg-white md:p-10">
                <span className="font-mono text-sm text-slate group-hover:text-brand-red-700">0{i + 1}</span>
                <h3 className="mt-10 text-h3 font-medium">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-slate">{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Leadership */}
      <section aria-labelledby="leadership-title" className="border-t border-line bg-paper-2 py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel index="05">Leadership</SectionLabel>
            <h2 id="leadership-title" className="mt-6 text-h2 font-semibold text-balance">
              Led with accountability.
            </h2>
          </div>
          <div className="lg:col-span-8">
            <div className="grid border border-line bg-white sm:grid-cols-[minmax(0,15rem)_1fr]">
              <div className="on-dark relative grid aspect-square place-items-center overflow-hidden bg-navy-950 sm:aspect-auto">
                <div aria-hidden className="bg-blueprint-dark absolute inset-0" />
                <span className="relative font-semibold tracking-tight text-white text-6xl" aria-hidden>
                  MA
                </span>
                <span aria-hidden className="absolute bottom-0 left-0 h-1 w-1/2 bg-brand-red" />
              </div>
              <div className="p-8 md:p-10">
                <p className="eyebrow text-brand-red-700">{site.ceo.title}</p>
                <h3 className="mt-3 text-h3 font-semibold">{site.ceo.name}</h3>
                <p className="mt-5 leading-relaxed text-slate">
                  {site.ceo.name} leads SoftInsight Technologies Nigeria Limited, setting the company&rsquo;s direction and
                  overseeing the quality of service across its four business divisions.
                </p>
                <p className="mt-4 leading-relaxed text-slate">
                  Under his leadership, SoftInsight is committed to practical, well-engineered technology and to long-term
                  relationships built on trust.
                </p>
                <a href={`mailto:${site.contact.email}`} className="link-underline mt-6 inline-block font-medium text-brand-blue-600">
                  {site.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach to technology */}
      <section aria-labelledby="tech-approach-title" className="bg-paper py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionLabel index="06">Our approach to technology</SectionLabel>
              <h2 id="tech-approach-title" className="mt-6 text-h2 font-semibold text-balance">
                Appropriate, secure and built to last.
              </h2>
              <div className="mt-10 flex items-center gap-4">
                <LogoMark className="size-14" />
                <p className="eyebrow text-slate">{site.tagline}</p>
              </div>
            </div>
          </div>
          <div className="grid gap-10 lg:col-span-7">
            {[
              ["Business first", "Technology is a means to an end. We start with the outcome you need and work backwards to the right solution."],
              ["Right-sized solutions", "We recommend what fits your scale, budget and capacity to maintain — never complexity for its own sake."],
              ["Security by default", "Access control, data protection and sound configuration are built in from the start, not added later."],
              ["Maintainable and documented", "Clean code, labelled infrastructure and clear documentation make your systems easier to support and extend."],
            ].map(([t, d], i) => (
              <Reveal key={t} className="border-t border-ink/15 pt-8">
                <p className="eyebrow text-slate">0{i + 1}</p>
                <h3 className="mt-3 text-h3 font-medium">{t}</h3>
                <p className="mt-3 leading-relaxed text-slate">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quality commitment */}
      <section aria-labelledby="quality-title" className="border-t border-line bg-white py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel index="07">Quality & customer satisfaction</SectionLabel>
            <h2 id="quality-title" className="mt-6 text-h2 font-semibold text-balance">
              Our commitment to every client.
            </h2>
            <p className="mt-6 leading-relaxed text-slate">
              Customer satisfaction is earned through consistent, visible discipline. These commitments apply to every
              engagement, across all four divisions.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {divisions.map((d) => (
                <li key={d.slug}>
                  <Link href={`/services/${d.slug}`} className="eyebrow inline-block border border-line px-3 py-2 hover:border-ink">
                    {d.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <ol className="lg:col-span-7">
            {quality.map((q, i) => (
              <Reveal as="li" key={q} className="flex gap-6 border-b border-line py-6 first:border-t">
                <span className="grid size-8 shrink-0 place-items-center bg-brand-blue font-mono text-xs text-white">{i + 1}</span>
                <p className="pt-1 text-lg leading-relaxed">{q}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand title="Let’s build something dependable." subtitle="Talk to our team." />
    </>
  );
}
