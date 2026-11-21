const SERVICES = new Set(["buero", "grundreinigung", "fenster", "umzug", "sonstiges"]);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const text = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) return Response.json({ error: "invalid body" }, { status: 400 });

  // Honeypot: humans never see this field, bots fill it. Pretend success.
  if (text(body.website, 200)) return Response.json({ ok: true });

  const quote = {
    name: text(body.name, 120),
    email: text(body.email, 200),
    phone: text(body.phone, 40),
    service: text(body.service, 40),
    size: text(body.size, 40),
    frequency: text(body.frequency, 40),
    date: text(body.date, 20),
    message: text(body.message, 2000),
    lang: body.lang === "en" ? "en" : "de",
    receivedAt: new Date().toISOString(),
  };

  const errors: string[] = [];
  if (!quote.name) errors.push("name");
  if (!EMAIL.test(quote.email)) errors.push("email");
  if (!SERVICES.has(quote.service)) errors.push("service");
  if (body.consent !== true) errors.push("consent");
  if (errors.length) return Response.json({ error: "invalid", fields: errors }, { status: 422 });

  const webhook = process.env.N8N_WEBHOOK_URL;
  if (!webhook) {
    // WHY: the demo must work without n8n, and the privacy policy (section 5) promises the details are
    // discarded: log no names or contact data here. Setting N8N_WEBHOOK_URL requires updating that section first.
    console.info("Quote request (no N8N_WEBHOOK_URL set):", quote.service, quote.size, quote.lang);
    return Response.json({ ok: true, forwarded: false });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quote),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`n8n responded ${res.status}`);
  } catch (error) {
    console.error("Forwarding the quote to n8n failed:", error);
    return Response.json({ error: "forward_failed" }, { status: 502 });
  }
  return Response.json({ ok: true, forwarded: true });
}
