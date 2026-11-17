import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const pillars = [
  { word: "Innovate.", text: "Bringing modern, appropriate technology to everyday business problems — designed for real operating conditions." },
  { word: "Integrate.", text: "Connecting software, infrastructure, people and supply so each part of your technology works with the rest." },
  { word: "Empower.", text: "Equipping teams with the skills and support to use technology confidently long after go-live." },
];

export function Intro() {
  return (
    <section aria-labelledby="intro-title" className="on-dark relative bg-navy-950 pt-20 pb-24 text-white md:pt-28 md:pb-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <SectionLabel index="01" tone="dark">
              Who we are
            </SectionLabel>
          </div>
          <div className="lg:col-span-9">
            <Reveal>
              <h2 id="intro-title" className="text-h2 font-medium text-balance">
                SoftInsight is a Nigerian technology company that brings{" "}
                <span className="text-mist">software, infrastructure, skills and supply</span> together under one accountable
                partner.
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <Reveal delay={80}>
                <p className="leading-relaxed text-mist">
                  We work with individuals, businesses, institutions and organisations that want technology to deliver
                  practical results — systems that are dependable, people who know how to use them and equipment that
                  arrives as specified.
                </p>
              </Reveal>
              <Reveal delay={160}>
                <p className="leading-relaxed text-mist">
                  Instead of coordinating separate vendors for software, networks, training and procurement, our clients
                  work with a single team that understands how those pieces fit together, from the first conversation to
                  ongoing support.
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        <ol className="mt-20 grid border-t border-line-dark md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal
              as="li"
              key={p.word}
              delay={i * 100}
              className={`border-line-dark py-8 md:py-10 ${i > 0 ? "border-t md:border-t-0 md:border-l md:pl-8" : ""} ${i < 2 ? "md:pr-8" : ""}`}
            >
              <p className="text-h3 font-medium">
                <span className={["text-[#4cc472]", "text-[#7ea2e6]", "text-[#ff5a5e]"][i]}>{p.word}</span>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-mist">{p.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
