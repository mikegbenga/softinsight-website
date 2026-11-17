import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";

/**
 * Official SoftInsight logo.
 * To replace the logo, swap the files in /public/brand/ (keep the same names)
 * — no component changes are needed.
 */
type LogoProps = {
  variant?: "light" | "dark";
  className?: string;
  priority?: boolean;
  asLink?: boolean;
};

export function Logo({ variant = "light", className = "h-10 w-auto", priority, asLink = true }: LogoProps) {
  const img = (
    <Image
      src={variant === "dark" ? "/brand/softinsight-lockup-dark.png" : "/brand/softinsight-lockup.png"}
      alt={`${site.legalName} logo`}
      width={880}
      height={240}
      priority={priority}
      sizes="220px"
      className={className}
    />
  );
  if (!asLink) return img;
  return (
    <Link href="/" aria-label={`${site.name} — home`} className="inline-flex shrink-0">
      {img}
    </Link>
  );
}

export function LogoMark({ className = "size-10" }: { className?: string }) {
  return (
    <Image src="/brand/softinsight-mark.png" alt="" aria-hidden width={256} height={257} sizes="80px" className={className} />
  );
}
