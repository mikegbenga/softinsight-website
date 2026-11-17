/**
 * Industries where SoftInsight can deliver value.
 * These describe relevant solutions — they do not claim existing clients.
 */

import type { DivisionSlug } from "./divisions";

export type Industry = {
  id: string;
  name: string;
  context: string;
  solutions: string[];
  divisions: DivisionSlug[];
};

export const industries: Industry[] = [
  {
    id: "financial-services",
    name: "Financial services",
    context:
      "Banks, microfinance institutions, cooperatives and lenders need accurate records, secure access and dependable systems that customers and regulators can trust.",
    solutions: [
      "Loan, savings and member management applications",
      "Integration between core systems, payment services and reporting tools",
      "Secure network and server infrastructure for branches",
      "Staff training on digital tools and data handling",
    ],
    divisions: ["software-development", "it-infrastructure", "it-training"],
  },
  {
    id: "education",
    name: "Education",
    context:
      "Schools, colleges and training centres are expanding digital learning and administration while preparing students for a technology-driven economy.",
    solutions: [
      "Student records, results and fee management systems",
      "Computer laboratory setup, networking and campus Wi-Fi",
      "Computer appreciation and coding programmes for learners",
      "Digital skills training for teaching and administrative staff",
    ],
    divisions: ["software-development", "it-infrastructure", "it-training"],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    context:
      "Hospitals, clinics and laboratories depend on reliable information and connectivity to coordinate care and manage resources efficiently.",
    solutions: [
      "Patient records, appointment and billing applications",
      "Network and hardware deployment for clinical and administrative areas",
      "Data backup and access-control configuration",
      "Procurement of IT equipment for facilities",
    ],
    divisions: ["software-development", "it-infrastructure", "procurement-logistics"],
  },
  {
    id: "retail-commerce",
    name: "Retail and commerce",
    context:
      "Retailers, distributors and online sellers compete on speed, stock accuracy and customer experience across physical and digital channels.",
    solutions: [
      "Point-of-sale, inventory and sales reporting systems",
      "E-commerce websites and online ordering",
      "CRM tools to manage customers and repeat business",
      "Store connectivity and hardware supply",
    ],
    divisions: ["software-development", "it-infrastructure"],
  },
  {
    id: "government",
    name: "Government and public institutions",
    context:
      "Ministries, agencies and public bodies are digitising services to improve transparency, record-keeping and access for citizens.",
    solutions: [
      "Process automation for applications, approvals and records",
      "Web portals and information platforms",
      "Infrastructure deployment for offices and data rooms",
      "Capacity-building and digital skills training for civil servants",
    ],
    divisions: ["software-development", "it-infrastructure", "it-training"],
  },
  {
    id: "oil-gas",
    name: "Oil and gas",
    context:
      "Operators, service companies and contractors require specialised equipment, safety compliance and dependable site logistics.",
    solutions: [
      "Sourcing of oil and gas tools and equipment",
      "Industrial and safety equipment supply",
      "Import, export and logistics coordination",
      "Project monitoring and implementation support",
    ],
    divisions: ["procurement-logistics", "it-infrastructure"],
  },
  {
    id: "real-estate-construction",
    name: "Real estate and construction",
    context:
      "Developers, agencies and contractors manage property portfolios, projects and suppliers across multiple sites and stakeholders.",
    solutions: [
      "Property listing websites and client portals",
      "Project and contract tracking applications",
      "Network and IT setup for new buildings and site offices",
      "Procurement and logistics for project materials",
    ],
    divisions: ["software-development", "it-infrastructure", "procurement-logistics"],
  },
  {
    id: "smes-corporate",
    name: "SMEs and corporate organisations",
    context:
      "Growing businesses need professional technology that scales with them — without the overhead of large internal IT departments.",
    solutions: [
      "Company websites and business applications",
      "Office networking, hardware and ongoing IT support",
      "CRM and ERP adoption",
      "Corporate IT training for staff",
    ],
    divisions: ["software-development", "it-infrastructure", "it-training", "procurement-logistics"],
  },
];
