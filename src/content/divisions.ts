/**
 * SoftInsight business divisions.
 * Each division generates its own page at /services/[slug].
 * Only services supplied by the company are listed here — do not add
 * certifications, partnerships or client names that are not genuine.
 */

export type DivisionSlug =
  | "software-development"
  | "it-infrastructure"
  | "it-training"
  | "procurement-logistics";

export type Division = {
  slug: DivisionSlug;
  index: string;
  name: string;
  shortName: string;
  kicker: string;
  headline: string;
  summary: string;
  intro: string[];
  services: { title: string; description: string }[];
  benefits: { title: string; description: string }[];
  forWho: string;
};

export const divisions: Division[] = [
  {
    slug: "software-development",
    index: "01",
    name: "Software Development and Digital Solutions",
    shortName: "Software & Digital",
    kicker: "Build",
    headline: "Software shaped around the way your organisation actually works.",
    summary:
      "Custom business software, web applications, enterprise systems and integrations engineered to remove friction from everyday operations.",
    intro: [
      "Off-the-shelf tools rarely fit a growing organisation perfectly. We design and build software around your processes, your data and your people — so technology supports the work instead of getting in its way.",
      "From a company website to an enterprise platform connected to the systems you already rely on, we take projects from requirements through design, development, deployment and ongoing support.",
    ],
    services: [
      { title: "Custom business software", description: "Purpose-built applications that model your operations, approvals and reporting exactly as your business needs them." },
      { title: "Web application development", description: "Secure, responsive browser-based applications for staff, customers and partners — accessible from any device." },
      { title: "Website design and development", description: "Professional, fast and search-friendly websites that present your organisation with clarity and credibility." },
      { title: "Enterprise application development", description: "Robust multi-user systems designed for scale, role-based access, auditability and long-term maintainability." },
      { title: "Business process automation", description: "Digitising manual, paper-based and repetitive workflows to reduce errors, delays and administrative overhead." },
      { title: "Database design and management", description: "Well-structured databases that keep information accurate, secure, backed up and ready for reporting." },
      { title: "API development and system integration", description: "Connecting applications, payment services and third-party platforms so data flows reliably between systems." },
      { title: "CRM and ERP solutions", description: "Customer and resource-planning systems that bring sales, finance, inventory and operations into a single view." },
    ],
    benefits: [
      { title: "Fit, not compromise", description: "Software that reflects how your teams work, rather than forcing workarounds." },
      { title: "One source of truth", description: "Integrated data reduces duplication and gives management dependable information." },
      { title: "Room to grow", description: "Architecture planned for additional users, branches and features over time." },
    ],
    forWho: "Businesses, institutions and public organisations ready to digitise operations or replace systems they have outgrown.",
  },
  {
    slug: "it-infrastructure",
    index: "02",
    name: "IT Infrastructure and Technical Services",
    shortName: "Infrastructure",
    kicker: "Connect",
    headline: "Dependable infrastructure, installed properly and kept running.",
    summary:
      "Hardware supply, networking, servers and responsive technical support that keep your people connected and your systems available.",
    intro: [
      "Every digital service depends on the physical layer beneath it — computers, cabling, wireless coverage, servers and the people who maintain them. When that foundation is weak, everything above it suffers.",
      "We plan, supply, install and support IT infrastructure for offices, campuses and operational sites, with an emphasis on tidy installation, clear documentation and responsive maintenance.",
    ],
    services: [
      { title: "Computer hardware supply", description: "Desktops, laptops, peripherals and accessories specified for your workload and budget." },
      { title: "Networking and infrastructure deployment", description: "Structured cabling, switching, routing and wireless networks designed for coverage and reliability." },
      { title: "Server installation and configuration", description: "Physical and virtual server setup, operating systems, storage, user directories and backup configuration." },
      { title: "IT support and maintenance", description: "Scheduled maintenance and responsive support to keep equipment and systems in good working order." },
      { title: "Network troubleshooting", description: "Systematic diagnosis of slow, unstable or failing networks — and practical fixes that last." },
      { title: "IT infrastructure consulting", description: "Independent assessment and planning for upgrades, expansions, new offices and technology refreshes." },
      { title: "Hardware procurement", description: "Sourcing genuine equipment through reliable channels, with clear specifications and documentation." },
    ],
    benefits: [
      { title: "Less downtime", description: "Properly designed and maintained infrastructure fails less often and recovers faster." },
      { title: "Clear documentation", description: "Network layouts and configurations recorded so your environment is understood, not guessed." },
      { title: "Right-sized spend", description: "Equipment specified for real requirements — not over-bought, not under-powered." },
    ],
    forWho: "Offices, schools, hospitals, branches and operational sites that need reliable connectivity and computing.",
  },
  {
    slug: "it-training",
    index: "03",
    name: "IT Training and Professional Development",
    shortName: "Training",
    kicker: "Empower",
    headline: "Practical digital skills for individuals, teams and institutions.",
    summary:
      "Hands-on training — from computer appreciation to software development and data analytics — delivered for individuals and organisations.",
    intro: [
      "Technology only creates value when people are confident using it. Our training programmes focus on practical, job-relevant skills that participants can apply immediately.",
      "We train individuals starting their digital journey, professionals building technical careers and organisations upskilling their staff — with content tailored to each group's level and goals.",
    ],
    services: [
      { title: "Computer appreciation", description: "Foundational computer literacy: operating systems, files, office productivity tools, email and safe internet use." },
      { title: "Software development training", description: "Programming fundamentals, problem solving and building real applications with modern tools." },
      { title: "Web development", description: "Building websites and web applications — structure, styling, interactivity and deployment." },
      { title: "Database administration", description: "Designing, querying, securing and maintaining relational databases." },
      { title: "Data analytics", description: "Turning raw data into insight with spreadsheets, querying, visualisation and reporting." },
      { title: "Digital skills training", description: "Everyday digital competencies for the modern workplace, from collaboration tools to cyber hygiene." },
      { title: "Corporate IT training", description: "Customised programmes for organisations, aligned to the systems and roles of your staff." },
    ],
    benefits: [
      { title: "Applied learning", description: "Exercises and projects grounded in real tasks, not just theory." },
      { title: "Tailored delivery", description: "Content and pace adapted to the participants' starting level and objectives." },
      { title: "Productive teams", description: "Staff who use technology confidently get more value from your systems." },
    ],
    forWho: "Individuals, graduates, professionals, schools and organisations investing in digital capability.",
  },
  {
    slug: "procurement-logistics",
    index: "04",
    name: "Procurement, Logistics and Project Support",
    shortName: "Procurement & Projects",
    kicker: "Deliver",
    headline: "Sourcing, supply and project support you can rely on.",
    summary:
      "Technology and general procurement, import and export, oil and gas and industrial equipment sourcing, logistics coordination and project implementation support.",
    intro: [
      "Projects succeed or stall on whether the right items arrive at the right place, at the right time and to the right specification. We take responsibility for that chain.",
      "Beyond technology, we support procurement for oil and gas tools, industrial and safety equipment and general requirements — coordinating logistics and helping monitor implementation until the job is done.",
    ],
    services: [
      { title: "Technology procurement", description: "Sourcing IT equipment, software licences and accessories to agreed specifications." },
      { title: "General procurement", description: "Responsive sourcing of goods and materials for corporate and institutional requirements." },
      { title: "Import and export services", description: "Coordinating the movement of goods across borders, with attention to documentation and timelines." },
      { title: "Oil and gas tools and equipment sourcing", description: "Locating and supplying tools and equipment for oil and gas operations and maintenance." },
      { title: "Industrial and safety equipment", description: "Supplying industrial equipment and personal protective and safety gear for operational sites." },
      { title: "Logistics coordination", description: "Planning and tracking delivery so items reach site safely and on schedule." },
      { title: "Project monitoring and implementation support", description: "Tracking progress, milestones and deliverables to help projects stay on course." },
    ],
    benefits: [
      { title: "Single point of contact", description: "One accountable partner from request to delivery." },
      { title: "Specification discipline", description: "Clear requirements confirmed before purchase to avoid costly mismatches." },
      { title: "Visibility", description: "Regular updates on sourcing, shipping and project progress." },
    ],
    forWho: "Corporate organisations, contractors, oil and gas operators and institutions with sourcing or project delivery needs.",
  },
];

export function getDivision(slug: string) {
  return divisions.find((d) => d.slug === slug);
}
