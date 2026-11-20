import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { notFound } from "next/navigation";
import { ChatWidget } from "@/components/ChatWidget.tsx";
import { Footer } from "@/components/Footer.tsx";
import { Header } from "@/components/Header.tsx";
import { hasLocale, locales, ui } from "@/content/site.ts";
import "../globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { template: "%s – KlarHaus (Demo)", default: "KlarHaus – Gebäudereinigung Bremen (Demo)" },
  description: "Portfolio demo: website, AI FAQ assistant and quote form for a fictional cleaning company.",
  // WHY: a fictional company must not show up in search results next to real ones.
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} className={`${geist.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white text-slate-800">
        <div className="bg-amber-100 px-4 py-1.5 text-center text-xs text-amber-900">{ui.demoBanner[lang]}</div>
        <Header lang={lang} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} />
        <a
          href={`https://wa.me/?text=${encodeURIComponent("KlarHaus – Gebäudereinigung in Bremen (Demo)")}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ui.whatsapp[lang]}
          title={ui.whatsapp[lang]}
          className="fixed bottom-5 left-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden="true">
            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.3Z" />
          </svg>
        </a>
        <ChatWidget lang={lang} />
      </body>
    </html>
  );
}
