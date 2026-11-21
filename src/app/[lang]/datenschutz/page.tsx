import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/LegalPage.tsx";
import { privacy } from "@/content/legal.ts";
import { hasLocale } from "@/content/site.ts";

export async function generateMetadata({ params }: PageProps<"/[lang]/datenschutz">): Promise<Metadata> {
  const { lang } = await params;
  return { title: hasLocale(lang) ? privacy[lang].title : undefined };
}

export default async function Datenschutz({ params }: PageProps<"/[lang]/datenschutz">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <LegalPage doc={privacy[lang]} />;
}
