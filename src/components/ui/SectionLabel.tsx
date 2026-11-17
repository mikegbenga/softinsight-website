/** Mono section index label, e.g. "01 — Who we are" */
export function SectionLabel({ index, children, tone = "light" }: { index?: string; children: React.ReactNode; tone?: "light" | "dark" }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${tone === "dark" ? "text-mist" : "text-slate"}`}>
      {index && <span className={tone === "dark" ? "text-white" : "text-ink"}>{index}</span>}
      <span aria-hidden className={`h-px w-8 ${tone === "dark" ? "bg-white/30" : "bg-ink/25"}`} />
      <span>{children}</span>
    </p>
  );
}
