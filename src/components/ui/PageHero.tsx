import { SectionLabel } from "./SectionLabel";
import { Breadcrumbs } from "./Breadcrumbs";

/** Standard inner-page header with breadcrumb, label, large title and intro. */
export function PageHero({
  label,
  title,
  intro,
  crumbs,
  aside,
}: {
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  crumbs: { label: string; href?: string }[];
  aside?: React.ReactNode;
}) {
  return (
    <section className="grain relative border-b border-line bg-paper pt-32 pb-16 md:pt-40 md:pb-24">
      <div aria-hidden className="bg-blueprint absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div className="container-x relative">
        <Breadcrumbs items={crumbs} />
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionLabel>{label}</SectionLabel>
            <h1 className="mt-6 text-h1 font-semibold text-balance">{title}</h1>
          </div>
          {(intro || aside) && (
            <div className="lg:col-span-4">
              {intro && <p className="text-lead text-slate text-pretty">{intro}</p>}
              {aside}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
