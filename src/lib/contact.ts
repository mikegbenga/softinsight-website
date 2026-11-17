/**
 * Shared contact-form schema and validation, used by both the browser form
 * and the /api/contact endpoint so the rules can never drift apart.
 */
import { divisions } from "@/content/divisions";

export const serviceOptions = [...divisions.map((d) => d.name), "Not sure yet / general enquiry"] as const;

export type ContactInput = {
  name: string;
  email: string;
  phone: string;
  organisation: string;
  service: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export const limits = {
  name: 100,
  email: 160,
  phone: 24,
  organisation: 150,
  message: 3000,
  messageMin: 20,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9\s\-()]{7,24}$/;

export function normalise(raw: Partial<Record<keyof ContactInput, unknown>>): ContactInput {
  const s = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  return {
    name: s(raw.name).replace(/\s+/g, " "),
    email: s(raw.email).toLowerCase(),
    phone: s(raw.phone),
    organisation: s(raw.organisation).replace(/\s+/g, " "),
    service: s(raw.service),
    message: s(raw.message),
  };
}

export function validateContact(v: ContactInput): ContactErrors {
  const e: ContactErrors = {};
  if (v.name.length < 2) e.name = "Please enter your full name.";
  else if (v.name.length > limits.name) e.name = `Please keep your name under ${limits.name} characters.`;

  if (!v.email) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(v.email) || v.email.length > limits.email) e.email = "Please enter a valid email address, e.g. name@company.com.";

  if (v.phone && !PHONE_RE.test(v.phone)) e.phone = "Please enter a valid phone number, e.g. +234 803 000 0000.";

  if (v.organisation.length > limits.organisation) e.organisation = `Please keep this under ${limits.organisation} characters.`;

  if (!v.service) e.service = "Please choose the service you need.";
  else if (!(serviceOptions as readonly string[]).includes(v.service)) e.service = "Please choose a service from the list.";

  if (v.message.length < limits.messageMin)
    e.message = `Please describe your project in at least ${limits.messageMin} characters so we can respond helpfully.`;
  else if (v.message.length > limits.message) e.message = `Please keep your description under ${limits.message} characters.`;

  return e;
}
