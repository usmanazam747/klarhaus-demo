import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapEmbed } from "@/components/MapEmbed.tsx";
import { about, benefits, hasLocale, team, ui } from "@/content/site.ts";

export async function generateMetadata({ params }: PageProps<"/[lang]/ueber-uns">): Promise<Metadata> {
  const { lang } = await params;
  return { title: hasLocale(lang) ? about.title[lang] : undefined };
}

export default async function About({ params }: PageProps<"/[lang]/ueber-uns">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-3xl font-bold text-slate-900">{about.title[lang]}</h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-600">{about.text[lang]}</p>

      <h2 className="mt-12 text-2xl font-bold text-slate-900">{about.teamTitle[lang]}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {team.map((person) => (
          <div key={person.name} className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-100 font-semibold text-teal-800">
              {person.name.split(" ").map((part) => part[0]).join("")}
            </span>
            <div>
              <p className="font-semibold text-slate-900">{person.name}</p>
              <p className="text-sm text-slate-600">{person.role[lang]}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((b) => (
          <div key={b.title.de} className="rounded-2xl bg-slate-50 p-5">
            <h3 className="font-semibold text-teal-800">{b.title[lang]}</h3>
            <p className="mt-2 text-sm text-slate-600">{b.text[lang]}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-2xl font-bold text-slate-900">{ui.mapTitle[lang]}</h2>
      <p className="mt-2 text-slate-600">{ui.mapText[lang]}</p>
      <div className="mt-4">
        <MapEmbed lang={lang} />
      </div>
    </div>
  );
}
