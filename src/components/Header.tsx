import Link from "next/link";
import { nav, type Locale } from "@/content/site.ts";
import { LangSwitch } from "./LangSwitch.tsx";

export function Logo() {
  return (
    <span className="flex items-center gap-2 text-lg font-semibold tracking-tight text-teal-800">
      <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
        <path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-8.5Z" className="fill-teal-700" />
        <path d="m15.5 9 1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2Z" className="fill-amber-300" />
      </svg>
      KlarHaus
    </span>
  );
}

export function Header({ lang }: { lang: Locale }) {
  const links = nav.map((item) => ({ href: `/${lang}${item.href}`, label: item.label[lang] }));
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href={`/${lang}`} aria-label="KlarHaus">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {links.slice(0, -1).map((link) => (
            <Link key={link.href} href={link.href} className="text-slate-600 hover:text-teal-800">
              {link.label}
            </Link>
          ))}
          <Link href={links.at(-1)!.href} className="rounded-full bg-teal-700 px-4 py-2 text-white hover:bg-teal-800">
            {links.at(-1)!.label}
          </Link>
          <LangSwitch lang={lang} />
        </nav>
        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded-md border border-slate-300 px-3 py-1.5 text-sm">
            {lang === "de" ? "Menü" : "Menu"}
          </summary>
          <div className="absolute right-0 mt-2 flex w-56 flex-col gap-1 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="rounded-lg px-3 py-2 text-sm hover:bg-slate-100">
                {link.label}
              </Link>
            ))}
            <div className="px-3 py-2">
              <LangSwitch lang={lang} />
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
