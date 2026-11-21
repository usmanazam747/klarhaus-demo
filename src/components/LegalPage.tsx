import type { LegalDoc } from "@/content/legal.ts";

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-bold text-slate-900">{doc.title}</h1>
      <p className="mt-2 text-sm text-slate-500">{doc.updated}</p>
      {doc.sections.map((section) => (
        <section key={section.heading} className="mt-8">
          <h2 className="text-lg font-semibold text-slate-900">{section.heading}</h2>
          {section.paragraphs.map((p) => (
            <p key={p} className="mt-2 whitespace-pre-line text-slate-700">
              {p}
            </p>
          ))}
        </section>
      ))}
    </article>
  );
}
