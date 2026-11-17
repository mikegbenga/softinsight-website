import { NextResponse, type NextRequest } from "next/server";
import { normalise, validateContact } from "@/lib/contact";
import { site } from "@/content/site";

/**
 * Contact form endpoint.
 * Delivers enquiries by email through Resend when RESEND_API_KEY is set.
 * Without it, responds 503 "not_configured" so the form never pretends
 * a message was delivered.
 */

export const runtime = "nodejs";

const MIN_FILL_MS = 3000; // humans take longer than 3 seconds
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>(); // best-effort, per server instance

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

export async function POST(req: NextRequest) {
  // Same-origin check: only accept submissions from this website
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ ok: false, code: "forbidden" }, { status: 403 });
  }

  if (!req.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ ok: false, code: "bad_request" }, { status: 415 });
  }

  const text = await req.text();
  if (text.length > 12_000) return NextResponse.json({ ok: false, code: "too_large" }, { status: 413 });

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ ok: false, code: "bad_request" }, { status: 400 });
  }

  // Spam protection: honeypot field + minimum completion time
  if (typeof body.company_website === "string" && body.company_website.length > 0) {
    return NextResponse.json({ ok: true }); // silently discard bots
  }
  const startedAt = Number(body.startedAt);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: false, code: "too_fast" }, { status: 400 });
  }

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, code: "rate_limited" }, { status: 429 });
  }

  const input = normalise(body);
  const errors = validateContact(input);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, code: "invalid", errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ ok: false, code: "not_configured" }, { status: 503 });
  }

  const to = process.env.CONTACT_TO_EMAIL || site.contact.email;
  const from = process.env.CONTACT_FROM_EMAIL || "SoftInsight Website <onboarding@resend.dev>";

  const rows: [string, string][] = [
    ["Name", input.name],
    ["Email", input.email],
    ["Phone", input.phone || "—"],
    ["Organisation", input.organisation || "—"],
    ["Service required", input.service],
  ];
  const html = `
    <div style="font-family:Arial,sans-serif;color:#071530;max-width:640px">
      <h2 style="margin:0 0 16px">New website enquiry</h2>
      <table style="border-collapse:collapse;width:100%">
        ${rows.map(([k, v]) => `<tr><td style="padding:8px;border-bottom:1px solid #dcd9cf;color:#525a6b;width:160px">${k}</td><td style="padding:8px;border-bottom:1px solid #dcd9cf">${esc(v)}</td></tr>`).join("")}
      </table>
      <h3 style="margin:24px 0 8px">Project description</h3>
      <p style="white-space:pre-wrap;line-height:1.6">${esc(input.message)}</p>
    </div>`;
  const plain = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nProject description:\n${input.message}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: input.email,
        subject: `Website enquiry: ${input.service} — ${input.name}`,
        html,
        text: plain,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("Contact delivery failed", res.status, await res.text().catch(() => ""));
      return NextResponse.json({ ok: false, code: "delivery_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact delivery error", err);
    return NextResponse.json({ ok: false, code: "delivery_failed" }, { status: 502 });
  }
}

export function GET() {
  return NextResponse.json({ ok: false, code: "method_not_allowed" }, { status: 405, headers: { Allow: "POST" } });
}
