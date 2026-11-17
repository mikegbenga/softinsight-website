import { Mail, Phone } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/content/site";

export function HomeContact() {
  return (
    <section id="enquiry" aria-labelledby="contact-title" className="relative border-t border-line bg-paper-2 py-24 md:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel index="08">Project enquiry</SectionLabel>
          <h2 id="contact-title" className="mt-6 text-h2 font-semibold text-balance">
            Tell us what you&rsquo;re planning. We&rsquo;ll help you shape it.
          </h2>
          <p className="mt-6 max-w-md leading-relaxed text-slate">
            Share a few details and we will respond to discuss your requirements. Prefer to talk? Reach us directly.
          </p>
          <ContactDirect />
        </div>
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export function ContactDirect() {
  const items = [
    { icon: Phone, label: "Call", value: site.contact.phoneDisplay, href: site.contact.phoneHref },
    { icon: Mail, label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
    { icon: WhatsAppIcon, label: "WhatsApp", value: "Chat with us", href: site.contact.whatsapp, external: true },
  ];
  return (
    <ul className="mt-10 border-t border-ink/15">
      {items.map((it) => (
        <li key={it.label} className="border-b border-ink/15">
          <a
            href={it.href}
            {...(it.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group flex items-center gap-5 py-5"
          >
            <span className="grid size-11 shrink-0 place-items-center bg-ink text-white transition-colors group-hover:bg-brand-blue">
              <it.icon className="size-4.5" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="eyebrow block text-slate">{it.label}</span>
              <span className="mt-1 block truncate text-lg font-medium group-hover:text-brand-blue-600">{it.value}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
