import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { SocialIcon, WhatsAppIcon } from "@/components/ui/SocialIcons";
import { mainNav, site } from "@/content/site";
import { divisions } from "@/content/divisions";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark relative overflow-hidden bg-navy-950 text-white">
      <div aria-hidden className="bg-blueprint-dark absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />

      <div className="container-x relative grid gap-12 pt-20 pb-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo variant="dark" className="h-11 w-auto" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-mist">{site.description}</p>
          <p className="eyebrow mt-6 text-white/70">{site.tagline}</p>
        </div>

        <FooterCol title="Company" className="lg:col-span-2">
          {[{ label: "Home", href: "/" }, ...mainNav].map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="link-underline text-mist hover:text-white">
                {l.label}
              </Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Divisions" className="lg:col-span-3">
          {divisions.map((d) => (
            <li key={d.slug}>
              <Link href={`/services/${d.slug}`} className="link-underline text-mist hover:text-white">
                {d.name}
              </Link>
            </li>
          ))}
        </FooterCol>

        <FooterCol title="Contact" className="lg:col-span-3">
          <li>
            <a href={site.contact.phoneHref} className="flex items-center gap-3 text-mist hover:text-white">
              <Phone className="size-4 shrink-0" aria-hidden /> {site.contact.phoneDisplay}
            </a>
          </li>
          <li>
            <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3 break-all text-mist hover:text-white">
              <Mail className="size-4 shrink-0" aria-hidden /> {site.contact.email}
            </a>
          </li>
          <li>
            <a href={site.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-mist hover:text-white">
              <WhatsAppIcon className="size-4 shrink-0" /> WhatsApp chat <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          </li>
          <li className="pt-4">
            <p className="eyebrow mb-3 text-white/60">Follow</p>
            <ul className="flex gap-2">
              {site.social.map((s) =>
                s.href ? (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${site.name} on ${s.label}`}
                      className="grid size-10 place-items-center border border-line-dark text-mist transition-colors hover:border-white hover:text-white"
                    >
                      <SocialIcon label={s.label} />
                    </a>
                  </li>
                ) : (
                  <li key={s.label}>
                    <span
                      title={`${s.label} — account link coming soon`}
                      className="grid size-10 cursor-default place-items-center border border-dashed border-line-dark text-white/30"
                    >
                      <SocialIcon label={s.label} />
                      <span className="sr-only">{s.label} account coming soon</span>
                    </span>
                  </li>
                ),
              )}
            </ul>
          </li>
        </FooterCol>
      </div>

      <div className="container-x relative flex flex-col gap-3 border-t border-line-dark py-6 text-xs text-mist sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {year} {site.legalName}. All rights reserved.
        </p>
        <p className="eyebrow !text-[0.7rem]">
          {site.rcNumber} · Registered in {site.country}
        </p>
      </div>

      <div aria-hidden className="relative select-none overflow-hidden">
        <p className="container-x translate-y-[18%] text-[19vw] leading-none font-semibold tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.12)] lg:text-[16.5rem]">
          SoftInsight
        </p>
      </div>
    </footer>
  );
}

function FooterCol({ title, className = "", children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <p className="eyebrow text-white">{title}</p>
      <ul className="mt-5 grid gap-3 text-sm">{children}</ul>
    </div>
  );
}
