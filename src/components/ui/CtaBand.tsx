import { ButtonLink } from "./Button";
import { WhatsAppIcon } from "./SocialIcons";
import { site } from "@/content/site";

/** Closing call-to-action used at the end of inner pages. */
export function CtaBand({
  title = "Have a project in mind?",
  subtitle = "Let’s scope it together.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="on-dark relative overflow-hidden border-b border-line-dark bg-navy text-white">
      <div aria-hidden className="bg-blueprint-dark absolute inset-0" />
      <div aria-hidden className="absolute top-0 left-0 h-1 w-1/3 bg-brand-red" />
      <div className="container-x relative grid gap-10 py-20 md:py-28 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="eyebrow text-mist">Next step</p>
          <h2 className="mt-5 text-h1 font-semibold text-balance">
            {title} <span className="text-mist">{subtitle}</span>
          </h2>
        </div>
        <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
          <ButtonLink href="/contact#enquiry" variant="red">
            Start a project
          </ButtonLink>
          <ButtonLink href={site.contact.whatsapp} variant="light" external arrow={false}>
            <WhatsAppIcon className="size-4" /> WhatsApp us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
