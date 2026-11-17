import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "light" | "red";

const base =
  "group/btn relative inline-flex items-center justify-center gap-3 whitespace-nowrap px-6 py-3.5 text-[0.95rem] font-medium tracking-[-0.01em] transition-[background-color,color,border-color,transform] duration-300 ease-out-quint active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-brand-blue text-white hover:bg-ink",
  red: "bg-brand-red text-white hover:bg-brand-red-700",
  secondary: "border border-ink/80 text-ink hover:bg-ink hover:text-white",
  ghost: "px-0 text-ink hover:text-brand-blue-600",
  light: "border border-white/40 text-white hover:border-white hover:bg-white hover:text-ink",
};

function Arrow() {
  return (
    <span aria-hidden className="relative inline-flex size-4 overflow-hidden">
      <ArrowUpRight className="size-4 transition-transform duration-300 ease-out-quint group-hover/btn:-translate-y-4 group-hover/btn:translate-x-4" />
      <ArrowUpRight className="absolute size-4 -translate-x-4 translate-y-4 transition-transform duration-300 ease-out-quint group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
    </span>
  );
}

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  arrow?: boolean;
  external?: boolean;
};

export function ButtonLink({ href, variant = "primary", children, className = "", arrow = true, external }: ButtonLinkProps) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
        {arrow && <Arrow />}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

export function Button({ variant = "primary", className = "", children, ...rest }: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
