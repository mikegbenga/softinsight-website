import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import localFont from "next/font/local";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { site } from "@/content/site";
import "./globals.css";

// Mono is only used for small labels: one weight, not preloaded, so it never delays first paint.
const geistMono = localFont({
  src: "../fonts/GeistMono-Regular.woff2",
  variable: "--font-geist-mono",
  weight: "400",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.legalName} — Software, IT Infrastructure, Training & Procurement`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.legalName,
  keywords: [
    "SoftInsight",
    "software development Nigeria",
    "IT infrastructure Nigeria",
    "IT training Nigeria",
    "technology procurement Nigeria",
    "web development Nigeria",
    "networking and servers",
    "oil and gas equipment sourcing",
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.legalName,
    locale: "en_NG",
    url: site.url,
    title: site.legalName,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: site.legalName, description: site.description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true, email: true },
};

export const viewport: Viewport = {
  themeColor: "#f6f5f1",
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.legalName,
  alternateName: site.name,
  url: site.url,
  logo: `${site.url}/brand/softinsight-lockup.png`,
  description: site.description,
  slogan: site.tagline,
  email: site.contact.email,
  telephone: "+2348036093108",
  address: { "@type": "PostalAddress", addressCountry: "NG" },
  areaServed: { "@type": "Country", name: "Nigeria" },
  identifier: { "@type": "PropertyValue", propertyID: "CAC Registration Number", value: site.rcNumber },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+2348036093108",
      email: site.contact.email,
      areaServed: "NG",
      availableLanguage: ["English"],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG" className={`${GeistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal styles only when JavaScript is available */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body>
        <a
          href="#main"
          className="fixed top-3 left-3 z-[60] -translate-y-24 bg-ink px-4 py-3 text-sm text-white transition-transform focus:translate-y-0"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
