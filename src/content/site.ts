/**
 * Central company information.
 * Edit this file to update contact details, social links and navigation
 * across the entire website.
 */

export const site = {
  name: "SoftInsight",
  legalName: "SoftInsight Technologies Nigeria Limited",
  shortName: "SoftInsight Technologies",
  rcNumber: "RC 8339571",
  tagline: "Innovate. Integrate. Empower.",
  description:
    "SoftInsight Technologies Nigeria Limited designs, builds and delivers software, IT infrastructure, technology training and procurement solutions for businesses, institutions and organisations across Nigeria.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://softinsight-technologies.vercel.app").replace(/\/$/, ""),
  country: "Nigeria",
  ceo: {
    name: "Michael Gbenga Abajemito",
    title: "Chief Executive Officer",
  },
  contact: {
    phoneDisplay: "+234 803 609 3108",
    phoneHref: "tel:+2348036093108",
    email: "mikegbenga@yahoo.com",
    whatsapp: "https://wa.me/2348036093108",
  },
  /**
   * Social accounts. Leave `href` empty until the official accounts exist —
   * empty entries are shown as "coming soon" and are not clickable.
   */
  social: [
    { label: "LinkedIn", href: "" },
    { label: "X (Twitter)", href: "" },
    { label: "Facebook", href: "" },
    { label: "Instagram", href: "" },
  ] as { label: "LinkedIn" | "X (Twitter)" | "Facebook" | "Instagram"; href: string }[],
} as const;

export const mainNav = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Contact", href: "/contact" },
] as const;
