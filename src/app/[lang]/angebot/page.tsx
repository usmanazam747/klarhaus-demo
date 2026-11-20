import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuoteForm } from "@/components/QuoteForm.tsx";
import { hasLocale, nav } from "@/content/site.ts";

const steps = {
  de: ["Sie senden uns Ihre Anfrage.", "Wir prüfen sie und melden uns am nächsten Werktag mit einem Festpreis.", "Sie bestätigen, wir planen den Termin – meist innerhalb von 3 Werktagen."],
  en: ["You send us your request.", "We review it and reply the next working day with a fixed price.", "You confirm and we schedule – usually within 3 working days."],
};

export async function generateMetadata({ params }: PageProps<"/[lang]/angebot">): Promise<Metadata> {
  const { lang } = await params;
  return { title: hasLocale(lang) ? nav[3].label[lang] : undefined };
}

export default async function Quote({ params }: PageProps<"/[lang]/angebot">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-[2fr_1fr]">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">{nav[3].label[lang]}</h1>
        <p className="mt-3 mb-8 text-slate-600">
          {lang === "de" ? "Kostenlos und unverbindlich. Felder mit * sind Pflicht." : "Free and non-binding. Fields marked * are required."}
        </p>
        <QuoteForm lang={lang} />
      </div>
      <aside className="h-fit rounded-2xl bg-teal-50 p-6">
        <h2 className="font-semibold text-teal-900">{lang === "de" ? "So geht's weiter" : "What happens next"}</h2>
        <ol className="mt-4 space-y-3 text-sm text-teal-900">
          {steps[lang].map((step, i) => (
            <li key={step} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-700 text-xs font-bold text-white">{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </aside>
    </div>
  );
}
