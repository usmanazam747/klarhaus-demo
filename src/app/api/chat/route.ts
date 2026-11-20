import Anthropic from "@anthropic-ai/sdk";
import { hasLocale, type Locale } from "@/content/site.ts";
import { retrieve } from "@/lib/retrieve.ts";

const NO_ANSWER: Record<Locale, string> = {
  de: "Dazu habe ich leider keine Information. Schreiben Sie uns über das Angebotsformular – wir melden uns am nächsten Werktag.",
  en: "Sorry, I don't have information on that. Send us a message via the quote form – we reply the next working day.",
};

type Source = { id: string; title: string };

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const question = typeof body?.question === "string" ? body.question.trim().slice(0, 500) : "";
  const lang: Locale = hasLocale(body?.lang ?? "") ? body.lang : "de";
  if (!question) return Response.json({ error: "question missing" }, { status: 400 });

  const hits = retrieve(question);
  if (!hits.length) return Response.json({ answer: NO_ANSWER[lang], sources: [], mode: "none" });

  const sources: Source[] = hits.map(({ entry }) => ({ id: entry.id, title: entry.q[lang] }));

  // WHY: without a key the demo still works - it quotes the best-matching FAQ entry verbatim.
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ answer: hits[0].entry.a[lang], sources: sources.slice(0, 1), mode: "extractive" });
  }

  const context = hits
    .map(({ entry }, i) => `[${i + 1}] ${entry.q.de}\n${entry.a.de}\n${entry.q.en}\n${entry.a.en}`)
    .join("\n\n");

  try {
    const client = new Anthropic();
    const response = await client.beta.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 16000,
      output_config: { effort: "low" },
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system:
        "You are the website assistant of KlarHaus, a cleaning company in Bremen (a fictional demo company). " +
        "Answer only from the numbered FAQ excerpts the user message provides. If they do not contain the answer, say so in one sentence and point to the quote form. " +
        "Never invent prices, dates or promises. Reply in the language of the question, in at most three short sentences, and cite the excerpts you used like [1].",
      messages: [{ role: "user", content: `FAQ excerpts:\n${context}\n\nQuestion: ${question}` }],
    });

    if (response.stop_reason === "refusal") {
      return Response.json({ answer: NO_ANSWER[lang], sources: [], mode: "refusal" });
    }
    const answer = response.content
      .flatMap((block) => (block.type === "text" ? [block.text] : []))
      .join("")
      .trim();
    const cited = sources.filter((_, i) => answer.includes(`[${i + 1}]`));
    return Response.json({ answer, sources: cited.length ? cited : sources.slice(0, 1), mode: "claude" });
  } catch (error) {
    // WHY: a failed model call should degrade to the extractive answer, not break the widget.
    if (error instanceof Anthropic.APIError) {
      console.error(`Claude API error ${error.status}: ${error.message}`);
    } else {
      throw error;
    }
    return Response.json({ answer: hits[0].entry.a[lang], sources: sources.slice(0, 1), mode: "extractive" });
  }
}
