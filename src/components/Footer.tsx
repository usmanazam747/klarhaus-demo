import Link from "next/link";
import { nav, ui, type Locale } from "@/content/site.ts";
import { Logo } from "./Header.tsx";

export function Footer({ lang }: { lang: Locale }) {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm md:grid-cols-3">
        <div className="space-y-2">
          <Logo />
          <p className="text-slate-600">{ui.tagline[lang]}</p>
        </div>
        <div className="space-y-1 text-slate-600">
          <p>Musterstraße 1, 28195 Bremen ({lang === "de" ? "fiktiv" : "fictional"})</p>
          <p>hallo@klarhaus.example</p>
          <p>{lang === "de" ? "Mo–Fr 7–18 Uhr" : "Mon–Fri 7am–6pm"}</p>
        </div>
        <nav className="flex flex-col gap-1">
          {nav.map((item) => (
            <Link key={item.href} href={`/${lang}${item.href}`} className="text-slate-600 hover:text-teal-800">
              {item.label[lang]}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-slate-200 px-4 py-4 text-center text-xs text-slate-500">
        <p>{ui.demoBanner[lang]}</p>
        <p>{ui.builtBy[lang]}</p>
      </div>
    </footer>
  );
}
