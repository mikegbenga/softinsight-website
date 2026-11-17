import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ContactForm } from "@/components/contact/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata = pageMetadata({
  title: "Contact Us",
  description: `Contact ${site.legalName}. Call ${site.contact.phoneDisplay}, email ${site.contact.email}, chat on WhatsApp or send a project enquiry.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Contact" }]}
        label="Contact us"
        title={
          <>
            Let&rsquo;s talk about your <span className="text-brand-blue">next project</span>
            <span className="text-brand-red">.</span>
          </>
        }
        intro="Whether you have a detailed specification or just an idea, we’re ready to listen and help you plan the right next step."
      />

      <section aria-label="Contact details" className="border-b border-line bg-white">
        <div className="container-x"><div className="grid gap-px border-x border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Phone, label: "Phone", value: site.contact.phoneDisplay, href: site.contact.phoneHref },
            { icon: Mail, label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
            { icon: WhatsAppIcon, label: "WhatsApp", value: "+234 803 609 3108", href: site.contact.whatsapp, external: true },
            { icon: MapPin, label: "Location", value: site.country },
          ].map((c) => {
            const inner = (
              <>
                <c.icon className="size-5 text-brand-blue" aria-hidden />
                <span className="eyebrow mt-6 block text-slate">{c.label}</span>
                <span className="mt-2 block text-lg font-medium break-words">{c.value}</span>
              </>
            );
            const cls = "block bg-white p-6 md:p-8 lg:py-10";
            return c.href ? (
              <a
                key={c.label}
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`${cls} transition-colors hover:bg-paper`}
              >
                {inner}
              </a>
            ) : (
              <div key={c.label} className={cls}>
                {inner}
              </div>
            );
          })}
        </div></div>
      </section>

      <section id="enquiry" aria-labelledby="enquiry-title" className="scroll-mt-24 bg-paper-2 py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionLabel>Project enquiry</SectionLabel>
            <h2 id="enquiry-title" className="mt-6 text-h2 font-semibold text-balance">
              Send us the details.
            </h2>
            <p className="mt-6 leading-relaxed text-slate">
              Tell us about your organisation, the service you need and what you want to achieve. The more context you
              share, the more useful our response will be.
            </p>
            <div className="mt-10 border-t border-ink/15 pt-8">
              <p className="flex items-center gap-3 font-medium">
                <Clock className="size-4 text-brand-blue" aria-hidden /> Prefer an instant conversation?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate">Message us on WhatsApp and we&rsquo;ll pick it up from there.</p>
              <ButtonLink href={site.contact.whatsapp} external variant="secondary" className="mt-6" arrow={false}>
                <WhatsAppIcon className="size-4" /> Chat on WhatsApp
              </ButtonLink>
            </div>
            <div className="mt-10 border-t border-ink/15 pt-8 text-sm text-slate">
              <p className="font-medium text-ink">{site.legalName}</p>
              <p className="mt-1">{site.rcNumber}</p>
            </div>
          </div>
          <div className="lg:col-span-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
