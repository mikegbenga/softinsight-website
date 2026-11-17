# SoftInsight Technologies Nigeria Limited — Corporate Website

Production website for **SoftInsight Technologies Nigeria Limited** (RC 8339571).
Built with Next.js, React, TypeScript and Tailwind CSS, and designed to run on Vercel's free Hobby plan.

---

## 1. Technology stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 with design tokens in `src/app/globals.css` |
| Motion | `motion` (mobile menu, services dropdown, division explorer only). Everything else uses CSS |
| Icons | `lucide-react` + small inline SVG brand icons |
| Fonts | Geist Sans (variable) + Geist Mono (self-hosted, no Google Fonts request) |
| Email delivery | Resend REST API via `fetch` (no SDK dependency) |
| Hosting | Vercel Hobby (free) |

There is no database, no CMS and no paid dependency. Every page is statically generated. The only server code is the contact-form endpoint `/api/contact`.

---

## 2. Project structure

```
softinsight-website/
├── public/brand/                  Official logo files (replace here to update the logo)
│   ├── softinsight-lockup.png         full logo for light backgrounds
│   ├── softinsight-lockup-dark.png    full logo with white lettering for dark backgrounds
│   ├── softinsight-mark.png / -sm.webp  circular symbol only
│   └── softinsight-logo-original.png  original file supplied by the company
├── src/
│   ├── app/                       Routes (one folder = one URL)
│   │   ├── page.tsx                   /            Home
│   │   ├── about/page.tsx             /about
│   │   ├── services/page.tsx          /services
│   │   ├── services/[slug]/page.tsx   /services/software-development, /it-infrastructure, /it-training, /procurement-logistics
│   │   ├── industries/page.tsx        /industries
│   │   ├── contact/page.tsx           /contact
│   │   ├── api/contact/route.ts       Contact form endpoint (server)
│   │   ├── not-found.tsx              Custom 404
│   │   ├── sitemap.ts, robots.ts      /sitemap.xml, /robots.txt
│   │   ├── opengraph-image.tsx        Social sharing image (generated at build)
│   │   ├── icon.png, apple-icon.png   Favicons
│   │   ├── layout.tsx                 Global layout, metadata, Organization structured data
│   │   └── globals.css                Design tokens: colours, type scale, utilities
│   ├── components/
│   │   ├── brand/Logo.tsx             Logo component
│   │   ├── layout/                    Header, Footer, WhatsApp button
│   │   ├── sections/home/             Home page sections
│   │   ├── contact/ContactForm.tsx    Contact form (client-side validation & states)
│   │   ├── visuals/                   Custom SVG illustrations (hero schematic, division glyphs)
│   │   └── ui/                        Buttons, labels, reveal animation, page hero, CTA band
│   ├── content/                   ← EDIT THESE TO UPDATE WEBSITE TEXT
│   │   ├── site.ts                    Company name, phone, email, WhatsApp, social links, navigation
│   │   ├── divisions.ts               The four business divisions and their services
│   │   └── industries.ts              Industry sectors
│   ├── lib/                       Shared contact-form validation and SEO helper
│   └── fonts/                     Self-hosted Geist Mono
├── .env.example                   Environment variables template
└── next.config.ts                 Security headers
```

---

## 3. Running locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (must pass before deploying)
npm run lint       # ESLint
npm run typecheck  # TypeScript
```

---

## 4. Updating website content

Most edits need **no design or code knowledge**. Open the file, change the text between the quotes, save, commit and push. Vercel redeploys automatically.

| To change… | Edit |
| --- | --- |
| Phone, email, WhatsApp number, company description, tagline | `src/content/site.ts` |
| Social media links (currently "coming soon") | `src/content/site.ts` → `social` (paste the full URL into `href`) |
| A division's services, descriptions or benefits | `src/content/divisions.ts` |
| Industry sectors | `src/content/industries.ts` |
| About page: vision, mission, values, leadership | `src/app/about/page.tsx` |
| Home page sections | `src/components/sections/home/*.tsx` |
| Logo | Replace the files in `public/brand/` and keep the same file names |
| Brand colours | `src/app/globals.css` → `@theme` block |

Adding a service to `divisions.ts` automatically updates the services page, the division page, the home page explorer, the navigation dropdown, the footer and the contact form's service list.

**Content rule:** do not add certifications, awards, client names, partnerships or statistics unless they are genuine and can be verified.

---

## 5. Configuring the contact form

The form validates in the browser and again on the server. Spam protection is a hidden honeypot field, a minimum completion time, a same-origin check and per-IP rate limiting.

**Until email delivery is configured, the form never pretends a message was sent.** It tells the visitor that online delivery isn't active yet and gives them one-click buttons to send the same details by email or WhatsApp.

To activate delivery (Resend has a free tier):

1. Create an account at <https://resend.com>.
2. **Domains → Add domain** and verify the company domain with the DNS records Resend gives you. Until a domain is verified, Resend's test sender `onboarding@resend.dev` can only deliver to the email address you signed up with.
3. **API Keys → Create API key**.
4. In Vercel go to **Project → Settings → Environment Variables** and add:

| Name | Value |
| --- | --- |
| `RESEND_API_KEY` | the key from step 3 (mark it *Sensitive*) |
| `CONTACT_TO_EMAIL` | `mikegbenga@yahoo.com` (or any inbox) |
| `CONTACT_FROM_EMAIL` | `SoftInsight Website <website@your-verified-domain>` |
| `NEXT_PUBLIC_SITE_URL` | the live URL, e.g. `https://softinsight-technologies.vercel.app` |

5. Redeploy (**Deployments → … → Redeploy**). Send a test enquiry to confirm it arrives.

Never put the API key in the source code. It belongs only in Vercel's environment variables, or in a local `.env.local` file, which is git-ignored.

---

## 6. Deployment (Vercel Hobby, free)

The project deploys automatically from GitHub:

1. Push to the `main` branch → Vercel builds and publishes to production.
2. Push to any other branch → Vercel creates a preview URL.

Build settings are auto-detected (Framework: Next.js, Build: `next build`, Output: `.next`). No `vercel.json` is required.

**Free plan notes**
- The Hobby plan is for personal and non-commercial use under Vercel's terms. A commercial company website may need Vercel Pro (paid) to stay compliant. Review <https://vercel.com/docs/limits/fair-use-guidelines> and Vercel's terms before relying on Hobby long-term.
- Hobby has monthly usage limits (bandwidth, function invocations, image optimisations). A corporate brochure site normally stays well within them.

**Custom domain** (e.g. `softinsight.com.ng`): a domain must be registered and paid for separately with a registrar, such as a `.ng` registrar via NiRA. Then add it under **Project → Settings → Domains** and update the DNS records Vercel shows. Afterwards, update `NEXT_PUBLIC_SITE_URL` and redeploy.

---

## 7. Quality checks performed

- Production build, TypeScript and ESLint pass with zero errors.
- All routes tested at 1440, 1280, 768, 390 and 360 px: no horizontal overflow, no broken images, no console errors.
- Mobile menu, services dropdown, keyboard-navigable division tabs, form validation, the "not configured" fallback and API protections tested.
- Lighthouse (mobile, local server): Accessibility 100, Best Practices 100, SEO 100, Performance 90+.
- `prefers-reduced-motion` respected; the site stays fully readable with JavaScript disabled.

## 8. Remaining items for the company to supply

- Official social media account URLs (`src/content/site.ts`).
- A professional photo of the CEO, if wanted (the About page currently shows a monogram).
- Optional business address, if it should be published.
- Logo wording: the supplied logo reads "SoftInsight Technology Limited", while the registered name is "SoftInsight Technologies Nigeria Limited". Confirm which the logo should show.
- Resend API key and a verified sender domain (section 5).
