import { faq, type FaqEntry } from "../content/site.ts";

// ponytail: keyword BM25 over 12 FAQ entries. Swap for pgvector embeddings once the
// knowledge base grows past a few hundred chunks or needs synonym matching.

const STOPWORDS = new Set(
  "der die das und oder ein eine einen ist sind ihr euch wir sie ich mit für von bei auf zu im in an wie was wer kann können auch nicht noch the and or a an is are you your we our do does to of in on for with how what who can".split(" "),
);

export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .filter((t) => t.length > 2 && !STOPWORDS.has(t));
}

type Doc = { entry: FaqEntry; tokens: string[] };

const docs: Doc[] = faq.map((entry) => ({
  entry,
  tokens: tokenize(`${entry.q.de} ${entry.a.de} ${entry.q.en} ${entry.a.en} ${entry.id}`),
}));
const avgLen = docs.reduce((sum, d) => sum + d.tokens.length, 0) / docs.length;

// German compounds: "reinigung" should also hit "grundreinigung" / "fensterreinigung".
const hits = (docToken: string, q: string) =>
  docToken === q || (q.length >= 5 && docToken.includes(q)) || (docToken.length >= 5 && q.includes(docToken));

export function retrieve(question: string, k = 3): { entry: FaqEntry; score: number }[] {
  const terms = [...new Set(tokenize(question))];
  const k1 = 1.2;
  const b = 0.75;
  return docs
    .map((doc) => {
      let score = 0;
      for (const term of terms) {
        const tf = doc.tokens.filter((t) => hits(t, term)).length;
        if (!tf) continue;
        const df = docs.filter((d) => d.tokens.some((t) => hits(t, term))).length;
        const idf = Math.log(1 + (docs.length - df + 0.5) / (df + 0.5));
        score += (idf * tf * (k1 + 1)) / (tf + k1 * (1 - b + (b * doc.tokens.length) / avgLen));
      }
      return { entry: doc.entry, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}
