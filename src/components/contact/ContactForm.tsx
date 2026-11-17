"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import { limits, normalise, serviceOptions, validateContact, type ContactErrors, type ContactInput } from "@/lib/contact";
import { site } from "@/content/site";

type Status = "idle" | "submitting" | "success" | "not_configured" | "error" | "rate_limited";

const empty: ContactInput = { name: "", email: "", phone: "", organisation: "", service: "", message: "" };

export function ContactForm() {
  const uid = useId();
  const [values, setValues] = useState<ContactInput>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactInput, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [fallback, setFallback] = useState<ContactInput | null>(null);
  const startedAt = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    // Pre-select a service when linked from a division page (?service=...)
    const requested = new URLSearchParams(window.location.search).get("service");
    if (requested && (serviceOptions as readonly string[]).includes(requested)) {
      // Reading the URL is a one-time sync from an external source on mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValues((v) => ({ ...v, service: requested }));
    }
  }, []);

  const set = (k: keyof ContactInput, v: string) => {
    const next = { ...values, [k]: v };
    setValues(next);
    if (touched[k]) setErrors(validateContact(normalise(next)));
  };
  const blur = (k: keyof ContactInput) => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validateContact(normalise(values)));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const data = normalise(values);
    const errs = validateContact(data);
    setErrors(errs);
    setTouched({ name: true, email: true, phone: true, organisation: true, service: true, message: true });
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("submitting");
    const honeypot = (formRef.current?.elements.namedItem("company_website") as HTMLInputElement | null)?.value ?? "";
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, company_website: honeypot, startedAt: startedAt.current }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; code?: string; errors?: ContactErrors };
      if (res.ok && json.ok) {
        setStatus("success");
        setValues(empty);
        setTouched({});
      } else if (json.code === "invalid" && json.errors) {
        setErrors(json.errors);
        setStatus("idle");
      } else if (json.code === "not_configured") {
        setFallback(data);
        setStatus("not_configured");
      } else if (json.code === "rate_limited") {
        setFallback(data);
        setStatus("rate_limited");
      } else {
        setFallback(data);
        setStatus("error");
      }
    } catch {
      setFallback(data);
      setStatus("error");
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const mailto = fallback
    ? `mailto:${site.contact.email}?subject=${encodeURIComponent(`Project enquiry: ${fallback.service}`)}&body=${encodeURIComponent(
        `Name: ${fallback.name}\nEmail: ${fallback.email}\nPhone: ${fallback.phone || "-"}\nOrganisation: ${fallback.organisation || "-"}\nService: ${fallback.service}\n\n${fallback.message}`,
      )}`
    : `mailto:${site.contact.email}`;
  const wa = fallback
    ? `${site.contact.whatsapp}?text=${encodeURIComponent(`Hello SoftInsight, I'm ${fallback.name}. I'm interested in ${fallback.service}. ${fallback.message}`.slice(0, 1200))}`
    : site.contact.whatsapp;

  if (status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="border border-line bg-white p-8 outline-none md:p-12">
        <CheckCircle2 className="size-10 text-brand-green" aria-hidden />
        <h3 className="mt-6 text-h3 font-medium">Thank you — your enquiry has been sent.</h3>
        <p className="mt-3 max-w-md leading-relaxed text-slate">
          We have received your message and will reply to the email address you provided. For anything urgent, call{" "}
          <a className="font-medium text-ink underline" href={site.contact.phoneHref}>
            {site.contact.phoneDisplay}
          </a>
          .
        </p>
        <Button variant="secondary" className="mt-8" onClick={() => setStatus("idle")}>
          Send another enquiry
        </Button>
      </div>
    );
  }

  const field = (k: keyof ContactInput) => ({
    id: `${uid}-${k}`,
    name: k,
    value: values[k],
    "aria-invalid": touched[k] && errors[k] ? true : undefined,
    "aria-describedby": touched[k] && errors[k] ? `${uid}-${k}-err` : undefined,
    onBlur: () => blur(k),
  });

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="border border-line bg-white p-6 sm:p-8 md:p-10" aria-describedby={`${uid}-note`}>
      {(status === "not_configured" || status === "error" || status === "rate_limited") && (
        <div ref={statusRef} tabIndex={-1} role="alert" className="mb-8 border-l-[3px] border-brand-red bg-[#fdf0f0] p-5 outline-none">
          <p className="flex items-start gap-3 font-medium">
            <AlertCircle className="mt-0.5 size-5 shrink-0 text-brand-red-700" aria-hidden />
            {status === "not_configured"
              ? "Online form delivery is not yet active, so your message has not been sent."
              : status === "rate_limited"
                ? "Too many submissions in a short time — your message has not been sent."
                : "We couldn’t send your message just now — it has not been delivered."}
          </p>
          <p className="mt-2 pl-8 text-sm leading-relaxed text-slate">
            Please send it directly instead — your details are pre-filled below.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 pl-8">
            <a href={mailto} className="inline-flex items-center gap-2 bg-ink px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-blue">
              Send by email
            </a>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#1f9e55] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#178246]">
              <WhatsAppIcon className="size-4" /> Send on WhatsApp
            </a>
          </div>
        </div>
      )}

      <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
        <Field label="Full name" required error={touched.name ? errors.name : undefined} id={`${uid}-name`}>
          <input {...field("name")} type="text" autoComplete="name" maxLength={limits.name} required onChange={(e) => set("name", e.target.value)} className={inputCls} />
        </Field>
        <Field label="Email address" required error={touched.email ? errors.email : undefined} id={`${uid}-email`}>
          <input {...field("email")} type="email" inputMode="email" autoComplete="email" maxLength={limits.email} required onChange={(e) => set("email", e.target.value)} className={inputCls} />
        </Field>
        <Field label="Phone number" hint="Optional" error={touched.phone ? errors.phone : undefined} id={`${uid}-phone`}>
          <input {...field("phone")} type="tel" inputMode="tel" autoComplete="tel" maxLength={limits.phone} onChange={(e) => set("phone", e.target.value)} className={inputCls} />
        </Field>
        <Field label="Organisation" hint="Optional" error={touched.organisation ? errors.organisation : undefined} id={`${uid}-organisation`}>
          <input {...field("organisation")} type="text" autoComplete="organization" maxLength={limits.organisation} onChange={(e) => set("organisation", e.target.value)} className={inputCls} />
        </Field>
        <Field label="Service required" required error={touched.service ? errors.service : undefined} id={`${uid}-service`} className="sm:col-span-2">
          <div className="relative">
            <select {...field("service")} required onChange={(e) => set("service", e.target.value)} className={`${inputCls} appearance-none pr-10`}>
              <option value="" disabled>
                Select a service area
              </option>
              {serviceOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <span aria-hidden className="pointer-events-none absolute top-1/2 right-1 -translate-y-1/2 text-slate">
              ▾
            </span>
          </div>
        </Field>
        <Field
          label="Project description"
          required
          error={touched.message ? errors.message : undefined}
          id={`${uid}-message`}
          className="sm:col-span-2"
          counter={`${values.message.length}/${limits.message}`}
        >
          <textarea
            {...field("message")}
            rows={5}
            maxLength={limits.message}
            required
            onChange={(e) => set("message", e.target.value)}
            placeholder="What would you like to achieve? Include any timelines, locations or requirements."
            className={`${inputCls} resize-y`}
          />
        </Field>
      </div>

      {/* Honeypot — hidden from people, tempting to bots */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-hp`}>Leave this field empty</label>
        <input id={`${uid}-hp`} type="text" name="company_website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="mt-10 flex flex-col-reverse gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p id={`${uid}-note`} className="max-w-xs text-xs leading-relaxed text-slate">
          We only use these details to respond to your enquiry. Fields marked <span className="text-brand-red-700">*</span> are required.
        </p>
        <Button type="submit" disabled={status === "submitting"} aria-busy={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            "Send enquiry"
          )}
        </Button>
      </div>
    </form>
  );
}

const inputCls =
  "block w-full border-0 border-b border-ink/25 bg-transparent px-0 py-3 text-base text-ink placeholder:text-slate/60 transition-colors focus:border-brand-blue-600 focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-brand-red";

function Field({
  label,
  id,
  required,
  hint,
  error,
  counter,
  className = "",
  children,
}: {
  label: string;
  id: string;
  required?: boolean;
  hint?: string;
  error?: string;
  counter?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`group relative ${className}`}>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="eyebrow text-ink">
          {label}
          {required && (
            <span className="text-brand-red-700" aria-hidden>
              {" "}
              *
            </span>
          )}
        </label>
        {(hint || counter) && <span className="eyebrow text-slate">{counter ?? hint}</span>}
      </div>
      <div className="relative">
        {children}
        <span aria-hidden className="absolute bottom-0 left-0 h-0.5 w-0 bg-brand-blue-600 transition-all duration-500 ease-out-quint group-focus-within:w-full" />
      </div>
      {error && (
        <p id={`${id}-err`} className="mt-2 flex items-center gap-1.5 text-sm text-brand-red-700">
          <AlertCircle className="size-3.5 shrink-0" aria-hidden /> {error}
        </p>
      )}
    </div>
  );
}
