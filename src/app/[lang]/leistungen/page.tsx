import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { faq, hasLocale, nav, services, ui } from "@/content/site.ts";

export async function generateMetadata({ params }: PageProps<"/[lang]/leistungen">): Promise<Metadata> {
  const { lang } = await params;
  return { title: hasLocale(lang) ? nav[1].label[lang] : undefined };
}

export default async function Services({ params }: PageProps<"/[lang]/leistungen">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-3xl font-bold text-slate-900">{nav[1].label[lang]}</h1>
      <p className="mt-3 text-slate-600">{ui.pricesNote[lang]}</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {services.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-24 rounded-2xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900">{s.title[lang]}</h2>
            <p className="mt-2 text-sm text-slate-600">{s.text[lang]}</p>
            <p className="mt-4 text-xl font-bold text-teal-800">{s.price[lang]}</p>
          </section>
        ))}
      </div>

      <Link href={`/${lang}/angebot`} className="mt-8 inline-block rounded-full bg-teal-700 px-6 py-3 font-semibold text-white hover:bg-teal-800">
        {ui.ctaQuote[lang]}
      </Link>

      <h2 className="mt-16 text-2xl font-bold text-slate-900">{ui.faqTitle[lang]}</h2>
      <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200">
        {faq.map((item) => (
          <section key={item.id} id={`faq-${item.id}`} className="scroll-mt-24 p-5 target:bg-amber-50">
            <h3 className="font-semibold text-slate-900">{item.q[lang]}</h3>
            <p className="mt-2 text-sm text-slate-600">{item.a[lang]}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
