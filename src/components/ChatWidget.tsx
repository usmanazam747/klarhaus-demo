"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/content/site.ts";

type Source = { id: string; title: string };
type Message = { role: "user" | "bot"; text: string; sources?: Source[]; mode?: string };

const copy = {
  de: {
    open: "Fragen? Chat öffnen",
    title: "KlarHaus-Assistent",
    hello: "Hallo! Fragen Sie mich zu Preisen, Leistungen oder Terminen.",
    placeholder: "Ihre Frage …",
    send: "Senden",
    sources: "Quelle",
    extractive: "Direkt aus unseren FAQ zitiert (Demo ohne KI-Schlüssel)",
    claude: "KI-Antwort auf Basis unserer FAQ – kann Fehler enthalten",
    error: "Das hat leider nicht geklappt. Bitte versuchen Sie es noch einmal.",
    suggestions: ["Was kostet eine Grundreinigung?", "Bringt ihr eigene Putzmittel mit?", "Kommt ihr auch nach Bremerhaven?"],
  },
  en: {
    open: "Questions? Open chat",
    title: "KlarHaus assistant",
    hello: "Hi! Ask me about prices, services or appointments.",
    placeholder: "Your question …",
    send: "Send",
    sources: "Source",
    extractive: "Quoted directly from our FAQ (demo without an AI key)",
    claude: "AI answer based on our FAQ – may contain mistakes",
    error: "Sorry, that didn't work. Please try again.",
    suggestions: ["How much does a deep clean cost?", "Do you bring your own cleaning products?", "Can I cancel an appointment?"],
  },
} satisfies Record<Locale, unknown>;

export function ChatWidget({ lang }: { lang: Locale }) {
  const t = copy[lang];
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: "bot", text: t.hello }]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  async function ask(question: string) {
    if (!question.trim() || busy) return;
    setInput("");
    setBusy(true);
    setMessages((m) => [...m, { role: "user", text: question }]);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, lang }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data: { answer: string; sources: Source[]; mode: string } = await res.json();
      setMessages((m) => [...m, { role: "bot", text: data.answer, sources: data.sources, mode: data.mode }]);
    } catch {
      setMessages((m) => [...m, { role: "bot", text: t.error }]);
    } finally {
      setBusy(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-teal-700 px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-teal-800"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
          <path d="M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H9l-5 4v-4H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
        </svg>
        {t.open}
      </button>
    );
  }

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 flex max-h-[80vh] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-96">
      <div className="flex items-center justify-between bg-teal-700 px-4 py-3 text-white">
        <p className="font-semibold">{t.title}</p>
        <button onClick={() => setOpen(false)} aria-label="Close" className="text-xl leading-none">
          ×
        </button>
      </div>
      <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-4 text-sm" aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : ""}>
            <p
              className={`inline-block max-w-[90%] rounded-2xl px-3 py-2 text-left ${
                m.role === "user" ? "bg-teal-700 text-white" : "bg-slate-100 text-slate-800"
              }`}
            >
              {m.text}
            </p>
            {m.sources?.map((s) => (
              <a key={s.id} href={`/${lang}/leistungen#faq-${s.id}`} className="mt-1 block text-xs text-teal-800 underline">
                {t.sources}: {s.title}
              </a>
            ))}
            {(m.mode === "extractive" || m.mode === "claude") && (
              <p className="mt-1 text-[11px] text-slate-400">{m.mode === "claude" ? t.claude : t.extractive}</p>
            )}
          </div>
        ))}
        {busy && <p className="text-slate-400">…</p>}
        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2">
            {t.suggestions.map((s) => (
              <button key={s} onClick={() => ask(s)} className="rounded-full border border-teal-700 px-3 py-1 text-xs text-teal-800 hover:bg-teal-50">
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
        className="flex gap-2 border-t border-slate-200 p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.placeholder}
          maxLength={500}
          className="flex-1 rounded-full border border-slate-300 px-4 py-2 text-sm outline-none focus:border-teal-700"
        />
        <button disabled={busy} className="rounded-full bg-teal-700 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">
          {t.send}
        </button>
      </form>
    </div>
  );
}
