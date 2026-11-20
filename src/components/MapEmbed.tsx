"use client";

import { useState } from "react";
import { ui, type Locale } from "@/content/site.ts";

// WHY: the map only loads after a click, so no visitor IP reaches OpenStreetMap without consent (GDPR).
export function MapEmbed({ lang }: { lang: Locale }) {
  const [loaded, setLoaded] = useState(false);
  if (loaded) {
    return (
      <iframe
        title={ui.mapTitle[lang]}
        src="https://www.openstreetmap.org/export/embed.html?bbox=8.70%2C53.03%2C8.92%2C53.13&layer=mapnik"
        className="h-72 w-full rounded-2xl border border-slate-200"
        loading="lazy"
      />
    );
  }
  return (
    <div className="flex h-72 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
      <button onClick={() => setLoaded(true)} className="rounded-full border border-teal-700 px-5 py-2 text-sm font-semibold text-teal-800 hover:bg-teal-50">
        {ui.mapButton[lang]}
      </button>
      <p className="max-w-xs text-xs text-slate-500">{ui.mapConsent[lang]}</p>
    </div>
  );
}
