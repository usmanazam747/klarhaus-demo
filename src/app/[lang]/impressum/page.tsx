import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/LegalPage.tsx";
import { impressum } from "@/content/legal.ts";
import { hasLocale } from "@/content/site.ts";

export async function generateMetadata({ params }: PageProps<"/[lang]/impressum">): Promise<Metadata> {
  const { lang } = await params;
  return { title: hasLocale(lang) ? impressum[lang].title : undefined };
}

export default async function Impressum({ params }: PageProps<"/[lang]/impressum">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <LegalPage doc={impressum[lang]} />;
}
