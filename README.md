# KlarHaus: portfolio demo

A website for a **fictional** Bremen cleaning company. It backs three Fiverr gigs at once:

| Gig | What proves it here |
|---|---|
| Business website (Next.js) | 4 pages in German and English, mobile-first, quote form, WhatsApp button, map that loads only after consent |
| RAG chatbot | Chat widget answers from the FAQ (`src/content/site.ts`) with source links; Claude writes the answer when `ANTHROPIC_API_KEY` is set |
| n8n automation | The quote form posts to `N8N_WEBHOOK_URL`; the n8n flow is described below |

Stack: Next.js 16 (App Router, cache components), React 19, Tailwind CSS 4, `@anthropic-ai/sdk`. No database.

## Run locally

Installs the dependencies, then starts the dev server on port 3170.

```bash
npm install
```

```bash
npm run dev -- -p 3170
```

Open http://localhost:3170. It redirects to `/de` (or `/en` for an English browser).

Checks: typecheck, lint, the retrieval test, and a production build.

```bash
npx tsc --noEmit && npm run lint && npm test && npm run build
```

## Environment

Copy `.env.example` to `.env.local`. Both values are optional:

- `ANTHROPIC_API_KEY`: without it the bot answers in **extractive mode**, quoting the best-matching FAQ entry word for word. With it, `src/app/api/chat/route.ts` sends the top 3 entries to `claude-opus-5-5` (effort `low`, server-side refusal fallback on) and asks for a short answer that cites them.
- `N8N_WEBHOOK_URL`: without it quote requests are validated and only logged to the server console.

## How the chatbot works

1. `src/lib/retrieve.ts` scores the 12 FAQ entries with a small BM25 keyword search (German compounds such as "Grundreinigung" match "Reinigung").
2. Nothing relevant found: a polite "I don't know, use the quote form" answer, without calling a model.
3. Otherwise the top entries go to Claude (or are quoted directly), and the widget links each source to its FAQ entry on `/leistungen`.

Swap step 1 for pgvector embeddings once the knowledge base grows beyond a few hundred chunks; the route stays the same.

## The n8n flow for quote requests (build it in your n8n)

The form sends JSON: `name, email, phone, service, size, frequency, date, message, lang, receivedAt`.

1. **Webhook** node: method `POST`, path `klarhaus-quote`, respond "Immediately". Put its production URL into `N8N_WEBHOOK_URL`.
2. **Anthropic** node, or **HTTP Request** with your Anthropic credential: ask for a 2-sentence German summary plus a rough price from the price list, e.g. *"Fasse diese Reinigungsanfrage in 2 Sätzen zusammen und schätze den Preis anhand der Preisliste: {{ JSON.stringify($json.body) }}"*.
3. **Google Sheets**, Append row: date, name, email, service, m², summary.
4. **Gmail** or **Send Email**: an alert to yourself with the summary and a reply link.

Screenshot the canvas for the Fiverr gallery (Gig 4).

## Before deploying publicly

- The site is set to `noindex` because the company is fictional. Keep it that way.
- `/impressum` and `/datenschutz` (text in `src/content/legal.ts`) name you as the operator, with the same details as integraitapp.com. Update them if your address or email changes.
- The privacy page describes what the code does today. **Before setting `N8N_WEBHOOK_URL`, rewrite section 5** (the quote data would then be stored and forwarded). `ANTHROPIC_API_KEY` is already covered by section 4.
- Vercel's Hobby plan is fine for this non-commercial demo. Client sites go on Cloudflare or a paid plan.
