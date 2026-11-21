import type { Locale } from "./site.ts";

export type LegalSection = { heading: string; paragraphs: string[] };
export type LegalDoc = { title: string; updated: string; sections: LegalSection[] };

// WHY: same operator block as integraitapp.com. A natural person runs both sites, so § 5 DDG needs
// the real name and a serviceable address here too; KlarHaus itself is fictional and has none.
const OPERATOR = {
  name: "Muhammad Usman",
  street: "Huder Straße 20",
  city: "28197 Bremen",
  email: "usman@integraitapp.com",
};
const UPDATED = { de: "Stand: 20. November 2026", en: "Last updated: 20 November 2026" };
const ADDRESS = `${OPERATOR.name}\n${OPERATOR.street}\n${OPERATOR.city}`;

export const impressum: Record<Locale, LegalDoc> = {
  de: {
    title: "Impressum",
    updated: UPDATED.de,
    sections: [
      { heading: "Angaben gemäß § 5 DDG", paragraphs: [`${ADDRESS}\nDeutschland`] },
      { heading: "Kontakt", paragraphs: [`E-Mail: ${OPERATOR.email}`] },
      {
        heading: "Hinweis zu dieser Website",
        paragraphs: [
          "Diese Website ist ein Demo- und Portfolio-Projekt. „KlarHaus“ ist ein erfundenes Unternehmen: Name, Adresse, Team, Preise und Kontaktangaben auf den übrigen Seiten sind fiktiv. Über diese Website werden keine Reinigungsleistungen angeboten und keine Verträge geschlossen.",
        ],
      },
      {
        heading: "Haftung für Inhalte",
        paragraphs: [
          "Als Diensteanbieter bin ich für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Ich bin jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Bei Bekanntwerden einer konkreten Rechtsverletzung entferne ich die betreffenden Inhalte umgehend.",
        ],
      },
      {
        heading: "Haftung für Links",
        paragraphs: [
          "Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich. Bei Bekanntwerden von Rechtsverletzungen entferne ich derartige Links umgehend.",
        ],
      },
      {
        heading: "Urheberrecht",
        paragraphs: [
          "Die von mir erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen meiner schriftlichen Zustimmung.",
        ],
      },
    ],
  },
  en: {
    title: "Legal notice (Impressum)",
    updated: UPDATED.en,
    sections: [
      { heading: "Information pursuant to § 5 DDG", paragraphs: [`${ADDRESS}\nGermany`] },
      { heading: "Contact", paragraphs: [`Email: ${OPERATOR.email}`] },
      {
        heading: "About this website",
        paragraphs: [
          "This website is a demo and portfolio project. “KlarHaus” is a fictional company: the name, address, team, prices and contact details on the other pages are made up. No cleaning services are offered and no contracts are concluded through this website.",
        ],
      },
      {
        heading: "Liability for content",
        paragraphs: [
          "As a service provider I am responsible for my own content on these pages under general law. I am not obliged to monitor transmitted or stored third-party information or to look for circumstances that indicate unlawful activity. As soon as I become aware of a specific infringement, I will remove the content concerned.",
        ],
      },
      {
        heading: "Liability for links",
        paragraphs: [
          "This website links to external third-party websites whose content I cannot influence. The provider of each linked page is always responsible for its content. As soon as I become aware of an infringement, I will remove the link.",
        ],
      },
      {
        heading: "Copyright",
        paragraphs: [
          "The content and works I created on these pages are subject to German copyright law. Copying, editing, distributing or any other use beyond the limits of copyright law requires my written consent.",
        ],
      },
      {
        heading: "Governing language",
        paragraphs: ["This English text is a courtesy translation. If the versions differ, the German legal notice prevails."],
      },
    ],
  },
};

// WHY: written for what the code does today. Setting N8N_WEBHOOK_URL (quote form forwarding)
// changes section 5 and must update this text first; ANTHROPIC_API_KEY is already covered in section 4.
export const privacy: Record<Locale, LegalDoc> = {
  de: {
    title: "Datenschutzerklärung",
    updated: UPDATED.de,
    sections: [
      {
        heading: "1. Verantwortlicher",
        paragraphs: [`${ADDRESS}\nDeutschland\nE-Mail: ${OPERATOR.email}`, "Diese Website ist ein Demo-Projekt; „KlarHaus“ ist kein echtes Unternehmen."],
      },
      {
        heading: "2. Bereitstellung der Website",
        paragraphs: [
          "Die Website wird von Vercel Inc. (USA) bereitgestellt. Beim Aufruf verarbeitet Vercel technische Verbindungsdaten wie IP-Adresse, angeforderte Adresse, Browser und Zeitpunkt, um die Seiten auszuliefern und vor Missbrauch zu schützen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.",
          "Die Website setzt keine Cookies und nutzt keine Analyse- oder Werbedienste. Die Schrift wird vom eigenen Server geladen, nicht von Google.",
        ],
      },
      {
        heading: "3. Kontakt per E-Mail",
        paragraphs: [
          `Wenn Sie an ${OPERATOR.email} schreiben, verarbeite ich Ihre Nachricht und Ihre Kontaktdaten, um sie zu beantworten (Art. 6 Abs. 1 lit. f DSGVO). E-Mails an diese Adresse leitet Cloudflare an ein Gmail-Postfach von Google weiter.`,
        ],
      },
      {
        heading: "4. FAQ-Assistent (Chat)",
        paragraphs: [
          "Ihre Frage wird an den Server gesendet und in den FAQ dieser Website gesucht. Fragen und Antworten werden nicht gespeichert und nicht protokolliert.",
          "Steht unter einer Antwort „Direkt aus unseren FAQ zitiert“, hat die Frage den Server nicht verlassen. Steht dort „KI-Antwort“, wurden Ihre Frage und die passenden FAQ-Auszüge an Anthropic PBC (USA) übermittelt, das die Antwort erzeugt und die Daten nach seinen Bedingungen für die API-Nutzung verarbeitet.",
          "Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (Beantwortung Ihrer Frage). Bitte geben Sie im Chat keine personenbezogenen Daten ein.",
        ],
      },
      {
        heading: "5. Angebotsformular",
        paragraphs: [
          "In dieser Demo werden Ihre Angaben auf dem Server nur auf Vollständigkeit geprüft und danach verworfen. Sie werden nicht gespeichert, nicht weitergeleitet und von niemandem gelesen. Im technischen Protokoll erscheinen nur die gewählte Leistung, die Fläche und die Sprache, keine Namen oder Kontaktdaten.",
        ],
      },
      {
        heading: "6. Karte und WhatsApp",
        paragraphs: [
          "Die Karte auf „Über uns“ wird erst nach Ihrem Klick geladen. Dann erhält die OpenStreetMap Foundation (Vereinigtes Königreich, für das ein Angemessenheitsbeschluss der EU besteht) Ihre IP-Adresse und Browserdaten. Rechtsgrundlage ist Ihre Einwilligung durch den Klick (Art. 6 Abs. 1 lit. a DSGVO).",
          "Der WhatsApp-Knopf ist ein einfacher Link. Erst wenn Sie ihn anklicken, öffnet sich WhatsApp; WhatsApp Ireland Limited verarbeitet dann Daten nach eigenen Bedingungen.",
        ],
      },
      {
        heading: "7. Übermittlungen in die USA und Ihre Rechte",
        paragraphs: [
          "Übermittlungen an Anbieter in den USA stützen sich auf das EU-US Data Privacy Framework, soweit der Anbieter danach zertifiziert ist, andernfalls auf die EU-Standardvertragsklauseln des Anbieters.",
          `Sie können Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit verlangen sowie der Verarbeitung widersprechen und eine Einwilligung jederzeit widerrufen. Schreiben Sie dazu an ${OPERATOR.email}. Sie können sich außerdem bei einer Datenschutzaufsichtsbehörde beschweren; zuständig ist die Landesbeauftragte für Datenschutz und Informationsfreiheit der Freien Hansestadt Bremen.`,
        ],
      },
    ],
  },
  en: {
    title: "Privacy policy",
    updated: UPDATED.en,
    sections: [
      {
        heading: "1. Controller",
        paragraphs: [`${ADDRESS}\nGermany\nEmail: ${OPERATOR.email}`, "This website is a demo project; “KlarHaus” is not a real company."],
      },
      {
        heading: "2. Hosting",
        paragraphs: [
          "The website is hosted by Vercel Inc. (USA). When you visit, Vercel processes technical connection data such as IP address, requested address, browser and time to deliver the pages and protect them from abuse. The legal basis is Art. 6(1)(f) GDPR.",
          "The website sets no cookies and uses no analytics or advertising services. The font is served from this site's own server, not from Google.",
        ],
      },
      {
        heading: "3. Contact by email",
        paragraphs: [
          `If you write to ${OPERATOR.email}, I process your message and contact details to reply (Art. 6(1)(f) GDPR). Emails to this address are forwarded by Cloudflare to a Gmail mailbox at Google.`,
        ],
      },
      {
        heading: "4. FAQ assistant (chat)",
        paragraphs: [
          "Your question is sent to the server and looked up in this website's FAQ. Questions and answers are not stored or logged.",
          "If an answer says “Quoted directly from our FAQ”, your question did not leave the server. If it says “AI answer”, your question and the matching FAQ excerpts were sent to Anthropic PBC (USA), which generates the answer and processes the data under its API terms.",
          "The legal basis is Art. 6(1)(f) GDPR (answering your question). Please do not enter personal data in the chat.",
        ],
      },
      {
        heading: "5. Quote form",
        paragraphs: [
          "In this demo the server only checks that your details are complete and then discards them. They are not stored, not forwarded and not read by anyone. The technical log shows only the chosen service, the area and the language, never names or contact details.",
        ],
      },
      {
        heading: "6. Map and WhatsApp",
        paragraphs: [
          "The map on “About us” loads only after you click. The OpenStreetMap Foundation (United Kingdom, covered by an EU adequacy decision) then receives your IP address and browser data. The legal basis is your consent given by the click (Art. 6(1)(a) GDPR).",
          "The WhatsApp button is a plain link. Only when you click it does WhatsApp open; WhatsApp Ireland Limited then processes data under its own terms.",
        ],
      },
      {
        heading: "7. Transfers to the USA and your rights",
        paragraphs: [
          "Transfers to providers in the USA rely on the EU-US Data Privacy Framework where the provider is certified under it, otherwise on the provider's EU Standard Contractual Clauses.",
          `You can request access, rectification, erasure, restriction of processing and data portability, object to processing, and withdraw consent at any time. Write to ${OPERATOR.email}. You can also complain to a data protection authority; the competent one is the State Commissioner for Data Protection and Freedom of Information of the Free Hanseatic City of Bremen.`,
        ],
      },
      {
        heading: "Governing language",
        paragraphs: ["This English text is a courtesy translation. If the versions differ, the German privacy policy prevails."],
      },
    ],
  },
};
