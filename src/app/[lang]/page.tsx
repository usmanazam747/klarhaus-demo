import Link from "next/link";
import { notFound } from "next/navigation";
import { MapEmbed } from "@/components/MapEmbed.tsx";
import { benefits, hasLocale, services, ui } from "@/content/site.ts";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <>
      <section className="bg-gradient-to-b from-teal-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-700">{ui.tagline[lang]}</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{ui.heroTitle[lang]}</h1>
          <p className="mt-5 max-w-xl text-lg text-slate-600">{ui.heroText[lang]}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/${lang}/angebot`} className="rounded-full bg-teal-700 px-6 py-3 font-semibold text-white hover:bg-teal-800">
              {ui.ctaQuote[lang]}
            </Link>
            <Link href={`/${lang}/leistungen`} className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:border-teal-700">
              {ui.ctaServices[lang]}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold text-slate-900">{ui.whyTitle[lang]}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.title.de} className="rounded-2xl border border-slate-200 p-5">
              <h3 className="font-semibold text-teal-800">{b.title[lang]}</h3>
              <p className="mt-2 text-sm text-slate-600">{b.text[lang]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-bold text-slate-900">{ui.servicesTitle[lang]}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {services.map((s) => (
              <Link key={s.id} href={`/${lang}/leistungen#${s.id}`} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 hover:ring-teal-700">
                <h3 className="font-semibold text-slate-900">{s.title[lang]}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.text[lang]}</p>
                <p className="mt-3 text-sm font-semibold text-teal-800">{s.price[lang]}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{ui.mapTitle[lang]}</h2>
          <p className="mt-3 text-slate-600">{ui.mapText[lang]}</p>
          <Link href={`/${lang}/angebot`} className="mt-6 inline-block rounded-full bg-teal-700 px-6 py-3 font-semibold text-white hover:bg-teal-800">
            {ui.ctaQuote[lang]}
          </Link>
        </div>
        <MapEmbed lang={lang} />
      </section>
    </>
  );
}
