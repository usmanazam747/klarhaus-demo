"use client";

import { useState } from "react";
import type { Locale } from "@/content/site.ts";

const copy = {
  de: {
    name: "Name *",
    email: "E-Mail *",
    phone: "Telefon (optional)",
    service: "Leistung *",
    services: { buero: "Büro- & Praxisreinigung", grundreinigung: "Grundreinigung", fenster: "Fensterreinigung", umzug: "Endreinigung nach Umzug", sonstiges: "Etwas anderes" },
    size: "Fläche in m² (ca.)",
    frequency: "Wie oft?",
    frequencies: ["Einmalig", "Wöchentlich", "Alle 2 Wochen", "Monatlich"],
    date: "Wunschtermin",
    message: "Was sollen wir wissen?",
    consent: "Ich bin einverstanden, dass meine Angaben zur Bearbeitung der Anfrage verwendet werden. *",
    privacy: "Datenschutzerklärung",
    submit: "Angebot anfordern",
    sending: "Wird gesendet …",
    sent: "Danke! Ihre Anfrage ist angekommen. Sie erhalten Ihr Angebot am nächsten Werktag.",
    demo: "Danke! Das Formular funktioniert. Dies ist eine Demo: Ihre Angaben wurden geprüft und verworfen, nicht gespeichert und nicht weitergeleitet.",
    error: "Das hat leider nicht geklappt. Bitte prüfen Sie Ihre Angaben und versuchen Sie es erneut.",
  },
  en: {
    name: "Name *",
    email: "Email *",
    phone: "Phone (optional)",
    service: "Service *",
    services: { buero: "Office & practice cleaning", grundreinigung: "Deep cleaning", fenster: "Window cleaning", umzug: "Move-out cleaning", sonstiges: "Something else" },
    size: "Area in m² (approx.)",
    frequency: "How often?",
    frequencies: ["One-off", "Weekly", "Every 2 weeks", "Monthly"],
    date: "Preferred date",
    message: "Anything we should know?",
    consent: "I agree that my details are used to process this request. *",
    privacy: "Privacy policy",
    submit: "Request a quote",
    sending: "Sending …",
    sent: "Thank you! Your request has arrived. You will get your quote the next working day.",
    demo: "Thank you, the form works. This is a demo: your details were checked and discarded, not stored and not forwarded.",
    error: "Sorry, that didn't work. Please check your details and try again.",
  },
} satisfies Record<Locale, unknown>;

const field = "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-teal-700";

export function QuoteForm({ lang }: { lang: Locale }) {
  const t = copy[lang];
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "demo" | "error">("idle");

  async function submit(form: HTMLFormElement) {
    setStatus("sending");
    const data = Object.fromEntries(new FormData(form));
    const res = await fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, consent: data.consent === "on", lang }),
    }).catch(() => null);
    if (!res?.ok) return setStatus("error");
    const body: { forwarded?: boolean } = await res.json().catch(() => ({}));
    setStatus(body.forwarded ? "sent" : "demo");
  }

  if (status === "sent" || status === "demo") {
    return <p className="rounded-2xl bg-teal-50 p-6 text-teal-900">{t[status]}</p>;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit(e.currentTarget);
      }}
      className="grid gap-4 sm:grid-cols-2"
    >
      <label className="space-y-1 text-sm">
        <span>{t.name}</span>
        <input name="name" required maxLength={120} autoComplete="name" className={field} />
      </label>
      <label className="space-y-1 text-sm">
        <span>{t.email}</span>
        <input name="email" type="email" required maxLength={200} autoComplete="email" className={field} />
      </label>
      <label className="space-y-1 text-sm">
        <span>{t.phone}</span>
        <input name="phone" type="tel" maxLength={40} autoComplete="tel" className={field} />
      </label>
      <label className="space-y-1 text-sm">
        <span>{t.service}</span>
        <select name="service" required defaultValue="" className={field}>
          <option value="" disabled>
            –
          </option>
          {Object.entries(t.services).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
      <label className="space-y-1 text-sm">
        <span>{t.size}</span>
        <input name="size" type="number" min={1} max={10000} className={field} />
      </label>
      <label className="space-y-1 text-sm">
        <span>{t.frequency}</span>
        <select name="frequency" className={field}>
          {t.frequencies.map((f) => (
            <option key={f}>{f}</option>
          ))}
        </select>
      </label>
      <label className="space-y-1 text-sm">
        <span>{t.date}</span>
        <input name="date" type="date" className={field} />
      </label>
      <label className="space-y-1 text-sm sm:col-span-2">
        <span>{t.message}</span>
        <textarea name="message" rows={4} maxLength={2000} className={field} />
      </label>
      {/* Honeypot for bots - hidden from people and screen readers. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      <label className="flex items-start gap-2 text-sm sm:col-span-2">
        <input name="consent" type="checkbox" required className="mt-1" />
        <span>
          {t.consent}{" "}
          <a href={`/${lang}/datenschutz`} target="_blank" className="underline">
            {t.privacy}
          </a>
        </span>
      </label>
      {status === "error" && <p className="text-sm text-red-700 sm:col-span-2">{t.error}</p>}
      <button
        disabled={status === "sending"}
        className="rounded-full bg-teal-700 px-6 py-3 font-semibold text-white hover:bg-teal-800 disabled:opacity-50 sm:col-span-2 sm:justify-self-start"
      >
        {status === "sending" ? t.sending : t.submit}
      </button>
    </form>
  );
}
