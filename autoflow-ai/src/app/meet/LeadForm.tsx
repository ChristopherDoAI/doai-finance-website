"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

interface LeadFormProps {
  onSuccess: () => void;
  openCalendly: () => void;
}

const CRM_INBOUND_URL =
  process.env.NEXT_PUBLIC_CRM_INBOUND_URL ||
  "https://crm.doaisystems.co.uk/api/leads/inbound";

export default function LeadForm({ onSuccess }: LeadFormProps) {
  const searchParams = useSearchParams();
  const mountTs = useRef<number>(0);

  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    note: "",
    company_website: "", // honeypot
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Set timestamp on mount
  useEffect(() => {
    mountTs.current = Date.now();
  }, []);

  const utmCampaign = searchParams.get("utm_campaign") || "direct";
  const utmSource = searchParams.get("utm_source") || "";
  const utmMedium = searchParams.get("utm_medium") || "";

  const set = (key: keyof typeof fields) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFields((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Honeypot check — bots fill hidden fields
    if (fields.company_website) return;

    // Minimum time on page (< 2s = likely bot)
    if (Date.now() - mountTs.current < 2000) return;

    if (!fields.name.trim() || !fields.email.trim()) {
      setError("Name and email are required.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(CRM_INBOUND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim(),
          phone: fields.phone.trim() || undefined,
          businessName: fields.businessName.trim() || undefined,
          note: fields.note.trim() || undefined,
          source: "event_qr",
          utm_campaign: utmCampaign,
          utm_source: utmSource,
          utm_medium: utmMedium,
          _ts: mountTs.current,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error || `HTTP ${res.status}`);
      }

      onSuccess();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl border border-border bg-surface p-5"
    >
      <h2 className="font-display font-semibold text-base text-white mb-4">
        Drop us your details
      </h2>

      <div className="flex flex-col gap-3">
        {/* Name */}
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1" htmlFor="meet-name">
            Your name <span className="text-primary">*</span>
          </label>
          <input
            id="meet-name"
            type="text"
            autoComplete="name"
            required
            value={fields.name}
            onChange={set("name")}
            placeholder="Jane Smith"
            className="w-full h-10 px-3 rounded-lg border border-border text-sm text-white placeholder:text-text-muted bg-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1" htmlFor="meet-email">
            Email <span className="text-primary">*</span>
          </label>
          <input
            id="meet-email"
            type="email"
            autoComplete="email"
            required
            value={fields.email}
            onChange={set("email")}
            placeholder="jane@example.com"
            className="w-full h-10 px-3 rounded-lg border border-border text-sm text-white placeholder:text-text-muted bg-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1" htmlFor="meet-phone">
            Phone <span className="text-text-muted font-normal">(optional)</span>
          </label>
          <input
            id="meet-phone"
            type="tel"
            autoComplete="tel"
            value={fields.phone}
            onChange={set("phone")}
            placeholder="+44 7700 900000"
            className="w-full h-10 px-3 rounded-lg border border-border text-sm text-white placeholder:text-text-muted bg-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition"
          />
        </div>

        {/* Business name */}
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1" htmlFor="meet-biz">
            Business name <span className="text-text-muted font-normal">(optional)</span>
          </label>
          <input
            id="meet-biz"
            type="text"
            autoComplete="organization"
            value={fields.businessName}
            onChange={set("businessName")}
            placeholder="Acme Ltd"
            className="w-full h-10 px-3 rounded-lg border border-border text-sm text-white placeholder:text-text-muted bg-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition"
          />
        </div>

        {/* Note */}
        <div>
          <label className="block text-xs font-medium text-text-secondary mb-1" htmlFor="meet-note">
            Anything else <span className="text-text-muted font-normal">(optional)</span>
          </label>
          <textarea
            id="meet-note"
            value={fields.note}
            onChange={set("note")}
            rows={3}
            placeholder="What you are trying to automate, questions, anything..."
            className="w-full px-3 py-2 rounded-lg border border-border text-sm text-white placeholder:text-text-muted bg-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition resize-none"
          />
        </div>
      </div>

      {/* Honeypot — visually hidden from real users */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
      >
        <label htmlFor="meet-website">Website</label>
        <input
          id="meet-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={fields.company_website}
          onChange={set("company_website")}
        />
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-4 w-full h-11 rounded-lg bg-primary text-base font-display font-semibold text-sm hover:bg-primary-dark active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sending...
          </>
        ) : (
          "Send"
        )}
      </button>
    </form>
  );
}
