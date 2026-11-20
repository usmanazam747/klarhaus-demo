"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/content/site.ts";

export function LangSwitch({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const other: Locale = lang === "de" ? "en" : "de";
  return (
    <Link
      href={pathname.replace(/^\/(de|en)/, `/${other}`)}
      className="text-sm font-semibold uppercase text-slate-500 hover:text-teal-800"
      hrefLang={other}
    >
      {other}
    </Link>
  );
}
